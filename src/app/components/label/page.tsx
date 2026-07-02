import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";

export const metadata: Metadata = { title: "Label" };

const PROPS = [
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "The label text or content.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    description: "Appends a red asterisk (*) after the label text. Pair with a corresponding required attribute on the input.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Dims the label to indicate the associated input is unavailable.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Font size — sm: 11px, md: 12px, lg: 13px.",
  },
  {
    name: "htmlFor",
    type: "string",
    description: "Associates the label with a form control by id. Passed through as a native HTML attribute.",
  },
];

const CODE = {
  react: {
    filename: "Label.tsx",
    code: `import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";

// Basic
<Label htmlFor="email">Email address</Label>
<Input id="email" type="email" placeholder="you@example.com" />

// Required
<Label htmlFor="name" required>Full name</Label>
<Input id="name" required placeholder="Jane Smith" />

// Disabled
<Label htmlFor="readonly-field" disabled>Read-only field</Label>
<Input id="readonly-field" disabled defaultValue="Cannot change" />

// Sizes
<Label size="sm">Small label</Label>
<Label size="md">Medium label (default)</Label>
<Label size="lg">Large label</Label>`,
  },
  html: {
    filename: "label.html",
    code: `<!-- Basic -->
<label
  for="email"
  style="font-size:12px; font-weight:500; color:rgb(var(--text-secondary));"
>
  Email address
</label>
<input id="email" type="email" placeholder="you@example.com" />

<!-- Required -->
<label
  for="name"
  style="font-size:12px; font-weight:500; color:rgb(var(--text-secondary));"
>
  Full name
  <span aria-hidden="true" style="margin-left:2px; color:rgb(239 68 68);">*</span>
</label>
<input id="name" required placeholder="Jane Smith" />`,
  },
  swift: {
    filename: "LabelView.swift",
    code: `import SwiftUI

// SwiftUI labels are inline with their controls.
// Use Text for standalone labels.

struct LabelView: View {
  var body: some View {
    VStack(alignment: .leading, spacing: 4) {
      // Basic label
      Text("Email address")
        .font(.caption)
        .fontWeight(.medium)
        .foregroundStyle(.secondary)

      // Required indicator via attributed string
      Text("Full name ") + Text("*").foregroundColor(.red)

      // Inside a form
      Form {
        LabeledContent("Email") {
          TextField("you@example.com", text: .constant(""))
        }
      }
    }
    .padding()
  }
}`,
  },
};

export default function LabelPage() {
  return (
    <div>
      <PageHeader
        title="Label"
        description="A standalone form label with optional required indicator and disabled state. Most input components (Input, Select, Textarea) include a built-in label prop — use this component when you need the label separately."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="preview-email">Email address</Label>
              <Input id="preview-email" type="email" placeholder="you@example.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="preview-name" required>Full name</Label>
              <Input id="preview-name" placeholder="Jane Smith" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="preview-disabled" disabled>Disabled field</Label>
              <Input id="preview-disabled" disabled defaultValue="Read-only" />
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Sizes
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-3">
            <Label size="sm">Small — 11px</Label>
            <Label size="md">Medium — 12px (default)</Label>
            <Label size="lg">Large — 13px</Label>
          </div>
        </ComponentPreview>
      </section>

      {/* When to use */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          When to use
        </h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "When composing a custom field layout where the input and label need to be separate elements (e.g. label + description text + input).",
            "When building a custom form control that doesn't include its own label prop.",
            "For checkbox and radio groups — prefer RadioGroup's label prop for the group legend, and this Label for individual contextual labels.",
            "Prefer the built-in label prop on Input, Select, and Textarea when there is no need for extra composition.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
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
          <code className="font-mono text-[12px] text-[rgb(var(--accent))]">{"<label>"}</code>{" "}
          attributes are forwarded.
        </p>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Accessibility
        </h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Always provide htmlFor pointing to the input's id — this creates a programmatic association that screen readers use to announce the label when the input is focused.",
            "The asterisk (*) in the required indicator is aria-hidden; screen readers will announce the native required attribute on the input instead.",
            "Do not use colour alone to communicate required status — the * character provides a non-colour indicator.",
            "When a label is visually hidden, prefer sr-only class over omitting it entirely — the association still benefits keyboard and screen reader users.",
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
