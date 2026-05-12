"use client";

import { useState } from "react";
import { PageHeader } from "@/components/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

interface CompComponent {
  label: string;
  amount: number;
  color: string;
  description: string;
}

const OFFERS: { name: string; components: CompComponent[] }[] = [
  {
    name: "Offer A — Series B Startup",
    components: [
      { label: "Base Salary",  amount: 160000, color: "#6366f1", description: "Annual cash compensation" },
      { label: "Target Bonus", amount: 24000,  color: "#8b5cf6", description: "20% of base, tied to OKRs" },
      { label: "Equity (RSUs)", amount: 80000, color: "#a78bfa", description: "$320k over 4 years" },
      { label: "Benefits",     amount: 18000,  color: "#c4b5fd", description: "Health, dental, 401k match" },
    ],
  },
  {
    name: "Offer B — FAANG",
    components: [
      { label: "Base Salary",  amount: 195000, color: "#0ea5e9", description: "Annual cash compensation" },
      { label: "Target Bonus", amount: 39000,  color: "#38bdf8", description: "15–20% of base" },
      { label: "Equity (RSUs)", amount: 62500, color: "#7dd3fc", description: "$250k over 4 years" },
      { label: "Benefits",     amount: 22000,  color: "#bae6fd", description: "Comprehensive package" },
    ],
  },
];

function WaterfallChart({ components }: { components: CompComponent[] }) {
  const total = components.reduce((s, c) => s + c.amount, 0);
  const maxAmount = total;

  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `$${n}`;

  return (
    <div className="space-y-2">
      {components.map((comp) => {
        const pct = (comp.amount / maxAmount) * 100;
        return (
          <div key={comp.label} className="flex items-center gap-3">
            <div className="w-28 shrink-0 text-right text-[12px] font-medium text-[rgb(var(--text-secondary))]">
              {comp.label}
            </div>
            <div className="flex-1 h-7 rounded-md bg-[rgb(var(--surface-raised))] overflow-hidden">
              <div
                className="h-full rounded-md flex items-center pl-2.5 transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: comp.color, minWidth: "2rem" }}
              >
                <span className="text-[11px] font-semibold text-white/90 whitespace-nowrap">{fmt(comp.amount)}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Total row */}
      <div className="mt-3 pt-3 border-t border-[rgb(var(--border))] flex items-center gap-3">
        <div className="w-28 shrink-0 text-right text-[12px] font-semibold text-[rgb(var(--text-primary))]">
          Total
        </div>
        <div className="flex-1 h-7 rounded-md overflow-hidden bg-[rgb(var(--surface-raised))]">
          <div
            className="h-full w-full rounded-md flex items-center pl-2.5"
            style={{ background: "linear-gradient(90deg, #6366f1, #a78bfa)" }}
          >
            <span className="text-[12px] font-bold text-white">{fmt(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const CODE = {
  react: {
    filename: "CompensationBreakdown.tsx",
    code: `interface CompComponent {
  label: string;
  amount: number;
  color: string;
}

interface Offer {
  name: string;
  components: CompComponent[];
}

function WaterfallBar({ comp, total }: { comp: CompComponent; total: number }) {
  const pct = Math.max(4, (comp.amount / total) * 100);
  const fmt = (n: number) => n >= 1000 ? \`$\${(n / 1000).toFixed(0)}k\` : \`$\${n}\`;

  return (
    <div className="flex items-center gap-3">
      <div className="w-28 shrink-0 text-right text-[12px] font-medium
                      text-[rgb(var(--text-secondary))]">
        {comp.label}
      </div>
      <div className="flex-1 h-7 rounded-md bg-[rgb(var(--surface-raised))] overflow-hidden">
        <div
          className="h-full rounded-md flex items-center pl-2.5 transition-all duration-500"
          style={{ width: \`\${pct}%\`, backgroundColor: comp.color, minWidth: "2rem" }}
          role="meter"
          aria-valuenow={comp.amount}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={\`\${comp.label}: \${fmt(comp.amount)}\`}
        >
          <span className="text-[11px] font-semibold text-white/90 whitespace-nowrap">
            {fmt(comp.amount)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CompensationBreakdown({ offer }: { offer: Offer }) {
  const total = offer.components.reduce((s, c) => s + c.amount, 0);
  const fmt   = (n: number) => n >= 1000 ? \`$\${(n / 1000).toFixed(0)}k\` : \`$\${n}\`;

  return (
    <section aria-label={\`Compensation breakdown: \${offer.name}\`}>
      <h3 className="text-[15px] font-semibold mb-4">{offer.name}</h3>

      <div className="space-y-2">
        {offer.components.map((comp) => (
          <WaterfallBar key={comp.label} comp={comp} total={total} />
        ))}

        {/* Total */}
        <div className="pt-3 mt-3 border-t border-[rgb(var(--border))] flex items-center gap-3">
          <div className="w-28 shrink-0 text-right text-[12px] font-semibold
                          text-[rgb(var(--text-primary))]">
            Total
          </div>
          <div className="flex-1 h-7 rounded-md overflow-hidden">
            <div
              className="h-full w-full rounded-md flex items-center pl-2.5"
              style={{ background: "linear-gradient(90deg, #6366f1, #a78bfa)" }}
              role="status"
              aria-label={\`Total compensation: \${fmt(total)}\`}
            >
              <span className="text-[12px] font-bold text-white">{fmt(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`,
  },
  html: {
    filename: "compensation.html",
    code: `<section class="comp-breakdown" aria-label="Compensation breakdown">
  <h3 class="comp-breakdown__title">Offer A — Series B Startup</h3>

  <div class="comp-breakdown__rows">

    <div class="comp-row">
      <div class="comp-row__label">Base Salary</div>
      <div class="comp-row__track" aria-hidden="true">
        <div class="comp-row__bar" style="width:57%;background:#6366f1">$160k</div>
      </div>
    </div>

    <div class="comp-row">
      <div class="comp-row__label">Target Bonus</div>
      <div class="comp-row__track" aria-hidden="true">
        <div class="comp-row__bar" style="width:8.6%;background:#8b5cf6">$24k</div>
      </div>
    </div>

    <div class="comp-row">
      <div class="comp-row__label">Equity (RSUs)</div>
      <div class="comp-row__track" aria-hidden="true">
        <div class="comp-row__bar" style="width:28.6%;background:#a78bfa">$80k</div>
      </div>
    </div>

    <div class="comp-row">
      <div class="comp-row__label">Benefits</div>
      <div class="comp-row__track" aria-hidden="true">
        <div class="comp-row__bar" style="width:6.4%;background:#c4b5fd">$18k</div>
      </div>
    </div>

    <!-- Total row -->
    <div class="comp-row comp-row--total">
      <div class="comp-row__label">Total</div>
      <div class="comp-row__track" aria-hidden="true">
        <div class="comp-row__bar comp-row__bar--total">$282k</div>
      </div>
      <!-- Screen reader text -->
      <span class="sr-only">Total compensation: $282,000</span>
    </div>

  </div>
</section>

<style>
.comp-breakdown { max-width: 560px; }
.comp-breakdown__title { font-size: 15px; font-weight: 600; margin-bottom: 16px; }
.comp-breakdown__rows { display: flex; flex-direction: column; gap: 8px; }

.comp-row { display: flex; align-items: center; gap: 12px; }
.comp-row__label {
  width: 112px; flex-shrink: 0; text-align: right;
  font-size: 12px; font-weight: 500; color: rgb(var(--text-secondary));
}
.comp-row__track {
  flex: 1; height: 28px; border-radius: 6px;
  background: rgb(var(--surface-raised)); overflow: hidden;
}
.comp-row__bar {
  height: 100%; min-width: 32px; border-radius: 6px;
  display: flex; align-items: center; padding-left: 10px;
  font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.9);
  transition: width 0.5s ease;
}
.comp-row--total { margin-top: 12px; padding-top: 12px;
  border-top: 1px solid rgb(var(--border)); }
.comp-row--total .comp-row__label { font-weight: 700; color: rgb(var(--text-primary)); }
.comp-row__bar--total {
  width: 100%;
  background: linear-gradient(90deg, #6366f1, #a78bfa);
  font-size: 12px; font-weight: 700;
}
.sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); }
</style>`,
  },
  swift: {
    filename: "CompensationBreakdownView.swift",
    code: `import SwiftUI

struct CompComponent: Identifiable {
    var id: String { label }
    let label: String
    let amount: Double
    let color: Color
    let description: String
}

struct Offer: Identifiable {
    var id: String { name }
    let name: String
    let components: [CompComponent]
    var total: Double { components.reduce(0) { $0 + $1.amount } }
}

struct CompensationBreakdownView: View {
    let offer: Offer
    @State private var appeared = false

    private func fmt(_ n: Double) -> String {
        n >= 1000 ? "$\\(Int(n / 1000))k" : "$\\(Int(n))"
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(offer.name)
                .font(.headline)
                .padding(.bottom, 16)

            VStack(spacing: 8) {
                ForEach(offer.components) { comp in
                    WaterfallRow(comp: comp, total: offer.total,
                                 appeared: appeared, fmt: fmt)
                }

                // Total divider + row
                Divider().padding(.vertical, 4)

                HStack(spacing: 12) {
                    Text("Total")
                        .font(.system(size: 12, weight: .bold))
                        .frame(width: 100, alignment: .trailing)
                        .foregroundStyle(.primary)

                    GeometryReader { geo in
                        LinearGradient(
                            colors: [Color(hex: "#6366f1"), Color(hex: "#a78bfa")],
                            startPoint: .leading, endPoint: .trailing
                        )
                        .frame(width: appeared ? geo.size.width : 0)
                        .clipShape(RoundedRectangle(cornerRadius: 6, style: .continuous))
                        .overlay(alignment: .leading) {
                            Text(fmt(offer.total))
                                .font(.system(size: 12, weight: .bold))
                                .foregroundColor(.white)
                                .padding(.leading, 10)
                        }
                        .animation(.easeOut(duration: 0.6), value: appeared)
                    }
                    .frame(height: 28)
                }
            }
        }
        .onAppear { appeared = true }
        .accessibilityElement(children: .contain)
        .accessibilityLabel("Compensation breakdown for \\(offer.name)")
    }
}

struct WaterfallRow: View {
    let comp: CompComponent
    let total: Double
    let appeared: Bool
    let fmt: (Double) -> String

    private var pct: Double { max(0.04, comp.amount / total) }

    var body: some View {
        HStack(spacing: 12) {
            Text(comp.label)
                .font(.system(size: 12, weight: .medium))
                .frame(width: 100, alignment: .trailing)
                .foregroundStyle(.secondary)

            GeometryReader { geo in
                RoundedRectangle(cornerRadius: 6, style: .continuous)
                    .fill(comp.color)
                    .frame(width: appeared ? geo.size.width * pct : 0)
                    .overlay(alignment: .leading) {
                        Text(fmt(comp.amount))
                            .font(.system(size: 11, weight: .semibold))
                            .foregroundColor(.white.opacity(0.9))
                            .padding(.leading, 8)
                    }
                    .animation(.easeOut(duration: 0.5).delay(0.05 * Double(Int.random(in: 0...3))),
                               value: appeared)
            }
            .frame(height: 28)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\\(comp.label): \\(fmt(comp.amount))")
    }
}

// MARK: — Color hex init
extension Color {
    init(hex: String) {
        let h = hex.trimmingCharacters(in: .init(charactersIn: "#"))
        var rgb: UInt64 = 0
        Scanner(string: h).scanHexInt64(&rgb)
        self.init(
            red:   Double((rgb >> 16) & 0xFF) / 255,
            green: Double((rgb >>  8) & 0xFF) / 255,
            blue:  Double( rgb        & 0xFF) / 255
        )
    }
}

#Preview {
    let offer = Offer(
        name: "Offer A — Series B Startup",
        components: [
            CompComponent(label: "Base Salary",   amount: 160000, color: Color(hex: "#6366f1"), description: "Annual cash"),
            CompComponent(label: "Target Bonus",  amount: 24000,  color: Color(hex: "#8b5cf6"), description: "20% of base"),
            CompComponent(label: "Equity (RSUs)", amount: 80000,  color: Color(hex: "#a78bfa"), description: "4-year vest"),
            CompComponent(label: "Benefits",      amount: 18000,  color: Color(hex: "#c4b5fd"), description: "Health + 401k"),
        ]
    )
    CompensationBreakdownView(offer: offer)
        .padding()
        .frame(width: 480)
}`,
  },
  macos: {
    filename: "CompensationBreakdownView+macOS.swift",
    code: `import SwiftUI

// macOS — side-by-side offer comparison with waterfall bars
struct OfferComparisonView: View {
    let offers: [Offer]

    var body: some View {
        HStack(alignment: .top, spacing: 24) {
            ForEach(offers) { offer in
                CompensationBreakdownView(offer: offer)
                    .padding()
                    .background(Color(.controlBackgroundColor))
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                    .overlay(
                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .stroke(Color(.separatorColor))
                    )
            }
        }
        .padding()
    }
}

#Preview("Offer Comparison") {
    let offerA = Offer(name: "Series B Startup", components: [
        CompComponent(label: "Base",   amount: 160000, color: Color(hex: "#6366f1"), description: ""),
        CompComponent(label: "Bonus",  amount: 24000,  color: Color(hex: "#8b5cf6"), description: ""),
        CompComponent(label: "Equity", amount: 80000,  color: Color(hex: "#a78bfa"), description: ""),
        CompComponent(label: "Benefits",amount: 18000, color: Color(hex: "#c4b5fd"), description: ""),
    ])
    let offerB = Offer(name: "FAANG", components: [
        CompComponent(label: "Base",   amount: 195000, color: Color(hex: "#0ea5e9"), description: ""),
        CompComponent(label: "Bonus",  amount: 39000,  color: Color(hex: "#38bdf8"), description: ""),
        CompComponent(label: "Equity", amount: 62500,  color: Color(hex: "#7dd3fc"), description: ""),
        CompComponent(label: "Benefits",amount: 22000, color: Color(hex: "#bae6fd"), description: ""),
    ])
    OfferComparisonView(offers: [offerA, offerB])
        .frame(width: 720)
}`,
  },
};

export default function CompensationPage() {
  const [activeOffer, setActiveOffer] = useState(0);

  const offer = OFFERS[activeOffer];
  const total = offer.components.reduce((s, c) => s + c.amount, 0);
  const fmt = (n: number) => `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;

  return (
    <div>
      <PageHeader
        title="Compensation Breakdown"
        description="Horizontal waterfall chart for visualising the components of a compensation package — base, bonus, equity, and benefits stacked into a single total. Supports multi-offer comparison for side-by-side evaluation."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>

        {/* Offer switcher */}
        <div className="flex gap-2 mb-4">
          {OFFERS.map((o, i) => (
            <button
              key={o.name}
              onClick={() => setActiveOffer(i)}
              className={[
                "px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-all",
                activeOffer === i
                  ? "border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]"
                  : "border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]",
              ].join(" ")}
            >
              {o.name.split(" — ")[0]}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6">
          <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-5">{offer.name}</p>
          <WaterfallChart components={offer.components} />
        </div>
      </section>

      {/* Side-by-side comparison */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Offer comparison</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Present multiple packages side by side in a tabular layout so the user can scan each component and identify where the offers diverge.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Component</th>
                {OFFERS.map((o) => (
                  <th key={o.name} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                    {o.name.split(" — ")[0]}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Δ</th>
              </tr>
            </thead>
            <tbody>
              {OFFERS[0].components.map((comp, i) => {
                const a = OFFERS[0].components[i].amount;
                const b = OFFERS[1].components[i].amount;
                const diff = b - a;
                return (
                  <tr key={comp.label} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                    <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{comp.label}</td>
                    <td className="px-4 py-3 font-mono text-[rgb(var(--text-secondary))]">{fmt(a)}</td>
                    <td className="px-4 py-3 font-mono text-[rgb(var(--text-secondary))]">{fmt(b)}</td>
                    <td className={`px-4 py-3 font-mono font-semibold ${diff > 0 ? "text-emerald-500" : "text-red-400"}`}>
                      {diff > 0 ? "+" : ""}{fmt(diff)}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-[rgb(var(--surface-raised))] font-semibold">
                <td className="px-4 py-3 text-[rgb(var(--text-primary))]">Total</td>
                {OFFERS.map((o) => (
                  <td key={o.name} className="px-4 py-3 font-mono text-[rgb(var(--text-primary))]">
                    {fmt(o.components.reduce((s, c) => s + c.amount, 0))}
                  </td>
                ))}
                <td className={`px-4 py-3 font-mono font-bold ${
                  OFFERS[1].components.reduce((s, c) => s + c.amount, 0) >
                  OFFERS[0].components.reduce((s, c) => s + c.amount, 0)
                    ? "text-emerald-500" : "text-red-400"
                }`}>
                  {(() => {
                    const diff =
                      OFFERS[1].components.reduce((s, c) => s + c.amount, 0) -
                      OFFERS[0].components.reduce((s, c) => s + c.amount, 0);
                    return `${diff > 0 ? "+" : ""}${fmt(diff)}`;
                  })()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Design notes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Design notes</h2>
        <div className="space-y-3 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            { heading: "Bar width is relative to total, not per-row maximum", body: "Each bar width is (component ÷ total), not (component ÷ max-component). This preserves the proportional relationship and makes it immediately obvious which component dominates the package." },
            { heading: "Use a consistent colour family per offer", body: "When comparing offers, assign each offer a hue (e.g. purple for Offer A, blue for Offer B) and use tints for each component within that offer. This makes the source of each bar obvious when switching between offers." },
            { heading: "Show the total row as a full-width gradient", body: "The total bar always spans 100% of the track. A gradient communicates 'this is a combined value' and distinguishes it from individual component bars." },
            { heading: "Animate on entry", body: "Bars should grow from left to right on mount. A 400–600ms ease-out with slight stagger per row adds clarity to the waterfall metaphor and draws the eye to the final total." },
          ].map(({ heading, body }) => (
            <div key={heading} className="flex gap-3">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              <div>
                <span className="font-medium text-[rgb(var(--text-primary))]">{heading} — </span>
                {body}
              </div>
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
            "Each bar track is a visual aid only — wrap it in aria-hidden='true' and expose the value as an accessible label on the row container: aria-label='Base Salary: $160k'.",
            "The total row should carry role='status' or be included in an aria-live region if the offer can be reconfigured by the user.",
            "Colour alone does not distinguish bars in a multi-offer view. Add a legend with shape + colour + label, and ensure bar labels are always visible (never rely on hover tooltips for primary data).",
            "For the comparison table, use a proper <table> with <caption> describing what is being compared, and <th scope='col'> for each offer column.",
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
