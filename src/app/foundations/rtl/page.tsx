import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";

export const metadata: Metadata = { title: "RTL & Internationalisation" };

const LOGICAL_PROPS = [
  { physical: "margin-left",       logical: "margin-inline-start",   notes: "Leading margin — left in LTR, right in RTL" },
  { physical: "margin-right",      logical: "margin-inline-end",     notes: "Trailing margin" },
  { physical: "padding-left",      logical: "padding-inline-start",  notes: "Leading padding" },
  { physical: "padding-right",     logical: "padding-inline-end",    notes: "Trailing padding" },
  { physical: "border-left",       logical: "border-inline-start",   notes: "Leading border" },
  { physical: "border-right",      logical: "border-inline-end",     notes: "Trailing border" },
  { physical: "left",              logical: "inset-inline-start",    notes: "Positioned element leading edge" },
  { physical: "right",             logical: "inset-inline-end",      notes: "Positioned element trailing edge" },
  { physical: "top",               logical: "inset-block-start",     notes: "Block start (usually top)" },
  { physical: "bottom",            logical: "inset-block-end",       notes: "Block end (usually bottom)" },
  { physical: "width",             logical: "inline-size",           notes: "Horizontal size" },
  { physical: "height",            logical: "block-size",            notes: "Vertical size" },
  { physical: "text-align: left",  logical: "text-align: start",     notes: "Align to reading start" },
  { physical: "text-align: right", logical: "text-align: end",       notes: "Align to reading end" },
  { physical: "float: left",       logical: "float: inline-start",   notes: "Float to reading start" },
];

const AUDIT_ITEMS = [
  { item: "Directional margins / padding", status: "✓", notes: "Use inline-start / inline-end" },
  { item: "Absolute positioning (left/right)", status: "✓", notes: "Use inset-inline-start / end" },
  { item: "Text alignment", status: "✓", notes: "Use start / end, not left / right" },
  { item: "Border radius (leading corner)", status: "✓", notes: "Use border-start-start-radius etc." },
  { item: "Icons inside buttons", status: "△", notes: "Review icon direction (arrows, chevrons)" },
  { item: "Flex row direction", status: "△", notes: "flex-direction: row already mirrors in RTL" },
  { item: "Animations (slide from left)", status: "△", notes: "Use translateX with logical sign or rtl overrides" },
  { item: "Custom scroll positioning", status: "△", notes: "scrollLeft behaves differently in RTL" },
];

export default function RTLPage() {
  return (
    <div>
      <PageHeader
        title="RTL & Internationalisation"
        description="Sitka is built on CSS logical properties so layouts mirror correctly in right-to-left scripts (Arabic, Hebrew, Persian) without overrides. This page covers the property mapping, audit checklist, and language detection patterns."
      />

      {/* ── Why logical properties ───────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Why logical properties</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
          Physical properties like <code className="font-mono text-[11px] text-[rgb(var(--accent))]">margin-left</code> are hardcoded to screen direction. Logical properties like <code className="font-mono text-[11px] text-[rgb(var(--accent))]">margin-inline-start</code> resolve relative to the writing direction set by <code className="font-mono text-[11px] text-[rgb(var(--accent))]">dir</code> or <code className="font-mono text-[11px] text-[rgb(var(--accent))]">writing-mode</code>. In LTR, <code className="font-mono text-[11px] text-[rgb(var(--accent))]">inline-start</code> is left. In RTL, it becomes right — automatically.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--status-danger))] mb-3">Physical (avoid)</p>
            <pre className="text-[11px] font-mono text-[rgb(var(--text-secondary))] leading-relaxed"><code>{`.sidebar {
  margin-left: 16px;
  padding-left: 12px;
  border-left: 1px solid …;
  left: 0;
}`}</code></pre>
          </div>
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--status-success))] mb-3">Logical (preferred)</p>
            <pre className="text-[11px] font-mono text-[rgb(var(--text-secondary))] leading-relaxed"><code>{`.sidebar {
  margin-inline-start: 16px;
  padding-inline-start: 12px;
  border-inline-start: 1px solid …;
  inset-inline-start: 0;
}`}</code></pre>
          </div>
        </div>
      </section>

      {/* ── Property mapping ─────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Property mapping</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Physical", "Logical equivalent", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LOGICAL_PROPS.map((row, i) => (
                <tr key={row.physical} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--status-danger))]">{row.physical}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--status-success))]">{row.logical}</td>
                  <td className="px-4 py-3 text-[12px] text-[rgb(var(--text-secondary))]">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Setting direction ────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Setting direction</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">HTML — attribute</span>
            </div>
            <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] leading-relaxed overflow-x-auto"><code>{`<!-- LTR (default) -->
<html lang="en" dir="ltr">

<!-- RTL (Arabic, Hebrew, Persian) -->
<html lang="ar" dir="rtl">

<!-- Mixed content: scope to element -->
<p dir="rtl">مرحبا</p>`}</code></pre>
          </div>
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface-raised))]">
              <span className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">Next.js — locale middleware</span>
            </div>
            <pre className="p-4 text-[11px] font-mono text-[rgb(var(--text-secondary))] leading-relaxed overflow-x-auto"><code>{`// app/layout.tsx
export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dir = ["ar","he","fa","ur"].includes(locale)
    ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}`}</code></pre>
          </div>
        </div>
      </section>

      {/* ── Audit checklist ──────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Audit checklist</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          Use this checklist when auditing an existing component for RTL support. ✓ = covered by logical properties. △ = requires manual review.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Item", "Status", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AUDIT_ITEMS.map((row, i) => (
                <tr key={row.item} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 text-[rgb(var(--text-primary))]">{row.item}</td>
                  <td className="px-4 py-3 text-[18px]">{row.status}</td>
                  <td className="px-4 py-3 text-[12px] text-[rgb(var(--text-secondary))]">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Tailwind note ────────────────────────────────── */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Tailwind CSS v4</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed mb-3">
          Tailwind v4 ships logical property utilities natively. Use <code className="font-mono text-[11px] text-[rgb(var(--accent))]">ps-4</code> (padding-inline-start) and <code className="font-mono text-[11px] text-[rgb(var(--accent))]">pe-4</code> (padding-inline-end) instead of <code className="font-mono text-[11px] text-[rgb(var(--accent))]">pl-4</code> / <code className="font-mono text-[11px] text-[rgb(var(--accent))]">pr-4</code> for components that must work in RTL.
        </p>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "ps-{n} / pe-{n} → padding-inline-start / end",
            "ms-{n} / me-{n} → margin-inline-start / end",
            "start-{n} / end-{n} → inset-inline-start / end",
            "border-s / border-e → border-inline-start / end",
            "rounded-s-{n} / rounded-e-{n} → leading / trailing corner radius",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              <code className="font-mono text-[11px] text-[rgb(var(--text-primary))]">{item}</code>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
