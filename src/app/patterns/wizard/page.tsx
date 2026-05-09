"use client";

import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";

const CODE = {
  react: {
    filename: "Wizard.tsx",
    code: `"use client";

import { useState } from "react";

interface Step {
  id: string;
  title: string;
  content: React.ReactNode;
  validate?: () => boolean;
}

interface WizardProps {
  steps: Step[];
  onComplete: (data: Record<string, unknown>) => void;
}

export function Wizard({ steps, onComplete }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const step = steps[currentStep];

  const goNext = () => {
    if (step.validate && !step.validate()) return;
    setCompleted((s) => new Set([...s, currentStep]));
    if (isLast) {
      onComplete({});
    } else {
      setCurrentStep((n) => n + 1);
    }
  };

  const goBack = () => setCurrentStep((n) => Math.max(0, n - 1));

  const goTo = (index: number) => {
    if (completed.has(index) || index < currentStep) {
      setCurrentStep(index);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Step indicators */}
      <nav aria-label="Progress">
        <ol className="flex items-center gap-2">
          {steps.map((s, i) => (
            <li key={s.id} className="flex items-center gap-2">
              <button
                onClick={() => goTo(i)}
                aria-current={i === currentStep ? "step" : undefined}
                disabled={!completed.has(i) && i > currentStep}
                className={cn(
                  "flex items-center gap-2 text-[13px] font-medium transition-colors",
                  i === currentStep
                    ? "text-[rgb(var(--accent))]"
                    : completed.has(i)
                    ? "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]"
                    : "text-[rgb(var(--text-tertiary))] cursor-not-allowed"
                )}
              >
                <span className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold border transition-colors",
                  i === currentStep
                    ? "bg-[rgb(var(--accent))] border-[rgb(var(--accent))] text-white"
                    : completed.has(i)
                    ? "bg-[rgb(var(--accent-subtle))] border-[rgb(var(--accent))] text-[rgb(var(--accent))]"
                    : "border-[rgb(var(--border))] text-[rgb(var(--text-tertiary))]"
                )}>
                  {completed.has(i) && i !== currentStep ? (
                    <Check className="w-3 h-3" strokeWidth={3} />
                  ) : (
                    i + 1
                  )}
                </span>
                {s.title}
              </button>
              {i < steps.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-[rgb(var(--text-tertiary))]" />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Step content */}
      <div>
        {step.content}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="secondary" onClick={goBack} disabled={isFirst}>
          Back
        </Button>
        <Button onClick={goNext}>
          {isLast ? "Complete" : "Continue"}
        </Button>
      </div>
    </div>
  );
}`,
  },
  html: {
    filename: "wizard.html",
    code: `<!-- Step indicators -->
<nav aria-label="Progress">
  <ol style="display:flex; align-items:center; gap:8px; list-style:none; padding:0;">
    <li>
      <button
        aria-current="step"
        style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:500; color:rgb(var(--accent));"
      >
        <span style="
          width:24px; height:24px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          background:rgb(var(--accent)); color:white; font-size:11px; font-weight:600;
        ">1</span>
        Account
      </button>
    </li>
    <li aria-hidden="true">›</li>
    <li>
      <button disabled style="opacity:0.4; cursor:not-allowed; display:flex; align-items:center; gap:8px;">
        <span style="
          width:24px; height:24px; border-radius:50%; border:1px solid rgb(var(--border));
          display:flex; align-items:center; justify-content:center; font-size:11px;
        ">2</span>
        Profile
      </button>
    </li>
  </ol>
</nav>

<!-- Step content -->
<div role="region" aria-label="Step 1: Account">
  <!-- form fields for this step -->
</div>

<!-- Navigation -->
<div style="display:flex; justify-content:space-between; margin-top:24px;">
  <button disabled>Back</button>
  <button>Continue</button>
</div>`,
  },
  swift: {
    filename: "WizardView.swift",
    code: `import SwiftUI

struct WizardView: View {
  @State private var step = 0

  let steps = ["Account", "Profile", "Review"]

  var body: some View {
    VStack(spacing: 32) {
      // Step indicators
      HStack {
        ForEach(steps.indices, id: \\.self) { i in
          HStack(spacing: 8) {
            ZStack {
              Circle()
                .fill(i <= step ? Color.accentColor : Color(.systemGray5))
                .frame(width: 28, height: 28)
              if i < step {
                Image(systemName: "checkmark")
                  .font(.caption.bold())
                  .foregroundStyle(.white)
              } else {
                Text("\\(i + 1)")
                  .font(.caption.bold())
                  .foregroundStyle(i <= step ? .white : .secondary)
              }
            }
            if i < steps.count - 1 {
              Rectangle()
                .frame(height: 2)
                .foregroundStyle(i < step ? Color.accentColor : Color(.systemGray5))
            }
          }
        }
      }
      .animation(.easeInOut, value: step)

      // Step content
      TabView(selection: $step) {
        StepOne().tag(0)
        StepTwo().tag(1)
        StepThree().tag(2)
      }
      .tabViewStyle(.page(indexDisplayMode: .never))
      .frame(minHeight: 200)

      // Navigation
      HStack {
        Button("Back") { step = max(0, step - 1) }
          .disabled(step == 0)
          .buttonStyle(.bordered)
        Spacer()
        Button(step == steps.count - 1 ? "Complete" : "Continue") {
          step = min(steps.count - 1, step + 1)
        }
        .buttonStyle(.borderedProminent)
      }
    }
    .padding()
  }
}`,
  },
};

const STEPS = [
  { id: "account", title: "Account", fields: ["Email", "Password"] },
  { id: "profile", title: "Profile", fields: ["Full name", "Job title"] },
  { id: "review", title: "Review", fields: [] },
];

function StepContent({ step, data, onChange }: {
  step: typeof STEPS[number];
  data: Record<string, string>;
  onChange: (key: string, val: string) => void;
}) {
  if (step.id === "review") {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-[13px] font-medium text-[rgb(var(--text-primary))] mb-1">Review your details</p>
        {Object.entries(data).map(([k, v]) => v ? (
          <div key={k} className="flex justify-between text-[13px]">
            <span className="text-[rgb(var(--text-tertiary))]">{k}</span>
            <span className="text-[rgb(var(--text-primary))]">{v}</span>
          </div>
        ) : null)}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {step.fields.map((field) => (
        <Input
          key={field}
          label={field}
          type={field === "Password" ? "password" : "text"}
          value={data[field] ?? ""}
          onChange={(e) => onChange(field, e.target.value)}
          placeholder={`Enter ${field.toLowerCase()}`}
        />
      ))}
    </div>
  );
}

function WizardDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [data, setData] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;

  const goNext = () => {
    setCompleted((s) => new Set([...s, currentStep]));
    if (isLast) setDone(true);
    else setCurrentStep((n) => n + 1);
  };

  const goBack = () => setCurrentStep((n) => Math.max(0, n - 1));

  const goTo = (index: number) => {
    if (completed.has(index) || index < currentStep) setCurrentStep(index);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="w-10 h-10 rounded-full bg-[rgb(var(--accent-subtle))] flex items-center justify-center">
          <Check className="w-5 h-5 text-[rgb(var(--accent))]" strokeWidth={2.5} />
        </div>
        <p className="text-[14px] font-medium text-[rgb(var(--text-primary))]">Setup complete!</p>
        <button
          className="text-[12px] text-[rgb(var(--accent))] hover:underline"
          onClick={() => { setCurrentStep(0); setCompleted(new Set()); setDone(false); setData({}); }}
        >
          Reset demo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      {/* Step indicators */}
      <nav aria-label="Progress">
        <ol className="flex items-center gap-1.5 flex-wrap">
          {STEPS.map((step, i) => (
            <li key={step.id} className="flex items-center gap-1.5">
              <button
                onClick={() => goTo(i)}
                aria-current={i === currentStep ? "step" : undefined}
                disabled={!completed.has(i) && i > currentStep}
                className={cn(
                  "flex items-center gap-1.5 text-[12px] font-medium transition-colors",
                  i === currentStep
                    ? "text-[rgb(var(--accent))]"
                    : completed.has(i)
                    ? "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] cursor-pointer"
                    : "text-[rgb(var(--text-tertiary))] cursor-not-allowed"
                )}
              >
                <span className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold border shrink-0 transition-all",
                  i === currentStep
                    ? "bg-[rgb(var(--accent))] border-[rgb(var(--accent))] text-white"
                    : completed.has(i)
                    ? "bg-[rgb(var(--accent-subtle))] border-[rgb(var(--accent))] text-[rgb(var(--accent))]"
                    : "border-[rgb(var(--border))] text-[rgb(var(--text-tertiary))]"
                )}>
                  {completed.has(i) && i !== currentStep
                    ? <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    : i + 1}
                </span>
                {step.title}
              </button>
              {i < STEPS.length - 1 && (
                <ChevronRight className="w-3 h-3 text-[rgb(var(--border))] shrink-0" strokeWidth={2} />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Step content */}
      <StepContent
        step={STEPS[currentStep]}
        data={data}
        onChange={(k, v) => setData((d) => ({ ...d, [k]: v }))}
      />

      {/* Nav */}
      <div className="flex justify-between">
        <Button variant="secondary" size="sm" onClick={goBack} disabled={isFirst}>
          Back
        </Button>
        <Button size="sm" onClick={goNext}>
          {isLast ? "Complete" : "Continue"}
        </Button>
      </div>
    </div>
  );
}

export default function WizardPage() {
  return (
    <div>
      <PageHeader
        title="Multi-step Wizard"
        badge="New"
        description="A linear flow that breaks a complex task into discrete, completable steps. Each step is validated before advancing. Users can navigate back to completed steps."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
          <WizardDemo />
        </ComponentPreview>
      </section>

      {/* When to use */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          When to use
        </h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Onboarding flows where each step's data depends on the previous (account → profile → preferences).",
            "Complex forms with 5+ fields where grouping reduces cognitive load.",
            "Checkout flows: cart → shipping → payment → confirmation.",
            "Not for simple forms with 3 or fewer fields — use a single-page form instead.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Step indicator anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Step indicator states
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["State", "Badge", "Label colour", "Interactive"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { state: "Upcoming", badge: "Number, border only", label: "Tertiary", interactive: "No" },
                { state: "Current", badge: "Number, accent fill", label: "Accent", interactive: "No" },
                { state: "Completed", badge: "Checkmark, accent subtle", label: "Secondary", interactive: "Yes — click to revisit" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.state}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.badge}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.label}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.interactive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Implementation
        </h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Accessibility
        </h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'The step indicator is a <nav> with aria-label="Progress" — it appears as a landmark.',
            'The current step button uses aria-current="step" to tell screen readers which step is active.',
            "Completed step buttons are enabled; upcoming ones are disabled — this prevents users from skipping steps.",
            "When moving between steps, focus should be managed to the new step's first input or heading so keyboard users are oriented.",
            "Each step's content region should have a heading (h2 or h3) identifying the step title for screen reader users.",
            "Validation errors must be announced via aria-live or by moving focus to the first invalid field.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
