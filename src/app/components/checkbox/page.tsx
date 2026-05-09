import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Checkbox } from "@/components/ui/Checkbox";

export const metadata: Metadata = { title: "Checkbox" };

const PROPS = [
  {
    name: "label",
    type: "string",
    description: "Visible label rendered to the right of the checkbox.",
  },
  {
    name: "helperText",
    type: "string",
    description: "Supplemental hint rendered below the label.",
  },
  {
    name: "error",
    type: "string",
    description: "Error message. Applies error styling to the checkbox.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Controls the checkbox dimensions and label font size.",
  },
  {
    name: "indeterminate",
    type: "boolean",
    default: "false",
    description: "Shows a minus icon indicating partial selection. Used for parent checkboxes in a group.",
  },
];

const CODE = {
  react: {
    filename: "Checkbox.tsx",
    code: `import { Checkbox } from "@/components/ui/Checkbox";
import { useState, useRef } from "react";

// Uncontrolled
<Checkbox label="Accept terms" defaultChecked />

// Controlled
const [checked, setChecked] = useState(false);
<Checkbox
  label="Subscribe to newsletter"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// Indeterminate (partial parent selection)
const allChecked = items.every((i) => i.checked);
const someChecked = items.some((i) => i.checked);
<Checkbox
  label="Select all"
  checked={allChecked}
  indeterminate={someChecked && !allChecked}
  onChange={(e) => setItems(items.map((i) => ({ ...i, checked: e.target.checked })))}
/>

// With helper text
<Checkbox
  label="Enable notifications"
  helperText="You can change this in settings at any time."
/>

// Error state
<Checkbox label="I agree to the terms" error="You must accept the terms to continue." />`,
  },
  html: {
    filename: "checkbox.html",
    code: `<!-- Styled with CSS peer selectors -->
<label style="display:flex; align-items:flex-start; gap:8px; cursor:pointer;">
  <span style="position:relative; width:16px; height:16px; flex-shrink:0; margin-top:2px;">
    <input
      type="checkbox"
      class="sr-only peer"
      id="agree"
      name="agree"
    />
    <!-- Checkbox box -->
    <span class="checkbox-box peer-checked:bg-accent peer-checked:border-accent"></span>
    <!-- Check icon (visible when checked) -->
    <svg class="check-icon peer-checked:opacity-100" ...></svg>
  </span>
  <span style="font-size:13px; color:rgb(var(--text-primary))">Accept terms</span>
</label>`,
  },
  swift: {
    filename: "CheckboxView.swift",
    code: `import SwiftUI

struct CheckboxView: View {
  @State private var isChecked = false

  var body: some View {
    Toggle(isOn: $isChecked) {
      VStack(alignment: .leading, spacing: 2) {
        Text("Accept terms")
          .font(.callout)
        Text("By continuing you agree to our terms of service.")
          .font(.caption)
          .foregroundStyle(.secondary)
      }
    }
    .toggleStyle(.checkmark)
  }
}

struct CheckmarkToggleStyle: ToggleStyle {
  func makeBody(configuration: Configuration) -> some View {
    HStack(alignment: .top, spacing: 10) {
      ZStack {
        RoundedRectangle(cornerRadius: 4)
          .fill(configuration.isOn ? Color.accentColor : Color(.systemGray6))
          .frame(width: 18, height: 18)
        if configuration.isOn {
          Image(systemName: "checkmark")
            .font(.system(size: 10, weight: .bold))
            .foregroundStyle(.white)
        }
      }
      .onTapGesture { configuration.isOn.toggle() }
      configuration.label
    }
  }
}`,
  },
};

export default function CheckboxPage() {
  return (
    <div>
      <PageHeader
        title="Checkbox"
        description="A binary selection control. Supports uncontrolled and controlled usage, three sizes, and an indeterminate state for hierarchical selection."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-3">
            <Checkbox label="Subscribe to updates" defaultChecked />
            <Checkbox label="Enable dark mode" />
            <Checkbox
              label="Send weekly digest"
              helperText="Delivered every Monday morning."
            />
            <Checkbox label="Required field" error="This field must be checked." />
          </div>
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Sizes
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-4">
            <Checkbox size="sm" label="Small" defaultChecked />
            <Checkbox size="md" label="Medium (default)" defaultChecked />
            <Checkbox size="lg" label="Large" defaultChecked />
          </div>
        </ComponentPreview>
        <div className="mt-4 rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Size", "Dimensions", "Border radius"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { size: "sm", dims: "14 × 14px", radius: "4px" },
                { size: "md", dims: "16 × 16px", radius: "5px" },
                { size: "lg", dims: "20 × 20px", radius: "6px" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.size}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.dims}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.radius}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Indeterminate */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Indeterminate
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          Use <code className="font-mono text-[11px] text-[rgb(var(--accent))]">indeterminate</code> on a parent checkbox to indicate a partial selection within a group.
        </p>
        <ComponentPreview>
          <div className="flex flex-col gap-3">
            <Checkbox label="Select all (partial)" indeterminate />
            <div className="pl-6 flex flex-col gap-2">
              <Checkbox label="Files" defaultChecked />
              <Checkbox label="Images" defaultChecked />
              <Checkbox label="Videos" />
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
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          All native{" "}
          <code className="font-mono text-[12px] text-[rgb(var(--accent))]">{"<input type=\"checkbox\">"}</code>{" "}
          attributes are forwarded (except <code className="font-mono text-[11px] text-[rgb(var(--accent))]">size</code> and <code className="font-mono text-[11px] text-[rgb(var(--accent))]">type</code>).
        </p>
        <PropsTable props={PROPS} />
      </section>

      {/* ARIA roles */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          ARIA roles
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Element", "Role", "Key attributes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { el: "Input", role: "checkbox (implicit)", attrs: "aria-checked (true/false/mixed), aria-describedby" },
                { el: "Group", role: "group (fieldset)", attrs: "aria-labelledby (legend)" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.el}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.role}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.attrs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Keyboard */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Keyboard
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Key", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { key: "Space", action: "Toggle the checked state" },
                { key: "Tab", action: "Move focus to the next focusable element" },
                { key: "Shift+Tab", action: "Move focus to the previous focusable element" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))] whitespace-nowrap">{row.key}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Accessibility
        </h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Built on a native <input type=\"checkbox\"> — fully keyboard and screen-reader accessible.",
            "The visual box is purely CSS; the real input is sr-only and receives focus.",
            "Focus ring appears via focus-visible — keyboard-only, not shown on mouse click.",
            "Indeterminate state is set via element.indeterminate = true, which assistive technology announces as 'mixed'.",
            "Error text should be linked with aria-describedby pointing to the error message id.",
            "In a checkbox group, wrap items in a <fieldset> with a <legend> to provide group context.",
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
