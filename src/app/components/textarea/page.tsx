import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Textarea } from "@/components/ui/Textarea";

export const metadata: Metadata = { title: "Textarea" };

const PROPS = [
  {
    name: "label",
    type: "string",
    description: "Visible label rendered above the textarea.",
  },
  {
    name: "helperText",
    type: "string",
    description: "Supplemental hint rendered below the textarea.",
  },
  {
    name: "error",
    type: "string",
    description: "Error message. Replaces helperText and applies error styling.",
  },
  {
    name: "inputSize",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Controls padding and font size. Does not constrain height — use rows or CSS for that.",
  },
  {
    name: "rows",
    type: "number",
    default: "4",
    description: "Number of visible text rows. The textarea is vertically resizable by the user.",
  },
];

const CODE = {
  react: {
    filename: "Textarea.tsx",
    code: `import { Textarea } from "@/components/ui/Textarea";
import { useState } from "react";

// Basic with label
<Textarea label="Description" placeholder="Describe your project…" />

// Controlled
const [value, setValue] = useState("");
<Textarea
  label="Bio"
  helperText="Max 280 characters."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  rows={3}
/>

// Error state
<Textarea
  label="Feedback"
  error="Feedback cannot be empty."
  defaultValue=""
/>

// Disabled
<Textarea
  label="Notes"
  defaultValue="These notes are read-only."
  disabled
/>`,
  },
  html: {
    filename: "textarea.html",
    code: `<div style="display:flex; flex-direction:column; gap:6px;">
  <label
    for="description"
    style="font-size:12px; font-weight:500; color:rgb(var(--text-secondary));"
  >
    Description
  </label>
  <textarea
    id="description"
    name="description"
    rows="4"
    placeholder="Describe your project…"
    style="
      width:100%; padding:8px 12px;
      background:rgb(var(--surface-raised));
      border:1px solid rgb(var(--border));
      border-radius:var(--radius-md);
      font-size:13px; color:rgb(var(--text-primary));
      resize:vertical;
    "
  ></textarea>
  <p style="font-size:11px; color:rgb(var(--text-tertiary));">
    Max 500 characters.
  </p>
</div>`,
  },
  swift: {
    filename: "TextAreaView.swift",
    code: `import SwiftUI

struct TextAreaView: View {
  @State private var text = ""

  var body: some View {
    VStack(alignment: .leading, spacing: 6) {
      Text("Description")
        .font(.caption)
        .fontWeight(.medium)
        .foregroundStyle(.secondary)

      TextEditor(text: $text)
        .frame(minHeight: 100)
        .padding(8)
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 10))
        .overlay(
          RoundedRectangle(cornerRadius: 10)
            .stroke(Color(.separator), lineWidth: 1)
        )

      if text.isEmpty {
        Text("Max 500 characters.")
          .font(.caption2)
          .foregroundStyle(.tertiary)
      }
    }
  }
}`,
  },
  macos: {
    filename: "TextAreaView.swift",
    code: `import SwiftUI

struct TextAreaView: View {
  @State private var text = ""

  var body: some View {
    LabeledContent("Description") {
      TextEditor(text: $text)
        .frame(minHeight: 80)
        .border(Color(.separatorColor))
    }
    .padding()
  }
}`,
  },
};

export default function TextareaPage() {
  return (
    <div>
      <PageHeader
        badge="New"
        title="Textarea"
        description="A multi-line text input following the same conventions as Input — labels, helper text, error states, and three sizes."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Textarea
              label="Description"
              placeholder="Describe your project…"
              helperText="Markdown is supported."
            />
          </div>
        </ComponentPreview>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          States
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Textarea label="Default" placeholder="Placeholder text" />
            <Textarea
              label="With value"
              defaultValue="This textarea has a default value."
            />
            <Textarea
              label="Error"
              error="This field is required."
              placeholder="Enter a description"
            />
            <Textarea
              label="Disabled"
              defaultValue="Read-only content."
              disabled
            />
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
            <Textarea inputSize="sm" label="Small" placeholder="sm" rows={2} />
            <Textarea inputSize="md" label="Medium (default)" placeholder="md" rows={2} />
            <Textarea inputSize="lg" label="Large" placeholder="lg" rows={2} />
          </div>
        </ComponentPreview>
        <div className="mt-4 rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Size", "Font size", "Padding"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { size: "sm", font: "12px", padding: "6px 10px" },
                { size: "md", font: "13px", padding: "8px 12px" },
                { size: "lg", font: "15px", padding: "10px 16px" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.size}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.font}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.padding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          <code className="font-mono text-[12px] text-[rgb(var(--accent))]">{"<textarea>"}</code>{" "}
          attributes are forwarded. Custom props are listed below.
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
                { el: "Textarea", role: "textbox (implicit)", attrs: "aria-multiline='true', aria-label / aria-labelledby, aria-invalid, aria-describedby, aria-required" },
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
                { key: "All text editing keys", action: "Standard text editing — type, delete, navigate the cursor" },
                { key: "Tab", action: "Move focus out of the textarea to the next focusable element" },
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
            "Built on a native <textarea> element — keyboard focusable and screen-reader accessible.",
            "The label prop renders a <label> element associated via htmlFor.",
            "Error messages appear as visible text below the field; pair with aria-describedby for screen readers.",
            "Vertical resize is enabled by default (resize-y) — do not disable it as it aids users who need larger input areas.",
            "Character count limits should be communicated with a visible counter and aria-live for screen reader updates.",
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
