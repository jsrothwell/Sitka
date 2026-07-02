"use client";

import Link from "next/link";
import { PageHeader } from "@/site/docs/PageHeader";
import { ArrowLeft } from "lucide-react";

function Step({ n, title, children, last }: { n: number; title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center shrink-0">
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
          style={{ background: "rgba(52,168,101,0.12)", color: "var(--nav-active-color)" }}
        >
          {n}
        </span>
        {!last && <div className="w-px flex-1 mt-2" style={{ background: "rgb(var(--border))" }} />}
      </div>
      <div className={`${last ? "pb-0" : "pb-10"} flex-1 min-w-0`}>
        <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-3">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function CallOut({ type, children }: { type: "info" | "warning"; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4 my-4"
      style={{
        background: type === "info" ? "rgba(52,168,101,0.07)" : "rgba(245,158,11,0.07)",
        border: `1px solid ${type === "info" ? "rgba(52,168,101,0.25)" : "rgba(245,158,11,0.25)"}`,
      }}
    >
      <p className="text-[12px] leading-relaxed" style={{ color: type === "info" ? "rgb(33,150,83)" : "rgb(180,120,0)" }}>
        {children}
      </p>
    </div>
  );
}

export default function DataVisualisationHowToPage() {
  return (
    <div>
      <Link
        href="/how-tos"
        className="inline-flex items-center gap-1.5 text-[12px] text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] mb-8 transition-colors"
      >
        <ArrowLeft className="w-3 h-3" />
        How-tos
      </Link>

      <PageHeader
        title="How to visualise data accessibly"
        description="Choose the right chart type, apply the accessible series palette, and mark up your charts correctly so they work for keyboard and screen-reader users."
      />

      <div className="mb-8 p-5 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">Objective</p>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
          By the end of this guide you will be able to choose the right chart type for your data, apply the Sitka data series palette in both light and dark mode, and produce accessible SVG markup.
        </p>
      </div>

      <div>
        <Step n={1} title="Choose the right chart type first">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            The most common data visualisation mistake is choosing a chart that doesn't match the nature of the data. Before opening your charting library, answer this question: what is the user trying to understand?
          </p>
          <div className="flex flex-col gap-2 mb-3">
            {[
              { question: "How do categories compare?", chart: "Bar or Column chart" },
              { question: "How has a value changed over time?", chart: "Line chart" },
              { question: "What share does each part contribute?", chart: "Donut chart (2–4 segments only)" },
              { question: "Is there a correlation between two variables?", chart: "Scatter plot" },
              { question: "How does density vary across two dimensions?", chart: "Heatmap" },
              { question: "How does volume accumulate over time?", chart: "Stacked area chart (max 3 series)" },
            ].map(({ question, chart }) => (
              <div key={question} className="flex items-start gap-3 rounded-lg px-3.5 py-2.5 border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
                <span className="text-[12px] text-[rgb(var(--text-secondary))] flex-1">{question}</span>
                <span className="text-[12px] font-semibold shrink-0" style={{ color: "var(--nav-active-color)" }}>{chart}</span>
              </div>
            ))}
          </div>
          <CallOut type="info">
            See the full <Link href="/foundations/data-viz" className="underline">Data Visualisation guidelines</Link> for a complete chart-type reference table.
          </CallOut>
        </Step>

        <Step n={2} title="Apply the Sitka series palette">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            The Sitka series palette provides six colours that work in both themes and remain distinguishable under common colour-blindness conditions.
          </p>
          <div className="flex flex-col gap-2 mb-4">
            {[
              { name: "Series 1", dark: "#34a865", light: "#219653" },
              { name: "Series 2", dark: "#60a5fa", light: "#2563eb" },
              { name: "Series 3", dark: "#f59e0b", light: "#d97706" },
              { name: "Series 4", dark: "#e879f9", light: "#a21caf" },
              { name: "Series 5", dark: "#fb923c", light: "#ea580c" },
              { name: "Series 6", dark: "#94a3b8", light: "#64748b" },
            ].map(({ name, dark, light }) => (
              <div key={name} className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
                <div className="flex gap-1.5">
                  <span className="w-5 h-5 rounded" style={{ background: dark, border: "1px solid rgba(255,255,255,0.1)" }} />
                  <span className="w-5 h-5 rounded" style={{ background: light, border: "1px solid rgba(0,0,0,0.1)" }} />
                </div>
                <span className="text-[12px] font-medium text-[rgb(var(--text-primary))]">{name}</span>
                <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))] ml-auto">{dark} / {light}</code>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">
            Use the dark values in dark mode, light values in light mode. Never use the same colour twice in one chart. Beyond six series, switch to patterns, dashes, or point markers to differentiate.
          </p>
        </Step>

        <Step n={3} title="Add a secondary encoding alongside colour">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            WCAG 1.4.1 requires that colour is not the only visual means of conveying information. For charts, this means adding at least one secondary encoding.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            {[
              { encoding: "Direct labels", desc: "Label each line at its end point or each bar at its peak. Removes reliance on the legend entirely." },
              { encoding: "Point markers", desc: "Add distinct marker shapes (circle, square, triangle) per series on line and scatter charts." },
              { encoding: "Pattern fill", desc: "Use hatched or dotted fills for bar and area charts in addition to colour." },
              { encoding: "Data table", desc: "Include a visually hidden data table equivalent for screen reader users." },
            ].map(({ encoding, desc }) => (
              <div key={encoding} className="p-3.5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
                <p className="text-[12px] font-semibold text-[rgb(var(--text-primary))] mb-1">{encoding}</p>
                <p className="text-[11px] text-[rgb(var(--text-secondary))] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Step>

        <Step n={4} title="Write accessible SVG markup">
          <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            SVG charts rendered in the DOM must have accessible markup so screen reader users get a meaningful description of the data.
          </p>
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-4 font-mono text-[11px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4 overflow-x-auto">
            <p className="text-[rgb(var(--text-tertiary))] mb-1">{`<!-- Wrap in figure, describe the key insight -->`}</p>
            <p>{`<figure>`}</p>
            <p className="pl-4">{`<svg role="img" aria-labelledby="chart-title chart-desc">`}</p>
            <p className="pl-8">{`<title id="chart-title">Monthly active users, Jan–Jun 2025</title>`}</p>
            <p className="pl-8">{`<desc id="chart-desc">`}</p>
            <p className="pl-12">{`Web users grew from 30K to 75K. iOS users grew from 20K to 55K.`}</p>
            <p className="pl-8">{`</desc>`}</p>
            <p className="pl-8">{`<!-- chart paths here -->`}</p>
            <p className="pl-4">{`</svg>`}</p>
            <p className="pl-4">{`<figcaption>Monthly active users increased 150% across both platforms.</figcaption>`}</p>
            <p>{`</figure>`}</p>
          </div>
          <CallOut type="warning">
            The aria-label should describe the key takeaway — not just the title. A screen reader user who cannot see the chart needs to understand the conclusion, not just the axis labels.
          </CallOut>
        </Step>

        <Step n={5} title="Validate in dark mode and under colour-blind simulation" last>
          <ol className="flex flex-col gap-2 text-[13px] text-[rgb(var(--text-secondary))]">
            {[
              "Switch the OS to dark mode. Confirm the chart uses the dark series palette values.",
              "Check that grid lines are at most 5% white opacity (rgba(255,255,255,0.05)) — heavier lines create noise.",
              "In Figma, use Stark's colour-blind simulator. Run Deuteranopia and Protanopia filters.",
              "Confirm each series is still distinguishable through shape/marker/label, not just colour.",
              "Open the chart with VoiceOver or NVDA. Confirm the title and description read out correctly.",
            ].map((step, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="shrink-0 font-semibold" style={{ color: "var(--nav-active-color)" }}>{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </Step>
      </div>

      {/* Related */}
      <div className="mt-8 pt-8 border-t border-[rgb(var(--border))]">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Related</p>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/foundations/data-viz", label: "Data Visualisation guidelines" },
            { href: "/foundations/contrast", label: "Contrast" },
            { href: "/how-tos/colour-contrast", label: "How to ensure colour is accessible" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[12px] font-medium px-3 py-1.5 rounded-full border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--accent-muted))] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
