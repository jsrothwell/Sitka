"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ArrowList, DocSection, DocTable, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

/** WCAG relative luminance of an "r g b" token triplet. */
function luminance([r, g, b]: number[]) {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
/** Pick black or white text, whichever contrasts more with the background. */
function accessibleForeground(rgb: number[]) {
  const L = luminance(rgb);
  return (L + 0.05) / 0.05 > 1.05 / (L + 0.05) ? "#000" : "#fff";
}

// Dark-theme status token values from globals.css, for the live preview.
const GRADES = [
  { grade: "A", label: "Low risk", rgb: [16, 185, 129], token: "--status-success" },
  { grade: "C", label: "Some signals", rgb: [245, 158, 11], token: "--status-warning" },
  { grade: "F", label: "High risk", rgb: [248, 113, 113], token: "--status-danger" },
];

const SIGNALS = [
  { text: "Posted under 5 days ago and already reposted", points: 30 },
  { text: "No salary range in the listing", points: 15 },
  { text: "Generic, company-agnostic description", points: 10 },
  { text: "Company has 3 other listings open 90+ days", points: 12 },
];

const CODE = {
  react: {
    filename: "ScoreExplainer.tsx",
    code: `// Picks black or white text for any background, so a pill on a status color
// always clears contrast. Replaces colored-text-on-tint pairings (as low as 1.75:1).
export function accessibleForeground([r, g, b]: [number, number, number]) {
  const lin = (c: number) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return (L + 0.05) / 0.05 > 1.05 / (L + 0.05) ? "#000" : "#fff";
}

interface Signal { text: string; points: number }

export function ScorePill({ grade, label, bg, onExplain }: {
  grade: string; label: string; bg: [number, number, number]; onExplain: () => void;
}) {
  return (
    <button onClick={onExplain} aria-haspopup="dialog"
            aria-label={\`Grade \${grade}, \${label}. Explain this score\`}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold"
            style={{ background: \`rgb(\${bg.join(" ")})\`, color: accessibleForeground(bg) }}>
      <span className="font-bold">{grade}</span> {label}
    </button>
  );
}

export function ScoreBreakdown({ total, signals, action }: { total: number; signals: Signal[]; action: string }) {
  return (
    <div role="dialog" aria-labelledby="why-title" className="w-80 rounded-2xl p-4 bg-[rgb(var(--surface))] shadow-[var(--shadow-sheet)]">
      <h3 id="why-title" className="text-[15px] font-semibold">Why this score</h3>
      <ul className="mt-3 divide-y divide-[rgb(var(--border-subtle))]">
        {signals.map((s) => (
          <li key={s.text} className="flex justify-between gap-3 py-2 text-[13px]">
            <span className="text-[rgb(var(--text-secondary))]">{s.text}</span>
            <span className="tabular-nums font-semibold">+{s.points}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between border-t border-[rgb(var(--border))] pt-2 text-[13px] font-semibold">
        <span>Total</span><span className="tabular-nums">{total}</span>
      </div>
      <p className="mt-3 rounded-lg bg-[rgb(var(--accent-subtle))] p-2.5 text-[13px]">{action}</p>
    </div>
  );
}`,
  },
  html: {
    filename: "score-pill.html",
    code: `<!-- Foreground is computed (black or white), never a tinted version of the background -->
<button class="grade-pill" style="--bg: 245 158 11; --fg: #000"
        aria-haspopup="dialog" aria-label="Grade C, some signals. Explain this score">
  <b>C</b> Some signals
</button>

<div class="breakdown" role="dialog" aria-labelledby="why-title">
  <h3 id="why-title">Why this score</h3>
  <ul>
    <li><span>Posted under 5 days ago and already reposted</span><b>+30</b></li>
    <li><span>No salary range in the listing</span><b>+15</b></li>
  </ul>
  <div class="breakdown__total"><span>Total</span><b>45</b></div>
  <p class="breakdown__action">Apply, but follow up with a recruiter directly.</p>
</div>

<style>
.grade-pill { background: rgb(var(--bg)); color: var(--fg); border-radius: 999px; padding: 4px 10px; font: 600 12px/1 system-ui; }
.breakdown { width: 320px; padding: 16px; border-radius: 16px; background: rgb(var(--surface)); box-shadow: var(--shadow-sheet); }
.breakdown li { display: flex; justify-content: space-between; gap: 12px; padding: 8px 0; font-size: 13px;
                border-bottom: 1px solid rgb(var(--border-subtle)); }
.breakdown b { font-variant-numeric: tabular-nums; }
.breakdown__total { display: flex; justify-content: space-between; padding-top: 8px; font-weight: 600; }
.breakdown__action { margin-top: 12px; padding: 10px; border-radius: 8px; background: rgb(var(--accent-subtle)); }
</style>`,
  },
  swift: {
    filename: "ScoreExplainer.swift",
    code: `import SwiftUI

extension Color {
    /// Black or white, whichever clears more contrast against \`background\`.
    /// Port of JobFlo's SFColor.accessibleForeground(on:).
    static func accessibleForeground(on background: Color) -> Color {
        let resolved = background.resolve(in: EnvironmentValues())
        func lin(_ c: Float) -> Double {
            let s = Double(c)
            return s <= 0.03928 ? s / 12.92 : pow((s + 0.055) / 1.055, 2.4)
        }
        let L = 0.2126 * lin(resolved.red) + 0.7152 * lin(resolved.green) + 0.0722 * lin(resolved.blue)
        return (L + 0.05) / 0.05 > 1.05 / (L + 0.05) ? .black : .white
    }
}

struct LetterGradePill: View {
    let grade: Character
    let label: String
    let tint: Color            // statusSuccess / statusWarning / statusDanger — never raw .green/.red
    @State private var showingBreakdown = false
    let signals: [(String, Int)]
    let action: String

    var body: some View {
        Button { showingBreakdown = true } label: {
            HStack(spacing: 4) {
                Text(String(grade)).fontWeight(.bold)
                Text(label)
            }
            .font(.caption.weight(.semibold))
            .padding(.horizontal, 10).padding(.vertical, 4)
            .foregroundStyle(Color.accessibleForeground(on: tint))
            .background(tint, in: Capsule())
        }
        .buttonStyle(.plain)
        .accessibilityLabel("Grade \\(grade), \\(label)")
        .accessibilityHint("Shows what contributed to this score")
        .popover(isPresented: $showingBreakdown) {
            VStack(alignment: .leading, spacing: 10) {
                Text("Why this score").font(.headline)
                ForEach(signals, id: \\.0) { text, points in
                    HStack(alignment: .firstTextBaseline) {
                        Text(text).foregroundStyle(.secondary)
                        Spacer(minLength: 12)
                        Text("+\\(points)").monospacedDigit().fontWeight(.semibold)
                    }
                    .font(.subheadline)
                    .accessibilityElement(children: .combine)
                }
                Divider()
                Label(action, systemImage: "lightbulb")
                    .font(.subheadline)
                    .padding(10)
                    .background(.tint.opacity(0.12), in: RoundedRectangle(cornerRadius: 8))
            }
            .padding()
            .frame(width: 320)
            .presentationCompactAdaptation(.sheet)
        }
    }
}`,
  },
};

export default function ScoreExplainerPage() {
  const [selected, setSelected] = useState(1);
  const [open, setOpen] = useState(true);
  const total = SIGNALS.reduce((n, s) => n + s.points, 0);

  return (
    <div>
      <PageHeader
        title="Score Explainer"
        badge="New"
        description="A letter-grade pill for computed scores, paired with an 'explain this score' breakdown that itemizes each contributing signal. Use it anywhere an algorithm judges something on someone's behalf — risk, fit, health, trust — so the verdict is never a black box."
      />
      <SourceNote
        sources={[
          { app: "JobFlo", file: "Shared/Views/GhostRiskBadge.swift" },
          { app: "JobFlo", file: "Shared/Views/GhostRiskPill.swift" },
          { app: "JobFlo", file: "Shared/Views/ListingCheckCard.swift" },
        ]}
      />

      <PreviewSection>
        <div className="mx-auto max-w-sm">
          <div className="mb-4 flex flex-wrap gap-2">
            {GRADES.map((g, i) => (
              <button
                key={g.grade}
                onClick={() => {
                  setSelected(i);
                  setOpen(true);
                }}
                aria-haspopup="dialog"
                aria-label={`Grade ${g.grade}, ${g.label}. Explain this score`}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                  selected === i ? "ring-2 ring-offset-2 ring-offset-[rgb(var(--surface-raised))] ring-[rgb(var(--text-tertiary))]" : ""
                }`}
                style={{ background: `rgb(${g.rgb.join(" ")})`, color: accessibleForeground(g.rgb) }}
              >
                <span className="font-bold">{g.grade}</span> {g.label}
              </button>
            ))}
          </div>

          {open && (
            <div role="dialog" aria-labelledby="why-title" className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4 shadow-[var(--shadow-sheet)]">
              <div className="flex items-start justify-between">
                <p id="why-title" className="text-[15px] font-semibold text-[rgb(var(--text-primary))]">
                  Why this score
                </p>
                <button onClick={() => setOpen(false)} aria-label="Close" className="text-[rgb(var(--text-tertiary))]">
                  ✕
                </button>
              </div>
              <ul className="mt-2 divide-y divide-[rgb(var(--border-subtle))]">
                {SIGNALS.map((s) => (
                  <li key={s.text} className="flex justify-between gap-3 py-2 text-[13px]">
                    <span className="text-[rgb(var(--text-secondary))]">{s.text}</span>
                    <span className="tabular-nums font-semibold text-[rgb(var(--text-primary))]">+{s.points}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between border-t border-[rgb(var(--border))] pt-2 text-[13px] font-semibold text-[rgb(var(--text-primary))]">
                <span>Total</span>
                <span className="tabular-nums">{total} / 100</span>
              </div>
              <p className="mt-3 rounded-lg bg-[rgb(var(--accent-subtle))] p-2.5 text-[13px] text-[rgb(var(--text-primary))]">
                💡 Apply, but message a recruiter directly before investing in a cover letter.
              </p>
              <p className="mt-2 text-[11px] text-[rgb(var(--text-tertiary))]">Scored on this device · No listing text leaves your phone</p>
            </div>
          )}
        </div>
      </PreviewSection>

      <DocSection
        title="Accessible foreground"
        intro="The pill's text color is computed, not chosen: black or white, whichever has more contrast with the status fill. Tinted text on a tinted background (e.g. dark-green on light-green) measured as low as 1.75:1 in JobFlo before this was introduced."
      >
        <DocTable
          headers={["Fill token", "Computed text", "Why"]}
          rows={GRADES.map((g) => [
            <code key={g.token}>{g.token}</code>,
            accessibleForeground(g.rgb) === "#000" ? "Black" : "White",
            "Higher of the two WCAG contrast ratios against the fill",
          ])}
        />
        <p className="mt-4 text-[13px] text-[rgb(var(--text-secondary))]">
          Fractionflo reaches the same goal differently: each status has a <code>color</code> for fills and a deeper{" "}
          <code>textColor</code> for text on plain backgrounds, because yellow and light blue fail on white. Use the computed
          foreground for text <em>on</em> a status fill, and a deeper text tone for status text <em>beside</em> one.
        </p>
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "Algorithmic judgments", body: "Any score that could change someone's decision — risk of a ghost job, deal win likelihood, trust grade. Always pair the grade with a breakdown.", good: true },
            { heading: "Explain in sentences, not numbers", body: "Each signal is a plain-language sentence with its point contribution, ordered by impact. End with one recommended action.", good: true },
            { heading: "Grades without evidence", body: "If you can't list the signals (e.g. an opaque model output), don't show a letter grade — it implies a rubric that doesn't exist.", good: false },
            { heading: "Thin data", body: "Below a minimum input size or sample count, show “Not enough to judge” instead of a grade. JobFlo's live listing check stays silent until there's enough text; community grades are k-anonymity gated.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "The pill is a button: its label states grade and meaning together (“Grade C, some signals”), with a hint that it opens an explanation.",
            "Map grades to status tokens (success / warning / danger), never raw .green / .orange / .red — the raw system colors are what produced JobFlo's original contrast failures.",
            "In the breakdown, combine each signal's sentence and points into one accessibility element so VoiceOver reads “No salary range in the listing, plus 15”.",
            "On compact widths, adapt the popover to a sheet (.presentationCompactAdaptation(.sheet)) so it gets a proper close affordance and full Dynamic Type room.",
          ]}
        />
      </DocSection>
    </div>
  );
}
