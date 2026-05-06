import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Check } from "lucide-react";

export const metadata: Metadata = { title: "Goal & Streak" };

const CODE = {
  react: {
    filename: "GoalStreakCard.tsx",
    code: `"use client";

import { useState, useEffect } from "react";

interface GoalStreakProps {
  label: string;
  current: number;
  goal: number;
  currentStreak: number;
  bestStreak: number;
  unit?: string;
}

export function GoalStreakCard({
  label,
  current,
  goal,
  currentStreak,
  bestStreak,
  unit = "applications",
}: GoalStreakProps) {
  const pct = Math.min(current / goal, 1);
  const isGoalMet = current >= goal;

  // Spring-animate the bar width on mount
  const [width, setWidth] = useState(0);
  useEffect(() => { requestAnimationFrame(() => setWidth(pct)); }, [pct]);

  const fillColor = isGoalMet
    ? "rgb(var(--status-success))"
    : "rgb(var(--accent))";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        borderRadius: 14,
        overflow: "hidden",
        background: "rgb(var(--surface))",
        border: "1px solid rgb(var(--border))",
        boxShadow: "var(--shadow-card)",
        // sfBrandLitSurface when goal met
        ...(isGoalMet && {
          background: "rgb(var(--accent) / 0.06)",
          border: "1px solid rgb(var(--accent) / 0.25)",
        }),
      }}
    >
      {/* Progress column */}
      <div style={{ padding: "16px 20px", borderRight: "1px solid rgb(var(--border))" }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgb(var(--text-tertiary))", marginBottom: 8 }}>
          {label}
        </p>
        <p style={{ fontSize: 13, color: "rgb(var(--text-secondary))", marginBottom: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 20, color: "rgb(var(--text-primary))", fontVariantNumeric: "tabular-nums" }}>{current}</span>
          {" / "}{goal} {unit}
        </p>

        {/* Progress bar */}
        <div style={{ height: 8, borderRadius: 99, background: "rgb(var(--progress-track))", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: \`\${width * 100}%\`,
            borderRadius: 99,
            background: fillColor,
            transition: "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }} />
        </div>

        {isGoalMet && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, color: "rgb(var(--status-success))", fontSize: 12, fontWeight: 600 }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgb(var(--status-success))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            Goal met!
          </div>
        )}
      </div>

      {/* Current streak */}
      <div style={{ padding: 16, textAlign: "center", borderRight: "1px solid rgb(var(--border))" }}>
        <div style={{ fontSize: 22, marginBottom: 4 }}>{currentStreak > 0 ? "🔥" : "💤"}</div>
        <div style={{ fontSize: 24, fontWeight: 800, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{currentStreak}</div>
        <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginTop: 2 }}>day streak</div>
      </div>

      {/* Best streak */}
      <div style={{ padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 22, marginBottom: 4 }}>🏆</div>
        <div style={{ fontSize: 24, fontWeight: 800, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{bestStreak}</div>
        <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginTop: 2 }}>best streak</div>
      </div>
    </div>
  );
}`,
  },
  html: {
    filename: "goal-streak.html",
    code: `<div class="goal-streak-card">
  <!-- Progress column -->
  <div class="goal-streak__progress">
    <p class="goal-streak__label">Weekly Goal</p>
    <p class="goal-streak__count">
      <strong>5</strong> / 7 applications
    </p>
    <div class="progress-track">
      <div class="progress-fill" style="width:71%"></div>
    </div>
  </div>

  <!-- Current streak -->
  <div class="goal-streak__stat">
    <span class="goal-streak__emoji">🔥</span>
    <span class="goal-streak__number">12</span>
    <span class="goal-streak__unit">day streak</span>
  </div>

  <!-- Best streak -->
  <div class="goal-streak__stat">
    <span class="goal-streak__emoji">🏆</span>
    <span class="goal-streak__number">21</span>
    <span class="goal-streak__unit">best streak</span>
  </div>
</div>

<style>
.goal-streak-card {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  border-radius: 14px;
  overflow: hidden;
  background: rgb(var(--surface));
  border: 1px solid rgb(var(--border));
  box-shadow: var(--shadow-card);
}
.goal-streak__progress {
  padding: 16px 20px;
  border-right: 1px solid rgb(var(--border));
}
.goal-streak__stat {
  padding: 16px;
  text-align: center;
  border-right: 1px solid rgb(var(--border));
}
.goal-streak__stat:last-child { border-right: none; }
.goal-streak__number {
  display: block;
  font-size: 24px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}
.progress-track {
  height: 8px;
  border-radius: 99px;
  background: rgb(var(--progress-track));
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 99px;
  background: rgb(var(--accent));
  transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
/* Goal met state */
.goal-streak-card.goal-met {
  background: rgb(var(--accent) / 0.06);
  border-color: rgb(var(--accent) / 0.25);
}
.goal-streak-card.goal-met .progress-fill {
  background: rgb(var(--status-success));
}
</style>`,
  },
  swift: {
    filename: "MacGoalStreakCard.swift",
    code: `import SwiftUI

// Mirrors JobFlo's MacGoalStreakCard

struct GoalStreakCard: View {
    let label: String
    let current: Int
    let goal: Int
    let currentStreak: Int
    let bestStreak: Int
    var unit: String = "applications"

    private var pct: Double { min(Double(current) / Double(goal), 1.0) }
    private var isGoalMet: Bool { current >= goal }
    @State private var animatedPct: Double = 0

    var body: some View {
        HStack(spacing: 0) {
            progressColumn
            Divider()
            streakColumn(emoji: currentStreak > 0 ? "🔥" : "💤",
                         value: currentStreak, label: "day streak")
            Divider()
            streakColumn(emoji: "🏆", value: bestStreak, label: "best streak")
        }
        .frame(height: 100)
        .background(
            isGoalMet
                ? Color.sfBrandLitSurface
                : Color.sfSurface
        )
        .clipShape(RoundedRectangle(cornerRadius: 14))
        .overlay {
            RoundedRectangle(cornerRadius: 14)
                .stroke(
                    isGoalMet ? Color.sfBrand(.accent).opacity(0.25) : Color.sfBorder,
                    lineWidth: 1
                )
        }
        .shadow(.card)
        .onAppear {
            withAnimation(.spring(response: 0.5, dampingFraction: 0.75)) {
                animatedPct = pct
            }
        }
    }

    private var progressColumn: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(label)
                .font(.system(size: 11, weight: .semibold))
                .textCase(.uppercase)
                .kerning(0.8)
                .foregroundStyle(.sfTextTertiary)

            Text("\\(current) / \\(goal) \\(unit)")
                .font(.system(size: 13))
                .foregroundStyle(.sfTextSecondary)

            // Animated progress bar
            Capsule()
                .fill(Color.sfProgressTrack)
                .frame(height: 8)
                .overlay(alignment: .leading) {
                    Capsule()
                        .fill(isGoalMet ? Color.sfStatusSuccess : Color.sfBrand(.accent))
                        .frame(width: animatedPct > 0 ? nil : 0)
                        .scaleEffect(x: animatedPct, anchor: .leading)
                }

            if isGoalMet {
                Label("Goal met!", systemImage: "checkmark.circle.fill")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundStyle(Color.sfStatusSuccess)
            }
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private func streakColumn(emoji: String, value: Int, label: String) -> some View {
        VStack(spacing: 4) {
            Text(emoji).font(.system(size: 22))
            Text("\\(value)")
                .font(.system(size: 24, weight: .black, design: .rounded))
                .monospacedDigit()
            Text(label)
                .font(.system(size: 11))
                .foregroundStyle(.sfTextTertiary)
        }
        .frame(maxWidth: .infinity)
        .padding(16)
    }
}`,
  },
  macos: {
    filename: "MacGoalStreakCard.swift",
    code: `// macOS — same SwiftUI implementation.
// JobFlo uses this in the sidebar widget and the main AnalyticsView.

// Usage in AnalyticsView:
GoalStreakCard(
    label: "Weekly Goal",
    current: viewModel.applicationsThisWeek,
    goal: viewModel.weeklyGoal,
    currentStreak: viewModel.currentStreak,
    bestStreak: viewModel.bestStreak,
    unit: "applications"
)`,
  },
};

function GoalStreakDemo() {
  const pct = 5 / 7;
  const isGoalMet = false;
  const fillColor = isGoalMet ? "rgb(var(--status-success))" : "rgb(var(--accent))";

  return (
    <div style={{ padding: 24 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        borderRadius: 14,
        overflow: "hidden",
        background: "rgb(var(--surface))",
        border: "1px solid rgb(var(--border))",
        boxShadow: "var(--shadow-card)",
        maxWidth: 520,
        margin: "0 auto",
      }}>
        {/* Progress column */}
        <div style={{ padding: "16px 20px", borderRight: "1px solid rgb(var(--border))" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgb(var(--text-tertiary))", marginBottom: 8 }}>
            Weekly Goal
          </p>
          <p style={{ fontSize: 13, color: "rgb(var(--text-secondary))", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 20, color: "rgb(var(--text-primary))", fontVariantNumeric: "tabular-nums" }}>5</span>
            {" / 7 applications"}
          </p>
          <div style={{ height: 8, borderRadius: 99, background: "rgb(var(--progress-track))", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct * 100}%`, borderRadius: 99, background: fillColor, transition: "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }} />
          </div>
        </div>

        {/* Current streak */}
        <div style={{ padding: 16, textAlign: "center", borderRight: "1px solid rgb(var(--border))" }}>
          <div style={{ fontSize: 22, marginBottom: 4 }}>🔥</div>
          <div style={{ fontSize: 24, fontWeight: 800, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>12</div>
          <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginTop: 2 }}>day streak</div>
        </div>

        {/* Best */}
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 22, marginBottom: 4 }}>🏆</div>
          <div style={{ fontSize: 24, fontWeight: 800, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>21</div>
          <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginTop: 2 }}>best streak</div>
        </div>
      </div>

      {/* Goal-met state */}
      <p style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", textAlign: "center", margin: "12px 0 8px" }}>Goal-met state</p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        borderRadius: 14,
        overflow: "hidden",
        background: "rgb(var(--accent) / 0.06)",
        border: "1px solid rgb(var(--accent) / 0.25)",
        boxShadow: "var(--shadow-card)",
        maxWidth: 520,
        margin: "0 auto",
      }}>
        <div style={{ padding: "16px 20px", borderRight: "1px solid rgb(var(--border))" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgb(var(--text-tertiary))", marginBottom: 8 }}>Weekly Goal</p>
          <p style={{ fontSize: 13, color: "rgb(var(--text-secondary))", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 20, color: "rgb(var(--text-primary))", fontVariantNumeric: "tabular-nums" }}>7</span>
            {" / 7 applications"}
          </p>
          <div style={{ height: 8, borderRadius: 99, background: "rgb(var(--progress-track))", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "100%", borderRadius: 99, background: "rgb(var(--status-success))" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, color: "rgb(var(--status-success))", fontSize: 12, fontWeight: 600 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgb(var(--status-success))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={10} color="#fff" strokeWidth={3} />
            </div>
            Goal met!
          </div>
        </div>
        <div style={{ padding: 16, textAlign: "center", borderRight: "1px solid rgb(var(--border))" }}>
          <div style={{ fontSize: 22, marginBottom: 4 }}>🔥</div>
          <div style={{ fontSize: 24, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>13</div>
          <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginTop: 2 }}>day streak</div>
        </div>
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 22, marginBottom: 4 }}>🏆</div>
          <div style={{ fontSize: 24, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>21</div>
          <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginTop: 2 }}>best streak</div>
        </div>
      </div>
    </div>
  );
}

export default function GoalStreakPage() {
  return (
    <div>
      <PageHeader
        title="Goal & Streak"
        description="A gamified progress tracker combining a weekly goal progress bar with streak counters. Composes Progress Bar, Avatar, and Badge. Reference: JobFlo's MacGoalStreakCard."
        badge="New"
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Demo</h2>
        <ComponentPreview>
          <GoalStreakDemo />
        </ComponentPreview>
      </section>

      <section className="mb-10 mt-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Column</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Contents</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Progress (2fr)</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Label + count / goal + animated progress bar + goal-met checkmark</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Current streak (1fr)</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">🔥 or 💤 emoji + large rounded-digit number + &ldquo;day streak&rdquo; unit</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Best streak (1fr)</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">🏆 emoji + number + &ldquo;best streak&rdquo; unit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">States</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">State</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Behaviour</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">In progress</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Bar fills with <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--accent</code>; streak shows 🔥 if &gt; 0, else 💤</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Goal met</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Bar transitions to <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--status-success</code>; card surface gets <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--accent / 0.06</code> tint (<code className="font-mono text-[11px] text-[rgb(var(--accent))]">sfBrandLitSurface</code>); checkmark appears</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Zero progress</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Bar empty; streak shows 💤; best streak preserved</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Animation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
          The progress bar animates on mount with a spring curve:{" "}
          <code className="font-mono text-[11px] text-[rgb(var(--accent))]">spring(response: 0.5, dampingFraction: 0.75)</code>. This gives the bar a subtle
          overshoot that communicates momentum without being distracting.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>
    </div>
  );
}
