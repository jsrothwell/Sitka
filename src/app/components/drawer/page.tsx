"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";

const PROPS = [
  {
    name: "open",
    type: "boolean",
    required: true,
    description: "Controls whether the drawer is visible.",
  },
  {
    name: "onClose",
    type: "() => void",
    required: true,
    description: "Called when the user presses Escape, clicks the backdrop, or presses the close button.",
  },
  {
    name: "side",
    type: '"left" | "right"',
    default: '"right"',
    description: "Which edge the drawer slides in from.",
  },
  {
    name: "width",
    type: "string | number",
    default: "360",
    description: "Width of the drawer panel. Accepts a pixel number or any valid CSS width string.",
  },
  {
    name: "title",
    type: "React.ReactNode",
    description: "Title shown in the drawer header. Also used as aria-label when it is a string.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Scrollable body content.",
  },
];

const CODE = {
  react: {
    filename: "DrawerUsage.tsx",
    code: `"use client";

import { useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Settings"
        side="right"
        width={400}
      >
        <p>Drawer content goes here.</p>
      </Drawer>
    </>
  );
}`,
  },
  html: {
    filename: "drawer.html",
    code: `<!-- Trigger -->
<button onclick="openDrawer()">Open drawer</button>

<!-- Backdrop -->
<div id="backdrop" hidden
  onclick="closeDrawer()"
  style="position:fixed; inset:0; z-index:40; background:rgba(0,0,0,0.5);"
  aria-hidden="true"
></div>

<!-- Drawer panel -->
<div id="drawer"
  role="dialog"
  aria-modal="true"
  aria-label="Settings"
  hidden
  style="
    position:fixed; top:0; right:0; bottom:0; z-index:50;
    width:360px;
    background:rgb(var(--surface));
    border-left:1px solid rgb(var(--border));
    display:flex; flex-direction:column;
    transform:translateX(100%);
    transition:transform 250ms ease;
  "
>
  <div style="display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid rgb(var(--border));">
    <h2 style="font-size:16px; font-weight:600;">Settings</h2>
    <button onclick="closeDrawer()" aria-label="Close drawer">✕</button>
  </div>
  <div style="flex:1; overflow-y:auto; padding:16px 20px;">
    Content goes here.
  </div>
</div>`,
  },
  swift: {
    filename: "DrawerView.swift",
    code: `import SwiftUI

struct DrawerView: View {
  @State private var isOpen = false

  var body: some View {
    Button("Open Drawer") { isOpen = true }
      .sheet(isPresented: $isOpen) {
        NavigationStack {
          List {
            Text("Drawer content")
          }
          .navigationTitle("Settings")
          .navigationBarTitleDisplayMode(.inline)
          .toolbar {
            ToolbarItem(placement: .cancellationAction) {
              Button("Close") { isOpen = false }
            }
          }
        }
        // On iPad, present as a sidebar-width sheet
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
      }
  }
}`,
  },
};

function Demo() {
  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);

  return (
    <div className="flex gap-3 flex-wrap justify-center">
      <Button variant="secondary" onClick={() => setRightOpen(true)}>
        Open right drawer
      </Button>
      <Button variant="secondary" onClick={() => setLeftOpen(true)}>
        Open left drawer
      </Button>

      <Drawer
        open={rightOpen}
        onClose={() => setRightOpen(false)}
        title="Settings"
        side="right"
      >
        <div className="flex flex-col gap-3 text-[14px] text-[rgb(var(--text-secondary))]">
          <p>This is the right-side drawer. It slides in from the right edge of the viewport.</p>
          <p>Press Escape or click the backdrop to close.</p>
        </div>
      </Drawer>

      <Drawer
        open={leftOpen}
        onClose={() => setLeftOpen(false)}
        title="Navigation"
        side="left"
      >
        <div className="flex flex-col gap-3 text-[14px] text-[rgb(var(--text-secondary))]">
          <p>Left-side drawer — typically used for navigation or filter panels.</p>
        </div>
      </Drawer>
    </div>
  );
}

export default function DrawerPage() {
  return (
    <div>
      <PageHeader
        title="Drawer"
        description="A panel that slides in from the left or right edge of the viewport. Distinct from BottomSheet (which slides up on mobile) — Drawer is a desktop-first side panel for settings, filters, or detail views."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
          <Demo />
        </ComponentPreview>
      </section>

      {/* Motion */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Motion
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Element", "Enter", "Exit"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { element: "Backdrop", enter: "opacity 0 → 1 (200ms ease-out)", exit: "opacity 1 → 0 (200ms ease)" },
                { element: "Panel (right)", enter: "translateX(100%) → 0 (250ms ease)", exit: "0 → translateX(100%) (250ms ease)" },
                { element: "Panel (left)", enter: "translateX(-100%) → 0 (250ms ease)", exit: "0 → translateX(-100%) (250ms ease)" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.element}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.enter}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.exit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Drawer vs BottomSheet */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Drawer vs Bottom Sheet
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["", "Drawer", "Bottom Sheet"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Primary axis", drawer: "Horizontal (left/right)", sheet: "Vertical (bottom)" },
                { label: "Primary context", drawer: "Desktop — settings, filters, detail panels", sheet: "Mobile — action sheets, quick options" },
                { label: "Content height", drawer: "Full viewport height", sheet: "Partial (snap points)" },
                { label: "Width", drawer: "Fixed, configurable", sheet: "Full width" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.label}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.drawer}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.sheet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                { el: "Panel", role: "dialog", attrs: "aria-modal='true', aria-label (from title prop)" },
                { el: "Close button", role: "button (implicit)", attrs: "aria-label='Close drawer'" },
                { el: "Backdrop", role: "(decorative)", attrs: "aria-hidden='true'" },
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
                { key: "Escape", action: "Close the drawer and restore focus to the trigger element" },
                { key: "Tab", action: "Cycle forward through focusable elements inside the drawer (focus trapped)" },
                { key: "Shift+Tab", action: "Cycle backward through focusable elements inside the drawer (focus trapped)" },
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
            'Panel uses role="dialog" and aria-modal="true" — assistive technologies treat it as a modal dialog.',
            "Focus moves to the close button on open and returns to the trigger element on close.",
            "Escape closes the drawer — consistent with other overlay components (Modal, CommandPalette).",
            "Backdrop click also closes the drawer — both dismiss methods are equally supported.",
            "The title prop is used as aria-label when it is a string, providing an accessible name for the dialog.",
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
