"use client";

import { useState } from "react";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Menubar, MenubarMenu } from "@/components/ui/Menubar";

function Demo() {
  const [wordWrap, setWordWrap] = useState(true);
  const [showRuler, setShowRuler] = useState(false);
  const [autosave, setAutosave] = useState(true);

  const menus: MenubarMenu[] = [
    {
      label: "File",
      items: [
        { label: "New File", shortcut: "⌘N", onSelect: () => {} },
        { label: "Open…", shortcut: "⌘O", onSelect: () => {} },
        { type: "separator" },
        { label: "Save", shortcut: "⌘S", onSelect: () => {} },
        { label: "Save As…", shortcut: "⌘⇧S", onSelect: () => {} },
        { type: "separator" },
        { label: "Export as PDF", onSelect: () => {} },
        { type: "separator" },
        { label: "Close", shortcut: "⌘W", onSelect: () => {} },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", shortcut: "⌘Z", onSelect: () => {} },
        { label: "Redo", shortcut: "⌘⇧Z", onSelect: () => {} },
        { type: "separator" },
        { label: "Cut", shortcut: "⌘X", onSelect: () => {} },
        { label: "Copy", shortcut: "⌘C", onSelect: () => {} },
        { label: "Paste", shortcut: "⌘V", onSelect: () => {} },
        { type: "separator" },
        { label: "Find…", shortcut: "⌘F", onSelect: () => {} },
        { label: "Replace…", shortcut: "⌘H", onSelect: () => {} },
      ],
    },
    {
      label: "View",
      items: [
        { type: "check", label: "Word Wrap", checked: wordWrap, onToggle: () => setWordWrap((v) => !v) },
        { type: "check", label: "Show Ruler", checked: showRuler, shortcut: "⌘R", onToggle: () => setShowRuler((v) => !v) },
        { type: "separator" },
        {
          type: "sub",
          label: "Zoom",
          items: [
            { label: "Zoom In", shortcut: "⌘+", onSelect: () => {} },
            { label: "Zoom Out", shortcut: "⌘−", onSelect: () => {} },
            { label: "Actual Size", shortcut: "⌘0", onSelect: () => {} },
          ],
        },
      ],
    },
    {
      label: "Preferences",
      items: [
        { type: "check", label: "Autosave", checked: autosave, onToggle: () => setAutosave((v) => !v) },
        { type: "separator" },
        { label: "Settings…", shortcut: "⌘,", onSelect: () => {} },
      ],
    },
  ];

  return (
    <div className="w-full max-w-2xl rounded-xl border border-[rgb(var(--border))] overflow-hidden">
      <Menubar menus={menus} />
      <div className="p-6 text-[13px] text-[rgb(var(--text-tertiary))] h-28 flex items-center justify-center">
        Document content area
      </div>
    </div>
  );
}

const CODE = {
  react: {
    filename: "Menubar.tsx",
    code: `import { Menubar } from "@/components/ui/Menubar";
import { useState } from "react";

function EditorMenubar() {
  const [wordWrap, setWordWrap] = useState(true);

  const menus = [
    {
      label: "File",
      items: [
        { label: "New File",  shortcut: "⌘N", onSelect: () => {} },
        { label: "Open…",     shortcut: "⌘O", onSelect: () => {} },
        { type: "separator" },
        { label: "Save",      shortcut: "⌘S", onSelect: () => {} },
      ],
    },
    {
      label: "View",
      items: [
        {
          type: "check",
          label: "Word Wrap",
          checked: wordWrap,
          onToggle: () => setWordWrap(v => !v),
        },
        {
          type: "sub",
          label: "Zoom",
          items: [
            { label: "Zoom In",    shortcut: "⌘+", onSelect: () => {} },
            { label: "Zoom Out",   shortcut: "⌘−", onSelect: () => {} },
          ],
        },
      ],
    },
  ];

  return <Menubar menus={menus} />;
}`,
  },
  html: {
    filename: "menubar.html",
    code: `<div role="menubar" aria-label="Application menu">
  <!-- Menu trigger -->
  <button
    role="menuitem"
    aria-haspopup="menu"
    aria-expanded="false"
    aria-controls="file-menu"
    id="file-trigger"
  >
    File
  </button>

  <!-- Dropdown -->
  <ul
    id="file-menu"
    role="menu"
    aria-labelledby="file-trigger"
    hidden
  >
    <li role="none">
      <button role="menuitem">
        New File <kbd>⌘N</kbd>
      </button>
    </li>
    <li role="separator"></li>
    <li role="none">
      <button role="menuitem">
        Save <kbd>⌘S</kbd>
      </button>
    </li>
  </ul>
</div>`,
  },
  swift: {
    filename: "AppMenubarCommands.swift",
    code: `import SwiftUI

// macOS — native menu bar commands
struct AppMenubarCommands: Commands {
  @Binding var wordWrap: Bool

  var body: some Commands {
    CommandGroup(replacing: .newItem) {
      Button("New File") { }
        .keyboardShortcut("n", modifiers: .command)
    }

    CommandMenu("View") {
      Toggle("Word Wrap", isOn: $wordWrap)
      Divider()
      Menu("Zoom") {
        Button("Zoom In") { }
          .keyboardShortcut("+", modifiers: .command)
        Button("Zoom Out") { }
          .keyboardShortcut("-", modifiers: .command)
      }
    }
  }
}

// Attach to WindowGroup:
// .commands { AppMenubarCommands(wordWrap: $wordWrap) }`,
  },
};

export default function MenubarPage() {
  return (
    <div>
      <PageHeader
        title="Menubar"
        description="A desktop-style File / Edit / View menu strip. Supports action items, checkbox toggles, submenus, separators, and keyboard shortcuts. Follows the WAI-ARIA Menubar pattern."
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Preview</h2>
        <ComponentPreview>
          <Demo />
        </ComponentPreview>
      </section>

      {/* ── Item types ──────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Item types</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Type", "role", "Description"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { type: "action",    role: "menuitem",          desc: "Executes an action. Optional shortcut label." },
                { type: "check",     role: "menuitemcheckbox",  desc: "Toggles a boolean state. Shows a checkmark when checked." },
                { type: "sub",       role: "menuitem + submenu", desc: "Opens a nested menu on hover/arrow right." },
                { type: "separator", role: "separator",         desc: "Horizontal rule for visual grouping — no interaction." },
              ].map((row) => (
                <tr key={row.type} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.type}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.role}</td>
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
                {["Key", "Context", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { key: "← →",         ctx: "Menubar",   action: "Move focus between top-level menu triggers" },
                { key: "↓ / Enter",   ctx: "Trigger",   action: "Open menu, focus first item" },
                { key: "↑ ↓",         ctx: "Open menu", action: "Move focus between items" },
                { key: "→",           ctx: "Submenu item", action: "Open submenu" },
                { key: "← / Escape", ctx: "Submenu",   action: "Close submenu, return to parent" },
                { key: "Escape",      ctx: "Open menu", action: "Close menu, return focus to trigger" },
                { key: "Home / End",  ctx: "Open menu", action: "Focus first / last item" },
              ].map((row) => (
                <tr key={row.key + row.ctx} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.key}</td>
                  <td className="px-4 py-3 text-[11px] text-[rgb(var(--text-tertiary))]">{row.ctx}</td>
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
            "Use the Menubar for document-centric apps (editors, IDEs, dashboards) — not for marketing sites or simple navigation.",
            "Show keyboard shortcuts in the menu but bind them independently — users rely on shortcuts even when the menu is closed.",
            "Separate destructive actions (Delete, Reset) from regular actions with a separator and place them last.",
            "Keep menu labels to one or two words (File, Edit, View) — longer labels are harder to scan.",
            "On macOS web apps consider matching the native menu bar order: File, Edit, Format, View, Window, Help.",
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
