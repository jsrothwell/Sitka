"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ArrowList, DocSection, DocTable, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

const KINDS = [
  { id: "police", label: "Police", glyph: "🚓", token: "--accent" },
  { id: "accident", label: "Accident", glyph: "💥", token: "--status-danger" },
  { id: "jam", label: "Jam", glyph: "🚗", token: "--status-caution" },
  { id: "hazard", label: "Hazard", glyph: "⚠️", token: "--status-warning" },
  { id: "closure", label: "Closure", glyph: "⛔", token: "--status-danger" },
  { id: "camera", label: "Camera", glyph: "📷", token: "--text-secondary" },
] as const;

type Stage = "idle" | "picking" | "confirm" | "thanks";

const CODE = {
  react: {
    filename: "ReportPicker.tsx",
    code: `interface ReportKind { id: string; label: string; icon: React.ReactNode; token: string }

// Big, glanceable targets: this gets used at a red light.
export function ReportPicker({ kinds, onPick }: { kinds: ReportKind[]; onPick: (k: ReportKind) => void }) {
  return (
    <div className="flex flex-col gap-4 p-5">
      <h2 className="text-[20px] font-bold">What do you see?</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3">
        {kinds.map((k) => (
          <button key={k.id} onClick={() => onPick(k)}
                  className="flex flex-col items-center gap-2 rounded-2xl py-2 focus-visible:ring-2">
            <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full text-white text-2xl"
                  style={{ background: \`rgb(var(\${k.token}))\` }} aria-hidden>
              {k.icon}
            </span>
            <span className="text-[13px] font-semibold">{k.label}</span>
          </button>
        ))}
      </div>
      <p className="text-[12px] text-[rgb(var(--text-secondary))]">
        Reports are shared with other drivers and fade on their own.
      </p>
    </div>
  );
}

// Shown as you pass an existing report. One question, two answers, no typing.
export function ConfirmReportCard({ kind, onVote }: { kind: ReportKind; onVote: (stillThere: boolean) => void }) {
  return (
    <div role="group" aria-label={\`\${kind.label} still there?\`}
         className="flex items-center gap-2.5 rounded-[18px] bg-[rgb(var(--surface-glass))] backdrop-blur-xl p-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full text-white"
            style={{ background: \`rgb(var(\${kind.token}))\` }} aria-hidden>{kind.icon}</span>
      <span className="flex-1 text-[15px] font-semibold">{kind.label} still there?</span>
      <button onClick={() => onVote(true)}  className="min-h-11 rounded-full px-4 font-semibold text-white"
              style={{ background: \`rgb(var(\${kind.token}))\` }}>Yes</button>
      <button onClick={() => onVote(false)} className="min-h-11 rounded-full px-4 font-semibold bg-[rgb(var(--surface-raised))]">No</button>
    </div>
  );
}`,
  },
  html: {
    filename: "confirm-report.html",
    code: `<div class="confirm" role="group" aria-label="Accident still there?">
  <span class="confirm__icon" aria-hidden="true">💥</span>
  <span class="confirm__q">Accident still there?</span>
  <button class="confirm__yes">Yes</button>
  <button class="confirm__no">No</button>
</div>

<style>
.confirm {
  --kind: var(--status-danger);
  display: flex; align-items: center; gap: 10px; padding: 12px;
  border-radius: 18px; background: rgb(var(--surface-glass));
  backdrop-filter: blur(24px) saturate(180%);
}
.confirm__icon { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; background: rgb(var(--kind)); }
.confirm__q   { flex: 1; font-size: 15px; font-weight: 600; }
.confirm button { min-height: 44px; padding: 0 16px; border-radius: 999px; font-weight: 600; }
.confirm__yes { background: rgb(var(--kind)); color: #fff; }
.confirm__no  { background: rgb(var(--surface-raised)); color: rgb(var(--text-primary)); }
</style>`,
  },
  swift: {
    filename: "CommunityReports.swift",
    code: `import SwiftUI

/// Big, glanceable targets: this gets used at a red light.
struct ReportPicker: View {
    let kinds: [ReportKind]
    var onPick: (ReportKind) -> Void
    @Environment(\\.dismiss) private var dismiss

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("What do you see?").font(.title3.weight(.bold))
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 96), spacing: 12)], spacing: 12) {
                ForEach(kinds) { kind in
                    Button {
                        onPick(kind)
                        dismiss()               // One tap commits — no confirm step.
                    } label: {
                        VStack(spacing: 8) {
                            Image(systemName: kind.symbol)
                                .font(.title)
                                .foregroundStyle(.white)
                                .frame(width: 60, height: 60)
                                .background(kind.color, in: Circle())
                            Text(kind.label).font(.footnote.weight(.semibold))
                        }
                        .frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.plain)
                }
            }
            Text("Reports are shared with other drivers and fade on their own.")
                .font(.caption).foregroundStyle(.secondary)
        }
        .padding(20)
        .presentationDetents([.medium])
    }
}

/// Shown as you pass a report: one question, two answers.
struct ConfirmReportCard: View {
    let report: RoadReport
    var onVote: (Bool) -> Void

    var body: some View {
        HStack(spacing: 10) {
            Image(systemName: report.kind.symbol)
                .foregroundStyle(.white)
                .frame(width: 32, height: 32)
                .background(report.kind.color, in: Circle())
            Text("\\(report.kind.label) still there?")
                .font(.subheadline.weight(.semibold))
            Spacer(minLength: 0)
            Button("Yes") { onVote(true) }
                .buttonStyle(.borderedProminent)
                .tint(report.kind.color)
            Button("No") { onVote(false) }
                .buttonStyle(.bordered)
        }
        .padding(12)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
        .sensoryFeedback(.success, trigger: report.confirmations)
    }
}`,
  },
};

export default function CommunityReportsPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [picked, setPicked] = useState<(typeof KINDS)[number]>(KINDS[1]);

  return (
    <div>
      <PageHeader
        title="Community Report & Confirm"
        badge="New"
        description="A two-part loop for crowdsourced data: a one-tap report picker sized for glanceable use, and a 'still there?' confirmation card that asks the next person to verify. Together they keep shared reports fresh without anyone typing."
      />
      <SourceNote
        sources={[
          { app: "Get Parked", file: "Views/TrafficViews.swift" },
          { app: "Get Parked", file: "Views/SegmentDetailView.swift" },
        ]}
      />

      <PreviewSection>
        <div className="mx-auto max-w-sm">
          {stage === "idle" && (
            <div className="flex flex-col items-end gap-3">
              <p className="self-start text-[13px] text-[rgb(var(--text-secondary))]">
                A floating report button sits over the map at all times.
              </p>
              <button
                onClick={() => setStage("picking")}
                aria-label="Report something on the road"
                className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[rgb(var(--status-caution))] text-2xl text-white shadow-lg"
              >
                💬
              </button>
            </div>
          )}

          {stage === "picking" && (
            <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5">
              <p className="mb-4 text-[20px] font-bold text-[rgb(var(--text-primary))]">What do you see?</p>
              <div className="grid grid-cols-3 gap-3">
                {KINDS.map((k) => (
                  <button
                    key={k.id}
                    onClick={() => {
                      setPicked(k);
                      setStage("confirm");
                    }}
                    className="flex flex-col items-center gap-2 rounded-xl py-1.5 hover:bg-[rgb(var(--surface-hover))]"
                  >
                    <span
                      className="flex h-[60px] w-[60px] items-center justify-center rounded-full text-[26px]"
                      style={{ background: `rgb(var(${k.token}))` }}
                      aria-hidden
                    >
                      {k.glyph}
                    </span>
                    <span className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{k.label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[12px] text-[rgb(var(--text-secondary))]">
                Reports are shared with other drivers and fade on their own.
              </p>
            </div>
          )}

          {stage === "confirm" && (
            <div>
              <p className="mb-3 text-[13px] text-[rgb(var(--text-secondary))]">
                Later, another driver passes the report:
              </p>
              <div className="flex items-center gap-2.5 rounded-[18px] border border-[rgb(var(--border))] bg-[rgb(var(--surface-glass))] p-3 backdrop-blur-xl">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `rgb(var(${picked.token}))` }}
                  aria-hidden
                >
                  {picked.glyph}
                </span>
                <span className="flex-1 text-[15px] font-semibold text-[rgb(var(--text-primary))]">
                  {picked.label} still there?
                </span>
                <button
                  onClick={() => setStage("thanks")}
                  className="min-h-11 rounded-full px-4 text-[14px] font-semibold text-white"
                  style={{ background: `rgb(var(${picked.token}))` }}
                >
                  Yes
                </button>
                <button
                  onClick={() => setStage("thanks")}
                  className="min-h-11 rounded-full bg-[rgb(var(--surface-raised))] px-4 text-[14px] font-semibold text-[rgb(var(--text-primary))]"
                >
                  No
                </button>
              </div>
            </div>
          )}

          {stage === "thanks" && (
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <p className="text-[14px] font-medium text-[rgb(var(--status-success-text))]">✓ Thanks for confirming</p>
              <p className="mt-1 text-[12px] text-[rgb(var(--text-secondary))]">Reported 6 min ago · confirmed 3×</p>
            </div>
          )}

          {stage !== "idle" && (
            <button
              onClick={() => setStage("idle")}
              className="mt-4 text-[12px] text-[rgb(var(--text-tertiary))] underline underline-offset-2"
            >
              Reset demo
            </button>
          )}
        </div>
      </PreviewSection>

      <DocSection title="Anatomy" intro="Three surfaces share one color per report kind, so a report reads the same on the map, in the picker, and in the confirm card.">
        <DocTable
          headers={["Surface", "Purpose"]}
          rows={[
            ["Report button", "54pt floating circle over the map, always reachable. Accessible label states the action, not the icon (“Report something on the road”)."],
            ["Report picker", "Half-height sheet with an adaptive grid of 60pt icon circles (min 96pt column). A tap commits and dismisses — no second confirm step. A footer line says reports are public and temporary."],
            ["Confirm card", "Glass card that appears when you pass a report: kind icon, “Accident still there?”, and Yes / No. Yes is tinted with the kind's color; No is neutral."],
            ["Detail sheet", "Tapping a report on the map shows kind, age, confirmation count and source (“Reported 6 min ago · confirmed 3× · via provider”), with the same vote buttons until the user has voted."],
          ]}
        />
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "Shared, perishable observations", body: "Road hazards, store stock, queue lengths, venue noise — things many people can see and that change within hours.", good: true },
            { heading: "Glance-and-go contexts", body: "Driving, walking, or one-handed use. Every input is a single large tap; nothing requires reading more than one line.", good: true },
            { heading: "Asking while someone is moving fast", body: "Don't push the confirm card during active guidance maneuvers. Show it on straightaways or at stops, and let it time out silently.", good: false },
            { heading: "Free-text reports", body: "A text field turns a 1-second action into a 20-second one and invites abuse. If you need detail, offer fixed kinds plus an optional follow-up later.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "Each picker tile's accessible name is its label (“Accident”); the icon circle is decorative. Kind colors repeat across categories, so never rely on color to identify a kind.",
            "Give the confirm card role=\"group\" with the question as its label so screen readers announce the question before the Yes / No buttons.",
            "Keep buttons at 44pt minimum even inside the compact card — the original design uses bordered system buttons, which already meet this.",
            "Pair a successful vote with a haptic (.sensoryFeedback(.success)) and a persistent “Thanks for confirming” label, so the result is perceivable without looking back at the screen.",
            "If the confirm card auto-dismisses, give it at least 8 seconds and pause the timer while VoiceOver focus is inside it.",
          ]}
        />
      </DocSection>
    </div>
  );
}
