import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import {
  CheckboxDemo,
  CheckboxGroupDemo,
  RadioDemo,
  SwitchDemo,
  SelectDemo,
} from "@/site/docs/FormControlsDemo";
import { FormControlsMobileDemo } from "@/site/docs/ComponentMobileDemos";

export const metadata: Metadata = { title: "Form Controls" };

const CHECKBOX_PROPS = [
  { name: "label",       type: "string",                    description: "Visible label rendered next to the checkbox." },
  { name: "helperText",  type: "string",                    description: "Secondary description shown below the label." },
  { name: "error",       type: "string",                    description: "Error message — replaces helperText and turns the border red." },
  { name: "size",        type: '"sm" | "md" | "lg"',        default: '"md"', description: "Controls box size and font size." },
  { name: "indeterminate", type: "boolean",                 default: "false", description: "Sets the checkbox to a mixed/partial state." },
  { name: "disabled",    type: "boolean",                   default: "false", description: "Prevents interaction and reduces opacity." },
];

const RADIO_PROPS = [
  { name: "value",       type: "string",                    description: "The value submitted when this radio is selected. Required." },
  { name: "label",       type: "string",                    description: "Visible label for the radio option." },
  { name: "helperText",  type: "string",                    description: "Secondary text shown below the label." },
  { name: "size",        type: '"sm" | "md" | "lg"',        default: '"md"', description: "Inherits from RadioGroup if not set." },
];

const RADIO_GROUP_PROPS = [
  { name: "name",        type: "string",                    description: "HTML name attribute shared across all child Radio inputs. Required." },
  { name: "value",       type: "string",                    description: "Controlled selected value." },
  { name: "onChange",    type: "(value: string) => void",   description: "Called with the value of the newly selected radio." },
  { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Stack direction for the radio options." },
  { name: "size",        type: '"sm" | "md" | "lg"',        default: '"md"', description: "Propagated to all child Radio elements." },
  { name: "label",       type: "string",                    description: "Group label rendered as a <legend>." },
];

const SWITCH_PROPS = [
  { name: "label",       type: "string",                    description: "Text label rendered to the right of the track." },
  { name: "helperText",  type: "string",                    description: "Secondary description shown below." },
  { name: "size",        type: '"sm" | "md" | "lg"',        default: '"md"', description: "Controls track and thumb dimensions." },
  { name: "checked",     type: "boolean",                   description: "Controlled on/off state." },
  { name: "defaultChecked", type: "boolean",                description: "Uncontrolled initial state." },
  { name: "onChange",    type: "ChangeEventHandler",        description: "Native input change handler." },
  { name: "disabled",    type: "boolean",                   default: "false", description: "Prevents interaction and reduces opacity." },
];

const SELECT_PROPS = [
  { name: "label",       type: "string",                    description: "Visible label rendered above the select." },
  { name: "helperText",  type: "string",                    description: "Secondary hint shown below." },
  { name: "error",       type: "string",                    description: "Error message — replaces helperText and turns the border red." },
  { name: "size",        type: '"sm" | "md" | "lg"',        default: '"md"', description: "Matches Input size tokens." },
  { name: "placeholder", type: "string",                    description: "Disabled first option used as a placeholder." },
];

const CODE = {
  react: {
    filename: "FormControls.tsx",
    code: `import { Checkbox } from "@/components/ui/Checkbox";
import { Radio, RadioGroup } from "@/components/ui/Radio";
import { Switch } from "@/components/ui/Switch";
import { Select } from "@/components/ui/Select";

// Checkbox
<Checkbox label="Accept terms" />
<Checkbox label="Partial selection" indeterminate />
<Checkbox label="With helper" helperText="We'll never share your data" />
<Checkbox label="With error" error="This field is required" />

// Radio group
<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <Radio value="starter" label="Starter" helperText="Up to 3 projects" />
  <Radio value="pro"     label="Pro"     helperText="Unlimited projects" />
</RadioGroup>

// Switch
<Switch label="Push notifications" checked={on} onChange={() => setOn(!on)} />

// Select
<Select label="Region" placeholder="Choose a region…">
  <option value="us-east">US East</option>
  <option value="eu-west">EU West</option>
</Select>`,
  },
  html: {
    filename: "form-controls.html",
    code: `<!-- Checkbox -->
<label class="form-check">
  <input type="checkbox" class="form-check-input" id="terms" />
  <span class="form-check-label">Accept terms</span>
</label>

<!-- Radio -->
<fieldset>
  <legend class="form-label">Plan</legend>
  <label class="form-check">
    <input type="radio" name="plan" value="starter" class="form-check-input" />
    <span class="form-check-label">Starter</span>
  </label>
  <label class="form-check">
    <input type="radio" name="plan" value="pro" class="form-check-input" />
    <span class="form-check-label">Pro</span>
  </label>
</fieldset>

<!-- Switch -->
<label class="form-switch">
  <input type="checkbox" role="switch" class="form-switch-input" />
  <span class="form-switch-track"></span>
  <span class="form-switch-label">Notifications</span>
</label>

<!-- Select -->
<div class="form-group">
  <label class="form-label" for="region">Region</label>
  <div class="select-wrap">
    <select id="region" class="form-select">
      <option value="">Choose a region…</option>
      <option value="us-east">US East</option>
      <option value="eu-west">EU West</option>
    </select>
    <svg class="select-chevron" viewBox="0 0 16 16">…</svg>
  </div>
</div>

<style>
  .form-check { display: flex; align-items: start; gap: 8px; cursor: pointer; }
  .form-check-input {
    width: 16px; height: 16px; border-radius: 5px;
    border: 1px solid rgb(var(--border));
    accent-color: rgb(var(--accent));
    cursor: pointer; flex-shrink: 0;
  }
  .form-check-label { font-size: 13px; color: rgb(var(--text-primary)); }

  .form-switch { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .form-switch-input { display: none; }
  .form-switch-track {
    width: 36px; height: 20px; border-radius: 10px;
    background: rgb(var(--surface-raised)); border: 1px solid rgb(var(--border));
    position: relative; transition: background 200ms;
  }
  .form-switch-track::after {
    content: ""; position: absolute;
    top: 3px; left: 3px;
    width: 14px; height: 14px; border-radius: 50%;
    background: rgb(var(--text-tertiary));
    transition: transform 200ms, background 200ms;
  }
  .form-switch-input:checked + .form-switch-track { background: rgb(var(--accent)); border-color: rgb(var(--accent)); }
  .form-switch-input:checked + .form-switch-track::after { transform: translateX(16px); background: white; }

  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-label { font-size: 12px; font-weight: 500; color: rgb(var(--text-secondary)); }
  .select-wrap { position: relative; }
  .form-select {
    width: 100%; height: 40px; appearance: none;
    padding: 0 36px 0 12px;
    border: 1px solid rgb(var(--border));
    border-radius: 8px;
    background: rgb(var(--surface));
    font-size: 13px; color: rgb(var(--text-primary));
  }
  .select-chevron {
    position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
    width: 16px; height: 16px; pointer-events: none;
    color: rgb(var(--text-tertiary));
  }
</style>`,
  },
  swift: {
    filename: "SitkaFormControls.swift",
    code: `import SwiftUI

// Checkbox
struct SitkaCheckbox: View {
    let label: String
    @Binding var isChecked: Bool

    var body: some View {
        Toggle(isOn: $isChecked) {
            Text(label)
                .font(.system(size: 13))
        }
        .toggleStyle(.checkbox)
    }
}

// Radio group
struct SitkaRadioGroup<Value: Hashable>: View {
    let options: [(label: String, value: Value)]
    @Binding var selection: Value

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            ForEach(options, id: \\.value) { opt in
                Button {
                    selection = opt.value
                } label: {
                    HStack(spacing: 8) {
                        Circle()
                            .strokeBorder(
                                selection == opt.value ? Color.accentColor : Color(UIColor.separator),
                                lineWidth: 1.5
                            )
                            .frame(width: 16, height: 16)
                            .overlay {
                                if selection == opt.value {
                                    Circle().fill(Color.accentColor).frame(width: 8, height: 8)
                                }
                            }
                        Text(opt.label).font(.system(size: 13))
                    }
                }
                .buttonStyle(.plain)
            }
        }
    }
}

// Switch
struct SitkaSwitch: View {
    let label: String
    @Binding var isOn: Bool

    var body: some View {
        Toggle(label, isOn: $isOn)
            .tint(Color.accentColor)
    }
}

// Select (Picker)
struct SitkaPicker<Value: Hashable>: View {
    let label: String
    let options: [(label: String, value: Value)]
    @Binding var selection: Value

    var body: some View {
        Picker(label, selection: $selection) {
            ForEach(options, id: \\.value) { opt in
                Text(opt.label).tag(opt.value)
            }
        }
        .pickerStyle(.menu)
    }
}`,
  },
  macos: {
    filename: "SitkaFormControls+macOS.swift",
    code: `import SwiftUI

// On macOS, SwiftUI provides native controls that automatically match
// the platform's appearance. Prefer these over custom implementations.

// Checkbox — use Toggle with .checkbox style
struct SitkaCheckbox: View {
    let label: String
    @Binding var isChecked: Bool

    var body: some View {
        Toggle(label, isOn: $isChecked)
            .toggleStyle(.checkbox)
    }
}

// Radio group — use Picker with .radioGroup style
struct SitkaRadioGroup<Value: Hashable & CaseIterable>: View {
    let label: String
    let options: [(label: String, value: Value)]
    @Binding var selection: Value

    var body: some View {
        Picker(label, selection: $selection) {
            ForEach(options, id: \\.value) { opt in
                Text(opt.label).tag(opt.value)
            }
        }
        .pickerStyle(.radioGroup)
    }
}

// Switch — standard Toggle (same as iOS, no style override needed)
struct SitkaSwitch: View {
    let label: String
    @Binding var isOn: Bool

    var body: some View {
        Toggle(label, isOn: $isOn)
            .tint(Color.accentColor)
    }
}

// Select (Picker) — .menu style works on macOS 12+; use .popUpButton for older targets
struct SitkaPicker<Value: Hashable>: View {
    let label: String
    let options: [(label: String, value: Value)]
    @Binding var selection: Value

    var body: some View {
        Picker(label, selection: $selection) {
            ForEach(options, id: \\.value) { opt in
                Text(opt.label).tag(opt.value)
            }
        }
        .pickerStyle(.menu)
        .fixedSize()
    }
}

// Usage in a settings form
enum Frequency: String, CaseIterable { case daily, weekly, monthly }

#Preview {
    Form {
        Section("Notifications") {
            SitkaCheckbox(label: "Email alerts", isChecked: .constant(true))
            SitkaCheckbox(label: "Push notifications", isChecked: .constant(false))
        }
        Section("Frequency") {
            SitkaRadioGroup(
                label: "Send reports",
                options: [("Daily", Frequency.daily), ("Weekly", .weekly), ("Monthly", .monthly)],
                selection: .constant(.weekly)
            )
        }
        Section("Appearance") {
            SitkaSwitch(label: "Dark mode", isOn: .constant(true))
        }
        Section("Export format") {
            SitkaPicker(
                label: "Format",
                options: [("CSV", "csv"), ("JSON", "json"), ("PDF", "pdf")],
                selection: .constant("csv")
            )
        }
    }
    .formStyle(.grouped)
    .frame(width: 360)
    .padding()
}`,
  },
};

export default function FormControlsPage() {
  return (
    <div>
      <PageHeader
        title="Form Controls"
        description="Checkbox, Radio, Switch, and Select — the core building blocks for capturing user preferences and input. All controls support keyboard navigation, focus rings, error states, and three sizes."
      />

      {/* Checkbox */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Checkbox</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Three states: unchecked, checked, and indeterminate. Supports label, helperText, error,
          and five sizes. Indeterminate is set via an imperative ref effect — the checkbox remains
          a standard HTML input.
        </p>
        <ComponentPreview>
          <CheckboxDemo />
        </ComponentPreview>
      </section>

      {/* Checkbox group */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Checkbox group with indeterminate</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          A parent checkbox can reflect partial selection using the{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">indeterminate</code> prop.
          Drive it from your own state — Checkbox does not manage children.
        </p>
        <ComponentPreview>
          <CheckboxGroupDemo />
        </ComponentPreview>
      </section>

      {/* Radio */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Radio</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Wrap <code className="font-mono text-[13px] text-[rgb(var(--accent))]">Radio</code> elements inside{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">RadioGroup</code> to share name,
          controlled value, and size. Orientation can be{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">vertical</code> or{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">horizontal</code>.
        </p>
        <ComponentPreview>
          <RadioDemo />
        </ComponentPreview>
      </section>

      {/* Switch */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Switch</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Binary on/off control. Uses{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">role="switch"</code>{" "}
          on the underlying input. Supports controlled and uncontrolled usage.
          The sliding animation is a CSS{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">transition</code> on
          the thumb position — no JS animation library needed.
        </p>
        <ComponentPreview>
          <SwitchDemo />
        </ComponentPreview>
      </section>

      {/* Select */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Select</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Native{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">&lt;select&gt;</code>{" "}
          with a custom chevron overlay. Uses{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">appearance: none</code>{" "}
          to strip the OS chrome and applies the same size tokens as Input.
        </p>
        <ComponentPreview>
          <SelectDemo />
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sizes</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          All four controls share the same three-size scale so they compose naturally in forms.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Size", "Control height", "Font size", "Use case"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["sm", "32px (Select)", "12px", "Dense tables, toolbars"],
                ["md", "40px (Select)", "13px", "Default — most forms"],
                ["lg", "48px (Select)", "15px", "Hero forms, onboarding"],
              ].map(([size, height, font, use], i) => (
                <tr key={size} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{size}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{height}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{font}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          All controls are client components that wrap native HTML inputs. Styling is achieved with
          CSS peer selectors — the native input is visually hidden via{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">sr-only</code>{" "}
          but remains in the accessibility tree and receives focus normally.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Checkbox props</h2>
        <PropsTable props={CHECKBOX_PROPS} />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">RadioGroup props</h2>
        <PropsTable props={RADIO_GROUP_PROPS} />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Radio props</h2>
        <PropsTable props={RADIO_PROPS} />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Switch props</h2>
        <PropsTable props={SWITCH_PROPS} />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Select props</h2>
        <PropsTable props={SELECT_PROPS} />
      </section>

      {/* Mobile */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Mobile</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Form controls require larger tap targets and clear visual states on touch screens. The Switch pattern in particular benefits from native OS conventions on iOS and Android.
        </p>
        <ComponentPreview className="mb-6">
          <FormControlsMobileDemo />
        </ComponentPreview>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Scenario", "Guidance"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { scenario: "Touch targets", guidance: "Checkbox and radio hit areas should be at least 44×44px even if the visual indicator is smaller. Use a transparent padding wrapper or an expanded after: pseudo-element." },
                { scenario: "Switch component", guidance: "On iOS/Android, use the native UISwitch / SwitchCompat rather than a custom control — users expect the system toggle appearance and snap physics." },
                { scenario: "Radio group layout", guidance: "Vertical stacked radio groups work better than horizontal on mobile. Keep labels on the same line as the control; avoid wrapping label text to a second line." },
                { scenario: "Checkbox in lists", guidance: "In selection lists, make the entire row tappable (full-width touch target), not just the checkbox circle. This dramatically reduces missed taps." },
                { scenario: "Form spacing", guidance: "Increase vertical gap between controls on mobile — use gap-4 or gap-5 instead of gap-2. Tight forms are hard to use with fat fingers and on-screen keyboards." },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.scenario}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.guidance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "All controls use native <input> elements — browser-native keyboard behavior, focus management, and form submission work without extra code.",
            "Labels are associated via htmlFor/id — clicking the label activates the control.",
            "RadioGroup renders a <fieldset> with <legend> to give screen readers the group name.",
            "Switch uses role=\"switch\" on the input so assistive technology announces it as a toggle.",
            "The indeterminate state is set imperatively via ref.indeterminate so it is announced by screen readers as \"mixed\".",
            "Error messages are associated with their input via aria-describedby when using the error prop.",
            "Focus rings use ring-offset so they are always visible regardless of background color.",
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
