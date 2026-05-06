import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { TooltipDemo } from "@/components/docs/TooltipDemo";
import { TooltipMobileDemo } from "@/components/docs/ComponentMobileDemos";

export const metadata: Metadata = { title: "Tooltip" };

const PROPS = [
  {
    name: "content",
    type: "ReactNode",
    description: "Tooltip label. Accepts strings or any React node.",
  },
  {
    name: "side",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"top"',
    description: "Preferred placement. Flips to the opposite side if it would overflow the viewport.",
  },
  {
    name: "delay",
    type: "number",
    default: "400",
    description: "Milliseconds before the tooltip appears on hover/focus.",
  },
  {
    name: "children",
    type: "ReactElement",
    description: "The trigger element. Must be a single React element — Tooltip clones it to attach event handlers.",
  },
];

const CODE = {
  react: {
    filename: "Tooltip.tsx",
    code: `import { Tooltip } from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";

// Basic usage
<Tooltip content="Copy to clipboard">
  <Button variant="ghost" size="icon" aria-label="Copy">
    <Copy className="w-4 h-4" />
  </Button>
</Tooltip>

// Placement — flips automatically if it overflows
<Tooltip content="Top tooltip"    side="top">    <Button>Top</Button>    </Tooltip>
<Tooltip content="Bottom tooltip" side="bottom"> <Button>Bottom</Button> </Tooltip>
<Tooltip content="Left tooltip"   side="left">   <Button>Left</Button>   </Tooltip>
<Tooltip content="Right tooltip"  side="right">  <Button>Right</Button>  </Tooltip>

// Rich content
<Tooltip content={
  <span>
    Press <kbd className="font-mono">⌘K</kbd> to open
  </span>
}>
  <Button variant="ghost">Search</Button>
</Tooltip>

// Custom delay
<Tooltip content="Appears after 100ms" delay={100}>
  <Button variant="secondary">Fast</Button>
</Tooltip>`,
  },
  html: {
    filename: "tooltip.html",
    code: `<!-- Tooltip using CSS only (no JS) -->
<div class="tooltip-wrap">
  <button class="btn btn-ghost" aria-describedby="tip-copy">
    Copy
  </button>
  <div class="tooltip" id="tip-copy" role="tooltip">
    Copy to clipboard
    <span class="tooltip-arrow"></span>
  </div>
</div>

<style>
  .tooltip-wrap {
    position: relative;
    display: inline-flex;
  }

  .tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    max-width: 220px;
    white-space: normal;

    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid rgb(var(--border));
    background: rgb(var(--surface-raised));
    box-shadow: 0 4px 16px rgba(0,0,0,.2);

    font-size: 11px;
    font-weight: 500;
    color: rgb(var(--text-primary));
    line-height: 1.4;
    pointer-events: none;

    opacity: 0;
    transition: opacity 150ms;
  }

  .tooltip-wrap:hover .tooltip,
  .tooltip-wrap:focus-within .tooltip {
    opacity: 1;
  }

  .tooltip-arrow {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px; height: 8px;
    background: rgb(var(--surface-raised));
  }
</style>`,
  },
  swift: {
    filename: "SitkaTooltip.swift",
    code: `import SwiftUI

struct SitkaTooltip<Content: View>: View {
    let label: String
    var placement: Edge = .top
    @ViewBuilder let content: () -> Content

    @State private var isVisible = false

    var body: some View {
        content()
            .onHover { hovering in
                withAnimation(.easeOut(duration: 0.15)) {
                    isVisible = hovering
                }
            }
            .overlay(alignment: alignment) {
                if isVisible {
                    tooltipView
                        .offset(tooltipOffset)
                        .transition(.opacity.combined(with: .scale(scale: 0.95, anchor: anchor)))
                }
            }
    }

    private var tooltipView: some View {
        Text(label)
            .font(.system(size: 11, weight: .medium))
            .foregroundColor(Color(UIColor.label))
            .padding(.horizontal, 10)
            .padding(.vertical, 6)
            .background(Color(UIColor.secondarySystemBackground))
            .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 8, style: .continuous)
                    .stroke(Color(UIColor.separator), lineWidth: 1)
            )
            .shadow(color: .black.opacity(0.15), radius: 8, x: 0, y: 4)
            .fixedSize()
            .allowsHitTesting(false)
    }

    private var alignment: Alignment {
        switch placement {
        case .top:    .top
        case .bottom: .bottom
        case .leading:  .leading
        case .trailing: .trailing
        default:      .top
        }
    }

    private var tooltipOffset: CGSize {
        switch placement {
        case .top:    CGSize(width: 0, height: -36)
        case .bottom: CGSize(width: 0, height:  36)
        case .leading:  CGSize(width: -80, height: 0)
        case .trailing: CGSize(width:  80, height: 0)
        default:      .zero
        }
    }

    private var anchor: UnitPoint {
        switch placement {
        case .top:    .bottom
        case .bottom: .top
        case .leading:  .trailing
        case .trailing: .leading
        default:      .center
        }
    }
}

#Preview {
    HStack(spacing: 40) {
        SitkaTooltip(label: "Top tooltip") {
            Button("Hover me") {}
                .buttonStyle(.bordered)
        }
        SitkaTooltip(label: "Right tooltip", placement: .trailing) {
            Button("Or me") {}
                .buttonStyle(.bordered)
        }
    }
    .padding(60)
}`,
  },
  macos: {
    filename: "SitkaTooltip+macOS.swift",
    code: `import SwiftUI

// On macOS, prefer the native .help() modifier — it shows a system tooltip on hover
// and respects reduced-motion settings automatically.

extension View {
    func sitkaTooltip(_ label: String) -> some View {
        self.help(label)
    }
}

// For cases where you need a custom-styled tooltip, use the same overlay approach:
struct SitkaCustomTooltip<Content: View>: View {
    let label: String
    var placement: Edge = .top
    @ViewBuilder let content: () -> Content

    @State private var isVisible = false

    var body: some View {
        content()
            .onHover { hovering in
                withAnimation(.easeInOut(duration: 0.15)) { isVisible = hovering }
            }
            .overlay(alignment: overlayAlignment) {
                if isVisible {
                    Text(label)
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(Color(.labelColor))
                        .padding(.horizontal, 8)
                        .padding(.vertical, 5)
                        .background(Color(NSColor.controlBackgroundColor))
                        .clipShape(RoundedRectangle(cornerRadius: 6, style: .continuous))
                        .overlay(
                            RoundedRectangle(cornerRadius: 6, style: .continuous)
                                .stroke(Color(NSColor.separatorColor), lineWidth: 1)
                        )
                        .shadow(color: .black.opacity(0.1), radius: 6, x: 0, y: 2)
                        .fixedSize()
                        .allowsHitTesting(false)
                        .offset(tooltipOffset)
                        .transition(.opacity.combined(with: .scale(scale: 0.95, anchor: anchor)))
                }
            }
    }

    private var overlayAlignment: Alignment {
        switch placement {
        case .top:      .top
        case .bottom:   .bottom
        case .leading:  .leading
        case .trailing: .trailing
        }
    }

    private var tooltipOffset: CGSize {
        switch placement {
        case .top:      CGSize(width: 0, height: -32)
        case .bottom:   CGSize(width: 0, height: 32)
        case .leading:  CGSize(width: -80, height: 0)
        case .trailing: CGSize(width: 80, height: 0)
        }
    }

    private var anchor: UnitPoint {
        switch placement {
        case .top:      .bottom
        case .bottom:   .top
        case .leading:  .trailing
        case .trailing: .leading
        }
    }
}

#Preview {
    HStack(spacing: 40) {
        // Native system tooltip (recommended)
        Button("Hover me (native)") {}
            .sitkaTooltip("Native macOS tooltip")

        // Custom styled tooltip
        SitkaCustomTooltip(label: "Custom tooltip", placement: .trailing) {
            Button("Or me (custom)") {}
        }
    }
    .padding(60)
}`,
  },
};

export default function TooltipPage() {
  return (
    <div>
      <PageHeader
        title="Tooltip"
        description="Contextual labels that appear on hover and focus. Portaled to document.body, auto-flips when near viewport edges, and dismisses instantly on mouse-out."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview grid>
          <TooltipDemo />
        </ComponentPreview>
      </section>

      {/* Placement */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Placement</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Four sides, each with automatic flip detection. If the preferred side would overflow the
          viewport the tooltip moves to the opposite side. Horizontal position is always clamped
          within the safe area.
        </p>
        <ComponentPreview>
          <TooltipDemo placement />
        </ComponentPreview>
      </section>

      {/* Behavior */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Behavior</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Trigger", "Action", "Default delay"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["mouseenter", "Show after delay", "400ms"],
                ["mouseleave", "Hide immediately", "—"],
                ["focus",      "Show after delay", "400ms"],
                ["blur",       "Hide immediately", "—"],
              ].map(([trigger, action, delay], i) => (
                <tr key={trigger} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{trigger}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{action}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]"><code className="font-mono text-[11px]">{delay}</code></td>
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
          The tooltip panel is portaled to <code className="font-mono text-[13px] text-[rgb(var(--accent))]">document.body</code>{" "}
          so it is never clipped by <code className="font-mono text-[13px] text-[rgb(var(--accent))]">overflow: hidden</code> ancestors.
          Position is calculated after mount using <code className="font-mono text-[13px] text-[rgb(var(--accent))]">getBoundingClientRect</code>.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      {/* Mobile */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Mobile</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Tooltips depend on hover — a concept that doesn't exist on touch screens. On mobile, tooltips are invisible unless you provide an alternative trigger strategy.
        </p>
        <ComponentPreview className="mb-6">
          <TooltipMobileDemo />
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
                { scenario: "No hover on touch", guidance: "Tooltips do not appear on tap by default. Never put information in a tooltip that is required to understand or operate the control — it will be inaccessible to touch users." },
                { scenario: "Tap-to-show pattern", guidance: "For icon-only controls, show the tooltip on the first tap and perform the action on the second tap. Or show a bottom drawer with the action label on long-press." },
                { scenario: "Prefer visible labels", guidance: "On mobile, replace icon-only buttons that rely on tooltips with visible text labels, or show labels beneath icons. This removes the need for tooltip discovery entirely." },
                { scenario: "Long-press trigger", guidance: "Add a touchstart timer (300ms) to trigger the tooltip on long-press. Dismiss it on touchend or after 2 seconds. This mirrors iOS UIMenu behavior." },
                { scenario: "Positioning on small screens", guidance: "Tooltips positioned to the top can be clipped by the top of the viewport on short-screen devices. Prefer bottom or auto placement on mobile." },
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
            'The tooltip panel has role="tooltip". Wire aria-describedby on the trigger pointing to the tooltip id for full ARIA compliance.',
            "Tooltips appear on focus as well as hover — keyboard users get the same information as mouse users.",
            "Tooltip text must be purely supplementary. Never put information in a tooltip that is required to operate the control.",
            "Avoid rich interactive content inside tooltips — they are pointer-events-none and cannot be focused.",
            "For icon-only buttons, prefer aria-label over a tooltip as the primary accessible name. The tooltip then provides a secondary affordance.",
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
