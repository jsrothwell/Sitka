import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { TabsDemo } from "@/components/docs/TabsDemo";
import { Tabs } from "@/components/ui/Tabs";

export const metadata: Metadata = { title: "Tabs" };

const TABS_PROPS = [
  {
    name: "tabs",
    type: "Tab[]",
    description: "Ordered array of tab descriptors. Each item requires an id and label; badge is optional.",
  },
  {
    name: "defaultTab",
    type: "string",
    description: "Id of the tab that is active on first render. Defaults to the first tab if omitted.",
  },
  {
    name: "children",
    type: "(activeId: string) => ReactNode",
    description: "Render prop called with the currently active tab id. Render the panel content conditionally on this value.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional class names applied to the outermost wrapper.",
  },
];

const TAB_PROPS = [
  {
    name: "id",
    type: "string",
    description: "Unique identifier for this tab. Used to match activeId in the render prop and as the defaultTab value.",
  },
  {
    name: "label",
    type: "string",
    description: "Visible tab label. Keep it short — 1–2 words.",
  },
  {
    name: "badge",
    type: "string",
    description: "Short count or label rendered as a pill next to the tab label. Use for counts (e.g. '12') or status labels (e.g. 'New').",
  },
];

const CODE = {
  react: {
    filename: "Tabs.tsx",
    code: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface Tab {
  id: string;
  label: string;
  badge?: string;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  children: (activeId: string) => React.ReactNode;
  className?: string;
}

export function Tabs({ tabs, defaultTab, children, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  return (
    <div className={cn("flex flex-col gap-0", className)}>
      <div
        role="tablist"
        aria-label="Content sections"
        className="flex items-center gap-0.5 border-b border-[rgb(var(--border))] px-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={\`tab-\${tab.id}\`}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={\`panel-\${tab.id}\`}
            onClick={() => setActive(tab.id)}
            className={cn(
              "relative flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium transition-colors duration-150 outline-none",
              "focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] rounded-t",
              active === tab.id
                ? "text-[rgb(var(--text-primary))]"
                : "text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"
            )}
          >
            {tab.label}
            {tab.badge && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]">
                {tab.badge}
              </span>
            )}
            {active === tab.id && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(var(--accent))] rounded-t-full"
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={\`panel-\${active}\`}
        aria-labelledby={\`tab-\${active}\`}
        className="pt-4"
      >
        {children(active)}
      </div>
    </div>
  );
}

// Usage
<Tabs
  tabs={[
    { id: "overview", label: "Overview" },
    { id: "files",    label: "Files",    badge: "12" },
    { id: "activity", label: "Activity", badge: "3" },
    { id: "settings", label: "Settings" },
  ]}
>
  {(active) => (
    <div>
      {active === "overview" && <p>Overview content</p>}
      {active === "files"    && <p>Files content</p>}
      {active === "activity" && <p>Activity content</p>}
      {active === "settings" && <p>Settings content</p>}
    </div>
  )}
</Tabs>`,
  },
  html: {
    filename: "tabs.html",
    code: `<!-- Tabs — HTML + vanilla JS implementation -->

<div class="tabs-root">
  <div class="tablist" role="tablist" aria-label="Content sections">
    <button class="tab tab-active" id="tab-overview" role="tab"
      aria-selected="true" aria-controls="panel-overview">
      Overview
    </button>
    <button class="tab" id="tab-files" role="tab"
      aria-selected="false" aria-controls="panel-files">
      Files
      <span class="tab-badge">12</span>
    </button>
    <button class="tab" id="tab-activity" role="tab"
      aria-selected="false" aria-controls="panel-activity">
      Activity
      <span class="tab-badge">3</span>
    </button>
    <button class="tab" id="tab-settings" role="tab"
      aria-selected="false" aria-controls="panel-settings">
      Settings
    </button>
  </div>

  <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" class="tabpanel">
    <p>Overview content</p>
  </div>
  <div id="panel-files" role="tabpanel" aria-labelledby="tab-files" class="tabpanel" hidden>
    <p>Files content</p>
  </div>
  <div id="panel-activity" role="tabpanel" aria-labelledby="tab-activity" class="tabpanel" hidden>
    <p>Activity content</p>
  </div>
  <div id="panel-settings" role="tabpanel" aria-labelledby="tab-settings" class="tabpanel" hidden>
    <p>Settings content</p>
  </div>
</div>

<script>
  const tabs = document.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  function activate(tab) {
    tabs.forEach((t) => {
      t.classList.remove("tab-active");
      t.setAttribute("aria-selected", "false");
    });
    panels.forEach((p) => (p.hidden = true));

    tab.classList.add("tab-active");
    tab.setAttribute("aria-selected", "true");
    document.getElementById(tab.getAttribute("aria-controls")).hidden = false;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab));

    // Arrow key navigation (WAI-ARIA pattern)
    tab.addEventListener("keydown", (e) => {
      const list = [...tabs];
      const idx  = list.indexOf(tab);
      if (e.key === "ArrowRight") { e.preventDefault(); activate(list[(idx + 1) % list.length]); list[(idx + 1) % list.length].focus(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); activate(list[(idx - 1 + list.length) % list.length]); list[(idx - 1 + list.length) % list.length].focus(); }
      if (e.key === "Home")       { e.preventDefault(); activate(list[0]); list[0].focus(); }
      if (e.key === "End")        { e.preventDefault(); activate(list[list.length - 1]); list[list.length - 1].focus(); }
    });
  });
</script>

<style>
  .tabs-root { display: flex; flex-direction: column; }

  .tablist {
    display: flex;
    align-items: center;
    gap: 2px;
    border-bottom: 1px solid rgb(var(--border));
    padding: 0 4px;
  }

  .tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 12px;
    font-size: 13px;
    font-weight: 500;
    color: rgb(var(--text-tertiary));
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 6px 6px 0 0;
    transition: color 150ms ease;
    outline: none;
  }
  .tab:hover          { color: rgb(var(--text-secondary)); }
  .tab:focus-visible  { box-shadow: 0 0 0 2px rgb(var(--accent)); }
  .tab.tab-active     { color: rgb(var(--text-primary)); }
  .tab.tab-active::after {
    content: "";
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: rgb(var(--accent));
    border-radius: 2px 2px 0 0;
  }

  .tab-badge {
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 999px;
    background: rgb(var(--accent-subtle));
    color: rgb(var(--accent));
  }

  .tabpanel { padding-top: 16px; }
</style>`,
  },
  swift: {
    filename: "SitkaTabs.swift",
    code: `import SwiftUI

// MARK: - Tab model
struct SitkaTab: Identifiable {
    let id: String
    let label: String
    var badge: String? = nil
}

// MARK: - SitkaTabs
struct SitkaTabs<Content: View>: View {
    let tabs: [SitkaTab]
    @Binding var selection: String
    @ViewBuilder let content: (String) -> Content

    @Namespace private var indicator

    var body: some View {
        VStack(spacing: 0) {
            // Tab bar
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 2) {
                    ForEach(tabs) { tab in
                        Button {
                            withAnimation(.spring(response: 0.25, dampingFraction: 0.8)) {
                                selection = tab.id
                            }
                        } label: {
                            HStack(spacing: 6) {
                                Text(tab.label)
                                    .font(.system(size: 13, weight: .medium))
                                    .foregroundStyle(selection == tab.id
                                        ? Color.primary
                                        : Color.secondary)

                                if let badge = tab.badge {
                                    Text(badge)
                                        .font(.system(size: 10, weight: .semibold))
                                        .padding(.horizontal, 6)
                                        .padding(.vertical, 2)
                                        .background(Color.accentColor.opacity(0.15))
                                        .foregroundStyle(Color.accentColor)
                                        .clipShape(Capsule())
                                }
                            }
                            .padding(.horizontal, 12)
                            .padding(.vertical, 10)
                            .overlay(alignment: .bottom) {
                                if selection == tab.id {
                                    Rectangle()
                                        .fill(Color.accentColor)
                                        .frame(height: 2)
                                        .clipShape(RoundedRectangle(cornerRadius: 2))
                                        .matchedGeometryEffect(id: "indicator", in: indicator)
                                }
                            }
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal, 4)
            }
            .overlay(alignment: .bottom) {
                Divider()
            }

            // Panel
            content(selection)
                .padding(.top, 16)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
    }
}

// MARK: - Usage example
struct ProjectView: View {
    @State private var activeTab = "overview"

    private let tabs: [SitkaTab] = [
        SitkaTab(id: "overview",  label: "Overview"),
        SitkaTab(id: "files",     label: "Files",    badge: "12"),
        SitkaTab(id: "activity",  label: "Activity", badge: "3"),
        SitkaTab(id: "settings",  label: "Settings"),
    ]

    var body: some View {
        SitkaTabs(tabs: tabs, selection: $activeTab) { active in
            switch active {
            case "overview":
                Text("Overview content")
            case "files":
                Text("Files content")
            case "activity":
                Text("Activity content")
            default:
                Text("Settings content")
            }
        }
        .padding()
    }
}

#Preview { ProjectView() }`,
  },
  macos: {
    filename: "SitkaTabs+macOS.swift",
    code: `import SwiftUI

// On macOS, TabView with .tabViewStyle(.automatic) renders as a native
// segmented control on top. For a bottom-indicator style matching the web,
// use SitkaTabs (from SitkaTabs.swift) directly — it compiles unchanged on macOS.

// Native TabView (macOS default style — pill/segment at top)
struct NativeTabsDemo: View {
    var body: some View {
        TabView {
            Text("Overview").tabItem { Label("Overview", systemImage: "house") }
            Text("Files").tabItem    { Label("Files",    systemImage: "folder") }
            Text("Activity").tabItem { Label("Activity", systemImage: "clock") }
            Text("Settings").tabItem { Label("Settings", systemImage: "gear") }
        }
        .frame(width: 600, height: 400)
    }
}

// Custom underline tabs — identical to the iOS SitkaTabs component,
// with AppKit-aligned colors for macOS.
struct MacTabsDemo: View {
    @State private var activeTab = "overview"

    private let tabs: [SitkaTab] = [
        SitkaTab(id: "overview",  label: "Overview"),
        SitkaTab(id: "files",     label: "Files",    badge: "12"),
        SitkaTab(id: "activity",  label: "Activity", badge: "3"),
        SitkaTab(id: "settings",  label: "Settings"),
    ]

    var body: some View {
        SitkaTabs(tabs: tabs, selection: $activeTab) { active in
            Group {
                switch active {
                case "overview": Text("Overview")
                case "files":    Text("Files")
                default:         Text(active.capitalized)
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        }
        .padding()
        .frame(width: 560, height: 320)
        .background(Color(NSColor.windowBackgroundColor))
    }
}

#Preview("Native") { NativeTabsDemo() }
#Preview("Custom") { MacTabsDemo() }`,
  },
};

export default function TabsPage() {
  return (
    <div>
      <PageHeader
        title="Tabs"
        description="Organises related content into labelled panels, showing one at a time. Use tabs to reduce visual complexity when content is mutually exclusive but equally important."
      />

      {/* Live Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <div className="w-full max-w-lg">
            <TabsDemo />
          </div>
        </ComponentPreview>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Variants</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Tabs support an optional badge next to the label for counts or status markers.
        </p>
        <div className="flex flex-col gap-6">
          <ComponentPreview>
            <div className="w-full max-w-lg">
              <Tabs
                tabs={[
                  { id: "all", label: "All" },
                  { id: "open", label: "Open" },
                  { id: "closed", label: "Closed" },
                  { id: "archived", label: "Archived" },
                ]}
              >
                {(active) => (
                  <p className="text-[13px] text-[rgb(var(--text-secondary))]">
                    Showing <strong className="text-[rgb(var(--text-primary))]">{active}</strong> items.
                  </p>
                )}
              </Tabs>
            </div>
          </ComponentPreview>

          <ComponentPreview>
            <div className="w-full max-w-lg">
              <Tabs
                tabs={[
                  { id: "inbox",   label: "Inbox",   badge: "4" },
                  { id: "sent",    label: "Sent" },
                  { id: "drafts",  label: "Drafts",  badge: "2" },
                  { id: "spam",    label: "Spam",    badge: "11" },
                ]}
              >
                {(active) => (
                  <p className="text-[13px] text-[rgb(var(--text-secondary))]">
                    Viewing <strong className="text-[rgb(var(--text-primary))]">{active}</strong>.
                  </p>
                )}
              </Tabs>
            </div>
          </ComponentPreview>
        </div>
      </section>

      {/* When to use */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">When to use</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Component", "Use when"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { comp: "Tabs", use: "Switching between related views within the same context. Content does not need to be compared side-by-side." },
                { comp: "Segmented Button", use: "Choosing a single option from a small, mutually exclusive set (2–4 options). Acts as a filter or view toggle, not a navigation element." },
                { comp: "Navigation", use: "Moving between top-level sections of an application. Each section has a distinct URL." },
                { comp: "Accordion", use: "Progressive disclosure within a single view. Sections are not mutually exclusive — multiple can be open at once." },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.comp}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Element", "Spec"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { el: "Tab bar",           spec: "role='tablist', flex row, border-bottom: 1px --border, px-1 horizontal padding" },
                { el: "Tab trigger",       spec: "role='tab', px-3 py-2.5, 13px medium, gap-1.5 for label + badge, rounded-t focus ring" },
                { el: "Active indicator",  spec: "2px --accent, absolute bottom-0, rounded-t-full, aria-hidden" },
                { el: "Badge",             spec: "10px semibold, px-1.5 py-0.5, rounded-full, --accent-subtle bg, --accent text" },
                { el: "Tab panel",         spec: "role='tabpanel', pt-4 top padding, full width, aria-labelledby pointing to active tab" },
                { el: "Inactive label",    spec: "--text-tertiary, hover: --text-secondary, transition 150ms ease" },
                { el: "Active label",      spec: "--text-primary" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.el}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[rgb(var(--text-secondary))]">{row.spec}</td>
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
          The React version uses a render prop — <code className="font-mono text-[12px] text-[rgb(var(--accent))]">children</code> is a
          function that receives the active tab id and returns the panel content. This keeps state ownership inside <code className="font-mono text-[12px] text-[rgb(var(--accent))]">Tabs</code> while
          giving callers full control over what each panel renders.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props — Tabs */}
      <section className="mb-8">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Props — Tabs</h2>
        <p className="text-[13px] text-[rgb(var(--text-tertiary))] mb-5">Extends <code className="font-mono text-[12px]">HTMLDivElement</code> props.</p>
        <PropsTable props={TABS_PROPS} />
      </section>

      {/* Props — Tab */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Props — Tab</h2>
        <p className="text-[13px] text-[rgb(var(--text-tertiary))] mb-5">Shape of each item in the <code className="font-mono text-[12px]">tabs</code> array.</p>
        <PropsTable props={TAB_PROPS} />
      </section>

      {/* Motion */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Motion</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The active indicator slides between tabs using a <code className="font-mono text-[12px] text-[rgb(var(--accent))]">matchedGeometryEffect</code> on
          iOS/macOS and a CSS transition on web. Panel content switches instantly — animate the
          panel content independently if entry motion is needed.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Interaction", "Property", "Value", "Easing"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { interaction: "Tab hover",        property: "color",          value: "--text-secondary",    easing: "150ms ease" },
                { interaction: "Tab select",       property: "color",          value: "--text-primary",      easing: "instant" },
                { interaction: "Indicator slide",  property: "left / width",   value: "per-tab position",    easing: "spring(300, 30) — iOS/macOS" },
                { interaction: "Indicator appear", property: "opacity",        value: "0 → 1",               easing: "150ms ease — web" },
                { interaction: "Focus ring",       property: "box-shadow",     value: "2px --accent",        easing: "instant" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.interaction}</td>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{row.property}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px]">{row.value}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]"><code className="font-mono text-[11px]">{row.easing}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                { el: "Tab bar", role: "tablist", attrs: "aria-label" },
                { el: "Tab trigger", role: "tab", attrs: "aria-selected, aria-controls" },
                { el: "Tab panel", role: "tabpanel", attrs: "aria-labelledby" },
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
                { key: "Arrow Right / Left", action: "Move focus to and activate the next / previous tab" },
                { key: "Home", action: "Move focus to and activate the first tab" },
                { key: "End", action: "Move focus to and activate the last tab" },
                { key: "Tab", action: "Move focus from the tab list into the active panel" },
                { key: "Shift+Tab", action: "Move focus back to the active tab from the panel" },
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
            "The tab bar carries role='tablist'. Each trigger has role='tab' and aria-selected — screen readers announce which tab is active.",
            "aria-controls on each tab points to the id of its panel. aria-labelledby on the panel points back to its tab trigger.",
            "Give the tablist an aria-label ('Content sections', 'Project views') so screen reader users understand what is being tabbed.",
            "Arrow Left / Right should move focus and activate tabs. Home jumps to the first tab; End jumps to the last. Implement this in the keydown handler — see the HTML example above.",
            "Tab key moves focus out of the tablist into the panel. Do not trap Tab inside the tablist.",
            "Never put navigation behind tabs that changes the URL — use a link-based Nav component instead so the browser history is correct.",
            "Badge counts should be read aloud. Add an aria-label to the badge element: aria-label='12 files'.",
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
