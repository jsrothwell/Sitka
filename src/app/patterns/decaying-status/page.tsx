"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ArrowList, DocSection, DocTable, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

/**
 * Tiers map onto Sitka's status tokens rather than Get Parked's raw hex
 * (#D32F2F / #F57C00 / #FBC02D / #388E3C), which predate the token set.
 */
const TIERS = [
  { id: "high", label: "Taken", until: 20, token: "--status-danger" },
  { id: "medium", label: "Probably taken", until: 45, token: "--status-caution" },
  { id: "low", label: "Possibly free", until: 60, token: "--status-warning" },
  { id: "free", label: "Free", until: Infinity, token: "--status-success" },
] as const;

const WINDOW_MIN = 60;

function evaluate(ageMin: number) {
  if (ageMin >= WINDOW_MIN) return { tier: TIERS[3], score: 0, remaining: 0 };
  const tier = TIERS.find((t) => ageMin < t.until)!;
  return { tier, score: 1 - ageMin / WINDOW_MIN, remaining: Math.ceil(WINDOW_MIN - ageMin) };
}

const CODE = {
  react: {
    filename: "DecayingStatus.tsx",
    code: `// Pure function — mirror it exactly on the server so colors agree on every client.
const WINDOW_MIN = 60;
const TIERS = [
  { label: "Taken",          until: 20,       token: "--status-danger"  },
  { label: "Probably taken", until: 45,       token: "--status-caution" },
  { label: "Possibly free",  until: 60,       token: "--status-warning" },
  { label: "Free",           until: Infinity, token: "--status-success" },
];

export function evaluateDecay(reportedAt: Date | null, now = new Date()) {
  if (!reportedAt) return { tier: TIERS[3], score: 0, remainingMin: 0 };
  const ageMin = Math.max(0, (now.getTime() - reportedAt.getTime()) / 60_000);
  if (ageMin >= WINDOW_MIN) return { tier: TIERS[3], score: 0, remainingMin: 0 };
  return {
    tier: TIERS.find((t) => ageMin < t.until)!,
    score: 1 - ageMin / WINDOW_MIN,          // 1 = just reported, 0 = expired
    remainingMin: Math.ceil(WINDOW_MIN - ageMin),
    ageMin: Math.round(ageMin),
  };
}

export function DecayingStatus({ reportedAt }: { reportedAt: Date | null }) {
  const { tier, score, remainingMin, ageMin } = evaluateDecay(reportedAt);
  const color = \`rgb(var(\${tier.token}))\`;
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full" style={{ background: color }} aria-hidden />
        <span className="text-[17px] font-semibold">{tier.label}</span>
      </div>
      <div
        role="meter" aria-label="Report confidence"
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(score * 100)}
        className="h-1.5 rounded-full bg-[rgb(var(--progress-track))] overflow-hidden"
      >
        <div className="h-full rounded-full transition-[width] duration-700"
             style={{ width: \`\${score * 100}%\`, background: color }} />
      </div>
      <p className="text-[13px] text-[rgb(var(--text-secondary))]">
        {reportedAt && remainingMin > 0
          ? \`Reported taken \${ageMin} min ago. Shows as free in \${remainingMin} min.\`
          : "No reports in the last hour. Assumed free."}
      </p>
    </div>
  );
}`,
  },
  html: {
    filename: "decaying-status.html",
    code: `<div class="decay" data-tier="medium">
  <div class="decay__head">
    <span class="decay__dot" aria-hidden="true"></span>
    <span class="decay__label">Probably taken</span>
  </div>
  <div class="decay__track" role="meter" aria-label="Report confidence"
       aria-valuemin="0" aria-valuemax="100" aria-valuenow="42">
    <div class="decay__fill" style="width: 42%"></div>
  </div>
  <p class="decay__detail">Reported taken 35 min ago. Shows as free in 25 min.</p>
</div>

<style>
.decay { --tier: var(--status-success); display: grid; gap: 10px; }
.decay[data-tier="high"]   { --tier: var(--status-danger); }
.decay[data-tier="medium"] { --tier: var(--status-caution); }
.decay[data-tier="low"]    { --tier: var(--status-warning); }
.decay__head  { display: flex; align-items: center; gap: 8px; }
.decay__dot   { width: 12px; height: 12px; border-radius: 50%; background: rgb(var(--tier)); }
.decay__label { font-size: 17px; font-weight: 600; }
.decay__track { height: 6px; border-radius: 999px; background: rgb(var(--progress-track)); overflow: hidden; }
.decay__fill  { height: 100%; border-radius: inherit; background: rgb(var(--tier)); transition: width .7s; }
.decay__detail { font-size: 13px; color: rgb(var(--text-secondary)); }
</style>`,
  },
  swift: {
    filename: "DecayEngine.swift",
    code: `import SwiftUI

/// Client-side mirror of the server's decay function, so colors keep fading
/// on device between refreshes. A shared fixture test keeps the two in sync.
enum DecayEngine {
    static let window: TimeInterval = 3600
    static let highUntil: TimeInterval = 20 * 60
    static let mediumUntil: TimeInterval = 45 * 60

    enum Tier: CaseIterable { case taken, probablyTaken, possiblyFree, free }

    static func tier(age: TimeInterval?) -> Tier {
        guard let age else { return .free }
        switch age {
        case ..<highUntil: return .taken
        case ..<mediumUntil: return .probablyTaken
        case ..<window: return .possiblyFree
        default: return .free
        }
    }

    /// 1.0 = just reported, 0.0 = expired.
    static func score(age: TimeInterval?) -> Double {
        guard let age else { return 0 }
        return min(1, max(0, 1 - age / window))
    }
}

struct DecayingStatusView: View {
    let reportedAt: Date?

    var body: some View {
        // Re-evaluate every 30s so the bar fades without a network round-trip.
        TimelineView(.periodic(from: .now, by: 30)) { context in
            let age = reportedAt.map { context.date.timeIntervalSince($0) }
            let tier = DecayEngine.tier(age: age)
            let score = DecayEngine.score(age: age)

            VStack(alignment: .leading, spacing: 10) {
                HStack {
                    Circle().fill(tier.color).frame(width: 12, height: 12)
                    Text(tier.label).font(.title3.weight(.semibold))
                }
                ProgressView(value: score)
                    .tint(tier.color)
                    .accessibilityLabel("Report confidence")
                    .accessibilityValue("\\(Int(score * 100)) percent")
                Text(detail(age: age))
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }
        }
    }

    private func detail(age: TimeInterval?) -> String {
        guard let age, age < DecayEngine.window else {
            return "No reports in the last hour. Assumed free."
        }
        let remaining = Int(((DecayEngine.window - age) / 60).rounded(.up))
        return "Reported taken \\(Int(age / 60)) min ago. Shows as free in \\(remaining) min."
    }
}`,
  },
};

export default function DecayingStatusPage() {
  const [age, setAge] = useState(12);
  const { tier, score, remaining } = evaluate(age);
  const color = `rgb(var(${tier.token}))`;

  return (
    <div>
      <PageHeader
        title="Decaying Status"
        badge="New"
        description="A status that loses confidence over time instead of flipping instantly. Built for crowdsourced or sensor signals that go stale — a reported-taken parking block, a 'still in stock' report, a last-seen presence dot — where showing old data at full strength would mislead."
      />
      <SourceNote
        sources={[
          { app: "Get Parked", file: "Services/DecayEngine.swift" },
          { app: "Get Parked", file: "Views/SegmentDetailView.swift" },
        ]}
      />

      <PreviewSection>
        <div className="mx-auto max-w-sm rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: color }} aria-hidden />
              <span className="text-[17px] font-semibold text-[rgb(var(--text-primary))]">{tier.label}</span>
            </div>
            <span className="text-[12px] text-[rgb(var(--text-tertiary))]">Mission St</span>
          </div>
          <div
            role="meter"
            aria-label="Report confidence"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(score * 100)}
            className="h-1.5 rounded-full bg-[rgb(var(--progress-track))] overflow-hidden mb-2.5"
          >
            <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${score * 100}%`, background: color }} />
          </div>
          <p className="text-[13px] text-[rgb(var(--text-secondary))]">
            {remaining > 0
              ? `Reported taken ${age} min ago. Shows as free in ${remaining} min.`
              : "No reports in the last hour. Parking is assumed free."}
          </p>

          {/* Legend: always visible on the map, so tiers are learnable */}
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 rounded-lg bg-[rgb(var(--surface-raised))] px-3 py-2">
            {TIERS.map((t) => (
              <span key={t.id} className="flex items-center gap-1.5 text-[11px] text-[rgb(var(--text-secondary))]">
                <span className="h-[5px] w-3.5 rounded-full" style={{ background: `rgb(var(${t.token}))` }} />
                {t.label}
              </span>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-5 max-w-sm">
          <label className="flex items-center gap-3 text-[12px] text-[rgb(var(--text-secondary))]">
            Report age
            <input type="range" min={0} max={70} value={age} onChange={(e) => setAge(Number(e.target.value))} className="flex-1" />
            <span className="w-12 text-right tabular-nums">{age} min</span>
          </label>
        </div>
      </PreviewSection>

      <DocSection
        title="Decay model"
        intro="Two values come from one timestamp: a continuous score that drives the bar, and a discrete tier that drives color and copy. Tiers make the map scannable; the score shows motion within a tier."
      >
        <DocTable
          headers={["Age", "Tier", "Token", "Copy"]}
          rows={[
            ["0–20 min", "Taken", <code key="a">--status-danger</code>, "“Reported taken 4 min ago.”"],
            ["20–45 min", "Probably taken", <code key="b">--status-caution</code>, "“Shows as free in 22 min.”"],
            ["45–60 min", "Possibly free", <code key="c">--status-warning</code>, "“Shows as free in 6 min.”"],
            ["≥ 60 min / none", "Free", <code key="d">--status-success</code>, "“No reports in the last hour.”"],
          ]}
        />
        <p className="mt-4 text-[13px] text-[rgb(var(--text-secondary))]">
          A positive report (“has space”) clears the signal immediately rather than decaying — only negative
          reports fade. Thresholds are product decisions; keep them in one function and mirror it exactly on server
          and client, with a fixture test asserting both agree.
        </p>
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "Signals with a shelf life", body: "Crowdsourced reports, last-known locations, cached availability — anything where a 50-minute-old value is genuinely less trustworthy than a 2-minute-old one.", good: true },
            { heading: "Tell people when it will change", body: "Always say when the state flips (“free in 6 min”). A fading color without a countdown leaves people guessing whether to trust it.", good: true },
            { heading: "Authoritative state", body: "If the source of truth is a booking system or a sensor that reports continuously, show its state directly — decaying it invents uncertainty that doesn't exist.", good: false },
            { heading: "Fading to invisible", body: "Never animate opacity toward zero as confidence drops. Low-confidence items still need legible text; decay the meter and tier, not the content's contrast.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "Tier is carried by the label text (“Probably taken”), never by color alone — the four status hues are not reliably distinguishable under deuteranopia.",
            "Expose the score as a meter (role=\"meter\" / ProgressView with accessibilityValue) with a label naming what it measures: “Report confidence, 42 percent”.",
            "Re-evaluating on a timer must not announce. Don't put the countdown in an aria-live region; it would speak every 30 seconds.",
            "Keep a visible legend wherever tiers are shown as map strokes or chips, so the color ramp is learnable without opening a detail sheet.",
          ]}
        />
      </DocSection>
    </div>
  );
}
