import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ViewToggleDemo, IconOnlyDemo, MultiSelectDemo, SizesDemo } from "@/components/docs/SegmentedButtonDemo";
import { SegmentedButtonMobileDemo } from "@/components/docs/ComponentMobileDemos";

export const metadata: Metadata = { title: "Segmented Button" };

const PROPS = [
  { name: "options",    type: "SegmentedButtonOption[]",       description: "The segments to render. Each has value, optional label, optional icon." },
  { name: "value",      type: "T | T[]",                       description: "Controlled selected value. Array when multiple=true." },
  { name: "onChange",   type: "(value: T | T[]) => void",      description: "Called with the new value when a segment is clicked." },
  { name: "multiple",   type: "boolean",            default: "false", description: "Allows multiple segments to be active simultaneously." },
  { name: "size",       type: '"sm" | "md" | "lg"', default: '"md"',  description: "Segment height and font size." },
  { name: "fullWidth",  type: "boolean",            default: "false", description: "Stretches the group to fill its container; each segment gets equal width." },
];

const OPTION_PROPS = [
  { name: "value",    type: "string",    description: "Unique identifier for this segment." },
  { name: "label",    type: "string",    description: "Text label. Can be omitted for icon-only segments." },
  { name: "icon",     type: "ReactNode", description: "Icon rendered before the label." },
  { name: "disabled", type: "boolean",   description: "Prevents selection of this segment." },
];

const CODE = {
  react: {
    filename: "SegmentedButton.tsx",
    code: `import { SegmentedButton } from "@/components/ui/SegmentedButton";
import { LayoutGrid, List, Map } from "lucide-react";

// Single selection (default)
const [view, setView] = useState("grid");

<SegmentedButton
  value={view}
  onChange={(v) => setView(v)}
  options={[
    { value: "grid", label: "Grid", icon: <LayoutGrid className="w-4 h-4" /> },
    { value: "list", label: "List", icon: <List className="w-4 h-4" /> },
    { value: "map",  label: "Map",  icon: <Map className="w-4 h-4" /> },
  ]}
/>

// Multiple selection
const [formats, setFormats] = useState(["bold"]);

<SegmentedButton
  multiple
  value={formats}
  onChange={(v) => setFormats(v)}
  options={[
    { value: "bold",      icon: <Bold className="w-4 h-4" /> },
    { value: "italic",    icon: <Italic className="w-4 h-4" /> },
    { value: "underline", icon: <Underline className="w-4 h-4" /> },
  ]}
/>

// Full width
<SegmentedButton fullWidth value={period} onChange={setPeriod}
  options={[
    { value: "day",   label: "Day" },
    { value: "week",  label: "Week" },
    { value: "month", label: "Month" },
    { value: "year",  label: "Year" },
  ]}
/>`,
  },
  html: {
    filename: "segmented-button.html",
    code: `<div class="segmented" role="radiogroup" aria-label="View mode">
  <button class="seg-item" role="radio" aria-checked="true">
    <svg class="seg-icon" viewBox="0 0 24 24"><!-- grid icon --></svg>
    Grid
  </button>
  <button class="seg-item" role="radio" aria-checked="false">
    <svg class="seg-icon" viewBox="0 0 24 24"><!-- list icon --></svg>
    List
  </button>
  <button class="seg-item" role="radio" aria-checked="false">
    <svg class="seg-icon" viewBox="0 0 24 24"><!-- map icon --></svg>
    Map
  </button>
</div>

<style>
  .segmented {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 4px;
    border-radius: 12px;
    border: 1px solid rgb(var(--border));
    background: rgb(var(--surface));
  }

  .seg-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    border: none;
    background: transparent;
    color: rgb(var(--text-secondary));
    cursor: pointer;
    transition: all 150ms;
  }

  .seg-item:hover {
    color: rgb(var(--text-primary));
    background: rgba(var(--surface-raised), 0.5);
  }

  .seg-item[aria-checked="true"] {
    background: rgb(var(--surface-raised));
    color: rgb(var(--text-primary));
    border: 1px solid rgb(var(--border));
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  }

  .seg-item:focus-visible {
    outline: 2px solid rgb(var(--accent));
    outline-offset: -2px;
  }

  .seg-icon {
    width: 16px; height: 16px;
    stroke: currentColor; fill: none; stroke-width: 2;
  }
</style>`,
  },
  swift: {
    filename: "SitkaSegmentedButton.swift",
    code: `import SwiftUI

struct SegmentedOption<T: Hashable>: Identifiable {
    let id = UUID()
    let value: T
    let label: String?
    let systemImage: String?
}

struct SitkaSegmentedButton<T: Hashable>: View {
    let options: [SegmentedOption<T>]
    @Binding var selection: T

    var body: some View {
        HStack(spacing: 2) {
            ForEach(options) { opt in
                Button {
                    withAnimation(.spring(response: 0.2, dampingFraction: 0.8)) {
                        selection = opt.value
                    }
                } label: {
                    HStack(spacing: 6) {
                        if let img = opt.systemImage {
                            Image(systemName: img)
                                .font(.system(size: 13, weight: .medium))
                        }
                        if let label = opt.label {
                            Text(label)
                                .font(.system(size: 13, weight: .medium))
                        }
                    }
                    .foregroundColor(
                        selection == opt.value
                            ? Color(UIColor.label)
                            : Color(UIColor.secondaryLabel)
                    )
                    .frame(height: 36)
                    .padding(.horizontal, 14)
                    .background(
                        selection == opt.value
                            ? Color(UIColor.secondarySystemBackground)
                            : Color.clear
                    )
                    .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                    .overlay(
                        RoundedRectangle(cornerRadius: 8, style: .continuous)
                            .stroke(
                                selection == opt.value
                                    ? Color(UIColor.separator)
                                    : Color.clear,
                                lineWidth: 1
                            )
                    )
                    .shadow(
                        color: selection == opt.value ? .black.opacity(0.12) : .clear,
                        radius: 4, x: 0, y: 1
                    )
                }
                .buttonStyle(.plain)
            }
        }
        .padding(4)
        .background(Color(UIColor.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .stroke(Color(UIColor.separator), lineWidth: 1)
        )
    }
}

#Preview {
    @Previewable @State var view = "grid"

    SitkaSegmentedButton(
        options: [
            SegmentedOption(value: "grid",  label: "Grid", systemImage: "square.grid.2x2"),
            SegmentedOption(value: "list",  label: "List", systemImage: "list.bullet"),
            SegmentedOption(value: "map",   label: "Map",  systemImage: "map"),
        ],
        selection: $view
    )
    .padding()
}`,
  },
};

export default function SegmentedButtonPage() {
  return (
    <div>
      <PageHeader
        title="Segmented Button"
        description="A connected group of toggle buttons for mutually exclusive (or multi-select) choices. Used for view modes, filter states, alignment, and time-range selectors."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <ViewToggleDemo />
        </ComponentPreview>
      </section>

      {/* Icon only */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Icon only</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Omit <code className="font-mono text-[13px] text-[rgb(var(--accent))]">label</code> and
          provide only <code className="font-mono text-[13px] text-[rgb(var(--accent))]">icon</code>{" "}
          for compact toolbars. Always add a parent{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">aria-label</code>{" "}
          or <code className="font-mono text-[13px] text-[rgb(var(--accent))]">title</code>{" "}
          on each segment when labels are hidden.
        </p>
        <ComponentPreview>
          <IconOnlyDemo />
        </ComponentPreview>
      </section>

      {/* Multi-select */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Multi-select</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Set <code className="font-mono text-[13px] text-[rgb(var(--accent))]">multiple</code>{" "}
          to allow any combination of segments to be active simultaneously.{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">value</code> becomes a{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">string[]</code> and each
          segment uses <code className="font-mono text-[13px] text-[rgb(var(--accent))]">role="checkbox"</code>{" "}
          instead of <code className="font-mono text-[13px] text-[rgb(var(--accent))]">radio</code>.
        </p>
        <ComponentPreview>
          <MultiSelectDemo />
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sizes</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Three sizes share the same scale as Button and Input.
        </p>
        <ComponentPreview>
          <SizesDemo />
        </ComponentPreview>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The selected segment is styled via a direct class comparison — no hidden input, no CSS peer
          trick. The active pill uses a slightly elevated surface with an inset border and a shallow
          box-shadow to appear "pressed in" to the track.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">SegmentedButton props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">SegmentedButtonOption</h2>
        <PropsTable props={OPTION_PROPS} />
      </section>

      {/* Accessibility */}
      {/* Mobile */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Mobile</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Segmented buttons with many segments overflow on narrow screens. Cap segments at 4 on mobile, or switch to a Select or bottom sheet for larger option sets.
        </p>
        <ComponentPreview className="mb-6">
          <SegmentedButtonMobileDemo />
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
                { scenario: "Segment count", guidance: "Limit to 3–4 segments on mobile. Five or more segments will either overflow or produce segments too narrow to tap reliably (below 44px each)." },
                { scenario: "Scrollable variant", guidance: "If more options are needed, make the segmented button horizontally scrollable with overflow-x: auto. The selected segment should always be visible on initial render — scroll it into view." },
                { scenario: "Touch target height", guidance: "Use h-10 (40px) or taller on mobile. The default h-8 (32px) is below the 44px target — add extra padding or switch sizes when space allows." },
                { scenario: "Icon-only segments", guidance: "Icon-only segments save space but require a visible label elsewhere on screen to explain what mode is selected. On mobile, prefer icon + short label." },
                { scenario: "Alternative on mobile", guidance: "For 5+ options, replace the segmented button with a native select or a custom bottom sheet picker. These are more thumb-friendly and scale to any option count." },
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

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "The group has role=\"radiogroup\" (single) or role=\"group\" (multiple). Each segment has role=\"radio\" or role=\"checkbox\" with aria-checked.",
            "Add an aria-label to the SegmentedButton when the options' meaning isn't clear from context.",
            "Keyboard: Tab focuses the group; Arrow keys move between segments in single-select mode.",
            "Icon-only segments must have a title attribute or aria-label for screen readers.",
            "Never rely solely on selected state to communicate the current view — pair with a visible heading or title.",
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
