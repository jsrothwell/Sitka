import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "Component Lifecycle" };

const STAGES = [
  {
    badge: "Alpha",
    color: "text-[rgb(var(--status-warning))] bg-[rgb(var(--status-warning)/0.12)]",
    summary: "Experimental — API will change",
    criteria: [
      "Component exists in code but API is not final",
      "Not covered by semver guarantees",
      "May be removed without a deprecation period",
      "Feedback actively sought from early adopters",
    ],
    usage: "Internal projects and prototypes only. Do not ship to production.",
  },
  {
    badge: "Beta",
    color: "text-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))]",
    summary: "Stable API, gathering real-world feedback",
    criteria: [
      "API is stable — no breaking changes without a major version bump",
      "Core use cases are tested",
      "Documentation is complete but may be updated",
      "Accessibility review is in progress or complete",
    ],
    usage: "Safe to ship to production with the expectation of minor updates.",
  },
  {
    badge: "Stable",
    color: "text-[rgb(var(--status-success))] bg-[rgb(var(--status-success)/0.12)]",
    summary: "Production-ready, fully supported",
    criteria: [
      "Full test coverage across platforms (React, HTML, SwiftUI)",
      "WCAG 2.1 AA accessibility audit passed",
      "Token pipeline verified",
      "Complete doc page: Preview, States, Motion, Implementation, Props, ARIA, Keyboard, Accessibility",
    ],
    usage: "The default state for all shipped components. Breaking changes require a semver major.",
  },
  {
    badge: "Deprecated",
    color: "text-[rgb(var(--text-tertiary))] bg-[rgb(var(--surface-raised))]",
    summary: "Scheduled for removal — migrate now",
    criteria: [
      "A successor component or pattern exists",
      "Migration guide is published on the component page",
      "Component remains functional for at least one major version",
      "All internal usages have been updated or scheduled",
    ],
    usage: "Stop using in new code. Migrate existing usages to the recommended replacement before the next major version.",
  },
];

const CHANGELOG_FORMAT = `## [2.0.0] - 2026-08-01

### Deprecated
- **OldButton**: use Button variant="primary" instead.
  Migration: replace <OldButton> with <Button>.
  Removal target: v3.0.

### Removed
- **LegacyCard**: deprecated in v1.x. Use Card + CardHeader.
`;

export default function LifecyclePage() {
  return (
    <div>
      <PageHeader
        title="Component Lifecycle"
        description="Every Sitka component carries a lifecycle badge — Alpha, Beta, Stable, or Deprecated. The badge tells you how stable the API is, what testing has been done, and whether it's safe to ship."
      />

      {/* ── Stages ───────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Lifecycle stages</h2>
        <div className="flex flex-col gap-4">
          {STAGES.map((stage) => (
            <div key={stage.badge} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6">
              <div className="flex items-start gap-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide shrink-0 ${stage.color}`}>
                  {stage.badge}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-3">{stage.summary}</p>
                  <ul className="space-y-1.5 mb-3">
                    {stage.criteria.map((c) => (
                      <li key={c} className="flex gap-2 text-[13px] text-[rgb(var(--text-secondary))]">
                        <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[12px] font-medium text-[rgb(var(--text-tertiary))]">{stage.usage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Promotion criteria ───────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Promotion criteria</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Transition", "Required before promoting"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { from: "Alpha → Beta",       required: "API design review, one real product adoption, basic test coverage" },
                { from: "Beta → Stable",       required: "Full accessibility audit, complete doc page, token pipeline, design sign-off" },
                { from: "Stable → Deprecated", required: "Successor identified, migration guide written, removal version set" },
                { from: "Deprecated → Removed",required: "All internal usages migrated, one full major version has passed since deprecation" },
              ].map((row) => (
                <tr key={row.from} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.from}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Changelog convention ─────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Changelog convention</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          Deprecations and removals must be recorded in <code className="font-mono text-[11px] text-[rgb(var(--accent))]">CHANGELOG.md</code> with the successor component and removal target version.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
          <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] leading-relaxed overflow-x-auto"><code>{CHANGELOG_FORMAT}</code></pre>
        </div>
      </section>

      {/* ── Semver policy ────────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Semver policy</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Patch (x.x.N): bug fixes and visual tweaks that don't change props or tokens.",
            "Minor (x.N.0): new components, new props, new tokens — all backwards-compatible.",
            "Major (N.0.0): breaking changes to existing props, removed components, token renames.",
            "Alpha components are excluded from semver — they can break in any release.",
            "Beta components follow semver for breaking changes only from the point they're labelled Beta.",
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
