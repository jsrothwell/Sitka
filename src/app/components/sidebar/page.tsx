import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Sidebar" };

const PROPS = [
  {
    name: "isOpen",
    type: "boolean",
    description: "Whether the sidebar is visible on mobile. On desktop (md+) the sidebar is always visible.",
  },
  {
    name: "onClose",
    type: "() => void",
    description: "Called when the mobile backdrop is clicked or the close button is pressed.",
  },
  {
    name: "onSearchOpen",
    type: "() => void",
    description: "Called when the search trigger inside the sidebar is clicked.",
  },
];

const CODE = {
  react: {
    filename: "Sidebar.tsx",
    code: `"use client";
// The Sidebar is used in the docs shell layout at
// src/components/layout/Sidebar.tsx
//
// It reads from src/lib/navigation.ts to render the nav tree.
// NavSection → NavGroup → NavItem hierarchy.
//
// Integrate it in your layout:
import { Sidebar } from "@/site/layout/Sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "var(--sidebar-width) 1fr" }}>
      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <main>{children}</main>
    </div>
  );
}`,
  },
  html: {
    filename: "sidebar.html",
    code: `<aside
  style="
    position:fixed; top:0; left:0; bottom:0;
    width:var(--sidebar-width);
    background:rgb(var(--surface));
    border-right:1px solid rgb(var(--border-subtle));
    display:flex; flex-direction:column;
    overflow-y:auto;
  "
>
  <!-- Logo -->
  <div style="height:var(--header-height); display:flex; align-items:center; padding:0 16px; border-bottom:1px solid rgb(var(--border));">
    <a href="/">Sitka</a>
  </div>

  <!-- Search -->
  <div style="padding:16px 12px 8px;">
    <button style="width:100%; text-align:left; padding:6px 12px; border-radius:8px; background:rgb(var(--surface-raised)); border:1px solid rgb(var(--border));">
      Search… <kbd>⌘K</kbd>
    </button>
  </div>

  <!-- Nav -->
  <nav style="flex:1; overflow-y:auto; padding:12px;">
    <!-- Section label -->
    <p style="font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color:rgb(var(--text-tertiary)); margin-bottom:8px;">
      Getting Started
    </p>
    <ul>
      <li><a href="/">Introduction</a></li>
    </ul>
  </nav>
</aside>`,
  },
  swift: {
    filename: "SidebarView.swift",
    code: `import SwiftUI

struct ContentView: View {
  var body: some View {
    NavigationSplitView {
      List {
        Section("Getting Started") {
          NavigationLink("Introduction", destination: IntroView())
          NavigationLink("Design Principles", destination: PrinciplesView())
        }
        Section("Components") {
          NavigationLink("Button", destination: ButtonView())
          NavigationLink("Input", destination: InputView())
        }
      }
      .listStyle(.sidebar)
      .navigationTitle("Sitka")
    } detail: {
      Text("Select a page")
        .foregroundStyle(.secondary)
    }
  }
}`,
  },
};

export default function SidebarPage() {
  return (
    <div>
      <PageHeader
        title="Sidebar"
        description="The persistent navigation panel used in this docs shell. Renders a collapsible nav tree from the navigation.ts data source, with a search trigger and mobile drawer behaviour."
      />

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Anatomy
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Zone", "Contents"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { zone: "Logo header", contents: "Sitka wordmark + version badge. Height matches --header-height (52px)." },
                { zone: "Search trigger", contents: "Ghost button that calls onSearchOpen, which opens CommandPalette. Shows ⌘K shortcut." },
                { zone: "Nav tree", contents: "Scrollable list of NavSection → NavGroup → NavItem. Groups are collapsible with ChevronRight indicators." },
                { zone: "Footer", contents: "Branding strip at the bottom of the sidebar." },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.zone}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.contents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Data source */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Data source
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-3">
          The nav tree is driven by the{" "}
          <code className="font-mono text-[11px] text-[rgb(var(--accent))]">navigation</code> export from{" "}
          <code className="font-mono text-[11px] text-[rgb(var(--accent))]">@/lib/navigation.ts</code>.
          The hierarchy is:
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Type", "Description", "Required fields"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { type: "NavSection", desc: "Top-level category label", required: "title" },
                { type: "NavGroup", desc: "Collapsible sub-group within a section", required: "title, items" },
                { type: "NavItem", desc: "Individual nav link", required: "title, href" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.type}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.desc}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[14px] text-[rgb(var(--text-secondary))]">
          NavItem also accepts an optional <code className="font-mono text-[11px] text-[rgb(var(--accent))]">badge</code> string (e.g. &ldquo;New&rdquo;, &ldquo;Gold Standard&rdquo;) and an <code className="font-mono text-[11px] text-[rgb(var(--accent))]">external</code> boolean.
        </p>
      </section>

      {/* Layout tokens */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Layout tokens
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Token", "Value", "Description"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { token: "--sidebar-width", value: "220px", desc: "Fixed width of the sidebar panel" },
                { token: "--header-height", value: "52px", desc: "Height of the logo row, shared with the top header" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.token}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.value}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile behaviour */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Mobile behaviour
        </h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "On screens narrower than md (768px) the sidebar is off-screen (translateX(-100%)) by default.",
            "It slides in via CSS transition when isOpen is true, overlaying the content with a semi-transparent backdrop.",
            "The backdrop click calls onClose; a close button (X icon) is rendered inside the sidebar header on mobile.",
            "On desktop (md+) the sidebar is always visible and the isOpen prop has no effect.",
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
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Accessibility
        </h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'The sidebar renders as <aside> — a complementary landmark, available in screen reader quick-navigation shortcuts.',
            'Navigation links are wrapped in <nav>, making them another accessible landmark.',
            'Group toggle buttons use aria-expanded to communicate collapsed/expanded state.',
            'Active links receive aria-current="page" via the data-active class pattern (handled by NavLinkItem).',
            "The mobile close button has aria-label=\"Close navigation\".",
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
