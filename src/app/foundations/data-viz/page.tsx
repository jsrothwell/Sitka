"use client";

import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

// Metadata export removed — this is a client component

const CHART_PALETTE = [
  { name: "Series 1", dark: "#34a865", light: "#219653", note: "Brand green — primary series" },
  { name: "Series 2", dark: "#60a5fa", light: "#2563eb", note: "Blue — secondary series" },
  { name: "Series 3", dark: "#f59e0b", light: "#d97706", note: "Amber — tertiary series" },
  { name: "Series 4", dark: "#e879f9", light: "#a21caf", note: "Purple — quaternary series" },
  { name: "Series 5", dark: "#fb923c", light: "#ea580c", note: "Orange — fifth series" },
  { name: "Series 6", dark: "#94a3b8", light: "#64748b", note: "Slate — sixth series / neutral" },
];

const CHART_TYPES = [
  {
    name: "Bar / Column",
    when: "Comparing discrete categories. Prefer horizontal bars for long labels.",
    avoid: "Continuous time series — use a line chart instead.",
  },
  {
    name: "Line",
    when: "Showing trends over time or continuous data. Use markers at data points.",
    avoid: "Fewer than 3 data points — a bar chart communicates more clearly.",
  },
  {
    name: "Area",
    when: "Emphasising volume over time, especially stacked to show part-to-whole.",
    avoid: "More than 3 series — individual values become impossible to read.",
  },
  {
    name: "Donut / Pie",
    when: "Part-to-whole relationships with 2–4 segments only.",
    avoid: "5+ segments or data where differences are subtle — use a bar chart.",
  },
  {
    name: "Scatter",
    when: "Correlations between two continuous variables.",
    avoid: "Ordinal or categorical data — values imply a false scale.",
  },
  {
    name: "Heatmap",
    when: "Two-dimensional density — calendar activity, confusion matrices.",
    avoid: "Precise comparison of values — colour perception is imprecise.",
  },
];

// Simple inline bar-chart demo
function BarDemo({ dark }: { dark: boolean }) {
  const t = {
    bg: dark ? "#09090c" : "#fafafa",
    surface: dark ? "#0d0d11" : "#ffffff",
    border: dark ? "#262630" : "#e0e0e7",
    textPrimary: dark ? "#f2f2f6" : "#282828",
    textSecondary: dark ? "#9b9baa" : "#747474",
    textTertiary: dark ? "#646473" : "#a7a7ac",
    gridLine: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
  };

  const data = [
    { label: "Q1", v: 68 },
    { label: "Q2", v: 82 },
    { label: "Q3", v: 54 },
    { label: "Q4", v: 91 },
  ];

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: t.surface, border: `1px solid ${t.border}` }}
    >
      <p className="text-[12px] font-semibold mb-4" style={{ color: t.textPrimary }}>
        Quarterly revenue (£M)
      </p>
      <div className="flex items-end gap-3 h-28">
        {data.map(({ label, v }, i) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
            <span className="text-[10px] font-semibold" style={{ color: CHART_PALETTE[0][dark ? "dark" : "light"] }}>
              {v}
            </span>
            <div
              className="w-full rounded-t-md"
              style={{
                height: `${(v / 100) * 80}px`,
                background: CHART_PALETTE[i % CHART_PALETTE.length][dark ? "dark" : "light"],
                opacity: i === 0 ? 1 : 0.7,
              }}
            />
            <span className="text-[10px]" style={{ color: t.textTertiary }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple line-chart demo
function LineDemo({ dark }: { dark: boolean }) {
  const t = {
    surface: dark ? "#0d0d11" : "#ffffff",
    border: dark ? "#262630" : "#e0e0e7",
    textPrimary: dark ? "#f2f2f6" : "#282828",
    textTertiary: dark ? "#646473" : "#a7a7ac",
    gridLine: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const v1 = [30, 45, 38, 60, 52, 75];
  const v2 = [20, 28, 35, 30, 42, 55];

  const W = 240, H = 80;
  const xStep = W / (months.length - 1);
  const toY = (v: number) => H - (v / 100) * H;

  const path = (vals: number[]) =>
    vals.map((v, i) => `${i === 0 ? "M" : "L"} ${i * xStep} ${toY(v)}`).join(" ");

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: t.surface, border: `1px solid ${t.border}` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <p className="text-[12px] font-semibold flex-1" style={{ color: t.textPrimary }}>Monthly active users</p>
        <div className="flex items-center gap-3 text-[10px]" style={{ color: t.textTertiary }}>
          {[CHART_PALETTE[0], CHART_PALETTE[1]].map((p, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="w-3 h-0.5 rounded" style={{ background: p[dark ? "dark" : "light"], display: "inline-block" }} />
              {["Web", "iOS"][i]}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 80 }}>
        {[25, 50, 75].map((y) => (
          <line key={y} x1={0} y1={toY(y)} x2={W} y2={toY(y)} stroke={t.gridLine} strokeWidth={1} />
        ))}
        <path d={path(v1)} fill="none" stroke={CHART_PALETTE[0][dark ? "dark" : "light"]} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d={path(v2)} fill="none" stroke={CHART_PALETTE[1][dark ? "dark" : "light"]} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" />
        {v1.map((v, i) => (
          <circle key={i} cx={i * xStep} cy={toY(v)} r={3} fill={CHART_PALETTE[0][dark ? "dark" : "light"]} />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {months.map((m) => (
          <span key={m} className="text-[9px]" style={{ color: t.textTertiary }}>{m}</span>
        ))}
      </div>
    </div>
  );
}

export default function DataVizPage() {
  return (
    <div>
      <PageHeader
        title="Data Visualisation"
        description="Charts in Sitka are clear, accessible, and consistent. This page covers the colour palette for data series, chart-type selection, and the rules for making data readable in both light and dark mode."
      />

      {/* Palette */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Series Palette</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          Six colours cover the vast majority of chart use cases. All pass 3:1 contrast on the corresponding background token in both modes. Beyond six series, use patterns, dashes, or markers to distinguish additional data.
        </p>
        <div className="grid grid-cols-1 gap-3 mb-8">
          {CHART_PALETTE.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-4 rounded-xl p-3.5 border border-[rgb(var(--border))] bg-[rgb(var(--surface))]"
            >
              <div className="flex gap-2 shrink-0">
                <span className="w-8 h-8 rounded-lg" style={{ background: c.dark, border: "1px solid rgba(255,255,255,0.08)" }} />
                <span className="w-8 h-8 rounded-lg" style={{ background: c.light, border: "1px solid rgba(0,0,0,0.08)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{c.name}</p>
                <p className="text-[11px] text-[rgb(var(--text-secondary))]">{c.note}</p>
              </div>
              <div className="text-right shrink-0">
                <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">{c.dark}</code>
                <br />
                <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">{c.light}</code>
              </div>
            </div>
          ))}
        </div>

        {/* Live demos */}
        <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-3">In context</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">Dark</p>
            <BarDemo dark />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">Light</p>
            <BarDemo dark={false} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">Line — Dark</p>
            <LineDemo dark />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">Line — Light</p>
            <LineDemo dark={false} />
          </div>
        </div>
      </section>

      {/* Chart types */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Chart Type Selection</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          Choose the chart type that matches the nature of the data and the question being answered.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Chart type", "Use when", "Avoid when"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CHART_TYPES.map((row, i) => (
                <tr key={row.name} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))] whitespace-nowrap">{row.name}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.when}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Never use colour as the only encoding",
              body: "Use shape, pattern, or direct label alongside colour. At minimum, include a data table equivalent for screen reader users.",
            },
            {
              title: "Simulate colour-blind views",
              body: "Test charts under Deuteranopia and Protanopia filters. The six-series palette is selected to remain distinguishable under both conditions.",
            },
            {
              title: "Label data points directly",
              body: "Avoid standalone legends where possible. Direct labels on lines and bar ends remove the cognitive step of matching colour to legend item.",
            },
            {
              title: "Provide accessible markup",
              body: "Wrap SVG charts in a <figure> with a <figcaption>. Add role=\"img\" and aria-label describing the key takeaway, not just the title.",
            },
          ].map(({ title, body }) => (
            <div key={title} className="p-4 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-2">{title}</h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dark mode tips */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Dark Mode Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Lighten series colours", body: "The light-mode series palette is too dark for dark backgrounds. Use the dedicated dark-mode hex values — they're lightened by 15–20 lightness points." },
            { title: "Remove heavy grid lines", body: "In dark mode, keep grid lines at 5% white opacity maximum. Heavy grid lines create visual noise against dark surfaces." },
            { title: "Background fill for chart area", body: "Use --surface (not --background) as the chart canvas in dark mode. The one-step lift gives the chart a natural container." },
          ].map(({ title, body }) => (
            <div key={title} className="p-4 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-2">{title}</h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
