import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { BottomSheetDemo } from "@/site/docs/MobileNavDemo";

export const metadata: Metadata = { title: "Bottom Sheet" };

const PROPS = [
  { name: "open",        type: "boolean",                           description: "Controls visibility. Sheet unmounts when false." },
  { name: "onClose",     type: "() => void",                        description: "Called on backdrop tap, Escape key, or close button." },
  { name: "title",       type: "string",                            description: "Optional header title. Renders a title + close button row when provided." },
  { name: "children",    type: "ReactNode",                         description: "Content rendered in the scrollable body." },
  { name: "snapHeight",  type: '"auto" | "half" | "full"', default: '"auto"', description: "Sheet height. auto = max 85vh; half = 50vh; full = 90vh." },
  { name: "className",   type: "string",                            description: "Extra classes on the sheet panel." },
];

const CODE = {
  react: {
    filename: "BottomSheet.tsx",
    code: `import { useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { Home, Settings, HelpCircle, ChevronRight } from "lucide-react";

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open sheet</Button>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Navigation"
        snapHeight="auto"
      >
        <nav className="space-y-1">
          {[
            { label: "Home",     icon: Home },
            { label: "Settings", icon: Settings },
            { label: "Help",     icon: HelpCircle },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl
                         text-[14px] font-medium text-text-secondary
                         hover:bg-surface hover:text-text-primary transition-colors"
            >
              <Icon className="w-4 h-4" />
              <span className="flex-1">{label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-text-tertiary" />
            </button>
          ))}
        </nav>
      </BottomSheet>
    </>
  );
}`,
  },
  html: {
    filename: "bottom-sheet.html",
    code: `<button id="openSheet" class="btn btn-secondary">Open sheet</button>

<div class="sheet-overlay" id="sheetOverlay" aria-hidden="true" hidden></div>

<div class="sheet" role="dialog" aria-modal="true" aria-label="Navigation" id="sheet" hidden>
  <div class="sheet-handle-wrap">
    <div class="sheet-handle"></div>
  </div>
  <div class="sheet-header">
    <h2 class="sheet-title">Navigation</h2>
    <button class="sheet-close" id="closeSheet" aria-label="Close">
      <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
  </div>
  <div class="sheet-body">
    <nav>
      <button class="sheet-item">
        <svg class="sheet-icon" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9v8a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1z"/></svg>
        <span>Home</span>
        <svg class="sheet-chevron" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <button class="sheet-item">
        <svg class="sheet-icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20v-1a8 8 0 0116 0v1"/></svg>
        <span>Settings</span>
        <svg class="sheet-chevron" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </nav>
  </div>
</div>

<style>
  .sheet-overlay {
    position: fixed; inset: 0; z-index: 40;
    background: rgba(0,0,0,.5);
    backdrop-filter: blur(2px);
  }

  .sheet {
    position: fixed;
    bottom: 0; left: 0; right: 0; z-index: 50;
    max-height: 85vh;
    display: flex; flex-direction: column;
    background: rgb(var(--surface-raised));
    border-top: 1px solid rgb(var(--border));
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -8px 40px rgba(0,0,0,.3);
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }

  .sheet-handle-wrap { padding: 12px 0 4px; display: flex; justify-content: center; }
  .sheet-handle { width: 40px; height: 3px; border-radius: 999px; background: rgb(var(--border)); }

  .sheet-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 16px 12px;
    border-bottom: 1px solid rgb(var(--border-subtle));
  }
  .sheet-title { font-size: 15px; font-weight: 600; color: rgb(var(--text-primary)); }
  .sheet-close {
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
    border: none; background: rgb(var(--surface)); cursor: pointer;
    color: rgb(var(--text-secondary));
  }
  .sheet-close svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2; }

  .sheet-body { flex: 1; overflow-y: auto; padding: 16px; }

  .sheet-item {
    width: 100%; display: flex; align-items: center; gap: 12px;
    padding: 12px; border-radius: 12px;
    font-size: 14px; font-weight: 500;
    border: none; background: none; cursor: pointer; text-align: left;
    color: rgb(var(--text-secondary));
    transition: background 100ms;
  }
  .sheet-item:hover { background: rgb(var(--surface)); color: rgb(var(--text-primary)); }
  .sheet-item span { flex: 1; }
  .sheet-icon  { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; flex-shrink: 0; }
  .sheet-chevron { width: 14px; height: 14px; stroke: rgb(var(--text-tertiary)); fill: none; stroke-width: 2; flex-shrink: 0; }
</style>

<script>
  const openBtn  = document.getElementById("openSheet");
  const closeBtn = document.getElementById("closeSheet");
  const sheet    = document.getElementById("sheet");
  const overlay  = document.getElementById("sheetOverlay");

  function openSheet() {
    sheet.hidden   = false;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeSheet() {
    sheet.hidden   = true;
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", openSheet);
  closeBtn.addEventListener("click", closeSheet);
  overlay.addEventListener("click", closeSheet);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });
</script>`,
  },
  swift: {
    filename: "SitkaBottomSheet.swift",
    code: `import SwiftUI

// SwiftUI equivalent: .sheet with detents (iOS 16+)

struct ContentView: View {
    @State private var sheetOpen = false

    var body: some View {
        Button("Open sheet") { sheetOpen = true }
            .buttonStyle(.bordered)
            .sheet(isPresented: $sheetOpen) {
                NavigationSheetView()
                    // Snap heights — use .presentationDetents
                    .presentationDetents([.medium, .large])
                    .presentationDragIndicator(.visible)
                    .presentationCornerRadius(20)
            }
    }
}

struct NavigationSheetView: View {
    @Environment(\\.dismiss) private var dismiss

    let items: [(String, String)] = [
        ("house",       "Home"),
        ("gearshape",   "Settings"),
        ("questionmark.circle", "Help"),
    ]

    var body: some View {
        NavigationStack {
            List(items, id: \\.1) { item in
                Label(item.1, systemImage: item.0)
                    .onTapGesture { dismiss() }
            }
            .listStyle(.plain)
            .navigationTitle("Navigation")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button { dismiss() } label: {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundStyle(.secondary)
                    }
                }
            }
        }
    }
}

// For iOS 15 compatibility, use .halfModal or a custom UIPresentationController.
// .presentationDetents is iOS 16+.

#Preview {
    ContentView()
}`,
  },
};

export default function BottomSheetPage() {
  return (
    <div>
      <PageHeader
        title="Bottom Sheet"
        description="A panel that slides up from the bottom of the screen. Used for contextual actions, navigation overflow, and secondary content that doesn't warrant a full page or modal. Portaled to document.body; dismissed by backdrop tap, Escape, or drag."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <BottomSheetDemo />
        </ComponentPreview>
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-3">
          Each button previews a different{" "}
          <code className="font-mono">snapHeight</code>. Tap the backdrop or Escape to dismiss.
        </p>
      </section>

      {/* Snap heights */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Snap heights</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Value", "Height", "Best for"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['"auto"', "max-h: 85vh — fits to content", "Navigation lists, action menus, short forms"],
                ['"half"', "h: 50vh — fixed half screen",   "Filter panels, media pickers, quick views"],
                ['"full"', "h: 90vh — near full screen",    "Long forms, detail views, multi-step flows"],
              ].map(([val, height, use], i) => (
                <tr key={val} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{val}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{height}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{use}</td>
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
          The sheet is portaled to{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">document.body</code> via{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">createPortal</code> — it is never
          clipped by <code className="font-mono text-[13px] text-[rgb(var(--accent))]">overflow: hidden</code>{" "}
          ancestors. Body scroll is locked while open. Dismiss handlers cover backdrop click and Escape key.
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
                { scenario: "Drag to dismiss",   guidance: "Add a swipe-down gesture handler that maps drag velocity to a close threshold. Most users expect this pattern from native apps — a drag handle without swipe support feels broken." },
                { scenario: "Virtual keyboard",  guidance: "When a sheet contains inputs, pair it with Visual Viewport API or use env(keyboard-inset-height) so the sheet shrinks when the keyboard appears rather than being pushed off-screen." },
                { scenario: "Safe area insets",  guidance: "Add padding-bottom: env(safe-area-inset-bottom, 0px) inside the sheet content so items aren't obscured by the home indicator on modern iPhones." },
                { scenario: "Scroll chaining",   guidance: "overscroll-behavior: contain on the sheet body prevents scroll from propagating to the page behind the backdrop while the sheet is open." },
                { scenario: "Nested navigation", guidance: "For multi-step flows inside a sheet, push views horizontally within the sheet — don't stack sheets. Stacked sheets are confusing and unexpected on mobile." },
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
            'The sheet panel has role="dialog" and aria-modal="true". Provide aria-label equal to the title, or use aria-labelledby pointing to the title element.',
            "Focus must be trapped inside the sheet while it is open. The first focusable element (or the title) should receive focus on open.",
            "Escape key dismisses the sheet and returns focus to the trigger. Implement this even if a close button is present.",
            "Background content should be inert (aria-hidden) while the sheet is open so screen reader users cannot navigate behind the overlay.",
            "The drag handle is decorative — do not add role or aria to it. Provide a close button as the primary dismiss affordance for keyboard/AT users.",
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
