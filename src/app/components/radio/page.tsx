import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { RadioGroup, Radio } from "@/components/ui/Radio";

export const metadata: Metadata = { title: "Radio" };

const RADIO_GROUP_PROPS = [
  {
    name: "label",
    type: "string",
    description: "Accessible group label, rendered as a <legend> inside a <fieldset>.",
  },
  {
    name: "helperText",
    type: "string",
    description: "Supplemental hint rendered below the group.",
  },
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Stacks options vertically or lays them out in a row.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Applies to all Radio children unless overridden individually.",
  },
  {
    name: "value",
    type: "string",
    description: "Controlled selected value.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    description: "Called when a Radio is selected.",
  },
  {
    name: "name",
    type: "string",
    description: "Name attribute shared across all Radio inputs in the group.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables all Radio children.",
  },
];

const RADIO_PROPS = [
  {
    name: "value",
    type: "string",
    required: true,
    description: "The value this radio represents. Matched against RadioGroup's value prop.",
  },
  {
    name: "label",
    type: "string",
    description: "Visible label for this option.",
  },
  {
    name: "helperText",
    type: "string",
    description: "Supplemental hint rendered below the label.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables this individual radio option.",
  },
];

const CODE = {
  react: {
    filename: "Radio.tsx",
    code: `import { RadioGroup, Radio } from "@/components/ui/Radio";
import { useState } from "react";

// Vertical group (default)
const [plan, setPlan] = useState("monthly");
<RadioGroup
  label="Billing plan"
  value={plan}
  onChange={setPlan}
  name="billing"
>
  <Radio value="monthly" label="Monthly" helperText="$12/month" />
  <Radio value="annual"  label="Annual"  helperText="$8/month, billed annually" />
  <Radio value="team"    label="Team"    helperText="$25/month per user" />
</RadioGroup>

// Horizontal layout
<RadioGroup
  label="Size"
  orientation="horizontal"
  value={size}
  onChange={setSize}
  name="size"
>
  <Radio value="sm" label="Small" />
  <Radio value="md" label="Medium" />
  <Radio value="lg" label="Large" />
</RadioGroup>

// With one option disabled
<RadioGroup label="Region" value={region} onChange={setRegion} name="region">
  <Radio value="us"     label="United States" />
  <Radio value="eu"     label="Europe" />
  <Radio value="asia"   label="Asia Pacific" disabled helperText="Coming soon" />
</RadioGroup>`,
  },
  html: {
    filename: "radio.html",
    code: `<fieldset style="border:none; padding:0; margin:0;">
  <legend style="font-size:12px; font-weight:500; color:rgb(var(--text-secondary)); margin-bottom:8px;">
    Billing plan
  </legend>
  <div style="display:flex; flex-direction:column; gap:8px;">
    <label style="display:flex; align-items:flex-start; gap:10px; cursor:pointer;">
      <span style="position:relative; width:16px; height:16px; flex-shrink:0; margin-top:2px;">
        <input type="radio" name="billing" value="monthly" class="sr-only peer" />
        <span class="radio-outer peer-checked:border-accent"></span>
        <span class="radio-dot peer-checked:opacity-100 bg-accent"></span>
      </span>
      <span>
        <span style="font-size:13px; font-weight:500; display:block;">Monthly</span>
        <span style="font-size:12px; color:rgb(var(--text-tertiary));">$12/month</span>
      </span>
    </label>
    <!-- Repeat for each option -->
  </div>
</fieldset>`,
  },
  swift: {
    filename: "RadioGroupView.swift",
    code: `import SwiftUI

enum BillingPlan: String, CaseIterable {
  case monthly = "Monthly"
  case annual  = "Annual"
  case team    = "Team"
}

struct RadioGroupView: View {
  @State private var selected = BillingPlan.monthly

  var body: some View {
    VStack(alignment: .leading, spacing: 4) {
      Text("Billing plan")
        .font(.caption)
        .fontWeight(.medium)
        .foregroundStyle(.secondary)

      ForEach(BillingPlan.allCases, id: \\.self) { plan in
        Label {
          Text(plan.rawValue)
        } icon: {
          Image(systemName: selected == plan
            ? "circle.inset.filled"
            : "circle")
            .foregroundStyle(selected == plan ? .accentColor : .secondary)
        }
        .contentShape(Rectangle())
        .onTapGesture { selected = plan }
      }
    }
  }
}`,
  },
};

export default function RadioPage() {
  return (
    <div>
      <PageHeader
        title="Radio"
        description="Mutually exclusive selection within a group. Use RadioGroup as the container and Radio for each option — they share state via React context."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
           <RadioGroup label="Billing plan" value="monthly" name="billing-preview">
            <Radio value="monthly" label="Monthly" helperText="$12/month" />
            <Radio value="annual"  label="Annual"  helperText="$8/month, billed annually" />
            <Radio value="team"    label="Team"    helperText="$25/month per user" />
          </RadioGroup>
        </ComponentPreview>
      </section>

      {/* Orientation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Orientation
        </h2>
        <ComponentPreview label="Horizontal">
          <RadioGroup
            label="Notification frequency"
            orientation="horizontal"
            value="daily"
            name="freq-preview"
          >
            <Radio value="realtime" label="Real-time" />
            <Radio value="daily"    label="Daily" />
            <Radio value="weekly"   label="Weekly" />
          </RadioGroup>
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Sizes
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-6">
            {(["sm", "md", "lg"] as const).map((size) => (
              <RadioGroup key={size} label={`Size: ${size}`} value="a" name={`size-${size}`} size={size}>
                <Radio value="a" label="Option A" />
                <Radio value="b" label="Option B" />
              </RadioGroup>
            ))}
          </div>
        </ComponentPreview>
        <div className="mt-4 rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Size", "Outer circle", "Inner dot"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { size: "sm", outer: "14 × 14px", dot: "6 × 6px" },
                { size: "md", outer: "16 × 16px", dot: "8 × 8px" },
                { size: "lg", outer: "20 × 20px", dot: "10 × 10px" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.size}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.outer}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.dot}</td>
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

      {/* Props — RadioGroup */}
      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Props — RadioGroup
        </h2>
        <PropsTable props={RADIO_GROUP_PROPS} />
      </section>

      {/* Props — Radio */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Props — Radio
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          All native{" "}
          <code className="font-mono text-[12px] text-[rgb(var(--accent))]">{"<input type=\"radio\">"}</code>{" "}
          attributes are forwarded. Size and name are inherited from RadioGroup context.
        </p>
        <PropsTable props={RADIO_PROPS} />
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
                { el: "Group", role: "radiogroup", attrs: "aria-labelledby, aria-describedby" },
                { el: "Option", role: "radio (implicit)", attrs: "aria-checked (true/false)" },
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
                { key: "Arrow Down / Right", action: "Move focus to and select the next option in the group" },
                { key: "Arrow Up / Left", action: "Move focus to and select the previous option in the group" },
                { key: "Tab", action: "Move focus into / out of the group (single tab stop)" },
                { key: "Shift+Tab", action: "Move focus backward past the group" },
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
            "RadioGroup renders a <fieldset> with a <legend>, giving the group an accessible name read by screen readers.",
            "Each Radio is a native <input type=\"radio\"> — arrow keys navigate within the group natively.",
            "The visual indicator is CSS-only; the real input is sr-only and receives focus.",
            "Disabled radio options set aria-disabled and visually dim both the control and label.",
            "helperText on individual options should be linked via aria-describedby for screen reader context.",
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
