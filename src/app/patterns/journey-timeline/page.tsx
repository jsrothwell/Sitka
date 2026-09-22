"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

type StageState = "completed" | "active" | "upcoming";

interface Stage {
  id: string;
  label: string;
  icon: string;
  state: StageState;
  hint?: string;
}

const STAGES: Stage[] = [
  { id: "applied", label: "Applied", icon: "📨", state: "completed" },
  { id: "screen", label: "Phone Screen", icon: "📞", state: "completed" },
  { id: "interview", label: "Interview", icon: "🎤", state: "active", hint: "Current stage" },
  { id: "offer", label: "Offer", icon: "🎉", state: "upcoming", hint: "Tap to update" },
];

const CODE = {
  react: {
    filename: "TimelineRow.tsx",
    code: `type StageState = "completed" | "active" | "upcoming";

interface TimelineRowProps {
  icon: React.ReactNode;
  label: string;
  state: StageState;
  hint?: string;
  trailing?: React.ReactNode;
}

// A single stage in a vertical stepper timeline: status icon, stage label,
// current-state hint text, and an optional trailing status glyph.
export function TimelineRow({ icon, label, state, hint, trailing }: TimelineRowProps) {
  const isFilled = state === "completed" || state === "active";

  return (
    <div
      className="flex items-center gap-4 py-2.5"
      role="listitem"
      aria-current={state === "active" ? "step" : undefined}
    >
      <div
        className={\`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full \${
          isFilled ? "bg-[rgb(var(--accent))] text-white" : "bg-[rgb(var(--text-primary)/0.08)] text-[rgb(var(--text-secondary))]"
        }\`}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-0.5">
        <span
          className={\`text-[15px] \${
            state === "active"
              ? "font-bold text-[rgb(var(--text-primary))]"
              : state === "completed"
                ? "font-normal text-[rgb(var(--text-secondary))]"
                : "font-normal text-[rgb(var(--text-tertiary))]"
          }\`}
        >
          {label}
        </span>
        {hint && (
          <span
            className={\`text-[12px] \${
              state === "active" ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-tertiary))]"
            }\`}
          >
            {hint}
          </span>
        )}
      </div>

      <div className="ml-auto">{trailing}</div>
    </div>
  );
}`,
  },
  html: {
    filename: "timeline-row.html",
    code: `<div class="timeline" role="list">
  <div class="timeline-row timeline-row--completed" role="listitem">
    <div class="timeline-row__icon">✓</div>
    <div class="timeline-row__text">
      <span class="timeline-row__label">Applied</span>
    </div>
  </div>

  <div class="timeline-row timeline-row--active" role="listitem" aria-current="step">
    <div class="timeline-row__icon">🎤</div>
    <div class="timeline-row__text">
      <span class="timeline-row__label">Interview</span>
      <span class="timeline-row__hint">Current stage</span>
    </div>
  </div>

  <div class="timeline-row timeline-row--upcoming" role="listitem">
    <div class="timeline-row__icon">🎉</div>
    <div class="timeline-row__text">
      <span class="timeline-row__label">Offer</span>
    </div>
  </div>
</div>

<style>
.timeline-row { display: flex; align-items: center; gap: 16px; padding: 10px 0; }
.timeline-row__icon {
  flex-shrink: 0; width: 34px; height: 34px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: var(--surface-raised); color: var(--text-secondary);
}
.timeline-row--completed .timeline-row__icon,
.timeline-row--active .timeline-row__icon { background: var(--accent); color: #fff; }
.timeline-row__label { font-size: 15px; color: var(--text-primary); }
.timeline-row--upcoming .timeline-row__label { color: var(--text-tertiary); }
.timeline-row__hint { display: block; font-size: 12px; color: var(--accent); }
</style>`,
  },
  swift: {
    filename: "TimelineRow.swift",
    code: `import SwiftUI

enum StageState {
    case completed, active, upcoming
}

/// A single stage row in a vertical stepper timeline: status icon circle,
/// stage label, current-state hint text, and a trailing status glyph.
struct TimelineRow: View {
    let icon: String
    let label: String
    let state: StageState
    var hint: String? = nil
    var trailing: (String, Color)? = nil

    private var isFilled: Bool { state == .completed || state == .active }
    private var accent: Color { .accentColor }

    var body: some View {
        HStack(spacing: 16) {
            ZStack {
                Circle()
                    .fill(isFilled ? accent : Color.primary.opacity(0.08))
                    .frame(width: 34, height: 34)
                Image(systemName: icon)
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(isFilled ? Color.white : Color.secondary)
            }

            VStack(alignment: .leading, spacing: 2) {
                Text(label)
                    .font(.system(size: 15, weight: state == .active ? .bold : .regular))
                    .foregroundStyle(
                        state == .active ? Color.primary
                        : state == .completed ? Color.secondary
                        : Color.secondary.opacity(0.5)
                    )
                if let hint {
                    Text(hint)
                        .font(.system(size: 12))
                        .foregroundStyle(state == .active ? accent : Color.secondary.opacity(0.4))
                }
            }

            Spacer()

            if let trailing {
                Text(trailing.0)
                    .font(.system(size: 13))
                    .foregroundStyle(trailing.1)
            }
        }
        .padding(.vertical, 10)
        // One VoiceOver stop per row, not four separate labels.
        .accessibilityElement(children: .combine)
        .accessibilityAddTraits(state == .active ? .isSelected : [])
    }
}`,
  },
};

export default function JourneyTimelinePage() {
  const [stages, setStages] = useState(STAGES);

  function advance() {
    setStages((prev) => {
      const activeIndex = prev.findIndex((s) => s.state === "active");
      if (activeIndex === -1 || activeIndex === prev.length - 1) return prev;
      return prev.map((s, i) => {
        if (i === activeIndex) return { ...s, state: "completed" as const };
        if (i === activeIndex + 1) return { ...s, state: "active" as const, hint: "Current stage" };
        return s;
      });
    });
  }

  function reset() {
    setStages(STAGES);
  }

  return (
    <div>
      <PageHeader
        title="Journey Timeline"
        description="A vertical stepper that shows where someone is in a multi-stage process — completed stages, the current stage, and what's still ahead. Reusable for application journeys, onboarding checklists, order tracking, or any linear, ordered flow."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-6">
          <div className="mx-auto max-w-sm rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5">
            {stages.map((stage) => (
              <div key={stage.id} className="flex items-center gap-4 py-2.5">
                <div
                  className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-[15px] ${
                    stage.state === "completed" || stage.state === "active"
                      ? "bg-[rgb(var(--accent))] text-white"
                      : "bg-[rgb(var(--text-primary)/0.08)]"
                  }`}
                >
                  {stage.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span
                    className={`text-[15px] ${
                      stage.state === "active"
                        ? "font-bold text-[rgb(var(--text-primary))]"
                        : stage.state === "completed"
                          ? "text-[rgb(var(--text-secondary))]"
                          : "text-[rgb(var(--text-tertiary))]"
                    }`}
                  >
                    {stage.label}
                  </span>
                  {stage.hint && (
                    <span
                      className={`text-[12px] ${
                        stage.state === "active" ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-tertiary))]"
                      }`}
                    >
                      {stage.hint}
                    </span>
                  )}
                </div>
                {stage.state === "completed" && (
                  <span className="ml-auto text-[13px] text-[rgb(var(--text-tertiary))]">✓</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={advance}
              disabled={stages.every((s) => s.state !== "active") || stages[stages.length - 1].state === "active"}
              className="rounded-full bg-[rgb(var(--accent))] px-4 py-1.5 text-[12px] font-semibold text-white hover:opacity-90 disabled:opacity-40"
            >
              Advance stage
            </button>
            <button
              onClick={reset}
              className="text-[12px] text-[rgb(var(--text-tertiary))] underline underline-offset-2 hover:text-[rgb(var(--text-secondary))]"
            >
              Reset demo
            </button>
          </div>
        </div>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Each row shares the same four parts. The row itself, not the connecting line between rows, carries the meaning — the line is decorative.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Part", "Purpose"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Icon circle", "Filled with the accent color for completed/active stages; a neutral tint for upcoming ones. Icon communicates the stage's meaning, not just its position."],
                ["Stage label", "The stage name. Bold for the active stage; secondary weight for completed; lowest-emphasis tertiary color for upcoming — this weight ramp is what lets someone scan the whole list and immediately spot 'where am I' without reading every line."],
                ["Hint text", "One line, shown only on the active stage by default ('Current stage') or an upcoming stage with an available action ('Tap to update'). Omit for completed stages — they don't need a call to action."],
                ["Trailing status", "A checkmark for completed stages, a small filled dot for the active stage, or nothing for upcoming. Never the only signal of state — label weight and icon fill must also change."],
              ].map(([part, purpose], i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{part}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* When to use */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">When to use</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              heading: "Linear, ordered stages",
              body: "The process has a fixed, known sequence — applied → screen → interview → offer, or order placed → shipped → delivered. Each stage happens after the last.",
              good: true,
            },
            {
              heading: "Small, bounded stage count",
              body: "Roughly 3–7 stages. Below that, a simple progress bar communicates the same thing with less visual weight; above it, consider grouping into phases.",
              good: true,
            },
            {
              heading: "Non-linear or parallel states",
              body: "If items can be in multiple states at once, or move backward and sideways (not just forward), use a Kanban board instead — a timeline implies a single forward path.",
              good: false,
            },
            {
              heading: "Continuous or percentage-based progress",
              body: "A file upload or a habit-completion streak doesn't have discrete named stages — use a progress bar or the Goal & Streak pattern instead.",
              good: false,
            },
          ].map(({ heading, body, good }) => (
            <div
              key={heading}
              className={`rounded-xl border p-4 ${good ? "border-[rgb(var(--border))]" : "border-[rgb(var(--status-danger))]/30 bg-[rgb(var(--status-danger))]/5"}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={good ? "text-emerald-500" : "text-red-400"}>{good ? "✓" : "✗"}</span>
                <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{heading}</p>
              </div>
              <p className="text-[13px] text-[rgb(var(--text-secondary))]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Group each row's icon, label, and hint into a single accessibility element (aria via a wrapping container role, or .accessibilityElement(children: .combine) in SwiftUI) so VoiceOver/TalkBack announce one coherent stop per stage, not four fragments.",
            "Mark the active stage with aria-current=\"step\" (web) or an equivalent selected trait (SwiftUI) — don't rely on color or font weight alone to convey which stage is current.",
            "State (completed/active/upcoming) must be distinguishable without color: pair it with the trailing glyph (✓, dot) and label copy ('Current stage'), since color-only differences fail for colorblind users and in monochrome contexts.",
            "If a row is tappable (e.g. to log an update), give it an accessible label that states the stage name and its state together: 'Interview, current stage' — not just 'Interview'.",
            "Wrap the whole sequence in role=\"list\" and each row in role=\"listitem\" on the web so assistive tech announces the row count and position ('item 3 of 4').",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
