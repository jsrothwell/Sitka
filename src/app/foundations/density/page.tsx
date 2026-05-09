import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Density" };

const TOKENS = [
  { token: "--density-space-xs",  compact: "2px",  normal: "4px",  comfortable: "6px",  use: "Icon gaps, chip insets" },
  { token: "--density-space-sm",  compact: "6px",  normal: "8px",  comfortable: "12px", use: "Inline element gaps" },
  { token: "--density-space-md",  compact: "8px",  normal: "12px", comfortable: "16px", use: "Component padding" },
  { token: "--density-space-lg",  compact: "12px", normal: "16px", comfortable: "20px", use: "Row padding, card insets" },
  { token: "--density-space-xl",  compact: "16px", normal: "24px", comfortable: "32px", use: "Section separation" },
  { token: "--density-h-sm",      compact: "24px", normal: "28px", comfortable: "32px", use: "Small control height" },
  { token: "--density-h-md",      compact: "30px", normal: "36px", comfortable: "40px", use: "Default control height" },
  { token: "--density-h-lg",      compact: "36px", normal: "44px", comfortable: "48px", use: "Large control height" },
];

const COMPONENTS = [
  { component: "Button (md)",    compact: "30px height",   normal: "36px height",   comfortable: "40px height" },
  { component: "Input",          compact: "30px height",   normal: "36px height",   comfortable: "40px height" },
  { component: "Table row",      compact: "12px v-padding", normal: "16px v-padding", comfortable: "20px v-padding" },
  { component: "List item",      compact: "6px v-padding",  normal: "8px v-padding",  comfortable: "12px v-padding" },
  { component: "Card",           compact: "12px padding",   normal: "16px padding",   comfortable: "20px padding" },
  { component: "Sidebar item",   compact: "6px v-padding",  normal: "8px v-padding",  comfortable: "12px v-padding" },
];

export default function DensityPage() {
  return (
    <div>
      <PageHeader
        title="Density"
        description="Three density modes — compact, normal, and comfortable — let product teams tune information density to their context. A single data attribute on the root element rewires all spacing and height tokens simultaneously."
      />

      {/* ── Modes ───────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Modes</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { mode: "compact", label: "Compact", desc: "Data-dense UIs: admin dashboards, data grids, developer tools. Maximum information per screen with reduced padding and smaller controls." },
            { mode: "normal",  label: "Normal",  desc: "The default. Balances readability and density for general-purpose product UIs. This is what all Sitka components render at out of the box." },
            { mode: "comfortable", label: "Comfortable", desc: "Consumer apps, onboarding flows, marketing pages. More breathing room for non-expert audiences or touch-primary interfaces." },
          ].map((m) => (
            <div key={m.mode} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5">
              <code className="text-[11px] font-mono text-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))] px-2 py-0.5 rounded">
                data-density=&quot;{m.mode}&quot;
              </code>
              <p className="mt-3 text-[13px] font-semibold text-[rgb(var(--text-primary))]">{m.label}</p>
              <p className="mt-1.5 text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Token scale ─────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Token scale</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          All eight density tokens are CSS custom properties set on <code className="font-mono text-[11px] text-[rgb(var(--accent))]">:root</code> (normal defaults) and overridden by the <code className="font-mono text-[11px] text-[rgb(var(--accent))]">data-density</code> attribute.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Token", "Compact", "Normal", "Comfortable", "Use"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOKENS.map((row, i) => (
                <tr key={row.token} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.token}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.compact}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-primary))] font-semibold">{row.normal}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.comfortable}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Component impact ─────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Component impact</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Component", "Compact", "Normal", "Comfortable"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPONENTS.map((row, i) => (
                <tr key={row.component} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.component}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.compact}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-primary))] font-semibold">{row.normal}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.comfortable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Usage ───────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Usage</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">HTML — attribute</span>
            </div>
            <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] leading-relaxed overflow-x-auto"><code>{`<!-- Apply to <html> to affect the whole app -->
<html data-density="compact">

<!-- Or scope to a subtree -->
<div data-density="comfortable">
  <YourDataTable />
</div>`}</code></pre>
          </div>
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">React — DensityProvider</span>
            </div>
            <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] leading-relaxed overflow-x-auto"><code>{`"use client";
import { createContext, useContext, useEffect } from "react";

type Density = "compact" | "normal" | "comfortable";

const DensityCtx = createContext<Density>("normal");

export function DensityProvider({
  density = "normal",
  children,
}: {
  density?: Density;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.dataset.density =
      density === "normal" ? "" : density;
  }, [density]);

  return (
    <DensityCtx.Provider value={density}>
      {children}
    </DensityCtx.Provider>
  );
}

export const useDensity = () => useContext(DensityCtx);`}</code></pre>
          </div>
        </div>
      </section>

      {/* ── Component authoring ─────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Authoring density-aware components</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
            <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">CSS — referencing density tokens</span>
          </div>
          <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] leading-relaxed overflow-x-auto"><code>{`.my-row {
  padding-block: var(--density-space-md);
  padding-inline: var(--density-space-lg);
  min-height: var(--density-h-md);
  gap: var(--density-space-sm);
}`}</code></pre>
        </div>
        <p className="mt-3 text-[13px] text-[rgb(var(--text-secondary))]">
          Reference density tokens instead of hardcoded values. When the density attribute changes, every consuming component reflows automatically with no JavaScript required.
        </p>
      </section>

      {/* ── Guidelines ──────────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Guidelines</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Choose one density mode per product surface — mixing modes within a single view creates visual inconsistency.",
            "Compact mode is appropriate for power-user tooling (data grids, admin panels, developer dashboards).",
            "Comfortable mode suits consumer onboarding, marketing microsites, and touch-primary mobile contexts.",
            "Normal is the default for general-purpose SaaS product UI — most Sitka components are sized for this mode.",
            "When in doubt, ship normal and add a user preference toggle later. Density changes are additive and non-breaking.",
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
