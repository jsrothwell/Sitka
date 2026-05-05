import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Box, Layers, Sparkles, Zap } from "lucide-react";

export const metadata: Metadata = { title: "Introduction" };

const features = [
  {
    icon: Box,
    title: "Components",
    description:
      "Documented, accessible building blocks for React and SwiftUI — every variant, state, and interaction covered.",
    href: "/components/button",
  },
  {
    icon: Layers,
    title: "Design Tokens",
    description:
      "Mathematical constants for colour, spacing and typography shared across every platform and target.",
    href: "/tokens",
  },
  {
    icon: Sparkles,
    title: "Foundations",
    description:
      "Core visual principles and layout systems that enforce product-wide consistency at any scale.",
    href: "/foundations/color",
  },
  {
    icon: Zap,
    title: "Accessibility",
    description:
      "WCAG 2.1 compliance built-in. Contrast ratios, interaction models, and screen-reader semantics by default.",
    href: "/principles",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="pt-4 pb-14 border-b border-[rgb(var(--border))]">
        <span className="w-20 h-20 rounded-full bg-white mb-7 flex items-center justify-center overflow-hidden shrink-0">
          <Image src="/sitka-logo.png" width={76} height={76} alt="Sitka logo" />
        </span>
        <h1
          className="mb-6 max-w-[560px]"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 3.25rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Sitka Design System
        </h1>

        <p
          className="text-[rgb(var(--text-secondary))] max-w-[480px] mb-9"
          style={{ fontSize: "clamp(1rem, 2vw, 1.1875rem)", lineHeight: 1.65, fontWeight: 500 }}
        >
          Sitka bridges engineering and design with a single source of truth —
          consistent, accessible, and built to scale across Web and iOS.
        </p>

      </section>

      {/* ── Feature grid ──────────────────────────────── */}
      <section className="py-12 border-b border-[rgb(var(--border))]">
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          {features.map(({ icon: Icon, title, description, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-3 rounded-[10px] hover:opacity-90 transition-standard"
              style={{ padding: "2rem 2.25rem", backgroundColor: "var(--card-tint-bg)" }}
            >
              <div className="w-6 h-6 text-[rgb(var(--text-secondary))] flex items-center justify-center shrink-0">
                <Icon className="w-full h-full" strokeWidth={1.75} />
              </div>
              <div>
                <p
                  className="text-[rgb(var(--text-primary))] mb-2 flex items-center gap-1.5"
                  style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.3 }}
                >
                  {title}
                  <ArrowRight className="w-3.5 h-3.5 text-[rgb(var(--text-tertiary))] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-standard" />
                </p>
                <p
                  className="text-[rgb(var(--text-secondary))]"
                  style={{ fontSize: "1rem", lineHeight: 1.6, fontWeight: 500 }}
                >
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────── */}
      <section className="pt-8 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="label-mono">Sitka Engineering Standards · v1.0.0</p>
        <div className="flex items-center gap-5">
          {["Changelog", "License", "Status"].map((item) => (
            <a
              key={item}
              href="#"
              className="label-mono hover:text-[rgb(var(--text-primary))] transition-standard"
            >
              {item}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
