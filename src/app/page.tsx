import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Hexagon, Layers, Box, Sparkles, Zap } from "lucide-react";

export const metadata: Metadata = { title: "Introduction" };

const features = [
  {
    icon: Box,
    title: "Component Library",
    description:
      "Production-ready components with full React, HTML, and SwiftUI implementations.",
    href: "/components/button",
  },
  {
    icon: Layers,
    title: "Design Tokens",
    description:
      "Unified token system for color, typography, spacing, and motion — exportable to JSON or Swift.",
    href: "/tokens",
  },
  {
    icon: Sparkles,
    title: "Liquid Glass UI",
    description:
      "Frosted glass effects, depth, and translucency baked into every surface.",
    href: "/foundations/color",
  },
  {
    icon: Zap,
    title: "Motion System",
    description:
      "Defined easing curves, durations, and spring physics for consistent animations.",
    href: "/foundations/motion",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[rgb(var(--accent))] flex items-center justify-center shadow-[0_0_0_1px_rgba(139,109,255,0.3),0_0_20px_rgba(139,109,255,0.2)]">
            <Hexagon className="w-5 h-5 text-white fill-white/20" strokeWidth={1.5} />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[rgb(var(--accent))]">
            Sitka Design System
          </span>
        </div>

        <h1 className="text-[44px] font-semibold tracking-tight text-[rgb(var(--text-primary))] leading-[1.1] mb-4">
          The standard for
          <br />
          <span className="text-[rgb(var(--accent))]">premium interfaces.</span>
        </h1>

        <p className="text-[17px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-xl mb-8">
          Sitka is a high-fidelity design system built for teams who care about
          craft. Every component ships with React, HTML/CSS, and SwiftUI
          implementations, unified by a single token layer.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="/components/button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[rgb(var(--accent))] text-white text-[14px] font-medium hover:opacity-90 transition-opacity shadow-[0_0_0_1px_rgba(139,109,255,0.3),0_4px_16px_rgba(139,109,255,0.3)]"
          >
            Explore Components
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/tokens"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[rgb(var(--border))] text-[rgb(var(--text-primary))] text-[14px] font-medium hover:bg-[rgb(var(--surface))] transition-colors"
          >
            View Tokens
          </Link>
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {features.map(({ icon: Icon, title, description, href }) => (
          <Link
            key={href}
            href={href}
            className="group p-5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] hover:border-[rgb(var(--accent))] transition-all hover:shadow-[0_0_0_1px_rgba(139,109,255,0.15),0_4px_20px_rgba(139,109,255,0.08)]"
          >
            <div className="w-8 h-8 rounded-lg bg-[rgb(var(--accent-subtle))] flex items-center justify-center mb-3">
              <Icon className="w-4 h-4 text-[rgb(var(--accent))]" />
            </div>
            <h3 className="text-[14px] font-semibold text-[rgb(var(--text-primary))] mb-1">
              {title}
            </h3>
            <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">
              {description}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick stats */}
      <div className="flex flex-wrap gap-8 py-8 border-t border-[rgb(var(--border))]">
        {[
          { label: "Components", value: "8" },
          { label: "Design Tokens", value: "60+" },
          { label: "Platforms", value: "3" },
          { label: "Motion Curves", value: "6" },
        ].map(({ label, value }) => (
          <div key={label}>
            <div className="text-[28px] font-semibold text-[rgb(var(--text-primary))] tracking-tight">
              {value}
            </div>
            <div className="text-[13px] text-[rgb(var(--text-tertiary))]">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
