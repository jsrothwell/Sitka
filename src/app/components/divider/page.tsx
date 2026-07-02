import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Divider } from "@/components/ui/Divider";

export const metadata: Metadata = { title: "Divider" };

const PROPS = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Renders a horizontal rule or a vertical line. Vertical dividers require the parent to set a height or use flexbox.",
  },
  {
    name: "label",
    type: "string",
    description: "Optional text centred within the divider. Only applies to horizontal orientation.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional classes passed to the root element.",
  },
];

const CODE = {
  react: {
    filename: "Divider.tsx",
    code: `import { Divider } from "@/components/ui/Divider";

// Plain horizontal
<Divider />

// With label
<Divider label="or" />
<Divider label="Section heading" />

// Vertical (needs height context)
<div className="flex items-center h-8 gap-4">
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`,
  },
  html: {
    filename: "divider.html",
    code: `<!-- Plain horizontal -->
<hr style="border: none; height: 1px; background: rgb(var(--border)); width: 100%;" role="separator" />

<!-- With label -->
<div role="separator" style="display:flex; align-items:center; gap:12px;">
  <div style="flex:1; height:1px; background:rgb(var(--border));"></div>
  <span style="font-size:11px; font-weight:500; color:rgb(var(--text-tertiary)); text-transform:uppercase; letter-spacing:0.05em;">
    or
  </span>
  <div style="flex:1; height:1px; background:rgb(var(--border));"></div>
</div>

<!-- Vertical -->
<div style="display:flex; align-items:center; height:32px; gap:16px;">
  <span>Left</span>
  <div role="separator" aria-orientation="vertical"
    style="align-self:stretch; width:1px; background:rgb(var(--border));"></div>
  <span>Right</span>
</div>`,
  },
  swift: {
    filename: "DividerView.swift",
    code: `import SwiftUI

// SwiftUI has a native Divider
struct DividerView: View {
  var body: some View {
    VStack(spacing: 24) {
      // Plain horizontal
      Divider()

      // With label
      LabeledDivider(label: "or")

      // Vertical
      HStack {
        Text("Left")
        Divider().frame(height: 24)
        Text("Right")
      }
    }
    .padding()
  }
}

struct LabeledDivider: View {
  let label: String
  var body: some View {
    HStack(spacing: 12) {
      Rectangle()
        .frame(height: 1)
        .foregroundStyle(Color(.separator))
      Text(label)
        .font(.caption)
        .fontWeight(.medium)
        .foregroundStyle(.tertiary)
        .textCase(.uppercase)
      Rectangle()
        .frame(height: 1)
        .foregroundStyle(Color(.separator))
    }
  }
}`,
  },
};

export default function DividerPage() {
  return (
    <div>
      <PageHeader
        title="Divider"
        description="A visual separator for grouping related content. Supports horizontal and vertical orientations, with an optional centred label for contextual dividers."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <Divider />
            <Divider label="or continue with" />
          </div>
        </ComponentPreview>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Variants
        </h2>
        <ComponentPreview label="Horizontal — plain">
          <div className="w-full max-w-sm">
            <Divider />
          </div>
        </ComponentPreview>
        <ComponentPreview label="Horizontal — with label" className="mt-4">
          <div className="w-full max-w-sm">
            <Divider label="or" />
          </div>
        </ComponentPreview>
        <ComponentPreview label="Vertical" className="mt-4">
          <div className="flex items-center h-10 gap-4 text-[14px] text-[rgb(var(--text-secondary))]">
            <span>Left panel</span>
            <Divider orientation="vertical" />
            <span>Right panel</span>
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
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Accessibility
        </h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'Horizontal dividers render as <hr role="separator"> — screen readers announce "separator" at the element\'s position in the DOM.',
            'Vertical dividers use role="separator" with aria-orientation="vertical".',
            "When using Divider to separate sections, ensure the surrounding context provides meaning — the divider itself is decorative.",
            "Avoid relying on the label text alone to communicate section structure; use proper headings for landmark navigation.",
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
