"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { Check } from "lucide-react";

// Mini step-indicator component
function StepIndicator({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1 rounded-full flex-1 transition-all"
          style={{
            background: i < current
              ? "var(--nav-active-color)"
              : i === current
              ? "var(--nav-active-color)"
              : "rgb(var(--surface-hover))",
            opacity: i < current ? 0.5 : 1,
          }}
        />
      ))}
    </div>
  );
}

// Onboarding wizard demo
function OnboardingDemo() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      label: "Welcome",
      title: "Welcome to Sitka",
      body: "Set up your workspace in four quick steps. You can always change these settings later.",
      cta: "Get started",
    },
    {
      label: "Profile",
      title: "Tell us about yourself",
      body: "This helps us personalise your experience and lets teammates recognise you.",
      cta: "Continue",
    },
    {
      label: "Connect",
      title: "Connect your tools",
      body: "Link the apps your team already uses. Skip any you don't need right now.",
      cta: "Continue",
    },
    {
      label: "Done",
      title: "You're ready",
      body: "Your workspace is set up. Explore the docs or jump straight into your first project.",
      cta: "Open workspace",
    },
  ];

  const current = steps[step];

  return (
    <div className="rounded-2xl overflow-hidden border border-[rgb(var(--border))] bg-[rgb(var(--surface))] max-w-sm">
      {/* Illustration area */}
      <div
        className="h-32 flex items-center justify-center"
        style={{ background: "rgba(52,168,101,0.06)" }}
      >
        {step < 3 ? (
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-[28px] font-bold"
            style={{ background: "rgba(52,168,101,0.12)", color: "var(--nav-active-color)" }}
          >
            {["👋", "🧑", "🔗", "✅"][step]}
          </div>
        ) : (
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: "var(--nav-active-color)" }}
          >
            <Check className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-4">
          <StepIndicator total={4} current={step + 1} />
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--nav-active-color)" }}>
          Step {step + 1} of 4 — {current.label}
        </p>
        <h3 className="text-[17px] font-semibold text-[rgb(var(--text-primary))] mb-2">{current.title}</h3>
        <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-5">{current.body}</p>

        <div className="flex gap-2">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-[rgb(var(--text-secondary))] bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] hover:text-[rgb(var(--text-primary))] transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={() => setStep((s) => Math.min(s + 1, 3))}
            className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--nav-active-color)" }}
          >
            {current.cta}
          </button>
        </div>

        {step < 3 && (
          <button
            onClick={() => setStep(3)}
            className="w-full mt-2 py-1.5 text-[12px] text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] transition-colors"
          >
            Skip setup
          </button>
        )}
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <div>
      <PageHeader
        title="Onboarding"
        description="Onboarding patterns guide new users from sign-up to their first meaningful action. These patterns prioritise progressive disclosure — reveal complexity only when the user is ready for it."
      />

      {/* Live demo */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Interactive Example</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          A four-step wizard with progress indicators, back navigation, and a skip option. Click through the steps.
        </p>
        <OnboardingDemo />
      </section>

      {/* Principles */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "One question per step",
              body: "Each step in a wizard should ask for exactly one piece of information or decision. Combining steps increases drop-off.",
            },
            {
              title: "Show progress",
              body: "Users need to know how much is left. A progress bar or step indicator reduces abandonment by setting expectations.",
            },
            {
              title: "Always allow skipping",
              body: "Never gate completion on optional information. Provide a visible skip path for every step that is not strictly required.",
            },
            {
              title: "Defer everything non-essential",
              body: "Ask only for what you need to deliver immediate value. Collect payment, preferences, and advanced settings later.",
            },
            {
              title: "Celebrate completion",
              body: "The final step should feel like an arrival. A brief success state signals that setup is done and transitions the user into the product.",
            },
            {
              title: "Persist across sessions",
              body: "If a user abandons onboarding, resume where they left off. Never restart the wizard on re-entry.",
            },
          ].map(({ title, body }) => (
            <div key={title} className="p-4 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-2">{title}</h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Step types */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Step Types</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Type", "When to use", "Skip allowed?"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Welcome", when: "First step only. Explain value, set expectations, no data entry.", skip: "No" },
                { type: "Account setup", when: "Name, avatar, timezone — things that personalise the experience.", skip: "No (required)" },
                { type: "Integration", when: "Connect external tools. Each integration is independent.", skip: "Yes" },
                { type: "Team invite", when: "Only show if the product has collaboration features.", skip: "Yes" },
                { type: "Preferences", when: "Theme, notifications, defaults.", skip: "Yes" },
                { type: "Completion", when: "Confirm setup is done and route to the product's core value.", skip: "No" },
              ].map((row, i) => (
                <tr key={row.type} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))]">{row.type}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.when}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold"
                      style={{
                        background: row.skip === "Yes" ? "rgba(52,168,101,0.1)" : "rgba(100,100,115,0.1)",
                        color: row.skip === "Yes" ? "rgb(33,150,83)" : "rgb(100,100,115)",
                      }}
                    >
                      {row.skip}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Do / Don't */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { type: "do", title: "Use a wizard for 3–7 steps", body: "Fewer than 3 steps don't need a wizard — a single form is clearer. More than 7 steps signals the onboarding has too much scope." },
            { type: "dont", title: "Don't use a modal for onboarding", body: "Onboarding needs space. Modals signal a temporary interruption; full-screen or dedicated-page layouts signal that setup matters." },
            { type: "do", title: "Name the back button 'Back'", body: "\"Previous\" is ambiguous. \"Back\" is unambiguous. Always include it from step 2 onwards." },
            { type: "dont", title: "Don't ask for optional info upfront", body: "Payment details, billing address, and advanced preferences don't belong in onboarding. The user hasn't seen value yet." },
          ].map(({ type, title, body }) => (
            <div
              key={title}
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: type === "do" ? "rgba(52,168,101,0.3)" : "rgba(239,68,68,0.3)" }}
            >
              <div
                className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider"
                style={{
                  background: type === "do" ? "rgba(52,168,101,0.08)" : "rgba(239,68,68,0.08)",
                  color: type === "do" ? "rgb(33,150,83)" : "rgb(220,38,38)",
                }}
              >
                {type === "do" ? "✓ Do" : "✗ Don't"}
              </div>
              <div className="p-4 bg-[rgb(var(--surface))]">
                <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1">{title}</p>
                <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
