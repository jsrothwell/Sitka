import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { GlassShowcase } from "@/site/docs/GlassShowcase";

export const metadata: Metadata = { title: "Glass" };

const BG_GRADIENT = "linear-gradient(135deg, rgb(52,168,101) 0%, rgb(15,61,36) 45%, rgb(9,9,12) 100%)";

const SPECULARS = [
  {
    name: "sfSpecularTopEdge",
    swift: "sfSpecularTopEdge",
    web: 'box-shadow: inset 0 1px 0 rgba(255,255,255,0.10)',
    desc: "1 px hairline highlight on the top edge of any glass surface. Communicates that light is hitting the surface from above. Applied via box-shadow so it doesn't require a pseudo-element.",
    demo: {
      style: {
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        background: "rgb(255 255 255 / 0.08)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 1px 4px rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 12,
        width: 180,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      } as React.CSSProperties,
      label: "Top edge specular",
    },
  },
  {
    name: "sfBrandLitSurface",
    swift: "sfBrandLitSurface",
    web: 'background: rgb(var(--accent) / 0.06)',
    desc: "Subtle accent tint applied to glass surfaces that are 'lit' by the brand colour — e.g. the active state of a navigation item, a selected card, or a goal-met streak card. Pairs with a matching accent border at 0.25 opacity.",
    demo: {
      style: {
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        background: "rgb(52 168 101 / 0.10)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        border: "1px solid rgb(52 168 101 / 0.30)",
        borderRadius: 12,
        width: 180,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      } as React.CSSProperties,
      label: "Brand-lit surface",
    },
  },
  {
    name: "sfPillSpecular",
    swift: "sfPillSpecular",
    web: 'box-shadow: inset 0 1px 0 rgba(255,255,255,0.30), 0 0 0 2px rgba(0,0,0,0.12)',
    desc: "Stronger top-edge specular for pill-shaped controls — badges, tags, segmented buttons. The outer ring at 2px provides a subtle selection halo. Both shadows collapse to a single box-shadow declaration.",
    demo: {
      style: {
        background: "rgb(52 168 101 / 0.85)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.30), 0 0 0 2px rgba(0,0,0,0.14)",
        borderRadius: 99,
        padding: "6px 16px",
        fontSize: 12,
        fontWeight: 600,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
      } as React.CSSProperties,
      label: "Pill specular",
    },
  },
  {
    name: "sfColorStripSheen",
    swift: "sfColorStripSheen",
    web: 'background: linear-gradient(to right, var(--color), transparent)',
    desc: "A translucent gradient strip that fades from the surface's accent colour to transparent, running left-to-right across the top of a card. Used in Gantt bars, Kanban column headers, and progress indicators.",
    demo: {
      style: {
        background: "linear-gradient(to right, rgb(52 168 101 / 0.60), transparent)",
        borderRadius: "8px 8px 0 0",
        height: 4,
        width: 180,
      } as React.CSSProperties,
      label: "Color strip sheen",
    },
  },
];

export default function GlassPage() {
  return (
    <div>
      <PageHeader
        title="Glass"
        description="Frosted glass surfaces communicate spatial depth — a panel floats above content, a modal floats above the page. Every glass level pairs blur, saturation, opacity, and a hairline border."
      />
      <GlassShowcase />

      {/* ── Specular overlays ─────────────────────────── */}
      <section className="mb-12 mt-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Specular overlays</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          Liquid Glass adds four specular layers on top of the base frosted surface. Each one mimics a different
          physical light-interaction — an edge highlight, a brand tint, a pill gloss, and a colour strip sheen.
          These are the web equivalents of Warren&apos;s Swift surface modifiers.
        </p>
        <div className="flex flex-col gap-4">
          {SPECULARS.map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden"
            >
              <div className="px-5 py-3 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))] flex items-center justify-between">
                <code className="text-[12px] font-mono font-semibold text-[rgb(var(--accent))]">{s.name}</code>
                <span className="text-[10px] text-[rgb(var(--text-tertiary))] font-mono">Swift: {s.swift}</span>
              </div>
              <div className="px-5 py-4 flex gap-8">
                <div className="flex-1">
                  <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-3">{s.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Web</span>
                    <code className="text-[10px] font-mono text-[rgb(var(--text-primary))] bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] px-2 py-0.5 rounded">
                      {s.web}
                    </code>
                  </div>
                </div>
                <div
                  className="w-52 flex-shrink-0 rounded-lg flex items-center justify-center"
                  style={{ background: BG_GRADIENT, minHeight: 80 }}
                >
                  {s.name === "sfColorStripSheen" ? (
                    <div style={{ width: 180 }}>
                      <div style={s.demo.style} />
                      <div style={{
                        background: "rgb(255 255 255 / 0.06)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        borderTop: "none",
                        borderRadius: "0 0 8px 8px",
                        height: 44,
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: 12,
                      }}>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>Gantt bar</span>
                      </div>
                    </div>
                  ) : (
                    <div style={s.demo.style}>
                      <span style={{ fontSize: 11, color: s.name === "sfPillSpecular" ? "#fff" : "rgba(255,255,255,0.8)" }}>
                        {s.demo.label}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reduced transparency ─────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Reduced transparency</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          When the user has enabled "Reduce Transparency" in their OS accessibility settings, glass effects must fall back
          to solid surfaces. Both CSS and SwiftUI expose this preference — always handle it.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">CSS — prefers-reduced-transparency</span>
            </div>
            <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto leading-relaxed"><code>{`.glass-surface {
  backdrop-filter: blur(20px) saturate(160%);
  background: rgb(var(--surface) / 0.85);
}

@media (prefers-reduced-transparency) {
  .glass-surface {
    backdrop-filter: none;
    background: rgb(var(--surface));
  }
}`}</code></pre>
          </div>
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">SwiftUI — UIAccessibility.isReduceTransparencyEnabled</span>
            </div>
            <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto leading-relaxed"><code>{`// Warren uses .ultraThinMaterial with a conditional override
var backgroundMaterial: some ShapeStyle {
    UIAccessibility.isReduceTransparencyEnabled
        ? AnyShapeStyle(Color.sfSurface)
        : AnyShapeStyle(.ultraThinMaterial)
}

// In a view:
.background(backgroundMaterial)`}</code></pre>
          </div>
        </div>
        <div className="rounded-[10px] border border-amber-500/30 bg-amber-500/5 px-5 py-4">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">
            <span className="font-semibold text-[rgb(var(--text-primary))]">Testing tip — </span>
            Enable "Increase Contrast" + "Reduce Transparency" in macOS System Settings → Accessibility → Display, or
            toggle <code className="font-mono text-[11px] bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] px-1 rounded">prefers-reduced-transparency: reduce</code> in
            Chrome DevTools → Rendering → Emulate CSS media feature.
          </p>
        </div>
      </section>
    </div>
  );
}
