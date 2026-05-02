import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import {
  BottomTabBarDemo,
  NavigationDrawerDemo,
  BottomSheetNavDemo,
} from "@/components/docs/MobileNavDemo";

export const metadata: Metadata = { title: "Mobile Navigation" };

export default function MobileNavigationPage() {
  return (
    <div>
      <PageHeader
        title="Mobile Navigation"
        description="Three patterns for primary navigation on small screens: a bottom tab bar for 2–5 equal-weight destinations, a navigation drawer for deeper hierarchies, and a bottom sheet overflow menu for secondary actions. Use one pattern per app — mixing them creates confusion."
      />

      {/* Pattern 1 — Bottom Tab Bar */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Bottom tab bar</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The default mobile navigation pattern. Fixed to the bottom of the viewport with an icon and
          label for each destination. Active tab uses the accent color; inactive tabs use{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">text-tertiary</code>.
          Badge counts appear above the icon for unread indicators.
        </p>
        <ComponentPreview>
          <BottomTabBarDemo />
        </ComponentPreview>
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-3">
          Tap each tab to switch screens. The Inbox tab carries a badge count.
        </p>
      </section>

      {/* Pattern 2 — Navigation Drawer */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Navigation drawer</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          A panel that slides in from the left. Use when you have 6 or more destinations, need
          section groupings, or want to show the app brand prominently. Triggered by a hamburger
          button in the app header. Dismissed by the close button, a backdrop tap, or selecting
          an item.
        </p>
        <ComponentPreview>
          <NavigationDrawerDemo />
        </ComponentPreview>
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-3">
          Tap the hamburger icon to open the drawer. Select an item or tap the backdrop to close.
        </p>
      </section>

      {/* Pattern 3 — Bottom Sheet Overflow */}
      <section className="mb-14">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-1">Bottom sheet overflow</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          A "More" tab that opens a bottom sheet with secondary destinations. Use when you have
          3–4 primary tabs plus additional items that don&apos;t warrant a full drawer. The sheet
          keeps the tab bar clean while still surfacing secondary actions within thumb reach.
        </p>
        <ComponentPreview>
          <BottomSheetNavDemo />
        </ComponentPreview>
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-3">
          Tap "More" to open the sheet. Tap an item or the backdrop to dismiss.
        </p>
      </section>

      {/* Pattern comparison */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Pattern comparison</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Pattern", "Destinations", "Best for", "Avoid when"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  pattern:  "Bottom tab bar",
                  count:    "2–5",
                  best:     "Peer destinations with equal importance; frequent tab switching",
                  avoid:    "6+ destinations; hierarchical sections; desktop-first apps",
                },
                {
                  pattern:  "Navigation drawer",
                  count:    "5–15",
                  best:     "Many destinations; section groupings; utility-dense apps",
                  avoid:    "3 or fewer destinations; frequent switching between sections",
                },
                {
                  pattern:  "Bottom sheet overflow",
                  count:    "3 tabs + overflow",
                  best:     "Mostly 3 primary tabs with occasional secondary actions",
                  avoid:    "Overflow contains primary destinations; deep navigation flows",
                },
              ].map((row, i) => (
                <tr key={row.pattern} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.pattern}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.count}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.best}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Platform guidance */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Platform guidance</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Platform", "Preferred pattern", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  platform: "iOS",
                  pattern:  "Bottom tab bar",
                  notes:    "Maps to UITabBarController / SwiftUI TabView. Users expect it at the bottom. Keep tabs 2–5; use .badge() for counts; filled icons for active state per iOS HIG.",
                },
                {
                  platform: "Android",
                  pattern:  "Bottom navigation bar",
                  notes:    "Material 3 NavigationBar. Same 2–5 tab rule. Navigation drawer is still common for utility-dense apps (NavigationDrawer / ModalNavigationDrawer).",
                },
                {
                  platform: "Web (mobile)",
                  pattern:  "Bottom tab bar or drawer",
                  notes:    "Fix to bottom with position: fixed. Use env(safe-area-inset-bottom) for iPhone home indicator clearance. Add backdrop-filter: blur for frosted glass. Avoid sticky — it rises with the keyboard.",
                },
                {
                  platform: "Web (desktop)",
                  pattern:  "Top navbar or sidebar",
                  notes:    "Bottom-anchored navigation feels out of place on desktop. Switch to a top navbar or collapsible sidebar at your md breakpoint (~768px).",
                },
              ].map((row, i) => (
                <tr key={row.platform} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.platform}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))] whitespace-nowrap">{row.pattern}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Design decisions */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Design decisions</h2>
        <ul className="space-y-4 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            {
              title: "Never stack patterns",
              body: "A bottom tab bar and a navigation drawer in the same app creates competing affordances. Pick one as the primary navigation container and use the other only for utility (e.g., a sheet for a profile menu is fine alongside a tab bar).",
            },
            {
              title: "Tab labels are required",
              body: "Icon-only bottom tabs fail accessibility and are harder for new users to learn. Always pair icons with short text labels (1–2 words max). The bottom tab bar has enough vertical space — use it.",
            },
            {
              title: "Thumb zone placement",
              body: "Bottom-anchored navigation falls within natural thumb reach on phones held in one hand. Top navigation forces a stretch. On screens larger than ~6 inches or in landscape, consider a side rail instead.",
            },
            {
              title: "Backdrop blur on the tab bar",
              body: "backdrop-filter: blur(20px) saturate(180%) lets content scroll behind the bar with a frosted glass effect, giving visual continuity without a hard edge. Ensure the surface color has enough opacity to maintain contrast in both light and dark modes.",
            },
            {
              title: "Drawer width",
              body: "A drawer wider than 80% of the screen competes too much with the backdrop affordance (users need to see enough of the page to understand they can tap to close). 75–80% is the sweet spot; on tablets use a fixed width (~320px).",
            },
          ].map(({ title, body }) => (
            <li key={title} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 flex-shrink-0">→</span>
              <span><strong className="text-[rgb(var(--text-primary))]">{title}.</strong> {body}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'Bottom tab bar: role="tablist" on the container; role="tab" + aria-selected on each button. Never icon-only — labels are required for VoiceOver / TalkBack discoverability.',
            "Navigation drawer: role=\"navigation\" with aria-label. The trigger button needs aria-expanded and aria-controls. When open, trap focus inside the drawer and mark background content aria-hidden.",
            'Bottom sheet overflow: role="dialog" + aria-modal="true" on the sheet panel. Escape key and backdrop tap must both dismiss. Focus moves to the first item on open; returns to the trigger on close.',
            "Badge counts must be readable by screen readers. Wrap the count in a span with aria-label, e.g. aria-label=\"3 unread messages\". Don't rely on the visual number alone.",
            "Minimum touch target: 44×44px per Apple HIG, 48×48dp per Material. The tab bar meets this with py-2.5 + icon + label combined height — do not reduce padding.",
            "On iOS, SwiftUI TabView and NavigationSplitView handle all accessibility automatically. Only build custom navigation when you need behavior the system doesn't provide, and replicate all ARIA semantics.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 flex-shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
