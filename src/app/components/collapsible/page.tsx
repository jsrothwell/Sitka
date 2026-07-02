"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Collapsible } from "@/components/ui/Collapsible";

const PROPS = [
  {
    name: "title",
    type: "React.ReactNode",
    required: true,
    description: "Trigger label rendered in the header button.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Content revealed when open.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Initial open state for uncontrolled usage.",
  },
  {
    name: "open",
    type: "boolean",
    description: "Controlled open state. Pair with onOpenChange.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional classes on the root element.",
  },
  {
    name: "contentClassName",
    type: "string",
    description: "Additional classes on the content wrapper.",
  },
];

const CODE = {
  react: {
    filename: "Collapsible.tsx",
    code: `import { Collapsible } from "@/components/ui/Collapsible";

// Uncontrolled
<Collapsible title="Advanced settings">
  <p>These settings affect performance and security.</p>
</Collapsible>

// Open by default
<Collapsible title="Details" defaultOpen>
  <p>This section is open by default.</p>
</Collapsible>

// Controlled
const [open, setOpen] = useState(false);
<Collapsible title="More info" open={open} onOpenChange={setOpen}>
  <p>Controlled content.</p>
</Collapsible>`,
  },
  html: {
    filename: "collapsible.html",
    code: `<div style="border:1px solid rgb(var(--border)); border-radius:12px; overflow:hidden;">
  <button
    type="button"
    aria-expanded="false"
    aria-controls="collapsible-content"
    onclick="toggleCollapsible(this)"
    style="
      width:100%; display:flex; align-items:center; justify-content:space-between;
      padding:12px 16px; font-size:13px; font-weight:500;
      background:rgb(var(--surface-raised)); cursor:pointer;
    "
  >
    <span>Advanced settings</span>
    <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  </button>

  <div id="collapsible-content" hidden
    style="padding:12px 16px; border-top:1px solid rgb(var(--border));">
    Content goes here.
  </div>
</div>

<script>
function toggleCollapsible(btn) {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !expanded);
  document.getElementById('collapsible-content').hidden = expanded;
}
</script>`,
  },
  swift: {
    filename: "CollapsibleView.swift",
    code: `import SwiftUI

struct CollapsibleView: View {
  @State private var isOpen = false

  var body: some View {
    VStack(spacing: 0) {
      Button(action: { withAnimation(.easeInOut(duration: 0.2)) { isOpen.toggle() } }) {
        HStack {
          Text("Advanced settings")
            .font(.callout)
            .fontWeight(.medium)
          Spacer()
          Image(systemName: "chevron.down")
            .rotationEffect(.degrees(isOpen ? 180 : 0))
            .animation(.easeInOut(duration: 0.2), value: isOpen)
        }
        .padding()
      }
      .buttonStyle(.plain)
      .background(Color(.secondarySystemBackground))

      if isOpen {
        Divider()
        VStack(alignment: .leading, spacing: 8) {
          Text("Content revealed here.")
            .font(.callout)
            .foregroundStyle(.secondary)
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .transition(.opacity.combined(with: .move(edge: .top)))
      }
    }
    .clipShape(RoundedRectangle(cornerRadius: 12))
    .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color(.separator), lineWidth: 1))
  }
}`,
  },
};

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <Collapsible title="What is a design system?" defaultOpen>
        A design system is a collection of reusable components, guidelines, and tokens that teams use to build consistent user interfaces.
      </Collapsible>
      <Collapsible title="Advanced settings" open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-2">
          <p>Controlled collapsible — toggled externally.</p>
          <p className="text-[12px] text-[rgb(var(--text-tertiary))]">State: {open ? "open" : "closed"}</p>
        </div>
      </Collapsible>
      <Collapsible title="Disabled state (visually)">
        This collapsible is closed by default.
      </Collapsible>
    </div>
  );
}

export default function CollapsiblePage() {
  return (
    <div>
      <PageHeader
        title="Collapsible"
        description="A single expandable section with an animated height transition. Use it to progressively disclose content without navigating away."
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
                {["Property", "Enter", "Exit"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { property: "height", enter: "0 → auto (200ms ease)", exit: "auto → 0 (200ms ease)" },
                { property: "opacity", enter: "0 → 1 (200ms ease)", exit: "1 → 0 (200ms ease)" },
                { property: "chevron rotate", enter: "0° → 180°", exit: "180° → 0°" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.property}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.enter}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.exit}</td>
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
                { el: "Trigger", role: "button (implicit)", attrs: "aria-expanded (true/false), aria-controls" },
                { el: "Content", role: "region", attrs: "aria-labelledby (trigger id)" },
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
                { key: "Enter / Space", action: "Toggle open or closed when trigger is focused" },
                { key: "Tab", action: "Move focus into the content area (first interactive element) when open" },
                { key: "Shift+Tab", action: "Return focus to the trigger from the content area" },
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
            "The trigger button uses aria-expanded to communicate open/closed state to screen readers.",
            "The content region is linked via aria-controls — screen readers can jump directly to the content.",
            'Content uses role="region" so it appears as a landmark when open.',
            "Keyboard: Enter or Space activates the trigger; Tab moves focus into the content when open.",
            "The animated height uses framer-motion with AnimatePresence — content is truly removed from the DOM when closed, not just hidden.",
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
