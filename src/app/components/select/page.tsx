import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Select } from "@/components/ui/Select";

export const metadata: Metadata = { title: "Select" };

const PROPS = [
  {
    name: "label",
    type: "string",
    description: "Visible label rendered above the select.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder option shown when no value is selected.",
  },
  {
    name: "helperText",
    type: "string",
    description: "Supplemental hint rendered below the select.",
  },
  {
    name: "error",
    type: "string",
    description: "Error message. Replaces helperText and applies error styling.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Controls height, padding, and font size.",
  },
];

const CODE = {
  react: {
    filename: "Select.tsx",
    code: `import { Select } from "@/components/ui/Select";
import { useState } from "react";

// Basic with placeholder
<Select label="Framework" placeholder="Choose a framework">
  <option value="next">Next.js</option>
  <option value="remix">Remix</option>
  <option value="astro">Astro</option>
</Select>

// Controlled
const [region, setRegion] = useState("us-west");
<Select
  label="Region"
  value={region}
  onChange={(e) => setRegion(e.target.value)}
>
  <option value="us-east">US East</option>
  <option value="us-west">US West</option>
  <option value="eu">Europe</option>
</Select>

// Error state
<Select label="Status" error="Please select a status">
  <option value="">Select status</option>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
</Select>`,
  },
  html: {
    filename: "select.html",
    code: `<div style="display:flex; flex-direction:column; gap:6px;">
  <label for="framework" style="font-size:12px; font-weight:500; color:rgb(var(--text-secondary))">
    Framework
  </label>
  <div style="position:relative;">
    <select
      id="framework"
      style="
        width:100%; height:2.5rem; appearance:none;
        background:rgb(var(--surface-raised));
        border:1px solid rgb(var(--border));
        border-radius:var(--radius-md);
        padding:0 2.5rem 0 0.75rem;
        font-size:13px; color:rgb(var(--text-primary));
      "
    >
      <option value="">Choose a framework</option>
      <option value="next">Next.js</option>
      <option value="remix">Remix</option>
    </select>
    <!-- ChevronDown icon overlay -->
    <svg style="position:absolute; right:10px; top:50%; transform:translateY(-50%); pointer-events:none; width:16px; height:16px; color:rgb(var(--text-tertiary))" ...></svg>
  </div>
</div>`,
  },
  swift: {
    filename: "SelectView.swift",
    code: `import SwiftUI

struct SelectView: View {
  @State private var selected = ""
  let options = ["Next.js", "Remix", "Astro"]

  var body: some View {
    VStack(alignment: .leading, spacing: 6) {
      Text("Framework")
        .font(.caption)
        .fontWeight(.medium)
        .foregroundStyle(.secondary)

      Picker("Framework", selection: $selected) {
        Text("Choose a framework").tag("")
        ForEach(options, id: \\.self) { option in
          Text(option).tag(option)
        }
      }
      .pickerStyle(.menu)
      .frame(maxWidth: .infinity, alignment: .leading)
    }
  }
}`,
  },
  macos: {
    filename: "SelectView.swift",
    code: `import SwiftUI

struct SelectView: View {
  @State private var selected = "Next.js"
  let options = ["Next.js", "Remix", "Astro"]

  var body: some View {
    LabeledContent("Framework") {
      Picker("", selection: $selected) {
        ForEach(options, id: \\.self) { Text($0) }
      }
      .fixedSize()
    }
    .padding()
  }
}`,
  },
};

export default function SelectPage() {
  return (
    <div>
      <PageHeader
        title="Select"
        description="A native dropdown for choosing one option from a list. Extends the platform's built-in select with consistent sizing, labels, and error states."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Select label="Framework" placeholder="Choose a framework">
              <option value="next">Next.js</option>
              <option value="remix">Remix</option>
              <option value="astro">Astro</option>
            </Select>
            <Select label="Region" defaultValue="us-west">
              <option value="us-east">US East</option>
              <option value="us-west">US West</option>
              <option value="eu">Europe</option>
            </Select>
          </div>
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Sizes
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Select size="sm" label="Small" defaultValue="next">
              <option value="next">Next.js</option>
              <option value="remix">Remix</option>
            </Select>
            <Select size="md" label="Medium (default)" defaultValue="next">
              <option value="next">Next.js</option>
              <option value="remix">Remix</option>
            </Select>
            <Select size="lg" label="Large" defaultValue="next">
              <option value="next">Next.js</option>
              <option value="remix">Remix</option>
            </Select>
          </div>
        </ComponentPreview>
        <div className="mt-4 rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Size", "Height", "Font size", "Padding"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { size: "sm", height: "32px", font: "12px", padding: "8px 10px" },
                { size: "md", height: "40px", font: "13px", padding: "10px 12px" },
                { size: "lg", height: "48px", font: "15px", padding: "12px 16px" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.size}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.height}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.font}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.padding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          States
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Select label="Default" placeholder="Select…">
              <option value="a">Option A</option>
            </Select>
            <Select label="With value" defaultValue="a">
              <option value="a">Option A</option>
              <option value="b">Option B</option>
            </Select>
            <Select label="Error" error="This field is required" placeholder="Select…">
              <option value="a">Option A</option>
            </Select>
            <Select label="Disabled" defaultValue="a" disabled>
              <option value="a">Option A</option>
            </Select>
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
          All native <code className="font-mono text-[12px] text-[rgb(var(--accent))]">{"<select>"}</code> attributes are forwarded. Custom props are listed below.
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
                { el: "Trigger", role: "combobox", attrs: "aria-expanded, aria-haspopup='listbox', aria-labelledby" },
                { el: "Dropdown", role: "listbox", attrs: "aria-label" },
                { el: "Option", role: "option", attrs: "aria-selected" },
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
                { key: "Space / Enter", action: "Open the dropdown" },
                { key: "Arrow Down / Up", action: "Navigate between options (also opens if closed)" },
                { key: "Enter", action: "Select the focused option and close" },
                { key: "Escape", action: "Close the dropdown without selecting" },
                { key: "Home / End", action: "Jump to the first / last option" },
                { key: "Tab", action: "Close and move focus to the next element" },
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
            "Uses a native <select> element — fully keyboard navigable and compatible with all assistive technology.",
            "The label prop renders a <label> element properly associated via htmlFor.",
            "Error messages are surfaced as visible text; pair with aria-describedby for screen readers.",
            "Disabled state is communicated natively via the disabled attribute.",
            "ChevronDown overlay uses pointer-events:none so it does not interfere with the native control.",
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
