"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Button } from "@/components/ui/Button";
import { CommandPalette } from "@/site/search/CommandPalette";

const PROPS = [
  {
    name: "open",
    type: "boolean",
    required: true,
    description: "Controls whether the palette is visible. Mount/unmount is handled internally via AnimatePresence.",
  },
  {
    name: "onClose",
    type: "() => void",
    required: true,
    description: "Called when the user presses Escape, clicks the backdrop, or activates a result.",
  },
];

const CODE = {
  react: {
    filename: "CommandPaletteUsage.tsx",
    code: `"use client";

import { useState, useEffect } from "react";
import { CommandPalette } from "@/site/search/CommandPalette";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  // ⌘K / Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {children}
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}`,
  },
  html: {
    filename: "command-palette.html",
    code: `<!-- Trigger button -->
<button
  onclick="document.getElementById('cmd').removeAttribute('hidden')"
  aria-keyshortcuts="Meta+k"
>
  Search <kbd>⌘K</kbd>
</button>

<!-- Palette overlay -->
<div id="cmd" hidden role="dialog" aria-modal="true" aria-label="Command palette">
  <div class="backdrop" onclick="document.getElementById('cmd').setAttribute('hidden','')"></div>
  <div class="panel glass">
    <input
      type="search"
      placeholder="Search anything…"
      oninput="filterResults(this.value)"
      autofocus
    />
    <ul id="results" role="listbox" aria-label="Search results">
      <!-- Results injected by filterResults() -->
    </ul>
  </div>
</div>`,
  },
  swift: {
    filename: "CommandPaletteView.swift",
    code: `import SwiftUI

struct CommandPaletteView: View {
  @Binding var isPresented: Bool
  @State private var query = ""

  let items: [SearchItem]

  var filtered: [SearchItem] {
    query.isEmpty ? Array(items.prefix(8)) :
    items.filter { $0.title.localizedCaseInsensitiveContains(query) }
  }

  var body: some View {
    VStack(spacing: 0) {
      HStack {
        Image(systemName: "magnifyingglass")
          .foregroundStyle(.secondary)
        TextField("Search anything…", text: $query)
          .textFieldStyle(.plain)
      }
      .padding()

      Divider()

      List(filtered, id: \\.href) { item in
        Button(item.title) {
          // navigate to item.href
          isPresented = false
        }
      }
      .listStyle(.plain)
    }
    .frame(width: 480)
    .background(.regularMaterial)
    .clipShape(RoundedRectangle(cornerRadius: 12))
    .shadow(radius: 20)
  }
}`,
  },
};

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        variant="secondary"
        leftIcon={<Search className="w-4 h-4" />}
        onClick={() => setOpen(true)}
      >
        Open command palette
      </Button>
      <p className="text-[12px] text-[rgb(var(--text-tertiary))]">
        Or press <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded-[var(--radius-sm)] border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">⌘K</kbd> anywhere
      </p>
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default function CommandPalettePage() {
  return (
    <div>
      <PageHeader
        title="Command Palette"
        badge="New"
        description="A full-screen search overlay surfacing all navigation destinations. Triggered by ⌘K and dismissed by Escape or backdrop click."
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

      {/* Keyboard navigation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Keyboard shortcuts
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
                { key: "⌘K / Ctrl+K", action: "Open the palette (wire in consumer — not built in)" },
                { key: "↑ / ↓", action: "Navigate through results" },
                { key: "↵ Enter", action: "Navigate to the highlighted result" },
                { key: "Escape", action: "Close the palette" },
                { key: "Click backdrop", action: "Close the palette" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3">
                    <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded-[var(--radius-sm)] border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-secondary))]">
                      {row.key}
                    </kbd>
                  </td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.action}</td>
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
          Results are drawn from <code className="font-mono text-[11px] text-[rgb(var(--accent))]">allSearchableItems</code> exported by{" "}
          <code className="font-mono text-[11px] text-[rgb(var(--accent))]">@/lib/navigation</code>. This is a flat array derived from the full navigation tree with added{" "}
          <code className="font-mono text-[11px] text-[rgb(var(--accent))]">section</code> and <code className="font-mono text-[11px] text-[rgb(var(--accent))]">group</code> metadata.
        </p>
        <p className="text-[14px] text-[rgb(var(--text-secondary))]">
          To surface additional content (pages, actions, recent items), extend{" "}
          <code className="font-mono text-[11px] text-[rgb(var(--accent))]">allSearchableItems</code> or pass a custom items list to the component.
        </p>
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
                { element: "Backdrop", enter: "opacity 0 → 1 (200ms ease)", exit: "opacity 1 → 0 (150ms ease)" },
                { element: "Panel", enter: "opacity+scale(0.97)+y(−8px) → visible, spring(500,40)", exit: "opacity+scale → hidden (150ms ease)" },
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
                { el: "Container", role: "dialog", attrs: "aria-modal='true', aria-label" },
                { el: "Search input", role: "combobox", attrs: "aria-expanded, aria-controls, aria-activedescendant" },
                { el: "Results list", role: "listbox", attrs: "aria-label" },
                { el: "Result item", role: "option", attrs: "aria-selected" },
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
                { key: "⌘K / Ctrl+K", action: "Open the command palette" },
                { key: "Arrow Down / Up", action: "Move focus between results" },
                { key: "Enter", action: "Execute the focused result" },
                { key: "Escape", action: "Close the command palette" },
                { key: "Tab", action: "Cycle forward through results (same as Arrow Down)" },
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
            "Panel uses role=\"dialog\" and aria-modal=\"true\" to trap assistive technology focus.",
            "Input auto-focuses on open so users can type immediately without tabbing.",
            "Results list uses role=\"listbox\"; highlighted item uses aria-selected.",
            "Backdrop click and Escape both close the dialog consistently.",
            "Keyboard navigation (↑↓ Enter Escape) is handled via document-level keydown listeners that are cleaned up on unmount.",
            "⌘K binding is implemented in the consumer, not in the component — giving teams flexibility to use a different shortcut.",
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
