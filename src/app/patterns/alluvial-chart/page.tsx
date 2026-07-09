import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Alluvial / Sankey Flow" };

const CODE = {
  react: {
    filename: "AlluvialChart.tsx",
    code: `"use client";

import { useRef, useEffect, useState } from "react";

interface FlowSource {
  id: string;
  label: string;
  color: string;
  /** Volume at each stage, same length and order as \`stages\`. */
  values: number[];
}

interface AlluvialChartProps {
  stages: string[];
  sources: FlowSource[];
}

export function AlluvialChart({ stages, sources }: AlluvialChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  // Spring-like entry animation: 0 -> 1 over ~650ms
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const DURATION = 650;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / DURATION);
      // easeOutBack-ish spring approximation
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Sources are ranked by total volume, descending — keeps the same
    // vertical order at every stage so ribbons never cross.
    const ranked = [...sources].sort(
      (a, b) => b.values.reduce((s, v) => s + v, 0) - a.values.reduce((s, v) => s + v, 0)
    );

    const pad = { top: 32, right: 24, bottom: 16, left: 24 };
    const innerW = width - pad.left - pad.right;
    const innerH = height - pad.top - pad.bottom;
    const stageX = stages.map((_, i) => pad.left + (innerW / (stages.length - 1)) * i);
    const gap = 4;

    const maxTotal = Math.max(...stages.map((_, si) => ranked.reduce((s, r) => s + r.values[si], 0)));
    const scale = (innerH - gap * (ranked.length - 1)) / maxTotal;

    // Band top/bottom per source per stage, stacked and vertically centred.
    const bands = stages.map((_, si) => {
      const total = ranked.reduce((s, r) => s + r.values[si], 0) * scale + gap * (ranked.length - 1);
      let y = pad.top + (innerH - total) / 2;
      return ranked.map((r) => {
        const h = r.values[si] * scale * progress;
        const band = { top: y, bottom: y + h };
        y += r.values[si] * scale + gap;
        return band;
      });
    });

    // Ribbons between adjacent stages
    for (let si = 0; si < stages.length - 1; si++) {
      ranked.forEach((source, ri) => {
        const a = bands[si][ri];
        const b = bands[si + 1][ri];
        const x1 = stageX[si], x2 = stageX[si + 1];
        const midX = (x1 + x2) / 2;

        const gradient = ctx.createLinearGradient(0, a.top, 0, a.bottom);
        gradient.addColorStop(0, hexToRgba(source.color, 0.78));
        gradient.addColorStop(1, hexToRgba(source.color, 0.52));

        ctx.beginPath();
        ctx.moveTo(x1, a.top);
        ctx.bezierCurveTo(midX, a.top, midX, b.top, x2, b.top);
        ctx.lineTo(x2, b.bottom);
        ctx.bezierCurveTo(midX, b.bottom, midX, a.bottom, x1, a.bottom);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = hexToRgba(source.color, 0.95);
        ctx.lineWidth = 0.9;
        ctx.stroke();
      });
    }

    // Node separator bars — 3px white capsule "beads" at each stage
    stages.forEach((_, si) => {
      ranked.forEach((_, ri) => {
        const band = bands[si][ri];
        if (band.bottom - band.top < 1) return;
        ctx.fillStyle = "rgba(255,255,255,0.88)";
        roundRect(ctx, stageX[si] - 1.5, band.top, 3, band.bottom - band.top, 1.5);
        ctx.fill();
      });
    });
  }, [stages, sources, progress]);

  function hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return \`rgba(\${r},\${g},\${b},\${alpha})\`;
  }

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  return <canvas ref={canvasRef} style={{ width: "100%", height: 280, display: "block" }} />;
}`,
  },
  html: {
    filename: "alluvial-chart.html",
    code: `<!-- Alluvial charts are Canvas-based for performance with many ribbons. -->
<!-- Render an accessible data table alongside the canvas: -->
<canvas id="alluvial" width="640" height="280" role="img" aria-label="Applicant flow by source, from Applied through Interview to Offer"></canvas>

<table class="sr-only">
  <caption>Applicant flow by source</caption>
  <thead>
    <tr><th>Source</th><th>Applied</th><th>Interview</th><th>Offer</th></tr>
  </thead>
  <tbody>
    <tr><td>LinkedIn</td><td>420</td><td>140</td><td>32</td></tr>
    <tr><td>Indeed</td><td>310</td><td>80</td><td>12</td></tr>
    <tr><td>Referral</td><td>95</td><td>58</td><td>22</td></tr>
    <tr><td>Company Site</td><td>60</td><td>25</td><td>9</td></tr>
  </tbody>
</table>

<style>
  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>

<script>
  // Draw ribbons with Canvas 2D bezierCurveTo(), identical geometry to the
  // React implementation. See the React tab for the full ribbon-path algorithm.
</script>`,
  },
  swift: {
    filename: "SitkaAlluvialChart.swift",
    code: `import SwiftUI

struct FlowSource: Identifiable {
    let id: String
    let label: String
    let color: Color
    let values: [Double] // one per stage, same order as \`stages\`
}

struct SitkaAlluvialChart: View {
    let stages: [String]
    let sources: [FlowSource]

    @State private var progress: CGFloat = 0

    var body: some View {
        Canvas { context, size in
            let ranked = sources.sorted { $0.values.reduce(0, +) > $1.values.reduce(0, +) }
            let pad = (top: 32.0, bottom: 16.0)
            let innerH = size.height - pad.top - pad.bottom
            let gap = 4.0
            let stageX = stages.indices.map { i in
                CGFloat(i) / CGFloat(stages.count - 1) * size.width
            }
            let maxTotal = stages.indices.map { si in ranked.reduce(0) { $0 + $1.values[si] } }.max() ?? 1
            let scale = (innerH - gap * Double(ranked.count - 1)) / maxTotal

            var bands: [[(top: Double, bottom: Double)]] = []
            for si in stages.indices {
                let total = ranked.reduce(0) { $0 + $1.values[si] } * scale + gap * Double(ranked.count - 1)
                var y = pad.top + (innerH - total) / 2
                var stageBands: [(top: Double, bottom: Double)] = []
                for source in ranked {
                    let h = source.values[si] * scale * progress
                    stageBands.append((top: y, bottom: y + h))
                    y += source.values[si] * scale + gap
                }
                bands.append(stageBands)
            }

            for si in 0..<(stages.count - 1) {
                for (ri, source) in ranked.enumerated() {
                    let a = bands[si][ri], b = bands[si + 1][ri]
                    let x1 = stageX[si], x2 = stageX[si + 1]
                    let midX = (x1 + x2) / 2

                    var path = Path()
                    path.move(to: CGPoint(x: x1, y: a.top))
                    path.addCurve(to: CGPoint(x: x2, y: b.top),
                                  control1: CGPoint(x: midX, y: a.top),
                                  control2: CGPoint(x: midX, y: b.top))
                    path.addLine(to: CGPoint(x: x2, y: b.bottom))
                    path.addCurve(to: CGPoint(x: x1, y: a.bottom),
                                  control1: CGPoint(x: midX, y: b.bottom),
                                  control2: CGPoint(x: midX, y: a.bottom))
                    path.closeSubpath()

                    context.fill(path, with: .linearGradient(
                        Gradient(colors: [source.color.opacity(0.78), source.color.opacity(0.52)]),
                        startPoint: CGPoint(x: x1, y: a.top),
                        endPoint: CGPoint(x: x1, y: a.bottom)
                    ))
                    context.stroke(path, with: .color(source.color.opacity(0.95)), lineWidth: 0.9)
                }
            }

            // Node separator "beads"
            for si in stages.indices {
                for band in bands[si] where band.bottom - band.top > 1 {
                    let rect = CGRect(x: stageX[si] - 1.5, y: band.top, width: 3, height: band.bottom - band.top)
                    context.fill(Path(roundedRect: rect, cornerRadius: 1.5), with: .color(.white.opacity(0.88)))
                }
            }
        }
        .onAppear {
            withAnimation(.spring(response: 0.65, dampingFraction: 0.82).delay(0.05)) {
                progress = 1
            }
        }
        .glassCard()
    }
}

#Preview {
    SitkaAlluvialChart(
        stages: ["Applied", "Interview", "Offer"],
        sources: [
            FlowSource(id: "li", label: "LinkedIn", color: .blue, values: [420, 140, 32]),
            FlowSource(id: "in", label: "Indeed", color: .purple, values: [310, 80, 12]),
            FlowSource(id: "rf", label: "Referral", color: .green, values: [95, 58, 22]),
            FlowSource(id: "cs", label: "Company Site", color: .orange, values: [60, 25, 9]),
        ]
    )
    .frame(height: 280)
    .padding()
}`,
  },
};

const SOURCES = [
  { id: "li", label: "LinkedIn", color: "#0A66C2", values: [420, 140, 32] },
  { id: "in", label: "Indeed", color: "#6C5CE7", values: [310, 80, 12] },
  { id: "rf", label: "Referral", color: "#22C55E", values: [95, 58, 22] },
  { id: "cs", label: "Company Site", color: "#F59E0B", values: [60, 25, 9] },
];
const STAGES = ["Applied", "Interview", "Offer"];

function MiniAlluvial() {
  const W = 640, H = 260;
  const pad = { top: 34, right: 24, bottom: 16, left: 24 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const gap = 5;

  const ranked = [...SOURCES].sort(
    (a, b) => b.values.reduce((s, v) => s + v, 0) - a.values.reduce((s, v) => s + v, 0)
  );
  const stageX = STAGES.map((_, i) => pad.left + (innerW / (STAGES.length - 1)) * i);
  const maxTotal = Math.max(...STAGES.map((_, si) => ranked.reduce((s, r) => s + r.values[si], 0)));
  const scale = (innerH - gap * (ranked.length - 1)) / maxTotal;

  const bands = STAGES.map((_, si) => {
    const total = ranked.reduce((s, r) => s + r.values[si], 0) * scale + gap * (ranked.length - 1);
    let y = pad.top + (innerH - total) / 2;
    return ranked.map((r) => {
      const h = r.values[si] * scale;
      const band = { top: y, bottom: y + h };
      y += h + gap;
      return band;
    });
  });

  function ribbonPath(x1: number, a: { top: number; bottom: number }, x2: number, b: { top: number; bottom: number }) {
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${a.top.toFixed(1)} C ${midX} ${a.top.toFixed(1)}, ${midX} ${b.top.toFixed(1)}, ${x2} ${b.top.toFixed(1)} L ${x2} ${b.bottom.toFixed(1)} C ${midX} ${b.bottom.toFixed(1)}, ${midX} ${a.bottom.toFixed(1)}, ${x1} ${a.bottom.toFixed(1)} Z`;
  }

  const stageTotals = STAGES.map((_, si) => ranked.reduce((s, r) => s + r.values[si], 0));

  return (
    <div style={{ padding: 16, borderRadius: 12, background: "rgb(var(--surface))", border: "1px solid rgb(var(--border))", boxShadow: "var(--shadow-card)" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block", overflow: "visible" }}>
        <defs>
          {ranked.map((s) => (
            <linearGradient key={s.id} id={`grad-${s.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.78} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0.52} />
            </linearGradient>
          ))}
        </defs>

        {/* Ribbons */}
        {STAGES.slice(0, -1).map((_, si) =>
          ranked.map((s, ri) => (
            <path
              key={`${s.id}-${si}`}
              d={ribbonPath(stageX[si], bands[si][ri], stageX[si + 1], bands[si + 1][ri])}
              fill={`url(#grad-${s.id})`}
              stroke={s.color}
              strokeOpacity={0.95}
              strokeWidth={0.9}
            />
          ))
        )}

        {/* Node separator bars */}
        {STAGES.map((_, si) =>
          ranked.map((s, ri) => {
            const band = bands[si][ri];
            if (band.bottom - band.top < 1) return null;
            return (
              <rect
                key={`node-${s.id}-${si}`}
                x={stageX[si] - 1.5}
                y={band.top}
                width={3}
                height={band.bottom - band.top}
                rx={1.5}
                fill="rgba(255,255,255,0.88)"
              />
            );
          })
        )}

        {/* Stage headers */}
        {STAGES.map((stage, si) => (
          <g key={stage}>
            <text x={stageX[si]} y={16} textAnchor="middle" fontSize="11" fontWeight={600} fill="rgb(var(--text-primary))">
              {stage}
            </text>
            <text x={stageX[si]} y={28} textAnchor="middle" fontSize="9" fill="rgb(var(--text-tertiary))">
              {stageTotals[si]}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 pt-3" style={{ borderTop: "1px solid rgb(var(--border-subtle))" }}>
        {ranked.map((s) => (
          <div key={s.id} className="flex items-center gap-1.5">
            <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, display: "inline-block" }} />
            <span className="text-[11px] text-[rgb(var(--text-secondary))]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AlluvialChartPage() {
  return (
    <div>
      <PageHeader
        title="Alluvial / Sankey Flow"
        description="A multi-source ribbon chart for visualising volume flowing through sequential stages — reference implementation from JobFlo's 'The JobFlo' analytics chart, which tracks applications by source through Applied → Interview → Offer."
        badge="New"
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Demo</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed">
          Each ribbon is one source, sorted by total volume descending so the stacking order stays fixed across
          stages and ribbons never cross. Width at each stage encodes volume; the chart narrows naturally as
          applicants drop off between stages.
        </p>
        <ComponentPreview>
          <div style={{ padding: 16, width: "100%" }}>
            <MiniAlluvial />
          </div>
        </ComponentPreview>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Data model</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed">
          A <code className="font-mono text-[13px] text-[rgb(var(--accent))]">[source] × [stage]</code> matrix. Each source
          carries one numeric value per stage, in the same order as the stage list.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Source", "Applied", "Interview", "Offer"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SOURCES.map((s, i) => (
                <tr key={s.id} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] flex items-center gap-2">
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color, display: "inline-block" }} />
                    {s.label}
                  </td>
                  {s.values.map((v, vi) => (
                    <td key={vi} className="px-4 py-3 text-[rgb(var(--text-secondary))] font-mono">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Ribbon &amp; node spec</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Element</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Spec</th>
              </tr>
            </thead>
            <tbody>
              {[
                { el: "Ribbon path", spec: "Bezier curve from the source band at stage N to the band at stage N+1; control points at the horizontal midpoint between stages." },
                { el: "Ribbon fill", spec: "Vertical linear gradient, source colour 78% → 52% opacity." },
                { el: "Ribbon stroke", spec: "Source colour 95% opacity, 0.9 px, on the top edge only in the canvas implementation." },
                { el: "Node bar", spec: "3 px wide capsule, white 88% opacity, centred on the stage column — one per source per stage, height matches the band." },
                { el: "Stacking order", spec: "Sources ranked by total volume across all stages, descending. Fixed for every stage so ribbons never cross." },
                { el: "Stage scale", spec: "A single global scale factor (not renormalised per stage) so later stages visibly narrow as volume drops off." },
              ].map((row, i) => (
                <tr key={row.el} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.el}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Motion spec</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Interaction", "Property", "Value", "Easing"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Chart entry</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Band height (progress 0 → 1)</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))] font-mono">stiffness 650, damping 82</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">spring, 50ms delay</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Stage tap</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Hit area opacity</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))] font-mono">52px × top padding</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">easeOut, 150ms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Canvas/SVG rendering is decorative to screen readers — always pair the chart with a visually hidden data table containing the same source × stage matrix.",
            "Give the canvas an accessible name via aria-label summarising the flow (e.g. 'Applicant flow by source, Applied through Offer').",
            "Never encode meaning in ribbon colour alone — the legend and the hidden table both carry the source name as text.",
            "Stage tap targets (52 × topPad) must meet minimum touch target size on mobile; expand hit area beyond the visual label if needed.",
            "Respect prefers-reduced-motion — skip the entry animation and render bands at full height immediately.",
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
