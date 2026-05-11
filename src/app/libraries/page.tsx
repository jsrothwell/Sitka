import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Libraries" };

const libraries = [
  {
    href: "/libraries/react",
    name: "React · Next.js",
    description:
      "Drop Sitka components into any Next.js app. Full server/client component support, Tailwind 4, dark mode out of the box.",
    badge: "Official",
    badgeColor: "accent" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85-1.03 0-1.87-.85-1.87-1.85 0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47m-7.07-4c.27-.06.57-.11.88-.16l-.3.51-.29.51c-.11-.29-.22-.58-.29-.86m7.37-2.79c-1.59-1.5-2.97-2.08-3.6-1.7-.63.35-.82 1.82-.31 3.96.8-.18 1.62-.29 2.4-.36.48-.67.99-1.31 1.51-1.9M7.37 4c-.63.35-.82 1.82-.31 3.96.8-.18 1.62-.29 2.4-.36.48-.67.99-1.31 1.51-1.9-1.59-1.5-2.97-2.08-3.6-1.7M12 6.07c-.29.47-.61.94-.91 1.47L9.86 9l.88-.03c.38-.01.78-.01 1.26-.01.48 0 .88 0 1.26.01l.88.03-1.23-1.46c-.3-.53-.62-1-.91-1.47m7.37 6.58c-.3-.53-.62-1-.91-1.47l-1.23-1.46.88-.03C18.49 9.69 18.49 9.69 18.49 9.69l.88.03-1.23 1.46c-.3.53-.62 1-.91 1.47l-.81 1.5.81 1.5c.3.53.62 1 .91 1.47l1.23 1.46-.88.03c-.38.01-.78.01-1.26.01v.01c-.48 0-.88 0-1.26-.01l-.88-.03 1.23 1.46c.3.53.62 1 .91 1.47.54-.03 1.11-.03 1.71-.03.6 0 1.17 0 1.71.03.29-.47.61-.94.91-1.47l.81-1.5-.81-1.5z" />
      </svg>
    ),
    details: ["React 19", "Next.js 16", "Tailwind 4", "Framer Motion"],
  },
  {
    href: "/libraries/vite",
    name: "React · Vite",
    description:
      "Use Sitka in a standalone Vite SPA. Same components and tokens, zero framework overhead.",
    badge: "Official",
    badgeColor: "accent" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.132-.swith" />
        <path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354z" />
      </svg>
    ),
    details: ["React 19", "Vite 5", "Tailwind 4", "CSS Variables"],
  },
  {
    href: "/libraries/tokens",
    name: "Tokens Only",
    description:
      "Consume Sitka's design tokens without React. Available as CSS custom properties, JSON, and a JS/TS module.",
    badge: "Framework-agnostic",
    badgeColor: "neutral" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    details: ["CSS Variables", "JSON export", "JS/TS module", "DTCG format"],
  },
  {
    href: "/libraries/ios",
    name: "iOS · SwiftUI",
    description:
      "Export Sitka tokens as a Swift file and use them directly in SwiftUI with typed color and spacing constants.",
    badge: "Official",
    badgeColor: "accent" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    details: ["SwiftUI", "Swift 5.9+", "iOS 16+", "Typed tokens"],
  },
  {
    href: "/libraries/figma",
    name: "Figma",
    description:
      "Sitka's Figma library is coming soon — components, variables, and Code Connect mappings that link your design directly to this codebase.",
    badge: "Coming Soon",
    badgeColor: "neutral" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.587v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.587v8.98zM8.148 10.52c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117v-6.038H8.148zm4.587 0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49-4.49-2.014-4.49-4.49V10.52zm4.588 7.509c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117v3.019c0 1.665 1.354 3.019 3.117 3.019z" />
      </svg>
    ),
    details: ["Components", "Variables", "Code Connect", "Auto Layout"],
  },
];

const badgeStyles = {
  accent: "bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] border-[rgb(var(--accent-muted))]",
  neutral: "bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-secondary))] border-[rgb(var(--border))]",
};

export default function LibrariesPage() {
  return (
    <div>
      <PageHeader
        title="Libraries"
        description="Sitka ships adapters for every platform in your stack. Pick the one that matches your project and follow the guide to get up and running in minutes."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {libraries.map((lib) => (
          <Link
            key={lib.href}
            href={lib.href}
            className="group relative flex flex-col gap-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5 transition-all hover:border-[rgb(var(--accent-muted))] hover:bg-[rgb(var(--surface-raised))]"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-secondary))] border border-[rgb(var(--border))] group-hover:text-[rgb(var(--accent))] transition-colors">
                  {lib.icon}
                </div>
                <h2 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] leading-tight">
                  {lib.name}
                </h2>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badgeStyles[lib.badgeColor]}`}
              >
                {lib.badge}
              </span>
            </div>

            {/* Description */}
            <p className="text-[13px] leading-relaxed text-[rgb(var(--text-secondary))]">
              {lib.description}
            </p>

            {/* Pills */}
            <div className="flex flex-wrap gap-1.5">
              {lib.details.map((d) => (
                <span
                  key={d}
                  className="rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] px-2 py-0.5 font-mono text-[11px] text-[rgb(var(--text-tertiary))]"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--text-tertiary))] opacity-0 transition-opacity group-hover:opacity-100">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-10 text-[13px] text-[rgb(var(--text-tertiary))]">
        All libraries share the same{" "}
        <Link href="/tokens" className="text-[rgb(var(--accent))] underline underline-offset-2 hover:opacity-80">
          design tokens
        </Link>{" "}
        — colour, spacing, motion, and typography stay consistent across every platform.
      </p>
    </div>
  );
}
