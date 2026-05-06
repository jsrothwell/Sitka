import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Breadcrumb" };

// ── SVG Demo ─────────────────────────────────────────────────────────────────

const P = {
  surface:  "#0d0d11",
  raised:   "#14141a",
  border:   "#262630",
  text:     "#f2f2f6",
  subtle:   "#9b9baa",
  tertiary: "#646473",
  accent:   "#60a5fa",
};

type Crumb = [string, boolean];

function BreadcrumbDemo() {
  const W = 520, H = 140;
  const crumbs: Crumb[] = [
    ["Settings", true],
    ["Billing", true],
    ["Payment Methods", false],
  ];
  const sep = "›";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      <rect width={W} height={H} fill={P.surface} rx={12} />

      {/* Three rows at different truncation levels */}
      {[
        { label: "Full breadcrumb", y: 28,  items: crumbs },
        { label: "With home icon",  y: 72,  items: crumbs },
        { label: "Collapsed (…)",   y: 116, items: [["Settings", true], ["…", true], ["Payment Methods", false]] as Crumb[] },
      ].map(({ label, y, items }) => {
        let offsetX = 28;
        return (
          <g key={label}>
            <text x={28} y={y - 10} fontSize={9} fill={P.tertiary} fontWeight={600} letterSpacing={0.5}>
              {label.toUpperCase()}
            </text>
            {items.map(([name, clickable], i) => {
              const isLast = i === items.length - 1;
              const textX = offsetX;
              const approxW = name.length * 7.5;
              const color = clickable && !isLast ? P.accent : (isLast ? P.text : P.subtle);
              const group = (
                <g key={name}>
                  <text x={textX} y={y + 5} fontSize={13} fill={color} fontWeight={isLast ? 600 : 500}>
                    {name}
                  </text>
                  {!isLast && (
                    <text x={textX + approxW + 6} y={y + 5} fontSize={12} fill={P.tertiary}>
                      {sep}
                    </text>
                  )}
                </g>
              );
              offsetX += approxW + 20;
              return group;
            })}
          </g>
        );
      })}
    </svg>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

const PROPS = [
  {
    name: "items",
    type: "Array<{ label: string; href?: string }>",
    description: "Ordered list of crumbs from root to current. The last item is rendered as the current page (no link).",
  },
  {
    name: "maxVisible",
    type: "number",
    default: "undefined",
    description: "When set, collapses middle items into a '…' button that expands on click. Always shows the first and last crumb.",
  },
  {
    name: "separator",
    type: "ReactNode",
    default: '"›"',
    description: "Custom separator element rendered between each crumb.",
  },
  {
    name: "homeIcon",
    type: "boolean",
    default: "false",
    description: "Replaces the first crumb label with a Home icon.",
  },
  {
    name: "size",
    type: '"sm" | "md"',
    default: '"md"',
    description: "Controls font size and separator spacing.",
  },
];

// ── Code ──────────────────────────────────────────────────────────────────────

const CODE = {
  react: {
    filename: "Breadcrumb.tsx",
    code: `import { Breadcrumb } from "@/components/ui/Breadcrumb";

// Basic usage
<Breadcrumb
  items={[
    { label: "Settings", href: "/settings" },
    { label: "Billing",  href: "/settings/billing" },
    { label: "Payment Methods" },
  ]}
/>

// With home icon
<Breadcrumb
  homeIcon
  items={[
    { label: "Home",    href: "/" },
    { label: "Library", href: "/library" },
    { label: "Albums" },
  ]}
/>

// Collapsed — shows root + … + current
<Breadcrumb
  maxVisible={3}
  items={[
    { label: "Home",        href: "/" },
    { label: "Projects",    href: "/projects" },
    { label: "Web App",     href: "/projects/web-app" },
    { label: "Components",  href: "/projects/web-app/components" },
    { label: "Breadcrumb" },
  ]}
/>`,
  },
  html: {
    filename: "breadcrumb.html",
    code: `<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
      <a href="/settings" class="breadcrumb-link">Settings</a>
    </li>
    <li class="breadcrumb-item" aria-hidden="true">›</li>
    <li class="breadcrumb-item">
      <a href="/settings/billing" class="breadcrumb-link">Billing</a>
    </li>
    <li class="breadcrumb-item" aria-hidden="true">›</li>
    <li class="breadcrumb-item" aria-current="page">
      Payment Methods
    </li>
  </ol>
</nav>

<style>
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 13px;
    font-weight: 500;
  }

  .breadcrumb-link {
    color: rgb(var(--accent));
    text-decoration: none;
  }

  .breadcrumb-link:hover {
    text-decoration: underline;
  }

  [aria-current="page"] {
    color: rgb(var(--text-primary));
    font-weight: 600;
  }
</style>`,
  },
  swift: {
    filename: "SitkaBreadcrumb.swift",
    code: `import SwiftUI

struct BreadcrumbItem: Identifiable {
    let id = UUID()
    let label: String
    var href: String? = nil
}

struct SitkaBreadcrumb: View {
    let items: [BreadcrumbItem]
    var maxVisible: Int? = nil

    private var visibleItems: [BreadcrumbItem] {
        guard let max = maxVisible, items.count > max else { return items }
        let first = Array(items.prefix(1))
        let last  = Array(items.suffix(1))
        let ellipsis = BreadcrumbItem(label: "…")
        return first + [ellipsis] + last
    }

    var body: some View {
        HStack(spacing: 4) {
            ForEach(Array(visibleItems.enumerated()), id: \\.element.id) { idx, item in
                let isLast = idx == visibleItems.count - 1

                if isLast {
                    Text(item.label)
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundColor(.primary)
                } else if let href = item.href {
                    Link(item.label, destination: URL(string: href)!)
                        .font(.system(size: 13, weight: .medium))
                        .foregroundColor(.accentColor)
                } else {
                    Text(item.label)
                        .font(.system(size: 13, weight: .medium))
                        .foregroundColor(.secondary)
                }

                if !isLast {
                    Text("›")
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                }
            }
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(items.last?.label ?? "")
    }
}

#Preview {
    SitkaBreadcrumb(items: [
        BreadcrumbItem(label: "Settings", href: "/settings"),
        BreadcrumbItem(label: "Billing",  href: "/settings/billing"),
        BreadcrumbItem(label: "Payment Methods"),
    ])
    .padding()
}`,
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BreadcrumbPage() {
  return (
    <div>
      <PageHeader
        title="Breadcrumb"
        description="Hierarchical location indicator that shows the path from the root to the current page. Supports collapsing, home icons, and custom separators."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <div className="p-6" style={{ backgroundColor: P.surface, borderRadius: 12, width: "100%" }}>
            <BreadcrumbDemo />
          </div>
        </ComponentPreview>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Variants</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Three display modes cover the full range of navigation depth scenarios.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Variant", "When to use"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { variant: "Full",      use: "Depth ≤ 4 levels. All crumbs visible at once." },
                { variant: "Collapsed", use: "Depth ≥ 5 levels. Middle crumbs collapse to '…'; expand on click." },
                { variant: "Home icon", use: "Root-level crumb is always '/' — replace the label with a House icon to save space." },
              ].map((row, i) => (
                <tr key={row.variant} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))]">{row.variant}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'Wrap in <nav aria-label="Breadcrumb"> and use an <ol> so screen readers announce the list count.',
            'The current page crumb must have aria-current="page" and must NOT be a link.',
            'Separator characters (›, /) must have aria-hidden="true" so screen readers skip them.',
            "The collapsed '…' button must expand inline and announce the new items to assistive technology via aria-live.",
            "Minimum tap target for each crumb link is 44×44px on touch — add padding rather than increasing font size.",
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
