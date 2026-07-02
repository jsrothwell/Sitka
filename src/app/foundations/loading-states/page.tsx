import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import {
  TypingDotsDemo,
  SkeletonDemo,
  SpinnerDemo,
  ProgressiveTextDemo,
} from "@/site/docs/LoadingStatesDemo";

export const metadata: Metadata = { title: "Loading States" };

const LOADING_PATTERNS = [
  {
    type: "Inline",
    context: "Within conversation flow, minimal disruption",
    pattern: "Three animated dots with subtle accent color",
    duration: "< 5s",
    motion: "motion.duration.fast",
  },
  {
    type: "Overlay",
    context: "Full-screen processing, blocks interaction",
    pattern: "Spinner with progress text, brand gradient background",
    duration: "5-30s",
    motion: "motion.duration.normal",
  },
  {
    type: "Skeleton",
    context: "Content structure is known, waiting for data",
    pattern: "Gray blocks matching text/image layout",
    duration: "< 10s",
    motion: "motion.duration.instant",
  },
  {
    type: "Progressive",
    context: "Streaming response or incremental updates",
    pattern: "Text appears word-by-word with cursor indicator",
    duration: "Streaming",
    motion: "motion.duration.slow",
  },
];

const MOMENTUM_RULES = [
  {
    rule: "Immediate Feedback",
    description: "Show loading state within 100ms of user action",
    token: "motion.duration.instant (80ms)",
  },
  {
    rule: "Progressive Disclosure",
    description: "Start with minimal indicator, add details after 300ms",
    token: "motion.easing.easeOut",
  },
  {
    rule: "Smart Timeout",
    description: "Switch to skeleton or error after 10s with no data",
    token: "motion.duration.slow (600ms)",
  },
];

export default function LoadingStatesPage() {
  return (
    <div>
      <PageHeader
        title="Loading States"
        description="Progress indicators for asynchronous operations. Choose the appropriate pattern based on context and expected duration."
      />

      {/* Inline typing dots */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Inline</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Three animated dots used inside conversation flows or inline with content. Minimal
          disruption — never blocks the surrounding UI.
        </p>
        <ComponentPreview>
          <TypingDotsDemo />
        </ComponentPreview>
      </section>

      {/* Skeleton */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Skeleton</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Placeholder shapes that mirror the content structure. Reduces perceived load time by
          anchoring the layout before data arrives. Use when the content shape is known — lists,
          cards, profile rows.
        </p>
        <ComponentPreview>
          <SkeletonDemo />
        </ComponentPreview>
      </section>

      {/* Spinner overlay */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Overlay</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          A spinner over a frosted-glass overlay blocks interaction during critical operations like
          saves, uploads, or payments. Keep overlay loading rare — prefer inline or skeleton
          whenever possible.
        </p>
        <ComponentPreview>
          <SpinnerDemo />
        </ComponentPreview>
      </section>

      {/* Progressive text */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Progressive</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Text streams in word-by-word with a blinking cursor. Used for AI-generated responses
          and real-time content. Always show at least one word before rendering — never flash an
          empty bubble.
        </p>
        <ComponentPreview>
          <ProgressiveTextDemo />
        </ComponentPreview>
      </section>

      {/* Pattern reference table */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Loading Patterns
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6">
          Four distinct patterns for different loading scenarios.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Type", "Context", "Pattern", "Duration", "Motion"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LOADING_PATTERNS.map((lp, i) => (
                <tr key={lp.type} className={i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{lp.type}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{lp.context}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{lp.pattern}</td>
                  <td className="px-4 py-3">
                    <code className="font-mono text-[11px] text-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))] px-1.5 py-0.5 rounded">
                      {lp.duration}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <code className="font-mono text-[11px] text-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))] px-1.5 py-0.5 rounded">
                      {lp.motion}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Momentum Rules
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6">
          Timing principles ensuring loading states feel responsive and intentional.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOMENTUM_RULES.map((rule) => (
            <div
              key={rule.rule}
              className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4"
            >
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1.5">
                {rule.rule}
              </h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed mb-2">
                {rule.description}
              </p>
              <code className="text-[10px] font-mono text-[rgb(var(--accent))] bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] px-2 py-0.5 rounded">
                {rule.token}
              </code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
