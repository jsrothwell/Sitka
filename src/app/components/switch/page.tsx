import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Switch } from "@/components/ui/Switch";

export const metadata: Metadata = { title: "Switch" };

const PROPS = [
  {
    name: "label",
    type: "string",
    description: "Visible label rendered beside the switch track.",
  },
  {
    name: "helperText",
    type: "string",
    description: "Supplemental hint rendered below the label.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Controls the track and thumb dimensions.",
  },
  {
    name: "checked",
    type: "boolean",
    description: "Controlled on/off state.",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "Initial state for uncontrolled usage.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction and dims the control.",
  },
  {
    name: "onChange",
    type: "(e: React.ChangeEvent<HTMLInputElement>) => void",
    description: "Called when the switch changes state.",
  },
];

const CODE = {
  react: {
    filename: "Switch.tsx",
    code: `import { Switch } from "@/components/ui/Switch";
import { useState } from "react";

// Uncontrolled
<Switch label="Dark mode" defaultChecked />

// Controlled
const [enabled, setEnabled] = useState(false);
<Switch
  label="Enable notifications"
  helperText="Push alerts for new messages and mentions."
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>

// Disabled
<Switch label="Beta features" disabled defaultChecked />
<Switch label="Legacy mode" disabled />`,
  },
  html: {
    filename: "switch.html",
    code: `<label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
  <span style="position:relative; display:inline-block; width:36px; height:20px;">
    <input type="checkbox" role="switch" class="sr-only peer" id="dark-mode" />
    <!-- Track -->
    <span
      class="switch-track peer-checked:bg-accent"
      style="
        position:absolute; inset:0; border-radius:9999px;
        background:rgb(var(--surface-raised));
        transition:background 200ms;
      "
    ></span>
    <!-- Thumb -->
    <span
      class="switch-thumb peer-checked:translate-x-4 peer-checked:bg-white"
      style="
        position:absolute; left:3px; top:3px;
        width:14px; height:14px; border-radius:50%;
        background:rgb(var(--text-tertiary));
        transition:transform 200ms, background 200ms;
      "
    ></span>
  </span>
  <span style="font-size:13px; color:rgb(var(--text-primary));">Dark mode</span>
</label>`,
  },
  swift: {
    filename: "SwitchView.swift",
    code: `import SwiftUI

struct SwitchView: View {
  @State private var isOn = false

  var body: some View {
    VStack(alignment: .leading, spacing: 12) {
      Toggle("Dark Mode", isOn: $isOn)

      Toggle(isOn: $isOn) {
        VStack(alignment: .leading, spacing: 2) {
          Text("Notifications")
            .font(.callout)
          Text("Push alerts for new messages.")
            .font(.caption)
            .foregroundStyle(.secondary)
        }
      }
      // Disabled
      Toggle("Beta features", isOn: .constant(false))
        .disabled(true)
    }
    .padding()
  }
}`,
  },
};

export default function SwitchPage() {
  return (
    <div>
      <PageHeader
        title="Switch"
        description="A toggle control for boolean settings. Uses role='switch' for accessibility and supports both controlled and uncontrolled patterns."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Switch label="Dark mode" defaultChecked />
            <Switch
              label="Push notifications"
              helperText="Alerts for new messages and mentions."
            />
            <Switch label="Beta features" disabled defaultChecked />
            <Switch label="Legacy API" disabled />
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
            <Switch size="sm" label="Small" defaultChecked />
            <Switch size="md" label="Medium (default)" defaultChecked />
            <Switch size="lg" label="Large" defaultChecked />
          </div>
        </ComponentPreview>
        <div className="mt-4 rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Size", "Track", "Thumb"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { size: "sm", track: "28 × 16px", thumb: "12 × 12px" },
                { size: "md", track: "36 × 20px", thumb: "14 × 14px" },
                { size: "lg", track: "44 × 24px", thumb: "18 × 18px" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.size}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.track}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.thumb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Motion */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Motion
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Property", "Value", "Easing"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { property: "thumb translate-x", value: "±(track width - thumb - 2×offset)", easing: "200ms ease" },
                { property: "thumb background", value: "tertiary → white", easing: "200ms ease" },
                { property: "track background", value: "surface-raised → accent", easing: "200ms ease" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.property}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.value}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-tertiary))]">{row.easing}</td>
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
          <code className="font-mono text-[12px] text-[rgb(var(--accent))]">{"<input type=\"checkbox\">"}</code>{" "}
          attributes are forwarded. The switch renders as{" "}
          <code className="font-mono text-[11px] text-[rgb(var(--accent))]">role="switch"</code>.
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
                { el: "Input", role: "switch", attrs: "aria-checked (true/false), aria-labelledby, aria-describedby" },
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
                { key: "Space", action: "Toggle the switch on or off" },
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
            "Uses role=\"switch\" — screen readers announce the state as \"on\" or \"off\", not \"checked\" or \"unchecked\".",
            "The underlying input is sr-only; the visual track and thumb are purely presentational.",
            "Keyboard: Space toggles the switch when focused.",
            "Focus ring appears via focus-visible — keyboard only.",
            "Disabled state sets disabled on the input and visually dims the control.",
            "Prefer Switch over Checkbox for settings that take immediate effect (dark mode, airplane mode). Use Checkbox for form fields that require explicit submission.",
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
