import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "How-tos" };

const HOW_TOS = [
  {
    href: "/how-tos/dark-mode",
    title: "How to design for dark mode",
    summary: "Apply the Sitka colour token set correctly in both light and dark contexts. Understand surface stepping, elevation without shadows, and contrast validation.",
    tags: ["Colour", "Tokens"],
  },
  {
    href: "/how-tos/colour-contrast",
    title: "How to ensure colour is accessible",
    summary: "Check that every colour pairing in your designs meets WCAG 2.1 AA. Covers validated token pairings, testing tools, and what to do when the palette doesn't meet the threshold.",
    tags: ["Accessibility", "Colour"],
  },
  {
    href: "/how-tos/write-for-interfaces",
    title: "How to write clear interface copy",
    summary: "Apply the Sitka writing guidelines to button labels, error messages, empty states, and tooltips. Practical before/after examples for the most common UI copy failures.",
    tags: ["Writing", "Content"],
  },
  {
    href: "/how-tos/data-visualisation",
    title: "How to visualise data accessibly",
    summary: "Choose the right chart type, pick from the accessible series palette, and mark up SVG charts so they work for keyboard and screen-reader users.",
    tags: ["Data viz", "Accessibility"],
  },
  {
    href: "/how-tos/onboarding-flow",
    title: "How to design an onboarding flow",
    summary: "Structure a wizard, decide what to ask and what to defer, write clear step copy, and give users a satisfying completion moment — all using the Sitka onboarding pattern.",
    tags: ["Patterns", "UX"],
  },
];

export default function HowTosPage() {
  return (
    <div>
      {/* Header */}
      <section className="pb-10 mb-10 border-b border-[rgb(var(--border))]">
        <h1 className="mb-4">How-tos</h1>
        <p
          className="text-[rgb(var(--text-secondary))] max-w-[580px]"
          style={{ fontSize: "1.0625rem", fontWeight: 500, lineHeight: 1.6 }}
        >
          Practical step-by-step guides for the most common design and engineering tasks. Each how-to links back to the relevant foundations, components, and patterns.
        </p>
      </section>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {HOW_TOS.map(({ href, title, summary, tags }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5 hover:border-[rgb(var(--accent-muted))] hover:bg-[rgb(var(--surface-hover))] transition-standard"
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                className="text-[rgb(var(--text-primary))] leading-snug"
                style={{ fontSize: "1.0625rem", fontWeight: 600 }}
              >
                {title}
              </h2>
              <ArrowRight className="w-4 h-4 text-[rgb(var(--text-tertiary))] shrink-0 mt-0.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-standard" />
            </div>

            <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">{summary}</p>

            <div className="flex gap-1.5 flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-tertiary))]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
