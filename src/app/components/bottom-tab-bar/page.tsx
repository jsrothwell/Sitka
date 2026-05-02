import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { BottomTabBarStandaloneDemo } from "@/components/docs/MobileNavDemo";

export const metadata: Metadata = { title: "Bottom Tab Bar" };

const PROPS = [
  { name: "items",    type: "BottomTabItem[]",           description: "The tab items to render." },
  { name: "value",   type: "string",                    description: "Controlled active tab value." },
  { name: "onChange",type: "(value: string) => void",   description: "Called when a tab is tapped." },
  { name: "className",type: "string",                   description: "Extra classes for the wrapper element." },
];

const ITEM_PROPS = [
  { name: "value",  type: "string",   description: "Unique identifier for this tab." },
  { name: "label",  type: "string",   description: "Text label shown below the icon." },
  { name: "icon",   type: "ReactNode",description: "Icon element — 18–24px recommended." },
  { name: "badge",  type: "number | string", description: "Badge count or label. Numbers > 99 render as 99+." },
];

const CODE = {
  react: {
    filename: "BottomTabBar.tsx",
    code: `import { useState } from "react";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { Home, Search, Bell, User } from "lucide-react";

const TABS = [
  { value: "home",    label: "Home",    icon: <Home className="w-[18px] h-[18px]" /> },
  { value: "search",  label: "Search",  icon: <Search className="w-[18px] h-[18px]" /> },
  { value: "inbox",   label: "Inbox",   icon: <Bell className="w-[18px] h-[18px]" />, badge: 3 },
  { value: "profile", label: "Profile", icon: <User className="w-[18px] h-[18px]" /> },
];

export function App() {
  const [tab, setTab] = useState("home");

  return (
    <div className="flex flex-col h-dvh">
      <main className="flex-1 overflow-y-auto">
        {/* page content */}
      </main>
      <BottomTabBar
        items={TABS}
        value={tab}
        onChange={setTab}
      />
    </div>
  );
}`,
  },
  html: {
    filename: "bottom-tab-bar.html",
    code: `<nav class="tab-bar" role="tablist" aria-label="Navigation">
  <button class="tab-item tab-item--active" role="tab" aria-selected="true">
    <svg class="tab-icon" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9v8a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1z"/></svg>
    <span class="tab-label">Home</span>
  </button>
  <button class="tab-item" role="tab" aria-selected="false">
    <svg class="tab-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
    <span class="tab-label">Search</span>
  </button>
  <button class="tab-item" role="tab" aria-selected="false">
    <span class="tab-badge">3</span>
    <svg class="tab-icon" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    <span class="tab-label">Inbox</span>
  </button>
  <button class="tab-item" role="tab" aria-selected="false">
    <svg class="tab-icon" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    <span class="tab-label">Profile</span>
  </button>
</nav>

<style>
  .tab-bar {
    display: flex;
    align-items: stretch;
    border-top: 1px solid rgb(var(--border));
    background: rgb(var(--surface));
    backdrop-filter: blur(20px) saturate(180%);
    position: fixed;
    bottom: 0; left: 0; right: 0;
    padding-bottom: env(safe-area-inset-bottom, 0px);
    z-index: 40;
  }

  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 10px 4px;
    border: none;
    background: none;
    cursor: pointer;
    position: relative;
    color: rgb(var(--text-tertiary));
    transition: color 100ms;
  }
  .tab-item:hover { color: rgb(var(--text-secondary)); }
  .tab-item--active { color: rgb(var(--accent)); }

  .tab-icon {
    width: 18px; height: 18px;
    stroke: currentColor; fill: none; stroke-width: 2;
  }
  .tab-item--active .tab-icon { transform: scale(1.1); }

  .tab-label {
    font-size: 10px;
    font-weight: 500;
    line-height: 1;
  }

  .tab-badge {
    position: absolute;
    top: 6px;
    left: calc(50% + 6px);
    min-width: 15px; height: 15px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 9999px;
    background: rgb(var(--accent));
    color: white;
    font-size: 9px; font-weight: 700;
    padding: 0 4px;
    line-height: 1;
  }
</style>`,
  },
  swift: {
    filename: "AppTabView.swift",
    code: `import SwiftUI

// Use SwiftUI's built-in TabView — it maps directly to UITabBarController on iOS.
// Sitka styling: tint matches your accent color, preferring .tabViewStyle(.automatic).

struct AppTabView: View {
    @State private var selection = 0

    var body: some View {
        TabView(selection: $selection) {

            HomeView()
                .tabItem {
                    Label("Home", systemImage: selection == 0 ? "house.fill" : "house")
                }
                .tag(0)

            SearchView()
                .tabItem {
                    Label("Search", systemImage: "magnifyingglass")
                }
                .tag(1)

            InboxView()
                .tabItem {
                    Label("Inbox", systemImage: "bell.fill")
                }
                .badge(3)
                .tag(2)

            ProfileView()
                .tabItem {
                    Label("Profile", systemImage: selection == 3 ? "person.fill" : "person")
                }
                .tag(3)

        }
        .tint(Color.accentColor)
    }
}

// Rules of thumb:
// • 2–5 tabs. Never more than 5.
// • Each tab is a separate navigation stack (NavigationStack inside each view).
// • Use .badge(_:) for numeric unread counts.
// • Filled system images for the active tab feel more native.
#Preview { AppTabView() }`,
  },
};

export default function BottomTabBarPage() {
  return (
    <div>
      <PageHeader
        title="Bottom Tab Bar"
        description="A fixed row of tab buttons anchored to the bottom of the screen. The primary mobile navigation pattern — 2 to 5 destinations, each with an icon and label. Supports badge counts for unread indicators."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <BottomTabBarStandaloneDemo />
        </ComponentPreview>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Each tab is a full-height button with an icon, a short text label, and an optional badge. The
          active tab uses the accent color; all others use{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">text-tertiary</code>.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Part", "Description"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Track",        "The full-width container. Fixed to the bottom of the viewport, above safe-area insets."],
                ["Tab button",   "flex-1 touch target. Minimum 44px height on mobile. Contains icon, label, and optional badge."],
                ["Icon",         "18–22px. Use filled variant for active, outline for inactive — mirrors iOS HIG."],
                ["Label",        "10px, font-weight 500. Always visible — never icon-only in a bottom tab bar."],
                ["Badge",        "Small pill above the icon. Number > 99 shows 99+. Dot badge (no number) for generic unread."],
                ["Active state", "Accent color on icon + label. Optional scale-110 micro-animation on the icon."],
              ].map(([part, desc], i) => (
                <tr key={part} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))] whitespace-nowrap">{part}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage rules */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">When to use</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Use a bottom tab bar when…", "Use a different pattern when…"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["You have 2–5 top-level destinations",       "You have 6+ destinations — use a drawer instead"],
                ["All destinations are equally important",    "One destination is used 80%+ of the time"],
                ["Users switch between sections frequently",  "Destinations are deeply hierarchical"],
                ["The app is mobile-first or native-feeling", "You are building a desktop or tablet primary UI"],
              ].map(([yes, no], i) => (
                <tr key={i} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{yes}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{no}</td>
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
          Place the tab bar outside your scrollable content area at the bottom of a{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">flex flex-col h-dvh</code> container.
          Use{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">padding-bottom: env(safe-area-inset-bottom)</code>{" "}
          to clear the iPhone home indicator.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">BottomTabBar props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">BottomTabItem</h2>
        <PropsTable props={ITEM_PROPS} />
      </section>

      {/* Mobile */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Mobile</h2>
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
                { scenario: "Touch target height", guidance: "Minimum 49px total height (Apple HIG). The 44px tap area minimum applies per item; additional padding around the icon + label is expected." },
                { scenario: "Safe area insets",    guidance: "Add padding-bottom: env(safe-area-inset-bottom, 0px) to clear the iPhone home indicator. Without it, content and the home indicator overlap." },
                { scenario: "Tab count",           guidance: "Cap at 5. Below 2 tabs is a toggle, not a tab bar. With 5 tabs on a 320px screen, each item is ~64px wide — acceptable but tight." },
                { scenario: "Backdrop blur",       guidance: "Use backdrop-filter: blur on the track so page content can scroll behind it without hard color edges. Ensure sufficient contrast on both themes." },
                { scenario: "Keyboard avoidance",  guidance: "The tab bar should not rise with the software keyboard. Use position: fixed (not sticky) and ensure the layout root is not inside a flex container with height: 100%." },
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
            'The container has role="tablist" with aria-label="Navigation". Each tab has role="tab" and aria-selected.',
            "Never use icon-only tabs without a visible text label in a bottom tab bar. Labels are required for discoverability.",
            "Badge values should be announced by screen readers. Add aria-label to the badge span, e.g. aria-label=\"3 unread\".",
            "Keyboard: Tab moves focus between tabs; Enter/Space activates the focused tab.",
            "On iOS VoiceOver, SwiftUI TabView is fully managed — don't override the built-in tab bar with custom SwiftUI views unless you replicate all accessibility properties.",
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
