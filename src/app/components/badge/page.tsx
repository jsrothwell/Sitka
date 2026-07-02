import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Badge } from "@/components/ui/Badge";
import { BadgeMobileDemo } from "@/site/docs/ComponentMobileDemos";

export const metadata: Metadata = { title: "Badge" };

const PROPS = [
  {
    name: "variant",
    type: '"default" | "primary" | "success" | "warning" | "danger" | "ghost"',
    default: '"default"',
    description: "Controls color theme of the badge.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Sets font size and padding.",
  },
  {
    name: "dot",
    type: "boolean",
    default: "false",
    description: "Prepends a filled circle in the variant color — useful for status labels.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "Badge label content.",
  },
];

const CODE = {
  react: {
    filename: "Badge.tsx",
    code: `import { Badge } from "@/components/ui/Badge";

// Variants
<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="ghost">Ghost</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// With dot (status indicator)
<Badge variant="success" dot>Online</Badge>
<Badge variant="warning" dot>Degraded</Badge>
<Badge variant="danger"  dot>Incident</Badge>
<Badge variant="default" dot>Offline</Badge>`,
  },
  html: {
    filename: "badge.html",
    code: `<!-- Default -->
<span class="badge">Default</span>

<!-- Variants -->
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-ghost">Ghost</span>

<!-- With dot -->
<span class="badge badge-success">
  <span class="badge-dot"></span>
  Online
</span>

<!-- Sizes -->
<span class="badge badge-sm">Small</span>
<span class="badge badge-lg">Large</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 6px;
    border: 1px solid;
    background: rgb(var(--surface-raised));
    border-color: rgb(var(--border));
    color: rgb(var(--text-secondary));
  }

  .badge-primary { background: rgb(var(--accent-subtle)); border-color: rgb(var(--accent) / 0.3); color: rgb(var(--accent)); }
  .badge-success { background: rgba(16,185,129,.1); border-color: rgba(16,185,129,.3); color: #10b981; }
  .badge-warning { background: rgba(251,191,36,.1); border-color: rgba(251,191,36,.3); color: #f59e0b; }
  .badge-danger  { background: rgba(248,113,113,.1); border-color: rgba(248,113,113,.3); color: #f87171; }
  .badge-ghost   { background: transparent; border-color: rgb(var(--border)); color: rgb(var(--text-tertiary)); }

  .badge-sm { font-size: 10px; padding: 1px 6px; }
  .badge-lg { font-size: 12px; padding: 4px 10px; }

  .badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }
</style>`,
  },
  swift: {
    filename: "SitkaBadge.swift",
    code: `import SwiftUI

enum SitkaBadgeVariant {
    case defaultStyle, primary, success, warning, danger, ghost
}

struct SitkaBadge: View {
    let label: String
    var variant: SitkaBadgeVariant = .defaultStyle
    var showDot: Bool = false

    var body: some View {
        HStack(spacing: 4) {
            if showDot {
                Circle()
                    .fill(dotColor)
                    .frame(width: 6, height: 6)
            }
            Text(label)
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(foregroundColor)
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 2)
        .background(backgroundColor)
        .clipShape(RoundedRectangle(cornerRadius: 6, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 6, style: .continuous)
                .stroke(borderColor, lineWidth: 1)
        )
    }

    private var foregroundColor: Color {
        switch variant {
        case .defaultStyle: return Color(UIColor.secondaryLabel)
        case .primary:  return Color.accentColor
        case .success:  return Color(hex: "#10b981")
        case .warning:  return Color(hex: "#f59e0b")
        case .danger:   return Color(hex: "#f87171")
        case .ghost:    return Color(UIColor.tertiaryLabel)
        }
    }

    private var backgroundColor: Color {
        switch variant {
        case .defaultStyle: return Color(UIColor.tertiarySystemFill)
        case .primary:  return Color.accentColor.opacity(0.1)
        case .success:  return Color(hex: "#10b981").opacity(0.1)
        case .warning:  return Color(hex: "#f59e0b").opacity(0.1)
        case .danger:   return Color(hex: "#f87171").opacity(0.1)
        case .ghost:    return Color.clear
        }
    }

    private var borderColor: Color { foregroundColor.opacity(0.3) }
    private var dotColor: Color { foregroundColor }
}

#Preview {
    VStack(spacing: 12) {
        HStack {
            SitkaBadge(label: "Default")
            SitkaBadge(label: "Primary",  variant: .primary)
            SitkaBadge(label: "Success",  variant: .success)
            SitkaBadge(label: "Warning",  variant: .warning)
            SitkaBadge(label: "Danger",   variant: .danger)
        }
        HStack {
            SitkaBadge(label: "Online",   variant: .success, showDot: true)
            SitkaBadge(label: "Degraded", variant: .warning, showDot: true)
            SitkaBadge(label: "Incident", variant: .danger,  showDot: true)
        }
    }
    .padding()
}`,
  },
  macos: {
    filename: "SitkaBadge+macOS.swift",
    code: `import SwiftUI

enum SitkaBadgeVariant {
    case defaultStyle, primary, success, warning, danger, ghost
}

struct SitkaBadge: View {
    let label: String
    var variant: SitkaBadgeVariant = .defaultStyle
    var showDot: Bool = false

    var body: some View {
        HStack(spacing: 4) {
            if showDot {
                Circle()
                    .fill(dotColor)
                    .frame(width: 6, height: 6)
            }
            Text(label)
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(foregroundColor)
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 2)
        .background(backgroundColor)
        .clipShape(RoundedRectangle(cornerRadius: 5, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 5, style: .continuous)
                .stroke(borderColor, lineWidth: 1)
        )
    }

    private var foregroundColor: Color {
        switch variant {
        case .defaultStyle: return Color(.secondaryLabelColor)
        case .primary:  return Color.accentColor
        case .success:  return Color(hex: "#10b981")
        case .warning:  return Color(hex: "#f59e0b")
        case .danger:   return Color(hex: "#f87171")
        case .ghost:    return Color(.tertiaryLabelColor)
        }
    }

    private var backgroundColor: Color {
        switch variant {
        case .defaultStyle: return Color(NSColor.quaternaryLabelColor).opacity(0.1)
        case .primary:  return Color.accentColor.opacity(0.1)
        case .success:  return Color(hex: "#10b981").opacity(0.1)
        case .warning:  return Color(hex: "#f59e0b").opacity(0.1)
        case .danger:   return Color(hex: "#f87171").opacity(0.1)
        case .ghost:    return Color.clear
        }
    }

    private var borderColor: Color { foregroundColor.opacity(0.3) }
    private var dotColor: Color { foregroundColor }
}

#Preview {
    VStack(spacing: 10) {
        HStack {
            SitkaBadge(label: "Default")
            SitkaBadge(label: "Primary",  variant: .primary)
            SitkaBadge(label: "Success",  variant: .success)
            SitkaBadge(label: "Warning",  variant: .warning)
            SitkaBadge(label: "Danger",   variant: .danger)
        }
        HStack {
            SitkaBadge(label: "Online",   variant: .success, showDot: true)
            SitkaBadge(label: "Degraded", variant: .warning, showDot: true)
            SitkaBadge(label: "Incident", variant: .danger,  showDot: true)
        }
    }
    .padding()
}`,
  },
};

export default function BadgePage() {
  return (
    <div>
      <PageHeader
        title="Badge"
        description="Compact labels for status, category, and metadata. Six semantic variants, three sizes, and an optional dot indicator for real-time status."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview grid>
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </ComponentPreview>
      </section>

      {/* Dot */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Status dot</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The <code className="font-mono text-[13px] text-[rgb(var(--accent))]">dot</code> prop prepends a
          filled circle in the variant color. Use it for live system or user status labels.
        </p>
        <ComponentPreview>
          <Badge variant="success" dot>Online</Badge>
          <Badge variant="warning" dot>Degraded</Badge>
          <Badge variant="danger" dot>Incident</Badge>
          <Badge variant="default" dot>Offline</Badge>
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sizes</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Three sizes for different information densities. <code className="font-mono text-[13px] text-[rgb(var(--accent))]">sm</code> fits
          inside table cells; <code className="font-mono text-[13px] text-[rgb(var(--accent))]">lg</code> stands
          alone as a category tag.
        </p>
        <ComponentPreview>
          <Badge size="sm" variant="primary">Small</Badge>
          <Badge size="md" variant="primary">Medium</Badge>
          <Badge size="lg" variant="primary">Large</Badge>
        </ComponentPreview>
      </section>

      {/* Combinations */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">In context</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Badges are most useful inline with text or labels — pipeline status, PR state, plan tiers.
        </p>
        <ComponentPreview>
          <div className="flex flex-col gap-3 w-full max-w-sm">
            {[
              { label: "Build pipeline", badge: "Passing", v: "success" as const },
              { label: "Pull request",   badge: "Review",  v: "warning" as const },
              { label: "API status",     badge: "Degraded",v: "danger"  as const },
              { label: "Plan",           badge: "Pro",     v: "primary" as const },
            ].map(({ label, badge, v }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[13px] text-[rgb(var(--text-primary))]">{label}</span>
                <Badge variant={v} dot>{badge}</Badge>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Badge is a pure presentational component with no client-side state — it can render on the server.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Mobile */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Mobile</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Badges are non-interactive and render identically on all screen sizes. A few layout and legibility considerations apply on small screens.
        </p>
        <ComponentPreview className="mb-6">
          <BadgeMobileDemo />
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
                { scenario: "Legibility", guidance: "Badge text at 10–11px can be hard to read on lower-DPI Android devices. Prefer single-word labels over abbreviations." },
                { scenario: "Overflow on mobile", guidance: "Badges in tight horizontal layouts (e.g. nav pills) may truncate or wrap. Set max-w with truncate, or drop the label and show only the dot on narrow screens." },
                { scenario: "Dot badges", guidance: "On mobile, dot-only badges (e.g. notification indicators) should be at least 8×8px and have enough contrast against the surface they sit on." },
                { scenario: "Tap area", guidance: "Badges are not interactive. If you need a tappable tag, use a Button with ghost variant and small size instead." },
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
            "Badges are rendered as <span> — non-interactive and not focusable by default.",
            "The dot is aria-hidden; its meaning is conveyed by the label text alone.",
            "All variant colors meet WCAG AA contrast on both light and dark surfaces.",
            "For dynamic status (e.g. live system health), use aria-live on the parent container to announce changes to screen readers.",
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
