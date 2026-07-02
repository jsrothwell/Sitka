"use client";

import { useState } from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Toggle, ToggleGroup } from "@/components/ui/Toggle";

const TOGGLE_PROPS = [
  {
    name: "pressed",
    type: "boolean",
    description: "Controlled pressed state.",
  },
  {
    name: "defaultPressed",
    type: "boolean",
    default: "false",
    description: "Initial pressed state for uncontrolled usage.",
  },
  {
    name: "onPressedChange",
    type: "(pressed: boolean) => void",
    description: "Called when the pressed state changes.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Controls height and padding.",
  },
  {
    name: "variant",
    type: '"default" | "outline"',
    default: '"default"',
    description: "Visual style — default has no border; outline adds a border that highlights when pressed.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction and dims the control.",
  },
];

const TOGGLE_GROUP_PROPS = [
  {
    name: "type",
    type: '"single" | "multiple"',
    required: true,
    description: "Single allows one active item at a time; multiple allows any number.",
  },
  {
    name: "value",
    type: "string | string[]",
    description: "Controlled selected value(s). String for single, string[] for multiple.",
  },
  {
    name: "onValueChange",
    type: "(value: string | string[]) => void",
    description: "Called with the new value(s) when selection changes.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Passed to all child Toggle items.",
  },
  {
    name: "variant",
    type: '"default" | "outline"',
    default: '"outline"',
    description: "Passed to all child Toggle items.",
  },
];

const CODE = {
  react: {
    filename: "Toggle.tsx",
    code: `import { Toggle, ToggleGroup } from "@/components/ui/Toggle";
import { Bold, Italic, Underline } from "lucide-react";
import { useState } from "react";

// Single toggle (uncontrolled)
<Toggle defaultPressed aria-label="Bold">
  <Bold className="w-4 h-4" />
</Toggle>

// Controlled
const [pressed, setPressed] = useState(false);
<Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Italic">
  <Italic className="w-4 h-4" />
</Toggle>

// ToggleGroup — single selection
const [align, setAlign] = useState("left");
<ToggleGroup type="single" value={align} onValueChange={setAlign}>
  <Toggle aria-label="left">Left</Toggle>
  <Toggle aria-label="center">Center</Toggle>
  <Toggle aria-label="right">Right</Toggle>
</ToggleGroup>

// ToggleGroup — multiple selection
const [formats, setFormats] = useState([]);
<ToggleGroup type="multiple" value={formats} onValueChange={setFormats}>
  <Toggle aria-label="bold"><Bold className="w-4 h-4" /></Toggle>
  <Toggle aria-label="italic"><Italic className="w-4 h-4" /></Toggle>
  <Toggle aria-label="underline"><Underline className="w-4 h-4" /></Toggle>
</ToggleGroup>`,
  },
  html: {
    filename: "toggle.html",
    code: `<!-- Single toggle button -->
<button
  type="button"
  role="switch"
  aria-checked="false"
  aria-label="Bold"
  class="toggle"
  onclick="this.setAttribute('aria-checked', this.getAttribute('aria-checked') === 'true' ? 'false' : 'true')"
>
  <svg><!-- bold icon --></svg>
</button>

<!-- Toggle group (single selection) -->
<div role="group" aria-label="Text alignment">
  <button type="button" role="switch" aria-checked="true"  aria-label="Left"   class="toggle active">Left</button>
  <button type="button" role="switch" aria-checked="false" aria-label="Center" class="toggle">Center</button>
  <button type="button" role="switch" aria-checked="false" aria-label="Right"  class="toggle">Right</button>
</div>`,
  },
  swift: {
    filename: "ToggleView.swift",
    code: `import SwiftUI

struct ToggleGroupView: View {
  @State private var alignment: TextAlignment = .leading
  @State private var formats: Set<String> = []

  var body: some View {
    VStack(spacing: 24) {
      // Single selection (Picker in segmented style)
      Picker("Alignment", selection: $alignment) {
        Text("Left").tag(TextAlignment.leading)
        Text("Center").tag(TextAlignment.center)
        Text("Right").tag(TextAlignment.trailing)
      }
      .pickerStyle(.segmented)

      // Multiple toggles
      HStack {
        ForEach(["Bold", "Italic", "Underline"], id: \\.self) { format in
          Toggle(isOn: Binding(
            get: { formats.contains(format) },
            set: { if $0 { formats.insert(format) } else { formats.remove(format) } }
          )) {
            Text(format)
          }
          .toggleStyle(.button)
          .buttonStyle(.bordered)
        }
      }
    }
    .padding()
  }
}`,
  },
};

function Demo() {
  const [align, setAlign] = useState("left");
  const [formats, setFormats] = useState<string[]>([]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] uppercase tracking-wider font-semibold">Alignment (single)</p>
        <ToggleGroup type="single" value={align} onValueChange={setAlign}>
          <Toggle aria-label="left"><AlignLeft className="w-4 h-4" /></Toggle>
          <Toggle aria-label="center"><AlignCenter className="w-4 h-4" /></Toggle>
          <Toggle aria-label="right"><AlignRight className="w-4 h-4" /></Toggle>
        </ToggleGroup>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] uppercase tracking-wider font-semibold">Formatting (multiple)</p>
        <ToggleGroup type="multiple" value={formats} onValueChange={setFormats}>
          <Toggle aria-label="bold"><Bold className="w-4 h-4" /></Toggle>
          <Toggle aria-label="italic"><Italic className="w-4 h-4" /></Toggle>
          <Toggle aria-label="underline"><Underline className="w-4 h-4" /></Toggle>
        </ToggleGroup>
      </div>
    </div>
  );
}

export default function TogglePage() {
  return (
    <div>
      <PageHeader
        title="Toggle / Toggle Group"
        description="A two-state button that can be pressed or unpressed. ToggleGroup wraps multiple toggles to manage single or multiple selection."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
          <Demo />
        </ComponentPreview>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Variants
        </h2>
        <ComponentPreview label="Default">
          <ToggleGroup type="multiple" variant="default">
            <Toggle aria-label="bold"><Bold className="w-4 h-4" /></Toggle>
            <Toggle aria-label="italic" defaultPressed><Italic className="w-4 h-4" /></Toggle>
            <Toggle aria-label="underline"><Underline className="w-4 h-4" /></Toggle>
          </ToggleGroup>
        </ComponentPreview>
        <ComponentPreview label="Outline" className="mt-4">
          <ToggleGroup type="multiple" variant="outline">
            <Toggle aria-label="bold"><Bold className="w-4 h-4" /></Toggle>
            <Toggle aria-label="italic" defaultPressed><Italic className="w-4 h-4" /></Toggle>
            <Toggle aria-label="underline"><Underline className="w-4 h-4" /></Toggle>
          </ToggleGroup>
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Sizes
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-4 items-start">
            {(["sm", "md", "lg"] as const).map((size) => (
              <ToggleGroup key={size} type="single" size={size}>
                <Toggle aria-label="left">Left</Toggle>
                <Toggle aria-label="center">Center</Toggle>
                <Toggle aria-label="right">Right</Toggle>
              </ToggleGroup>
            ))}
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

      {/* Props — Toggle */}
      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Props — Toggle
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          All native <code className="font-mono text-[12px] text-[rgb(var(--accent))]">{"<button>"}</code> attributes are forwarded.
        </p>
        <PropsTable props={TOGGLE_PROPS} />
      </section>

      {/* Props — ToggleGroup */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Props — ToggleGroup
        </h2>
        <PropsTable props={TOGGLE_GROUP_PROPS} />
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
                { el: "Toggle", role: "switch", attrs: "aria-checked (true/false), aria-label, aria-pressed (alternative)" },
                { el: "ToggleGroup", role: "group", attrs: "aria-label" },
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
                { key: "Space / Enter", action: "Toggle the pressed state of a focused Toggle" },
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
            'Each Toggle uses role="switch" with aria-checked — screen readers announce "on" or "off" state.',
            'ToggleGroup uses role="group" — child items share their context through aria-label on the group.',
            "Always provide aria-label on icon-only toggles — the icon alone is not accessible to screen readers.",
            "Focus ring appears on focus-visible — keyboard users navigate with Tab; space/enter activates.",
            "For toolbar-style groups (text formatting), consider role=\"toolbar\" and arrow key navigation over Tab.",
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
