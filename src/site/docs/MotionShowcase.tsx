"use client";

import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib";

const CURVES = [
  {
    name: "Spring",
    token: "motion.easing.spring",
    css: "cubic-bezier(0.16, 1, 0.3, 1)",
    swift: ".spring(response: 0.4, dampingFraction: 0.8)",
    duration: "600ms",
    description: "The default for interactive elements. Energetic exit, settled arrival.",
  },
  {
    name: "Spring Bouncy",
    token: "motion.easing.springBouncy",
    css: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    swift: ".spring(response: 0.4, dampingFraction: 0.6)",
    duration: "600ms",
    description: "For playful micro-interactions. Overshoots briefly before settling.",
  },
  {
    name: "Ease Out",
    token: "motion.easing.easeOut",
    css: "cubic-bezier(0, 0, 0.2, 1)",
    swift: ".easeOut(duration: 0.25)",
    duration: "400ms",
    description: "Elements entering from off-screen. Fast start, slow settle.",
  },
  {
    name: "Ease In",
    token: "motion.easing.easeIn",
    css: "cubic-bezier(0.4, 0, 1, 1)",
    swift: ".easeIn(duration: 0.2)",
    duration: "400ms",
    description: "Elements leaving the screen. Builds speed before exit.",
  },
  {
    name: "Ease In Out",
    token: "motion.easing.easeInOut",
    css: "cubic-bezier(0.4, 0, 0.2, 1)",
    swift: ".easeInOut(duration: 0.3)",
    duration: "500ms",
    description: "Cross-fades and morph transitions. Symmetric, balanced.",
  },
  {
    name: "Linear",
    token: "motion.easing.linear",
    css: "linear",
    swift: ".linear(duration: 0.15)",
    duration: "500ms",
    description: "Looping animations only — spinners, progress, continuous motion.",
  },
] as const;

const DURATIONS = [
  { name: "Instant", value: "80ms", use: "Focus rings, active states" },
  { name: "Fast", value: "150ms", use: "Hover effects, micro-interactions" },
  { name: "Normal", value: "250ms", use: "Panel reveals, component transitions" },
  { name: "Slow", value: "400ms", use: "Page transitions, modal open/close" },
  { name: "Slower", value: "600ms", use: "Onboarding, first-load emphasis" },
];

function Ball({ css, duration }: { css: string; duration: string }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Double rAF: first frame lets the element mount at left:12px with no
    // transition, second frame applies the transition and triggers the animation.
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setActive(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[rgb(var(--accent))]"
      style={{
        left: active ? "calc(100% - 44px)" : "12px",
        transition: active ? `left ${duration} ${css}` : "none",
        boxShadow: "0 0 0 1px rgb(var(--accent) / 0.3), 0 0 12px rgb(var(--accent) / 0.25)",
      }}
    />
  );
}

function CurveDemo({ curve }: { curve: (typeof CURVES)[number] }) {
  const [key, setKey] = useState(0);

  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5 overflow-hidden">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">{curve.name}</h3>
          <code className="text-[11px] font-mono text-[rgb(var(--accent))]">{curve.token}</code>
        </div>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition-colors"
        >
          <Play className="w-3 h-3" />
          Replay
        </button>
      </div>

      {/* Animation strip */}
      <div className="relative h-12 mb-4 bg-[rgb(var(--background))] rounded-lg border border-[rgb(var(--border))] overflow-hidden">
        <Ball key={key} css={curve.css} duration={curve.duration} />
      </div>

      <p className="text-[12px] text-[rgb(var(--text-secondary))] mb-3 leading-relaxed">
        {curve.description}
      </p>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-10 text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">CSS</span>
          <code className="text-[10px] font-mono text-[rgb(var(--text-secondary))] bg-[rgb(var(--surface-raised))] px-2 py-0.5 rounded border border-[rgb(var(--border))]">
            {curve.css}
          </code>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-10 text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Swift</span>
          <code className="text-[10px] font-mono text-[rgb(var(--text-secondary))] bg-[rgb(var(--surface-raised))] px-2 py-0.5 rounded border border-[rgb(var(--border))]">
            {curve.swift}
          </code>
        </div>
      </div>
    </div>
  );
}

export function MotionShowcase() {
  return (
    <div>
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Easing Curves
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          Hit replay on any curve to see it animate. Spring-based curves are
          preferred for interactive elements — they feel physical, not timed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURVES.map((curve) => (
            <CurveDemo key={curve.name} curve={curve} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Duration Scale
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6">
          Use the shortest duration that still communicates the transition clearly.
          Never use duration to mask performance problems.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Name", "Value", "Typical Use"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DURATIONS.map((d, i) => (
                <tr key={d.name} className={cn("border-b border-[rgb(var(--border-subtle))] last:border-0", i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]")}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{d.name}</td>
                  <td className="px-4 py-3">
                    <code className="font-mono text-[11px] text-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))] px-1.5 py-0.5 rounded">
                      {d.value}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{d.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Physics, not timers",
              body: "Spring animations communicate mass and momentum. They feel alive because they mirror how real objects behave.",
            },
            {
              title: "Direction matters",
              body: "Elements entering from below slide up. Drawers enter from their edge. Motion direction should match spatial meaning.",
            },
            {
              title: "Choreography",
              body: "Stagger children by 30–50ms. The eye can only track one thing at a time; give it a path to follow.",
            },
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
