import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";

export const metadata: Metadata = { title: "Forced Colors & High Contrast" };

const SYSTEM_COLORS = [
  { keyword: "Canvas",           maps: "Page/surface background",     example: "background-color: Canvas" },
  { keyword: "CanvasText",       maps: "Primary body text",           example: "color: CanvasText" },
  { keyword: "ButtonFace",       maps: "Button background",           example: "background: ButtonFace" },
  { keyword: "ButtonText",       maps: "Button label",                example: "color: ButtonText" },
  { keyword: "Highlight",        maps: "Selected / focused element",  example: "background: Highlight" },
  { keyword: "HighlightText",    maps: "Text on selected element",    example: "color: HighlightText" },
  { keyword: "GrayText",         maps: "Disabled text",               example: "color: GrayText" },
  { keyword: "LinkText",         maps: "Unvisited links",             example: "color: LinkText" },
  { keyword: "VisitedText",      maps: "Visited links",               example: "color: VisitedText" },
  { keyword: "ActiveText",       maps: "Active (pressed) links",      example: "color: ActiveText" },
  { keyword: "Mark",             maps: "Highlighted / marked text",   example: "background: Mark" },
  { keyword: "MarkText",         maps: "Text inside Mark",            example: "color: MarkText" },
];

const COMPONENT_RULES = [
  {
    component: "Button",
    rules: [
      "Borders become visible — ButtonFace + ButtonText with ButtonBorder where supported",
      "Transparent backgrounds are replaced by ButtonFace",
      "Box shadows are stripped — use border instead for boundaries",
    ],
  },
  {
    component: "Input / Textarea",
    rules: [
      "Background → Field; text → FieldText",
      "Placeholder text → GrayText",
      "Focus ring becomes Highlight — verify outline width ≥ 2px",
    ],
  },
  {
    component: "Checkbox / Radio / Switch",
    rules: [
      "Custom drawn controls fall back to native appearance unless forced-colors overrides are defined",
      "Use appearance: none + explicit Highlight/HighlightText for checked state",
      "Use forced-color-adjust: none sparingly — only when full custom rendering is required",
    ],
  },
  {
    component: "Badge / Chip",
    rules: [
      "Coloured backgrounds collapse to Canvas — use borders as differentiators instead",
      "Add a 1px ButtonBorder border so the element boundary is visible",
    ],
  },
  {
    component: "Skeleton / Spinner",
    rules: [
      "Animation fill colours become Canvas — add ButtonBorder to show boundaries",
      "Consider showing static placeholder text instead of visual shimmer",
    ],
  },
];

export default function ForcedColorsPage() {
  return (
    <div>
      <PageHeader
        title="Forced Colors & High Contrast"
        description="Windows High Contrast Mode and the CSS forced-colors media query replace custom colours with a small set of system keywords. Sitka components are authored to degrade gracefully and retain usability when colour is stripped."
      />

      {/* ── What forced-colors is ────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">What forced colors mode is</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
          When a user enables Windows High Contrast Mode (or any OS-level forced-colors setting), the browser applies <code className="font-mono text-[11px] text-[rgb(var(--accent))]">@media (forced-colors: active)</code>. Custom CSS colours are replaced by system colour keywords. Gradients, box-shadows, and background-images that convey meaning are stripped.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
          <pre className="text-[11px] font-mono text-[rgb(var(--text-secondary))] leading-relaxed"><code>{`/* Detect forced-colors */
@media (forced-colors: active) {
  .my-button {
    /* Use system keywords — do not use hex or rgb */
    background: ButtonFace;
    color: ButtonText;
    border: 1px solid ButtonBorder;
  }

  /* Opt out for specific elements (use sparingly) */
  .custom-icon {
    forced-color-adjust: none;
  }
}`}</code></pre>
        </div>
      </section>

      {/* ── System color keywords ────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">System color keywords</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Keyword", "Maps to", "Example usage"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COLORS.map((row) => (
                <tr key={row.keyword} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.keyword}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-primary))]">{row.maps}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Component rules ──────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Per-component rules</h2>
        <div className="flex flex-col gap-4">
          {COMPONENT_RULES.map((comp) => (
            <div key={comp.component} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5">
              <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-3">{comp.component}</p>
              <ul className="space-y-1.5">
                {comp.rules.map((rule) => (
                  <li key={rule} className="flex gap-2 text-[13px] text-[rgb(var(--text-secondary))]">
                    <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testing ──────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Testing</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5">
            <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-3">Windows — native</p>
            <ol className="space-y-1.5 text-[13px] text-[rgb(var(--text-secondary))]">
              <li>1. Settings → Accessibility → Contrast themes</li>
              <li>2. Choose High Contrast Black or White</li>
              <li>3. Reload browser — forced-colors activates</li>
            </ol>
          </div>
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5">
            <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-3">Chrome DevTools — emulate</p>
            <ol className="space-y-1.5 text-[13px] text-[rgb(var(--text-secondary))]">
              <li>1. Open DevTools → Rendering tab</li>
              <li>2. Find &quot;Emulate CSS media feature forced-colors&quot;</li>
              <li>3. Select &quot;forced-colors: active&quot;</li>
            </ol>
          </div>
        </div>
      </section>

      {/* ── Guidelines ──────────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Guidelines</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Never use colour alone to convey state — borders, icons, and text labels must also differ (this also satisfies WCAG 1.4.1).",
            "Prefer borders over box-shadows for element boundaries — shadows are stripped in forced-colors.",
            "Use forced-color-adjust: none only when absolutely necessary; it opts the element out of system colour replacement entirely.",
            "Test with both High Contrast Black (dark) and High Contrast White (light) themes — behaviour differs.",
            "Focus indicators must remain visible — ensure outline uses a system colour keyword in your forced-colors override.",
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
