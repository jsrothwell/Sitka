import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { PropsTable } from "@/site/docs/PropsTable";

export const metadata: Metadata = { title: "Chip" };

const PROPS = [
  { name: "label", type: "string", required: true, description: "Text content of the chip." },
  { name: "variant", type: '"filter" | "input" | "suggestion"', default: '"filter"', description: "Controls chip affordance and interaction model." },
  { name: "selected", type: "boolean", default: "false", description: "Selected state — applies filled style and leading checkmark." },
  { name: "onDismiss", type: "() => void", description: "Renders a × dismiss button when provided. Use for input chips." },
  { name: "leadingIcon", type: "ReactNode", description: "Optional icon or avatar placed before the label." },
  { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction and reduces opacity to 40%." },
  { name: "size", type: '"sm" | "md"', default: '"md"', description: "sm is 28px tall; md is 32px tall." },
];

const STATES = [
  { state: "Default", bg: "rgb(var(--surface))", border: "rgb(var(--border))", color: "rgb(var(--text-secondary))", note: "Resting, unselected" },
  { state: "Hover", bg: "rgb(var(--surface-raised))", border: "rgb(var(--border))", color: "rgb(var(--text-primary))", note: "Cursor over chip" },
  { state: "Selected", bg: "var(--nav-active-color)", border: "transparent", color: "white", note: "Active filter; check icon shown" },
  { state: "Disabled", bg: "rgb(var(--surface))", border: "rgb(var(--border))", color: "rgb(var(--text-tertiary))", note: "40% opacity, not interactive" },
];

export default function ChipPage() {
  return (
    <div>
      <PageHeader
        title="Chip"
        description="Compact interactive tokens for filtering, tagging, and quick actions. Three distinct variants — filter, input, and suggestion — each with a specific job."
      />

      {/* ── Filter chips ──────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Filter chips</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Toggle on/off to narrow a content set. Multiple chips can be selected simultaneously. A leading check icon confirms selection state without relying on colour alone.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex flex-wrap gap-2 mb-4">
          {[
            { label: "All", selected: false },
            { label: "Design", selected: true },
            { label: "Engineering", selected: true },
            { label: "Research", selected: false },
            { label: "Marketing", selected: false },
            { label: "Leadership", selected: false },
          ].map(({ label, selected }) => (
            <div
              key={label}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-medium border cursor-pointer select-none"
              style={selected ? {
                background: "var(--nav-active-color)",
                borderColor: "transparent",
                color: "white",
              } : {
                background: "rgb(var(--surface))",
                borderColor: "rgb(var(--border))",
                color: "rgb(var(--text-secondary))",
              }}
            >
              {selected && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {label}
            </div>
          ))}
        </div>
        <p className="text-[12px] text-[rgb(var(--text-tertiary))]">Design and Engineering are selected. All other chips are in their default state.</p>
      </section>

      {/* ── Input chips ──────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Input chips</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Represent discrete values entered by the user — typically recipients, tags, or categories. Each chip includes a dismiss button to remove the value. They live inside an input field and can be created by pressing <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">Enter</kbd> or <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">,</kbd>.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8">
          <div className="rounded-[10px] border border-[rgb(var(--accent))] bg-[rgb(var(--surface))] px-3 py-2 flex flex-wrap gap-1.5 items-center" style={{ boxShadow: "0 0 0 3px rgb(var(--accent) / 0.15)" }}>
            {["jamie@company.com", "alex@example.org", "sam@sitka.io"].map((email) => (
              <div
                key={email}
                className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[11px] font-medium border"
                style={{
                  background: "rgb(var(--accent) / 0.08)",
                  borderColor: "rgb(var(--accent) / 0.25)",
                  color: "rgb(var(--text-primary))",
                }}
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: "var(--nav-active-color)" }}>
                  {email[0].toUpperCase()}
                </span>
                {email}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-50 cursor-pointer">
                  <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
            ))}
            <span className="text-[13px] text-[rgb(var(--text-tertiary))] ml-1">Add recipient…</span>
          </div>
        </div>
      </section>

      {/* ── Suggestion chips ─────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Suggestion chips</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Surface pre-defined quick actions or completions. Unlike filter chips, suggestion chips trigger an action on tap rather than toggling state. They disappear or transform after selection.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex flex-wrap gap-2">
          {[
            { label: "Add a label", icon: "🏷" },
            { label: "Set priority", icon: "⚡" },
            { label: "Assign to me", icon: "👤" },
            { label: "Due today", icon: "📅" },
            { label: "Mark urgent", icon: "🔴" },
          ].map(({ label, icon }) => (
            <div
              key={label}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-medium border cursor-pointer"
              style={{
                background: "rgb(var(--surface))",
                borderColor: "rgb(var(--border))",
                color: "rgb(var(--text-secondary))",
              }}
            >
              <span className="text-[13px]">{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ── Vibe / mood indicator (recipe) ───────────── */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))]">Vibe / mood indicator</h2>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] px-2 py-0.5 rounded-full border border-[rgb(var(--border))]">Recipe</span>
        </div>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          A non-interactive chip variant that pairs an emoji with a short label to convey mood, sentiment, or
          informal status — e.g. how an applicant felt about an interview. Reuses the chip&apos;s capsule shape and
          sizing; the only difference is a leading emoji glyph in place of an icon and a disabled interaction model.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex flex-wrap gap-2">
          {[
            { emoji: "🔥", label: "Great vibe" },
            { emoji: "🙂", label: "Positive" },
            { emoji: "😐", label: "Neutral" },
            { emoji: "😬", label: "Awkward" },
            { emoji: "💀", label: "Rough" },
          ].map(({ emoji, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-medium border select-none"
              style={{
                background: "rgb(var(--surface))",
                borderColor: "rgb(var(--border))",
                color: "rgb(var(--text-secondary))",
              }}
            >
              <span className="text-[13px]" aria-hidden="true">{emoji}</span>
              {label}
            </div>
          ))}
        </div>
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-3">
          The emoji is decorative (<code className="font-mono">aria-hidden</code>) — the label text carries the meaning, so it must
          never be omitted in favour of the emoji alone.
        </p>
      </section>

      {/* ── Anatomy ──────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-10 flex items-center justify-center">
          <svg viewBox="0 0 480 160" width="480" height="160" className="max-w-full">
            {/* Chip outline */}
            <rect x="140" y="60" width="200" height="40" rx="20" fill="rgb(var(--surface))" stroke="rgb(var(--border))" strokeWidth="1.5" />
            {/* Leading icon */}
            <circle cx="168" cy="80" r="10" fill="rgb(var(--accent) / 0.15)" />
            <text x="168" y="84" textAnchor="middle" fontSize="10" fill="rgb(var(--accent))">✓</text>
            {/* Label */}
            <text x="220" y="85" textAnchor="middle" fontSize="12" fontWeight="500" fill="rgb(var(--text-primary))">Engineering</text>
            {/* Dismiss */}
            <circle cx="312" cy="80" r="8" fill="rgb(var(--surface-raised))" />
            <text x="312" y="84" textAnchor="middle" fontSize="10" fill="rgb(var(--text-tertiary))">×</text>

            {/* Annotation: leading icon */}
            <line x1="168" y1="48" x2="168" y2="30" stroke="rgb(var(--border))" strokeWidth="1" strokeDasharray="3 2" />
            <text x="168" y="22" textAnchor="middle" fontSize="10" fill="rgb(var(--text-tertiary))">Leading icon</text>

            {/* Annotation: label */}
            <line x1="220" y1="112" x2="220" y2="130" stroke="rgb(var(--border))" strokeWidth="1" strokeDasharray="3 2" />
            <text x="220" y="142" textAnchor="middle" fontSize="10" fill="rgb(var(--text-tertiary))">Label</text>

            {/* Annotation: dismiss */}
            <line x1="312" y1="48" x2="312" y2="30" stroke="rgb(var(--border))" strokeWidth="1" strokeDasharray="3 2" />
            <text x="312" y="22" textAnchor="middle" fontSize="10" fill="rgb(var(--text-tertiary))">Dismiss</text>

            {/* Annotation: container */}
            <line x1="140" y1="112" x2="90" y2="130" stroke="rgb(var(--border))" strokeWidth="1" strokeDasharray="3 2" />
            <text x="75" y="142" textAnchor="middle" fontSize="10" fill="rgb(var(--text-tertiary))">Container</text>
          </svg>
        </div>
      </section>

      {/* ── Sizes ────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Sizes</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { size: "sm", label: "Small — 28px", h: "h-7 text-[11px] px-2.5", chips: ["Design", "Engineering"] },
            { size: "md", label: "Medium — 32px", h: "h-8 text-[12px] px-3", chips: ["Design", "Engineering"] },
          ].map(({ label, h, chips }) => (
            <div key={label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-6 flex flex-col gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{label}</p>
              <div className="flex flex-wrap gap-2">
                {chips.map((c) => (
                  <div key={c} className={`inline-flex items-center gap-1.5 ${h} rounded-full border font-medium`}
                    style={{ background: "rgb(var(--surface))", borderColor: "rgb(var(--border))", color: "rgb(var(--text-secondary))" }}>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── States ───────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">States</h2>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["State", "Appearance", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STATES.map((s, i) => (
                <tr key={s.state} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{s.state}</td>
                  <td className="px-4 py-3">
                    <div className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-medium border"
                      style={{ background: s.bg, borderColor: s.border, color: s.color, opacity: s.state === "Disabled" ? 0.4 : 1 }}>
                      {s.state === "Selected" && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      Design
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Usage guidelines ─────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Usage guidelines</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { type: "do", items: ["Use filter chips to narrow a list or grid of items", "Limit chip labels to 1–3 words — they should scan instantly", "Show the count of active filters when chips are collapsed", "Allow all chips to be deselected (show full unfiltered state)"] },
            { type: "dont", items: ["Use chips for primary navigation or page-level actions", "Put more than ~8 chips in a single row without wrapping or overflow", "Mix filter and suggestion chips in the same group", "Use chips where a checkbox group would be clearer"] },
          ].map(({ type, items }) => (
            <div key={type} className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
              <div className={`px-4 py-2.5 border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider ${type === "do" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20" : "text-red-500 bg-red-50 dark:bg-red-950/20"}`}>
                {type === "do" ? "✓ Do" : "✗ Don't"}
              </div>
              <ul className="p-4 space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-[13px] text-[rgb(var(--text-secondary))] flex gap-2">
                    <span className={type === "do" ? "text-emerald-500" : "text-red-400"}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Props ────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* ── Accessibility ────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Filter chips use role=\"checkbox\" with aria-checked to communicate toggle state to screen readers.",
            "Input chips use role=\"option\" inside a listbox; each dismiss button is a separate focusable element with aria-label=\"Remove [value]\".",
            "The chip group should have an accessible name via aria-label or aria-labelledby describing what is being filtered.",
            "Selected state must not rely on colour alone — always include the check icon or aria-checked.",
            "Keyboard: Space toggles filter chips; Delete or Backspace removes the last input chip when the field is focused.",
            "Ensure 3:1 contrast between the chip border and the background in all states.",
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
