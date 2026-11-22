"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ArrowList, DocSection, DocTable, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

// Sitka categorical tokens — hues kept clear of the status colors, so a client never reads as a warning.
const SEGMENTS = ["var(--categorical-5)", "var(--categorical-7)", "var(--categorical-6)", "var(--categorical-3)"];

const BASE = [
  { client: "Northwind Robotics", role: "Fractional CPO", hours: 12, endsIn: 20 },
  { client: "Lumen Health", role: "Design Advisor", hours: 8, endsIn: 50 },
  { client: "Harbor & Pine", role: "Head of Design", hours: 4, endsIn: null as number | null },
];

/** Status tokens are fills; text and icons use the matching -text tone (accent and neutrals have none). */
const textTone = (token: string) => (token.startsWith("--status-") ? `${token}-text` : token);

function status(u: number) {
  if (u > 1.0001) return { label: "Burnout Risk", token: "--status-danger", guidance: "Booked beyond your target. Renegotiate scope or pause new deals." };
  if (u >= 0.85) return { label: "Near Capacity", token: "--status-caution", guidance: "Close to your ceiling. Be selective with new commitments." };
  if (u >= 0.6) return { label: "Balanced", token: "--status-success", guidance: "Healthy load with room for strategic thinking." };
  return { label: "Unallocated", token: "--accent", guidance: "Plenty of open bandwidth — a good time to work the pipeline." };
}

const WINDOWS = [
  { title: "Next 30 days", min: -Infinity, max: 30, token: "--status-danger" },
  { title: "31–60 days", min: 31, max: 60, token: "--status-caution" },
  { title: "61–90 days", min: 61, max: 90, token: "--status-warning" },
];

const CODE = {
  react: {
    filename: "CapacityOverview.tsx",
    code: `export function BandwidthGauge({ allocated, target }: { allocated: number; target: number }) {
  const u = target > 0 ? allocated / target : Infinity;
  const s = capacityStatus(u);
  const r = 70, c = 2 * Math.PI * r;
  const fill = Math.min(u, 1);
  const overflow = Number.isFinite(u) ? Math.min(Math.max(u - 1, 0), 1) : 1;

  return (
    <div role="meter" aria-label="Weekly bandwidth" aria-valuenow={allocated} aria-valuemax={target}
         aria-valuetext={\`\${allocated} of \${target} hours booked, \${s.label}\`} className="relative h-[168px] w-[168px]">
      <svg viewBox="0 0 168 168" className="-rotate-90">
        <circle cx="84" cy="84" r={r} fill="none" strokeWidth="16" stroke="rgb(var(--accent) / .22)" />
        <circle cx="84" cy="84" r={r} fill="none" strokeWidth="16" strokeLinecap="round"
                stroke={\`rgb(var(\${s.token}))\`} strokeDasharray={\`\${fill * c} \${c}\`} />
        {/* Over 100%: a thinner inner ring shows by how much, instead of the main ring lapping itself */}
        {overflow > 0 && <circle cx="84" cy="84" r={r - 18} fill="none" strokeWidth="7" strokeLinecap="round"
                stroke="rgb(var(--status-danger) / .55)" strokeDasharray={\`\${overflow * 2 * Math.PI * (r - 18)} 999\`} />}
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="text-[40px] font-bold tabular-nums leading-none">{allocated}</span>
        <span className="text-[12px] text-[rgb(var(--text-secondary))]">of {target} hrs/wk</span>
      </div>
    </div>
  );
}

/** Stacked bar scaled to max(target, allocated); a 2px marker shows where the target sits when over. */
export function AllocationBar({ allocations, target }: { allocations: { hours: number }[]; target: number }) {
  const total = allocations.reduce((n, a) => n + a.hours, 0);
  const scale = Math.max(target, total, 1);
  return (
    <div className="relative flex h-[22px] gap-0.5 overflow-hidden rounded-md" aria-hidden>
      {allocations.map((a, i) => <div key={i} style={{ width: \`\${(a.hours / scale) * 100}%\`, background: \`rgb(\${SEGMENT[i % SEGMENT.length]})\` }} />)}
      {total < target && <div style={{ width: \`\${((target - total) / scale) * 100}%\` }} className="bg-[rgb(var(--accent)/.35)]" />}
      {total > target && <div className="absolute inset-y-0 w-0.5 bg-[rgb(var(--status-danger))]" style={{ left: \`\${(target / scale) * 100}%\` }} />}
    </div>
  );
}`,
  },
  html: {
    filename: "runway-strip.html",
    code: `<section class="runway" aria-labelledby="runway-title">
  <h3 id="runway-title">Runway</h3>
  <div class="runway__tiles">
    <div class="runway__tile" style="--t: var(--status-danger)">
      <p class="runway__window">Next 30 days</p>
      <p class="runway__delta">−12 hrs/wk</p>
      <p class="runway__item">Northwind Robotics <span>Dec 10</span></p>
      <p class="runway__after">Booked after: 12 / 30</p>
    </div>
    <div class="runway__tile runway__tile--clear">
      <p class="runway__window">61–90 days</p>
      <p>No contracts ending</p>
    </div>
  </div>
</section>

<style>
.runway__tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
.runway__tile { padding: 12px; border-radius: 10px; background: rgb(var(--t) / .1); }
.runway__tile--clear { --t: var(--text-secondary); background: rgb(var(--t) / .06); }
.runway__window { font-size: 12px; font-weight: 600; color: rgb(var(--text-secondary)); }
.runway__delta { font-size: 20px; font-weight: 600; font-variant-numeric: tabular-nums; color: rgb(var(--t)); }
.runway__item { display: flex; justify-content: space-between; font-size: 12px; }
.runway__after { font-size: 11px; color: rgb(var(--text-secondary)); font-variant-numeric: tabular-nums; }
</style>`,
  },
  swift: {
    filename: "BandwidthGauge.swift",
    code: `import SwiftUI

enum CapacityStatus {
    case unallocated, balanced, nearCapacity, overAllocated

    init(utilization u: Double) {
        switch u {
        case let u where u > 1.0001: self = .overAllocated
        case 0.85...:                self = .nearCapacity
        case 0.6...:                 self = .balanced
        default:                     self = .unallocated
        }
    }

    /// Fill color for rings and bars.
    var color: Color { ... }
    /// Deeper tone for status *text* on plain backgrounds — yellow and light blue fail on white.
    var textColor: Color { ... }
}

struct BandwidthGauge: View {
    let allocated: Double
    let target: Double
    var lineWidth: CGFloat = 16

    private var utilization: Double { target > 0 ? allocated / target : .infinity }

    var body: some View {
        let status = CapacityStatus(utilization: utilization)
        let fill = min(utilization, 1)
        let overflow = utilization.isFinite ? min(max(utilization - 1, 0), 1) : 1

        ZStack {
            Circle().stroke(Color.accentColor.opacity(0.22), lineWidth: lineWidth)
            Circle()
                .trim(from: 0, to: fill)
                .stroke(status.color.gradient, style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
                .rotationEffect(.degrees(-90))
            if overflow > 0 {
                Circle()
                    .trim(from: 0, to: overflow)
                    .stroke(Color.red.opacity(0.55), style: StrokeStyle(lineWidth: lineWidth * 0.45, lineCap: .round))
                    .rotationEffect(.degrees(-90))
                    .padding(lineWidth * 1.1)
            }
            VStack(spacing: 0) {
                Text(allocated, format: .number.precision(.fractionLength(0...1)))
                    .font(.system(size: 40, weight: .bold, design: .rounded).monospacedDigit())
                    .contentTransition(.numericText())
                Text("of \\(Int(target)) hrs/wk").font(.caption).foregroundStyle(.secondary)
            }
        }
        .animation(.smooth, value: allocated)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Weekly bandwidth")
        .accessibilityValue("\\(Int(allocated)) of \\(Int(target)) hours booked")
    }
}`,
  },
};

export default function CapacityRunwayPage() {
  const [extra, setExtra] = useState(0);
  const target = 30;
  const allocations = [...BASE, ...(extra > 0 ? [{ client: "Atlas", role: "Interim CTO", hours: extra, endsIn: 75 }] : [])];
  const allocated = allocations.reduce((n, a) => n + a.hours, 0);
  const u = allocated / target;
  const s = status(u);
  const scale = Math.max(target, allocated, 1);
  const r = 70;
  const c = 2 * Math.PI * r;
  const ri = r - 18;
  const overflow = Math.min(Math.max(u - 1, 0), 1);

  return (
    <div>
      <PageHeader
        title="Capacity & Runway"
        badge="New"
        description="A personal bandwidth control centre: a gauge of hours booked against a weekly target (with an overflow ring past 100%), a stacked bar showing who the week belongs to, and 30/60/90-day runway tiles warning when contracts roll off. For freelancers, fractional executives, and anyone selling their own time."
      />
      <SourceNote
        sources={[
          { app: "Fractionflo", file: "Shared/Views/Capacity/CapacityOverviewCard.swift" },
          { app: "Fractionflo", file: "Shared/Services/CapacityEngine.swift" },
        ]}
      />

      <PreviewSection>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[15px] font-semibold text-[rgb(var(--text-primary))]">Weekly Bandwidth</span>
            <span
              className="rounded-full px-2.5 py-0.5 text-[12px] font-semibold"
              style={{ color: `rgb(var(${textTone(s.token)}))`, background: `rgb(var(${s.token}) / 0.12)` }}
            >
              {s.label}
            </span>
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex w-[200px] shrink-0 flex-col items-center gap-3">
              <div
                role="meter"
                aria-label="Weekly bandwidth"
                aria-valuemin={0}
                aria-valuemax={target}
                aria-valuenow={allocated}
                aria-valuetext={`${allocated} of ${target} hours booked, ${s.label}`}
                className="relative h-[168px] w-[168px]"
              >
                <svg viewBox="0 0 168 168" className="-rotate-90">
                  <circle cx="84" cy="84" r={r} fill="none" strokeWidth="16" stroke="rgb(var(--accent) / 0.22)" />
                  <circle
                    cx="84" cy="84" r={r} fill="none" strokeWidth="16" strokeLinecap="round"
                    stroke={`rgb(var(${s.token}))`}
                    strokeDasharray={`${Math.min(u, 1) * c} ${c}`}
                    style={{ transition: "stroke-dasharray .5s" }}
                  />
                  {overflow > 0 && (
                    <circle
                      cx="84" cy="84" r={ri} fill="none" strokeWidth="7" strokeLinecap="round"
                      stroke="rgb(var(--status-danger) / 0.55)"
                      strokeDasharray={`${overflow * 2 * Math.PI * ri} 999`}
                    />
                  )}
                </svg>
                <div className="absolute inset-0 grid place-content-center text-center">
                  <span className="text-[40px] font-bold leading-none tabular-nums text-[rgb(var(--text-primary))]">{allocated}</span>
                  <span className="text-[12px] text-[rgb(var(--text-secondary))]">of {target} hrs/wk</span>
                  <span className="mt-0.5 text-[12px] font-semibold tabular-nums" style={{ color: `rgb(var(${textTone(s.token)}))` }}>
                    {Math.round(u * 100)}%
                  </span>
                </div>
              </div>
              <p className="text-center text-[12px] text-[rgb(var(--text-secondary))]">{s.guidance}</p>
            </div>

            <div className="w-full min-w-0 flex-1">
              <div className="relative mb-4 flex h-[22px] gap-0.5 overflow-visible" aria-hidden>
                <div className="flex h-full w-full gap-0.5 overflow-hidden rounded-md">
                  {allocations.map((a, i) => (
                    <div key={a.client} style={{ width: `${(a.hours / scale) * 100}%`, background: `rgb(${SEGMENTS[i % SEGMENTS.length]})` }} />
                  ))}
                  {allocated < target && (
                    <div className="bg-[rgb(var(--accent)/0.35)]" style={{ width: `${((target - allocated) / scale) * 100}%` }} />
                  )}
                </div>
                {allocated > target && (
                  <div className="absolute -top-1 h-[30px] w-0.5 bg-[rgb(var(--status-danger))]" style={{ left: `${(target / scale) * 100}%` }} />
                )}
              </div>
              <ul className="space-y-2">
                {allocations.map((a, i) => (
                  <li key={a.client} className="flex items-center gap-2.5 text-[13px]">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: `rgb(${SEGMENTS[i % SEGMENTS.length]})` }} />
                    <span className="min-w-0 flex-1 truncate">
                      <span className="font-medium text-[rgb(var(--text-primary))]">{a.client}</span>{" "}
                      <span className="text-[rgb(var(--text-tertiary))]">{a.role}</span>
                    </span>
                    <span className="tabular-nums text-[rgb(var(--text-primary))]">{a.hours} hrs/wk</span>
                    <span className="w-10 text-right text-[12px] tabular-nums text-[rgb(var(--text-tertiary))]">
                      {Math.round((a.hours / target) * 100)}%
                    </span>
                  </li>
                ))}
                <li className="flex items-center gap-2.5 border-t border-[rgb(var(--border-subtle))] pt-2 text-[13px]">
                  <span
                    className="h-2.5 w-2.5 rounded-[3px]"
                    style={{ background: allocated > target ? "rgb(var(--status-danger))" : "rgb(var(--accent) / .35)" }}
                  />
                  <span className="flex-1 font-medium text-[rgb(var(--text-primary))]">{allocated > target ? "Over target" : "Available"}</span>
                  <span
                    className="font-semibold tabular-nums"
                    style={{ color: allocated > target ? "rgb(var(--status-danger-text))" : "rgb(var(--text-primary))" }}
                  >
                    {Math.abs(target - allocated)} hrs/wk
                  </span>
                  <span className="w-10" />
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 border-t border-[rgb(var(--border-subtle))] pt-4">
            <p className="mb-3 text-[13px] font-semibold text-[rgb(var(--text-primary))]">Runway</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {WINDOWS.map((w) => {
                const ending = allocations.filter((a) => a.endsIn !== null && a.endsIn >= w.min && a.endsIn <= w.max);
                const off = ending.reduce((n, a) => n + a.hours, 0);
                const clear = ending.length === 0;
                const tok = clear ? "--text-secondary" : w.token;
                const after = allocations.filter((a) => a.endsIn === null || a.endsIn > w.max).reduce((n, a) => n + a.hours, 0);
                return (
                  <div key={w.title} className="rounded-[10px] p-3" style={{ background: `rgb(var(${tok}) / ${clear ? 0.06 : 0.1})` }}>
                    <div className="mb-1.5 flex justify-between text-[12px] font-semibold text-[rgb(var(--text-secondary))]">
                      {w.title}
                      <span style={{ color: `rgb(var(${textTone(tok)}))` }} aria-hidden>{clear ? "✓" : "⚠"}</span>
                    </div>
                    {clear ? (
                      <p className="text-[13px] text-[rgb(var(--text-secondary))]">No contracts ending</p>
                    ) : (
                      <>
                        <p className="text-[20px] font-semibold tabular-nums" style={{ color: `rgb(var(${textTone(tok)}))` }}>−{off} hrs/wk</p>
                        {ending.map((a) => (
                          <p key={a.client} className="truncate text-[12px] text-[rgb(var(--text-primary))]">{a.client}</p>
                        ))}
                      </>
                    )}
                    <p className="mt-1.5 text-[11px] tabular-nums text-[rgb(var(--text-tertiary))]">Booked after: {after} / {target}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <label className="mt-5 flex items-center gap-3 text-[12px] text-[rgb(var(--text-secondary))]">
          Add a deal
          <input type="range" min={0} max={20} value={extra} onChange={(e) => setExtra(Number(e.target.value))} className="flex-1" />
          <span className="w-16 text-right tabular-nums">+{extra} hrs</span>
        </label>
      </PreviewSection>

      <DocSection title="Thresholds" intro="Status is computed from utilization (allocated ÷ target). Unlike the Gauge component's auto thresholds, low utilization here is a prompt to sell, not a success.">
        <DocTable
          headers={["Utilization", "Status", "Token", "Guidance copy"]}
          rows={[
            ["< 60%", "Unallocated", <code key="1">--accent</code>, "Plenty of open bandwidth — a good time to work the pipeline."],
            ["60–85%", "Balanced", <code key="2">--status-success</code>, "Healthy load with room for strategic thinking."],
            ["85–100%", "Near Capacity", <code key="3">--status-caution</code>, "Close to your ceiling. Be selective with new commitments."],
            ["> 100%", "Burnout Risk", <code key="4">--status-danger</code>, "Booked beyond your target. Renegotiate scope or pause new deals."],
          ]}
        />
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "Selling your own time", body: "Freelancers, consultants, fractional roles — one person, several clients, a weekly hours target they chose.", good: true },
            { heading: "Contract end dates matter", body: "The runway strip turns end dates into a forward-looking cliff warning, with renewal conversations surfaced before the 30-day window.", good: true },
            { heading: "Teams", body: "For many people, use the Team Capacity Grid — one gauge per member. This pattern is a single person's control centre.", good: false },
            { heading: "Segment colors that look like status", body: "Client segments use a categorical palette that deliberately avoids green / amber / red, so a client is never mistaken for a warning.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "The gauge is one accessibility element with a value that states hours and status together: “24 of 30 hours booked, Near Capacity”.",
            "The stacked bar is hidden from assistive tech; the legend rows below it carry the same data as text.",
            "Use a deeper text tone for status labels on plain backgrounds — Fractionflo keeps separate fill and text colors per status because yellow and light blue fail WCAG on white.",
            "Overflow is shown by a second ring and an “Over target” row, not just by turning the main ring red.",
          ]}
        />
      </DocSection>
    </div>
  );
}
