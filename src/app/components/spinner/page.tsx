import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Spinner } from "@/components/ui/Spinner";

export const metadata: Metadata = { title: "Spinner" };

const PROPS = [
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg"',
    default: '"md"',
    description: "Controls the spinner diameter and stroke width.",
  },
  {
    name: "label",
    type: "string",
    default: '"Loading…"',
    description: "Accessible label announced by screen readers via aria-label and a visually-hidden <span>.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional classes applied to the outer <span> wrapper.",
  },
];

const CODE = {
  react: {
    filename: "Spinner.tsx",
    code: `import { Spinner } from "@/components/ui/Spinner";

// Default
<Spinner />

// Sizes
<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />

// Custom accessible label
<Spinner label="Saving changes…" />

// Inline within text
<div className="flex items-center gap-2">
  <Spinner size="sm" />
  <span>Loading results…</span>
</div>`,
  },
  html: {
    filename: "spinner.html",
    code: `<span role="status" aria-label="Loading…" style="display:inline-flex; align-items:center; justify-content:center;">
  <svg
    width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style="animation: spin 0.75s linear infinite; color: rgb(var(--accent));"
  >
    <circle cx="12" cy="12" r="10"
      stroke="currentColor" stroke-width="2.5" stroke-opacity="0.2" />
    <path d="M12 2a10 10 0 0 1 10 10"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
  </svg>
  <span class="sr-only">Loading…</span>
</span>

<style>
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>`,
  },
  swift: {
    filename: "SpinnerView.swift",
    code: `import SwiftUI

// SwiftUI has a built-in ProgressView that maps to Spinner
struct SpinnerView: View {
  var body: some View {
    VStack(spacing: 24) {
      // Default (medium)
      ProgressView()
        .progressViewStyle(.circular)

      // With label
      ProgressView("Loading…")
        .progressViewStyle(.circular)

      // Scaled
      ProgressView()
        .progressViewStyle(.circular)
        .scaleEffect(1.5)
        .tint(.accentColor)
    }
  }
}`,
  },
  macos: {
    filename: "SpinnerView.swift",
    code: `import SwiftUI

struct SpinnerView: View {
  var body: some View {
    HStack(spacing: 8) {
      ProgressView()
        .progressViewStyle(.circular)
        .controlSize(.small)
      Text("Loading…")
        .foregroundStyle(.secondary)
    }
  }
}`,
  },
};

export default function SpinnerPage() {
  return (
    <div>
      <PageHeader
        title="Spinner"
        description="An inline loading indicator for asynchronous operations. Uses a CSS animation so it works without JavaScript and never blocks the main thread."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
          <div className="flex items-center gap-6">
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Sizes
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Size", "Diameter", "Stroke width", "Typical use"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { size: "xs", diam: "12px", stroke: "3px", use: "Inside buttons or badges" },
                { size: "sm", diam: "16px", stroke: "2.5px", use: "Inline text, compact rows" },
                { size: "md", diam: "24px", stroke: "2.5px", use: "Default — cards, panels" },
                { size: "lg", diam: "32px", stroke: "2px",   use: "Full-section loading states" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.size}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.diam}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.stroke}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Inline usage */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Inline usage
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <div className="flex items-center gap-2 text-[14px] text-[rgb(var(--text-secondary))]">
              <Spinner size="sm" label="Saving changes…" />
              <span>Saving changes…</span>
            </div>
            <div className="flex items-center gap-2 text-[14px] text-[rgb(var(--text-secondary))]">
              <Spinner size="xs" />
              <span className="text-[13px] text-[rgb(var(--text-tertiary))]">Syncing</span>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Implementation
        </h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Props
        </h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Accessibility
        </h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'The wrapper uses role="status" so screen readers announce when loading begins.',
            "The SVG is aria-hidden; the accessible text is provided by a visually-hidden <span> — both the aria-label and the sr-only text are used for maximum compatibility.",
            "Provide a descriptive label prop when the context is not obvious (e.g. \"Saving changes…\" vs the default \"Loading…\").",
            "For page-level loading states, consider aria-live=\"polite\" on the container so users are notified when content becomes available.",
            "Do not use Spinner as the sole loading indicator inside a button that already handles its own loading state — prefer the Button component's built-in loading prop.",
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
