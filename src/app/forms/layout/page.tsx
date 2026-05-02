import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import {
  StackedLayoutDemo,
  TwoColumnLayoutDemo,
  InlineLayoutDemo,
} from "@/components/docs/FormLayoutDemo";

export const metadata: Metadata = { title: "Form Layout" };

const CODE = {
  react: {
    filename: "FormLayouts.tsx",
    code: `// Stacked — labels above inputs, full width
function StackedForm() {
  return (
    <form className="space-y-4 max-w-md">
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-text-secondary">First name</label>
        <Input placeholder="Jordan" />
      </div>
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-text-secondary">Email</label>
        <Input type="email" placeholder="jordan@example.com" />
      </div>
      <Button type="submit" className="w-full">Save</Button>
    </form>
  );
}

// Two-column — grid with full-width exceptions
function TwoColumnForm() {
  return (
    <form className="grid grid-cols-2 gap-4 max-w-2xl">
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-text-secondary">First name</label>
        <Input placeholder="Jordan" />
      </div>
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-text-secondary">Last name</label>
        <Input placeholder="Smith" />
      </div>
      <div className="col-span-2 space-y-1">
        <label className="block text-[12px] font-medium text-text-secondary">Email</label>
        <Input type="email" placeholder="jordan@example.com" />
      </div>
      <div className="col-span-2 flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

// Inline — label on left, input on right
function InlineForm() {
  return (
    <form className="space-y-3 max-w-lg">
      {[
        { label: "Display name", placeholder: "Jordan Smith" },
        { label: "Email",        placeholder: "jordan@example.com" },
      ].map(({ label, placeholder }) => (
        <div key={label} className="flex items-center gap-4">
          <label className="w-28 flex-shrink-0 text-[12px] font-medium text-text-secondary text-right">
            {label}
          </label>
          <div className="flex-1">
            <Input placeholder={placeholder} />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-4">
        <div className="w-28 flex-shrink-0" />
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}`,
  },
  html: {
    filename: "form-layouts.html",
    code: `<!-- Stacked -->
<form class="form-stacked">
  <div class="field">
    <label class="field-label" for="name">First name</label>
    <input class="input" id="name" type="text" placeholder="Jordan" />
  </div>
  <div class="field">
    <label class="field-label" for="email">Email</label>
    <input class="input" id="email" type="email" placeholder="jordan@example.com" />
  </div>
  <button class="btn btn-primary btn-full" type="submit">Save</button>
</form>

<!-- Two-column -->
<form class="form-grid">
  <div class="field">
    <label class="field-label" for="first">First name</label>
    <input class="input" id="first" type="text" />
  </div>
  <div class="field">
    <label class="field-label" for="last">Last name</label>
    <input class="input" id="last" type="text" />
  </div>
  <div class="field col-span-2">
    <label class="field-label" for="email2">Email</label>
    <input class="input" id="email2" type="email" />
  </div>
</form>

<!-- Inline -->
<form class="form-inline">
  <div class="inline-row">
    <label class="inline-label" for="display">Display name</label>
    <input class="input" id="display" type="text" placeholder="Jordan Smith" />
  </div>
</form>

<style>
  .field { display: flex; flex-direction: column; gap: 4px; }
  .field-label { font-size: 12px; font-weight: 500; color: rgb(var(--text-secondary)); }
  .form-stacked { display: flex; flex-direction: column; gap: 16px; max-width: 400px; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; max-width: 640px; }
  .col-span-2 { grid-column: span 2; }
  .form-inline { display: flex; flex-direction: column; gap: 12px; max-width: 480px; }
  .inline-row { display: flex; align-items: center; gap: 16px; }
  .inline-label { width: 112px; flex-shrink: 0; font-size: 12px; font-weight: 500; color: rgb(var(--text-secondary)); text-align: right; }
  .btn-full { width: 100%; }
</style>`,
  },
  swift: {
    filename: "FormLayouts.swift",
    code: `import SwiftUI

// Stacked (VStack) — default SwiftUI Form style
struct StackedFormView: View {
    @State private var name  = ""
    @State private var email = ""

    var body: some View {
        Form {
            Section {
                TextField("First name", text: $name)
                TextField("Email", text: $email)
                    .keyboardType(.emailAddress)
                    .autocapitalization(.none)
            }
            Section {
                Button("Save") { /* submit */ }
            }
        }
        .formStyle(.grouped) // iOS 16+
    }
}

// Inline (LabeledContent) — label + control side by side
struct InlineFormView: View {
    @State private var name  = ""
    @State private var tz    = "pt"

    var body: some View {
        Form {
            LabeledContent("Display name") {
                TextField("Jordan Smith", text: $name)
                    .multilineTextAlignment(.trailing)
            }
            LabeledContent("Timezone") {
                Picker("Timezone", selection: $tz) {
                    Text("Pacific").tag("pt")
                    Text("Eastern").tag("et")
                }
                .labelsHidden()
            }
        }
    }
}`,
  },
};

export default function FormLayoutPage() {
  return (
    <div>
      <PageHeader
        title="Form Layout"
        description="Three layout patterns for arranging form fields: stacked (labels above inputs), two-column (grid), and inline (labels beside inputs). Choose based on the density of the form and the available width."
      />

      {/* Stacked */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Stacked</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Labels sit directly above their inputs. The default layout for most forms — scannable, accessible,
          and works at any viewport width. Use for sign-up flows, settings pages, and anywhere the form is
          narrow or on mobile.
        </p>
        <ComponentPreview>
          <StackedLayoutDemo />
        </ComponentPreview>
      </section>

      {/* Two-column */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Two-column</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          A CSS grid with two equal columns. Related fields (first name / last name, city / country) sit on
          the same row. Wider fields span both columns with{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">col-span-2</code>. Only use at
          widths ≥ 560 px — switch to stacked on mobile.
        </p>
        <ComponentPreview>
          <TwoColumnLayoutDemo />
        </ComponentPreview>
      </section>

      {/* Inline */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Inline</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Labels align right in a fixed-width column; inputs fill the remaining space. Most compact option —
          good for settings panels and admin interfaces where vertical space is at a premium. Avoid on
          narrow screens or forms longer than ~6 fields.
        </p>
        <ComponentPreview>
          <InlineLayoutDemo />
        </ComponentPreview>
      </section>

      {/* Pattern comparison */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Pattern comparison</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Layout", "Min width", "Best for", "Avoid when"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { layout: "Stacked",      min: "Any", best: "Sign-up, checkout, mobile-first flows", avoid: "Very wide viewports with only 2–3 short fields" },
                { layout: "Two-column",   min: "560 px", best: "Profile edit, address forms, related field pairs", avoid: "Mobile, or when field labels have very different lengths" },
                { layout: "Inline",       min: "480 px", best: "Settings panels, admin forms, compact data entry", avoid: "Long labels (>20 chars), mobile, more than 8 fields" },
              ].map((row, i) => (
                <tr key={row.layout} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.layout}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.min}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.best}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Responsive guidance */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Responsive guidance</h2>
        <ul className="space-y-4 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            { title: "Always fall back to stacked below 560 px", body: "Two-column and inline layouts compress too much on narrow screens. Use a media query or Tailwind's sm: prefix to switch to a single-column stacked layout on mobile." },
            { title: "Label width in inline layouts", body: "A fixed label column (112–128 px) works for most English labels. For localized UIs, switch to a percentage width or fluid label that can wrap — German and Finnish labels routinely double in length." },
            { title: "Grid gaps over margins", body: "Use gap-x/gap-y on the grid container rather than adding margin to individual fields. It's easier to adjust spacing globally and avoids margin-collapse edge cases." },
            { title: "Full-width submit buttons on mobile", body: "A full-width button (w-full) on narrow screens gives a larger touch target and feels more native. On desktop, right-aligned buttons at natural width are more appropriate." },
          ].map(({ title, body }) => (
            <li key={title} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 flex-shrink-0">→</span>
              <span><strong className="text-[rgb(var(--text-primary))]">{title}.</strong> {body}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Implementation */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>
    </div>
  );
}
