"use client";

import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { NavigationMenu, NavMenuItem } from "@/components/ui/NavigationMenu";

const DEMO_ITEMS: NavMenuItem[] = [
  {
    label: "Products",
    groups: [
      {
        title: "Design",
        links: [
          { label: "Design System", href: "#", description: "Tokens, components, and guidelines" },
          { label: "Figma Library", href: "#", description: "Ready-to-use component library" },
          { label: "Icon Set", href: "#", description: "1,200+ optimised SVG icons" },
        ],
      },
      {
        title: "Develop",
        links: [
          { label: "React Components", href: "#", description: "Next.js and Vite packages" },
          { label: "Token Pipeline", href: "#", description: "Style Dictionary config" },
          { label: "CLI", href: "#", description: "npx sitka@latest add <component>" },
        ],
      },
    ],
  },
  {
    label: "Docs",
    groups: [
      {
        links: [
          { label: "Getting Started", href: "#" },
          { label: "Foundations", href: "#" },
          { label: "Components", href: "#" },
          { label: "Patterns", href: "#" },
        ],
      },
    ],
  },
  { label: "Blog", href: "#" },
  { label: "Changelog", href: "#" },
];

const CODE = {
  react: {
    filename: "NavigationMenu.tsx",
    code: `import { NavigationMenu } from "@/components/ui/NavigationMenu";

const items = [
  {
    label: "Products",
    groups: [
      {
        title: "Design",
        links: [
          { label: "Design System", href: "/design-system", description: "Tokens, components, guidelines" },
          { label: "Figma Library", href: "/figma" },
        ],
      },
      {
        title: "Develop",
        links: [
          { label: "React Components", href: "/react" },
          { label: "CLI", href: "/cli" },
        ],
      },
    ],
  },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

<NavigationMenu items={items} />`,
  },
  html: {
    filename: "navigation-menu.html",
    code: `<nav aria-label="Main navigation">
  <ul role="menubar" style="display:flex; gap:4px; list-style:none;">
    <li role="none">
      <button
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-controls="products-menu"
      >
        Products ▾
      </button>

      <div id="products-menu" role="menu" hidden>
        <ul>
          <li role="none">
            <a role="menuitem" href="/design-system">
              <strong>Design System</strong>
              <span>Tokens, components, and guidelines</span>
            </a>
          </li>
        </ul>
      </div>
    </li>

    <li role="none">
      <a role="menuitem" href="/docs">Docs</a>
    </li>
  </ul>
</nav>`,
  },
  swift: {
    filename: "NavigationMenuView.swift",
    code: `import SwiftUI

struct NavItem: Identifiable {
  let id = UUID()
  let label: String
  var href: String?
  var groups: [NavGroup]?
}

struct NavGroup: Identifiable {
  let id = UUID()
  var title: String?
  let links: [NavLink]
}

struct NavLink: Identifiable {
  let id = UUID()
  let label: String
  let href: String
  var description: String?
}

struct NavigationMenuView: View {
  let items: [NavItem]
  @State private var openItem: NavItem.ID? = nil

  var body: some View {
    HStack(spacing: 4) {
      ForEach(items) { item in
        if let groups = item.groups {
          Menu {
            ForEach(groups) { group in
              Section(group.title ?? "") {
                ForEach(group.links) { link in
                  Button(link.label) { }
                }
              }
            }
          } label: {
            Label(item.label, systemImage: "chevron.down")
              .labelStyle(.titleAndIcon)
          }
        } else {
          Link(item.label, destination: URL(string: item.href ?? "#")!)
        }
      }
    }
  }
}`,
  },
};

export default function NavigationMenuPage() {
  return (
    <div>
      <PageHeader
        title="Navigation Menu"
        description="A horizontal navigation bar with multi-column dropdown menus. Supports grouped links with optional descriptions, plain links, and keyboard navigation."
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Preview</h2>
        <ComponentPreview>
          <div className="min-h-[200px] flex items-start justify-center pt-8">
            <NavigationMenu items={DEMO_ITEMS} />
          </div>
        </ComponentPreview>
      </section>

      {/* ── Anatomy ─────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Part", "Element", "Description"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { part: "Root", el: "<nav>", desc: "Landmark with aria-label='Main navigation'." },
                { part: "Trigger", el: "<button>", desc: "aria-haspopup=menu + aria-expanded. Opens on hover/focus." },
                { part: "Link", el: "<a>", desc: "Simple navigation item with no dropdown." },
                { part: "Dropdown", el: "div[role=menu]", desc: "Positioned below trigger. Closes on Escape or click outside." },
                { part: "Group", el: "div", desc: "Optional titled column within the dropdown." },
                { part: "Link item", el: "a[role=menuitem]", desc: "Label + optional description. Closes dropdown on click." },
              ].map((row) => (
                <tr key={row.part} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.part}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.el}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Keyboard ────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Keyboard interactions</h2>
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
                { key: "Tab / Shift+Tab", action: "Move focus between triggers and plain links" },
                { key: "Enter / Space", action: "Open dropdown or follow link" },
                { key: "Arrow Down", action: "Open dropdown, focus first item" },
                { key: "Escape", action: "Close open dropdown, return focus to trigger" },
                { key: "Home / End", action: "Focus first / last item in open dropdown" },
              ].map((row) => (
                <tr key={row.key} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.key}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Guidelines</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Keep top-level items to five or fewer — cognitive load increases steeply beyond that.",
            "Use groups and titles when a dropdown contains more than four links; grouping reveals hierarchy.",
            "Add descriptions only to the most important links — description parity across all items creates visual noise.",
            "Dropdowns open on hover on desktop but must also open on focus for keyboard users.",
            "Do not nest dropdowns more than one level — use a separate dedicated page for deep hierarchies.",
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
