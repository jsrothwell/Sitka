import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { TabsDemo } from "@/site/docs/TabsDemo";
import { NavigationMobileDemo } from "@/site/docs/ComponentMobileDemos";

export const metadata: Metadata = { title: "Navigation" };

const TABS_PROPS = [
  {
    name: "tabs",
    type: "Tab[]",
    description: "Array of { id, label, badge? } objects defining each tab.",
  },
  {
    name: "defaultTab",
    type: "string",
    description: "id of the tab active on first render. Defaults to the first tab.",
  },
  {
    name: "children",
    type: "(activeId: string) => ReactNode",
    description: "Render prop that receives the active tab id and returns the panel content.",
  },
];

const CODE = {
  react: {
    filename: "Tabs.tsx",
    code: `import { Tabs } from "@/components/ui/Tabs";

<Tabs
  tabs={[
    { id: "overview",  label: "Overview" },
    { id: "versions",  label: "Versions", badge: "3" },
    { id: "settings",  label: "Settings" },
  ]}
>
  {(active) => (
    <div>
      {active === "overview"  && <p>Overview panel content.</p>}
      {active === "versions"  && <p>Versions panel content.</p>}
      {active === "settings"  && <p>Settings panel content.</p>}
    </div>
  )}
</Tabs>`,
  },
  html: {
    filename: "tabs.html",
    code: `<div class="tabs">
  <div class="tablist" role="tablist">
    <button class="tab tab-active" role="tab" aria-selected="true" aria-controls="panel-overview">
      Overview
    </button>
    <button class="tab" role="tab" aria-selected="false" aria-controls="panel-versions">
      Versions
      <span class="tab-badge">3</span>
    </button>
    <button class="tab" role="tab" aria-selected="false" aria-controls="panel-settings">
      Settings
    </button>
  </div>

  <div id="panel-overview" role="tabpanel" class="tab-panel">
    <p>Overview content.</p>
  </div>
  <div id="panel-versions" role="tabpanel" class="tab-panel" hidden>
    <p>Versions content.</p>
  </div>
  <div id="panel-settings" role="tabpanel" class="tab-panel" hidden>
    <p>Settings content.</p>
  </div>
</div>

<style>
  .tablist {
    display: flex;
    align-items: center;
    gap: 2px;
    border-bottom: 1px solid rgb(var(--border));
    padding: 0 4px;
  }

  .tab {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 12px;
    font-size: 13px;
    font-weight: 500;
    border: none;
    background: transparent;
    cursor: pointer;
    color: rgb(var(--text-tertiary));
    transition: color 150ms;
    outline: none;
  }
  .tab:hover { color: rgb(var(--text-secondary)); }
  .tab:focus-visible { outline: 2px solid rgb(var(--accent)); border-radius: 4px; }

  .tab-active { color: rgb(var(--text-primary)); }
  .tab-active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: rgb(var(--accent));
    border-radius: 2px 2px 0 0;
  }

  .tab-badge {
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 9999px;
    background: rgb(var(--accent-subtle));
    color: rgb(var(--accent));
  }

  .tab-panel { padding-top: 16px; }
  .tab-panel[hidden] { display: none; }
</style>

<script>
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('tab-active');
        t.setAttribute('aria-selected', 'false');
        document.getElementById(t.getAttribute('aria-controls')).hidden = true;
      });
      tab.classList.add('tab-active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
    });
  });
</script>`,
  },
  swift: {
    filename: "SitkaTabs.swift",
    code: `import SwiftUI

struct SitkaTab: Identifiable {
    let id: String
    let label: String
    var badge: String? = nil
}

struct SitkaTabs<Content: View>: View {
    let tabs: [SitkaTab]
    @State private var activeId: String
    @ViewBuilder let content: (String) -> Content

    init(tabs: [SitkaTab], defaultId: String? = nil, @ViewBuilder content: @escaping (String) -> Content) {
        self.tabs = tabs
        self._activeId = State(initialValue: defaultId ?? tabs.first?.id ?? "")
        self.content = content
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Tab bar
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 2) {
                    ForEach(tabs) { tab in
                        Button(action: { activeId = tab.id }) {
                            HStack(spacing: 6) {
                                Text(tab.label)
                                    .font(.system(size: 13, weight: .medium))
                                if let badge = tab.badge {
                                    Text(badge)
                                        .font(.system(size: 10, weight: .semibold))
                                        .padding(.horizontal, 6)
                                        .padding(.vertical, 2)
                                        .background(Color.accentColor.opacity(0.15))
                                        .foregroundColor(.accentColor)
                                        .clipShape(Capsule())
                                }
                            }
                            .foregroundColor(activeId == tab.id ? Color(UIColor.label) : Color(UIColor.tertiaryLabel))
                            .padding(.horizontal, 12)
                            .padding(.vertical, 10)
                            .overlay(alignment: .bottom) {
                                if activeId == tab.id {
                                    Rectangle()
                                        .fill(Color.accentColor)
                                        .frame(height: 2)
                                        .clipShape(Capsule())
                                }
                            }
                        }
                        .buttonStyle(PlainButtonStyle())
                        .animation(.spring(response: 0.25, dampingFraction: 0.8), value: activeId)
                    }
                }
                .padding(.horizontal, 4)
            }
            Divider()

            // Panel
            content(activeId)
                .padding(.top, 16)
        }
    }
}

// MARK: - Preview
#Preview {
    SitkaTabs(tabs: [
        SitkaTab(id: "overview", label: "Overview"),
        SitkaTab(id: "versions", label: "Versions", badge: "3"),
        SitkaTab(id: "settings", label: "Settings"),
    ]) { active in
        Text("Active: \\(active)")
            .padding()
    }
    .padding()
}`,
  },
  macos: {
    filename: "SitkaTabs+macOS.swift",
    code: `import SwiftUI

// On macOS, the native TabView with .tabViewStyle(.automatic) renders
// as an NSTabView, which is the platform-standard way to show tabbed content.

struct SitkaTab: Identifiable {
    let id: String
    let label: String
    var systemImage: String? = nil
    var badge: String? = nil
}

// Option A: native NSTabView (recommended for settings panels, inspector panes)
struct SitkaTabView<Content: View>: View {
    let tabs: [SitkaTab]
    @Binding var selection: String
    @ViewBuilder let content: (String) -> Content

    var body: some View {
        TabView(selection: $selection) {
            ForEach(tabs) { tab in
                content(tab.id)
                    .tabItem {
                        if let img = tab.systemImage {
                            Label(tab.label, systemImage: img)
                        } else {
                            Text(tab.label)
                        }
                    }
                    .tag(tab.id)
                    .badge(tab.badge.flatMap(Int.init) ?? 0)
            }
        }
    }
}

// Option B: custom underline tab bar (matches web/iOS visual style)
struct SitkaTabs<Content: View>: View {
    let tabs: [SitkaTab]
    @State private var activeId: String
    @ViewBuilder let content: (String) -> Content

    init(tabs: [SitkaTab], defaultId: String? = nil, @ViewBuilder content: @escaping (String) -> Content) {
        self.tabs = tabs
        self._activeId = State(initialValue: defaultId ?? tabs.first?.id ?? "")
        self.content = content
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(spacing: 0) {
                ForEach(tabs) { tab in
                    Button(action: { activeId = tab.id }) {
                        HStack(spacing: 5) {
                            Text(tab.label)
                                .font(.system(size: 12, weight: .medium))
                            if let badge = tab.badge {
                                Text(badge)
                                    .font(.system(size: 10, weight: .semibold))
                                    .padding(.horizontal, 5)
                                    .padding(.vertical, 1)
                                    .background(Color.accentColor.opacity(0.15))
                                    .foregroundColor(.accentColor)
                                    .clipShape(Capsule())
                            }
                        }
                        .foregroundColor(
                            activeId == tab.id ? Color(.labelColor) : Color(.tertiaryLabelColor)
                        )
                        .padding(.horizontal, 10)
                        .padding(.vertical, 8)
                        .overlay(alignment: .bottom) {
                            if activeId == tab.id {
                                Rectangle()
                                    .fill(Color.accentColor)
                                    .frame(height: 2)
                                    .clipShape(Capsule())
                            }
                        }
                    }
                    .buttonStyle(PlainButtonStyle())
                    .animation(.spring(response: 0.22, dampingFraction: 0.8), value: activeId)
                }
            }
            .padding(.horizontal, 4)

            Divider()

            content(activeId)
                .padding(.top, 12)
        }
    }
}

#Preview {
    SitkaTabs(tabs: [
        SitkaTab(id: "overview", label: "Overview"),
        SitkaTab(id: "versions", label: "Versions", badge: "3"),
        SitkaTab(id: "settings", label: "Settings"),
    ]) { active in
        Text("Active: \\(active)")
            .padding()
    }
    .frame(width: 400)
    .padding()
}`,
  },
};

export default function NavigationPage() {
  return (
    <div>
      <PageHeader
        title="Navigation"
        description="Horizontal tabs for switching between views within the same context. Uses a render-prop pattern so panel content is always fully controlled by the caller."
      />

      {/* Preview */}
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

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The tab bar sits flush to a bottom border. The active indicator is a 2px accent underline anchored
          to the bottom of each tab button. Badges use the accent-subtle token.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Part", "Element", "Token"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Tab bar", "role=tablist div", "border-b border"],
                ["Tab button", "role=tab button", "text-tertiary → text-primary on active"],
                ["Active indicator", "span ::after", "h-[2px] bg-accent rounded-t-full"],
                ["Badge", "span", "bg-accent-subtle text-accent"],
                ["Panel", "role=tabpanel div", "pt-4"],
              ].map(([part, el, token], i) => (
                <tr key={part} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{part}</td>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{el}</code></td>
                  <td className="px-4 py-3 text-[12px] text-[rgb(var(--text-secondary))]">{token}</td>
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
          The <code className="font-mono text-[13px] text-[rgb(var(--accent))]">children</code> render prop
          receives the active tab id, making panel content fully flexible with no hidden DOM toggling.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={TABS_PROPS} />
      </section>

      {/* Accessibility */}
      {/* Mobile */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Mobile</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Tab bars on mobile face overflow and touch-target challenges. Keep tabs to 5 or fewer and consider alternative navigation patterns for deeper hierarchies.
        </p>
        <ComponentPreview className="mb-6">
          <NavigationMobileDemo />
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
                { scenario: "Overflow", guidance: "More than 5 tabs will overflow on mobile. Use overflow-x: auto with scroll-snap for scrollable tabs, or collapse extras into an overflow menu." },
                { scenario: "Touch targets", guidance: "Tab items need at least 44px height. Add extra vertical padding on mobile — py-3 instead of py-1.5." },
                { scenario: "Bottom tab bar", guidance: "For app-like navigation, position the tab bar fixed at the bottom with padding-bottom: env(safe-area-inset-bottom). This matches iOS and Android conventions." },
                { scenario: "Icon + label", guidance: "On bottom bars, pair each tab with an icon above the label. Icon-only tabs are harder to parse; label-only tabs miss the scanning affordance of icons." },
                { scenario: "Active indicator", guidance: "Use a filled background or underline at least 3px tall. Thin indicators are hard to distinguish at arm's length on mobile." },
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
            "Tab buttons use role=tab and aria-selected. The container uses role=tablist.",
            "Each panel uses role=tabpanel. Wire aria-controls and aria-labelledby for full ARIA compliance.",
            "Keyboard: Left/Right arrows should cycle tabs. Tab key moves focus to the active panel. Implement with onKeyDown on the tablist.",
            "Focus ring is visible only with keyboard navigation via focus-visible.",
            "Badges are decorative counts — add aria-label to the tab button to include the count in the accessible name when relevant.",
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
