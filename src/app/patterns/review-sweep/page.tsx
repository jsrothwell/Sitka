"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ArrowList, DocSection, DocTable, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

interface Item {
  id: string;
  title: string;
  subtitle: string;
  days: number;
}

const ITEMS: Item[] = [
  { id: "1", title: "Northwind", subtitle: "Senior Product Designer", days: 46 },
  { id: "2", title: "Lumen Health", subtitle: "Design Lead", days: 31 },
  { id: "3", title: "Harbor & Pine", subtitle: "UX Engineer", days: 15 },
];

const CODE = {
  react: {
    filename: "ReviewSweep.tsx",
    code: `interface SweepItem { id: string; title: string; subtitle: string; days: number }

// A guided pass through everything that needs a decision. Every row ends in an
// action; "Keep waiting" only hides the row for this session.
export function ReviewSweep({ items, onFollowUp, onClose, goal }: {
  items: SweepItem[];
  onFollowUp: (id: string) => void;
  onClose: (id: string) => void;
  goal: { done: number; target: number };
}) {
  const [kept, setKept] = useState<Set<string>>(new Set());
  const [resolved, setResolved] = useState<Set<string>>(new Set());
  const waiting = items.filter((i) => !kept.has(i.id) && !resolved.has(i.id));
  const resolve = (id: string, fn: (id: string) => void) => { fn(id); setResolved((s) => new Set(s).add(id)); };

  return (
    <section aria-labelledby="sweep-title" className="flex flex-col gap-4">
      <h2 id="sweep-title" className="text-[17px] font-semibold">Weekly Review</h2>

      <div>
        <div className="flex justify-between text-[15px]"><span>Applications this week</span>
          <span className="tabular-nums">{goal.done} / {goal.target}</span></div>
        <progress value={goal.done} max={goal.target} className="w-full" aria-label="Weekly goal progress" />
      </div>

      <h3 className="text-[13px] font-semibold uppercase text-[rgb(var(--text-tertiary))]">Waiting to hear back</h3>
      {waiting.length === 0
        ? <p className="text-[rgb(var(--text-secondary))]" role="status">✓ Nothing is waiting on a follow-up.</p>
        : <ul className="divide-y divide-[rgb(var(--border-subtle))]">
            {waiting.map((item) => (
              <li key={item.id} className="py-3">
                <div className="flex justify-between">
                  <div><p className="font-medium">{item.title}</p>
                       <p className="text-[12px] text-[rgb(var(--text-secondary))]">{item.subtitle}</p></div>
                  <span className="text-[12px] text-[rgb(var(--status-caution-text))]"
                        aria-label={\`\${item.days} days since last contact\`}>{item.days}d</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => resolve(item.id, onFollowUp)} className="btn-primary-sm">Followed up</button>
                  <button onClick={() => resolve(item.id, onClose)} className="btn-secondary-sm">Ghosted</button>
                  <button onClick={() => setKept((s) => new Set(s).add(item.id))} className="btn-ghost-sm">Keep waiting</button>
                </div>
              </li>
            ))}
          </ul>}
      <p className="text-[12px] text-[rgb(var(--text-tertiary))]">
        Following up resets the 14-day clock. Ghosted moves the job out of your active pipeline.
      </p>
    </section>
  );
}`,
  },
  html: {
    filename: "review-sweep.html",
    code: `<section class="sweep" aria-labelledby="sweep-title">
  <h2 id="sweep-title">Weekly Review</h2>
  <h3>Waiting to hear back</h3>
  <ul>
    <li class="sweep__row">
      <div class="sweep__head">
        <div><p class="sweep__title">Northwind</p><p class="sweep__sub">Senior Product Designer</p></div>
        <span class="sweep__age" aria-label="46 days since last contact">46d</span>
      </div>
      <div class="sweep__actions">
        <button class="primary">Followed up</button>
        <button class="secondary">Ghosted</button>
        <button class="ghost">Keep waiting</button>
      </div>
    </li>
  </ul>
  <p class="sweep__footer">Following up resets the 14-day clock.</p>
</section>

<style>
.sweep__row { padding: 12px 0; border-bottom: 1px solid rgb(var(--border-subtle)); }
.sweep__head { display: flex; justify-content: space-between; }
.sweep__age { font-size: 12px; color: rgb(var(--status-caution)); }
.sweep__actions { display: flex; gap: 8px; margin-top: 8px; }
.sweep__actions button { min-height: 32px; padding: 0 12px; border-radius: 999px; font-size: 12px; font-weight: 600; }
.sweep__actions .primary   { background: rgb(var(--accent)); color: #fff; }
.sweep__actions .secondary { background: rgb(var(--surface-raised)); }
.sweep__actions .ghost     { background: none; color: rgb(var(--accent)); }
</style>`,
  },
  swift: {
    filename: "ReviewSweepSheet.swift",
    code: `import SwiftUI

/// A short guided sweep through everything that needs a decision this week.
/// Each waiting item gets one tap — followed up, closed, or keep waiting — so
/// alerts end in an action and the underlying data stays accurate.
struct ReviewSweepSheet: View {
    let items: [SweepItem]
    var onFollowUp: (SweepItem) -> Void
    var onClose: (SweepItem) -> Void
    @Environment(\\.dismiss) private var dismiss

    /// Hidden for this review only — not persisted.
    @State private var kept: Set<SweepItem.ID> = []
    @State private var resolved: Set<SweepItem.ID> = []

    private var waiting: [SweepItem] {
        items.filter { !kept.contains($0.id) && !resolved.contains($0.id) }
             .sorted { $0.daysSinceContact > $1.daysSinceContact }   // Most overdue first
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    if waiting.isEmpty {
                        Label("Nothing is waiting on a follow-up.", systemImage: "checkmark.circle")
                            .foregroundStyle(.secondary)
                    } else {
                        ForEach(waiting) { item in row(item) }
                    }
                } header: {
                    Text("Waiting to hear back")
                } footer: {
                    Text("Following up resets the 14-day clock.")
                }
            }
            .navigationTitle("Weekly Review")
            .toolbar {
                ToolbarItem(placement: .confirmationAction) { Button("Done") { dismiss() } }
            }
        }
    }

    private func row(_ item: SweepItem) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(alignment: .firstTextBaseline) {
                VStack(alignment: .leading, spacing: 2) {
                    Text(item.title).font(.body.weight(.medium))
                    Text(item.subtitle).font(.caption).foregroundStyle(.secondary)
                }
                Spacer()
                Label("\\(item.daysSinceContact)d", systemImage: "clock.badge.exclamationmark")
                    .font(.caption).foregroundStyle(.orange)
                    .accessibilityLabel("\\(item.daysSinceContact) days since last contact")
            }
            HStack(spacing: 8) {
                Button("Followed up") { withAnimation { resolved.insert(item.id); onFollowUp(item) } }
                    .buttonStyle(.borderedProminent)
                Button("Ghosted") { withAnimation { resolved.insert(item.id); onClose(item) } }
                    .buttonStyle(.bordered)
                Button("Keep waiting") { withAnimation { _ = kept.insert(item.id) } }
                    .buttonStyle(.borderless)
            }
            .font(.caption)
            .controlSize(.small)
        }
        .padding(.vertical, 4)
    }
}`,
  },
};

export default function ReviewSweepPage() {
  const [kept, setKept] = useState<Set<string>>(new Set());
  const [resolved, setResolved] = useState<Record<string, string>>({});
  const waiting = ITEMS.filter((i) => !kept.has(i.id) && !resolved[i.id]);
  const tally = Object.values(resolved);

  return (
    <div>
      <PageHeader
        title="Review Sweep"
        badge="New"
        description="A short, guided pass through everything that needs a decision — overdue follow-ups, stale items, upcoming deadlines — where every row resolves with one tap. Turns passive alerts into a recurring habit that keeps the underlying data honest."
      />
      <SourceNote sources={[{ app: "JobFlo", file: "Shared/Views/WeeklyReviewSheet.swift" }]} />

      <PreviewSection>
        <div className="mx-auto max-w-sm rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[17px] font-semibold text-[rgb(var(--text-primary))]">Weekly Review</p>
            <button
              onClick={() => {
                setKept(new Set());
                setResolved({});
              }}
              className="text-[13px] font-semibold text-[rgb(var(--accent-text))]"
            >
              {waiting.length === 0 ? "Done" : "Reset"}
            </button>
          </div>

          <div className="mb-5 mt-3">
            <div className="mb-1.5 flex justify-between text-[14px] text-[rgb(var(--text-primary))]">
              <span>Applications this week</span>
              <span className="tabular-nums">3 / 5</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[rgb(var(--progress-track))]">
              <div className="h-full w-3/5 rounded-full bg-[rgb(var(--accent))]" />
            </div>
          </div>

          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
            Waiting to hear back
          </p>
          {waiting.length === 0 ? (
            <p role="status" className="py-4 text-[14px] text-[rgb(var(--text-secondary))]">
              ✓ Nothing is waiting on a follow-up.
              {tally.length > 0 && (
                <span className="mt-1 block text-[12px] text-[rgb(var(--text-tertiary))]">
                  {tally.filter((t) => t === "followed").length} followed up · {tally.filter((t) => t === "ghosted").length} ghosted ·{" "}
                  {kept.size} kept
                </span>
              )}
            </p>
          ) : (
            <ul className="divide-y divide-[rgb(var(--border-subtle))]">
              {waiting.map((item) => (
                <li key={item.id} className="py-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-[15px] font-medium text-[rgb(var(--text-primary))]">{item.title}</p>
                      <p className="text-[12px] text-[rgb(var(--text-secondary))]">{item.subtitle}</p>
                    </div>
                    <span
                      className="text-[12px] tabular-nums text-[rgb(var(--status-caution-text))]"
                      aria-label={`${item.days} days since last contact`}
                    >
                      ⏱ {item.days}d
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => setResolved((r) => ({ ...r, [item.id]: "followed" }))}
                      className="rounded-full bg-[rgb(var(--accent))] px-3 py-1.5 text-[12px] font-semibold text-[rgb(var(--on-accent))]"
                    >
                      Followed up
                    </button>
                    <button
                      onClick={() => setResolved((r) => ({ ...r, [item.id]: "ghosted" }))}
                      className="rounded-full bg-[rgb(var(--surface-raised))] px-3 py-1.5 text-[12px] font-semibold text-[rgb(var(--text-primary))]"
                    >
                      Ghosted
                    </button>
                    <button
                      onClick={() => setKept((s) => new Set(s).add(item.id))}
                      className="px-2 py-1.5 text-[12px] font-semibold text-[rgb(var(--accent-text))]"
                    >
                      Keep waiting
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-2 text-[11px] text-[rgb(var(--text-tertiary))]">
            Following up resets the 14-day clock. Ghosted moves the job out of your active pipeline.
          </p>
        </div>
      </PreviewSection>

      <DocSection title="Anatomy">
        <DocTable
          headers={["Part", "Purpose"]}
          rows={[
            ["Goal row", "Optional. A single progress line for the habit the review supports (“Applications this week 3 / 5”). Gives the session a positive frame before the overdue list."],
            ["Waiting list", "Items past a threshold, most overdue first. Each shows its age as a compact badge (“46d”) in the caution color — age is the reason it's here."],
            ["Three actions", "Resolve (primary, accent), Close (secondary), Defer (borderless). Deferring hides the row for this review only; it reappears next time. No row has zero actions."],
            ["Footer", "One sentence explaining what each action does to the data (“resets the 14-day clock”), so the consequence is never a surprise."],
            ["Upcoming section", "Optional. Read-only list of things coming up (interviews in the next 7 days) for context, with no actions."],
            ["Empty state", "“Nothing is waiting on a follow-up.” plus a tally of what was done this session. The empty state is the reward."],
          ]}
        />
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "Recurring maintenance", body: "Anything that silently goes stale without a human decision: follow-ups, overdue tasks, unreconciled transactions, items in “needs review”.", good: true },
            { heading: "Free on every tier", body: "The sweep only edits the user's own data and is the habit that brings people back. Gating it behind a paywall degrades data quality for everyone.", good: true },
            { heading: "Long or unbounded lists", body: "A sweep should finish in a minute or two. If there are 200 items, offer bulk actions (Multi-select) first, then sweep what remains.", good: false },
            { heading: "Decisions that need research", body: "If resolving a row requires opening other screens, the sweep breaks. Keep each decision answerable from the row alone.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "The age badge needs a spoken label (“46 days since last contact”), not just “46d” and an icon.",
            "When a row resolves and disappears, move focus to the next row's first action, or to the empty-state message if none remain — otherwise focus is lost to the top of the page.",
            "Announce the empty state with role=\"status\" so screen reader users learn the sweep is complete.",
            "Keep the three actions' order and labels identical on every row, so keyboard and switch users can build a rhythm.",
          ]}
        />
      </DocSection>
    </div>
  );
}
