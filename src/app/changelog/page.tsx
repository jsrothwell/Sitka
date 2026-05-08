import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Changelog" };

const RELEASES = [
  {
    version: "1.1.0",
    date: "2026-05-08",
    tag: "Latest",
    summary: "New components, patterns, and GitHub Pages deployment support.",
    sections: [
      {
        label: "Added",
        items: [
          "New Components: Slider (single/range), Date-Time Pickers (calendar/time), Carousel (auto-advancing), and Snackbar (notifications)",
          "New Patterns: Collaboration (presence/sharing), Drag and Drop (kanban/reordering), and Data Entry (validation/wizards)",
          "GitHub Pages deployment pipeline via GitHub Actions",
          "Static HTML export support with next.config.ts optimizations",
          "New documentation: DEPLOYMENT.md and DEPLOYMENT-VERIFICATION.md",
        ],
      },
      {
        label: "Improved",
        items: [
          "Replaced next/image with standard <img> tags for better static export compatibility",
          "Enhanced sidebar and header logo rendering for static sites",
        ],
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-05-05",
    summary: "Initial public release of Sitka Design System.",
    sections: [
      {
        label: "Added",
        items: [
          "17 component pages: Button, Input, Modal, Navigation, Card, Badge, Avatar, Tooltip, Form Controls, Table, Split Button, Segmented Button, Breadcrumb, Combobox, Date Range Picker, Bottom Tab Bar, Bottom Sheet, Chip, Slider, Snackbar, Carousel",
          "17 foundation pages: Color, Contrast, Typography, Spacing, Motion, Interaction, Writing, Data Visualisation, Charting, Glass, Shadows, Border Radius, Empty States, Loading States, AI Agent Standards, Desktop Layout, Keyboard Shortcuts",
          "SwiftUI · macOS as a 4th platform tab across all component pages",
          "Design token export pipeline (Style Dictionary) — generates CSS variables, Swift constants, and JSON",
          "Library guides for React · Next.js, React · Vite, Tokens Only, iOS · SwiftUI, and macOS · SwiftUI",
          "Figma token integration via the Figma Variables API",
          "Dark-first color system with CSS custom properties and semantic token naming",
        ],
      },
    ],
  },
];

const TAG_STYLES: Record<string, string> = {
  Latest:      "bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]",
  Breaking:    "bg-red-500/10 text-red-400",
  Security:    "bg-amber-500/10 text-amber-400",
};

export default function ChangelogPage() {
  return (
    <div>
      <PageHeader
        title="Changelog"
        description="Every release, summarised. Breaking changes are marked explicitly."
      />

      <div className="space-y-14">
        {RELEASES.map((release) => (
          <div key={release.version} className="grid grid-cols-[160px_1fr] gap-8 max-sm:grid-cols-1 max-sm:gap-4">
            {/* Left — version meta */}
            <div className="pt-0.5">
              <p className="font-mono text-[22px] font-bold text-[rgb(var(--text-primary))] leading-none mb-1">
                v{release.version}
              </p>
              <p className="text-[12px] text-[rgb(var(--text-tertiary))] font-mono mb-2">{release.date}</p>
              {release.tag && (
                <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${TAG_STYLES[release.tag] ?? TAG_STYLES.Latest}`}>
                  {release.tag}
                </span>
              )}
            </div>

            {/* Right — content */}
            <div className="space-y-6">
              <p className="text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed">{release.summary}</p>

              {release.sections.map((section) => (
                <div key={section.label}>
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">
                    {section.label}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2 text-[14px] text-[rgb(var(--text-secondary))]">
                        <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
