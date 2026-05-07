"use client";

import { PageHeader } from "@/components/docs/PageHeader";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Copy, Edit2, Trash2, ExternalLink, MoreHorizontal } from "lucide-react";

const PROPS = [
  {
    name: "items",
    type: "DropdownItem[]",
    description: "Array of menu items. Use { type: 'separator' } to insert a divider between groups.",
  },
  {
    name: "trigger",
    type: "ReactNode",
    description: "The trigger element. Rendered as-is — the Dropdown wraps it in a button if needed.",
  },
  {
    name: "align",
    type: '"start" | "end"',
    default: '"start"',
    description: "Horizontal alignment of the panel relative to the trigger.",
  },
  {
    name: "side",
    type: '"top" | "bottom"',
    default: '"bottom"',
    description: "Preferred vertical side. Flips automatically if the panel would overflow the viewport.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the panel opens or closes.",
  },
];

const CODE = {
  react: {
    filename: "DropdownMenu.tsx",
    code: `"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";

export interface DropdownAction {
  type?: "action";
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}
export interface DropdownSeparator { type: "separator" }
export type DropdownItem = DropdownAction | DropdownSeparator;

interface DropdownMenuProps {
  items: DropdownItem[];
  trigger: React.ReactNode;
  align?: "start" | "end";
  side?: "top" | "bottom";
  onOpenChange?: (open: boolean) => void;
}

export function DropdownMenu({
  items,
  trigger,
  align = "start",
  side = "bottom",
  onOpenChange,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef  = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    onOpenChange?.(next);
  };

  const close = useCallback(() => {
    setOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e instanceof MouseEvent) {
        if (triggerRef.current?.contains(e.target as Node)) return;
        if (panelRef.current?.contains(e.target as Node)) return;
      }
      close();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", handler);
    };
  }, [open, close]);

  return (
    <div className="relative inline-flex">
      <button ref={triggerRef} onClick={toggle} aria-haspopup="menu" aria-expanded={open}>
        {trigger}
      </button>

      {open && (
        <div
          ref={panelRef}
          role="menu"
          className={cn(
            "absolute z-50 min-w-[180px] py-1 rounded-[var(--radius-md)] border border-[rgb(var(--border))]",
            side === "bottom" ? "top-full mt-1.5" : "bottom-full mb-1.5",
            align === "end" ? "right-0" : "left-0"
          )}
          style={{
            background: "rgb(var(--surface) / 0.92)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            boxShadow: "var(--shadow-sheet), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px rounded-t-[var(--radius-md)] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
          {items.map((item, i) => {
            if (item.type === "separator") {
              return <div key={i} className="my-1 h-px bg-[rgb(var(--border-subtle))]" role="separator" />;
            }
            const action = item as DropdownAction;
            return (
              <button
                key={i}
                role="menuitem"
                disabled={action.disabled}
                onClick={() => { action.onSelect(); close(); }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-left transition-colors duration-75",
                  action.destructive
                    ? "text-[rgb(var(--status-danger))] hover:bg-[rgb(var(--status-danger)/0.1)]"
                    : "text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))]",
                  action.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                )}
              >
                {action.icon && <span className="w-4 h-4 shrink-0 opacity-60">{action.icon}</span>}
                <span className="flex-1">{action.label}</span>
                {action.shortcut && (
                  <kbd className="font-mono text-[10px] text-[rgb(var(--text-tertiary))] ml-4">{action.shortcut}</kbd>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}`,
  },
  html: {
    filename: "dropdown-menu.html",
    code: `<!-- Dropdown Menu — HTML + vanilla JS -->

<div class="dropdown">
  <button class="btn" id="dd-trigger" aria-haspopup="menu" aria-expanded="false">
    Options <span class="chevron">▾</span>
  </button>
  <div class="dd-panel" id="dd-panel" role="menu" aria-hidden="true">
    <div class="dd-specular"></div>
    <button class="dd-item" role="menuitem">
      <span class="dd-icon">✎</span> Edit
      <kbd class="dd-shortcut">⌘E</kbd>
    </button>
    <button class="dd-item" role="menuitem">
      <span class="dd-icon">⊕</span> Duplicate
    </button>
    <button class="dd-item" role="menuitem">
      <span class="dd-icon">↗</span> Open in new tab
    </button>
    <div class="dd-separator" role="separator"></div>
    <button class="dd-item dd-item-destructive" role="menuitem">
      <span class="dd-icon">⊗</span> Delete
    </button>
  </div>
</div>

<script>
const trigger = document.getElementById("dd-trigger");
const panel   = document.getElementById("dd-panel");
let isOpen = false;

function open() {
  isOpen = true;
  panel.style.display = "block";
  panel.setAttribute("aria-hidden", "false");
  trigger.setAttribute("aria-expanded", "true");
}
function close() {
  isOpen = false;
  panel.style.display = "none";
  panel.setAttribute("aria-hidden", "true");
  trigger.setAttribute("aria-expanded", "false");
}

trigger.addEventListener("click", () => isOpen ? close() : open());
document.addEventListener("mousedown", (e) => {
  if (!panel.contains(e.target) && e.target !== trigger) close();
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
</script>

<style>
  .dropdown { position: relative; display: inline-flex; }
  .dd-panel {
    display: none;
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 9999;
    min-width: 180px;
    padding: 4px 0;
    border-radius: 10px;
    border: 1px solid rgb(var(--border));
    background: rgb(var(--surface) / 0.92);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    box-shadow: var(--shadow-sheet), inset 0 1px 0 rgba(255,255,255,0.08);
    overflow: hidden;
  }
  .dd-specular {
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    pointer-events: none;
  }
  .dd-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 6px 12px;
    font-size: 13px;
    text-align: left;
    background: none;
    border: none;
    color: rgb(var(--text-primary));
    cursor: pointer;
    transition: background-color 75ms;
  }
  .dd-item:hover { background: rgb(var(--surface-raised)); }
  .dd-item-destructive { color: rgb(var(--status-danger)); }
  .dd-item-destructive:hover { background: rgba(var(--status-danger), 0.1); }
  .dd-icon { width: 16px; opacity: 0.6; }
  .dd-shortcut { margin-left: auto; font-family: monospace; font-size: 10px; color: rgb(var(--text-tertiary)); }
  .dd-separator { height: 1px; background: rgb(var(--border-subtle)); margin: 4px 0; }
</style>`,
  },
  swift: {
    filename: "SitkaDropdownMenu.swift",
    code: `import SwiftUI

// On iOS/SwiftUI, use the native Menu component — it matches system conventions
// and automatically adapts to compact/regular size classes.

struct AssetActionMenu: View {
    var onEdit: () -> Void = {}
    var onDuplicate: () -> Void = {}
    var onDelete: () -> Void = {}

    var body: some View {
        Menu {
            Button { onEdit() } label: {
                Label("Edit", systemImage: "pencil")
            }
            Button { onDuplicate() } label: {
                Label("Duplicate", systemImage: "doc.on.doc")
            }
            Button { } label: {
                Label("Open in new tab", systemImage: "arrow.up.right.square")
            }

            Divider()

            Button(role: .destructive) { onDelete() } label: {
                Label("Delete", systemImage: "trash")
            }
        } label: {
            Label("Options", systemImage: "ellipsis.circle")
        }
    }
}

// Inline (non-floating) menu — used in toolbars / navigation bars
struct ToolbarDropdown: View {
    var body: some View {
        Menu {
            Button("Sort by Name")    { }
            Button("Sort by Date")    { }
            Button("Sort by Status")  { }
        } label: {
            Image(systemName: "arrow.up.arrow.down")
        }
        .menuStyle(.button)
    }
}

#Preview {
    HStack(spacing: 24) {
        AssetActionMenu()
        ToolbarDropdown()
    }
    .padding()
}`,
  },
  macos: {
    filename: "SitkaDropdownMenu+macOS.swift",
    code: `import SwiftUI

// macOS — Menu with keyboard shortcuts and submenu support.
// Prefer .menuStyle(.button) for toolbar placements; omit for context-style.

struct DocumentMenu: View {
    var body: some View {
        Menu("File") {
            Button("New")  { }.keyboardShortcut("n")
            Button("Open") { }.keyboardShortcut("o")

            Menu("Open Recent") {
                Button("Design Tokens v2.json") { }
                Button("Sitka Components.sketch") { }
                Divider()
                Button("Clear Recents") { }
            }

            Divider()

            Button("Save")    { }.keyboardShortcut("s")
            Button("Save As") { }.keyboardShortcut("s", modifiers: [.shift, .command])

            Divider()

            Button(role: .destructive) { } label: {
                Label("Move to Trash", systemImage: "trash")
            }
            .keyboardShortcut(.delete, modifiers: .command)
        }
    }
}

#Preview {
    DocumentMenu()
        .padding()
        .frame(width: 200)
}`,
  },
};

type MenuItem =
  | { type?: "action"; label: string; icon?: React.ReactNode; shortcut?: string; destructive?: boolean }
  | { type: "separator" };

function DemoDropdown({
  label,
  items,
  align = "start",
  log,
  setLog,
}: {
  label: string;
  items: MenuItem[];
  align?: "start" | "end";
  log: string[];
  setLog: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e instanceof MouseEvent) {
        if (triggerRef.current?.contains(e.target as Node)) return;
        if (panelRef.current?.contains(e.target as Node)) return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", handler);
    };
  }, [open]);

  return (
    <div className="relative inline-flex">
      <button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] text-[13px] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))] transition-colors"
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 text-[rgb(var(--text-tertiary))] transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="menu"
          className={`absolute z-50 min-w-[180px] py-1 top-full mt-1.5 rounded-[var(--radius-md)] border border-[rgb(var(--border))] ${align === "end" ? "right-0" : "left-0"}`}
          style={{
            background: "rgb(var(--surface) / 0.92)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            boxShadow: "var(--shadow-sheet), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px rounded-t-[var(--radius-md)] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
          {items.map((item, i) =>
            item.type === "separator" ? (
              <div key={i} className="my-1 h-px bg-[rgb(var(--border-subtle))]" role="separator" />
            ) : (
              <button
                key={i}
                role="menuitem"
                onClick={() => {
                  setLog((l) => [`→ ${item.label} selected`, ...l].slice(0, 5));
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-left transition-colors duration-75 ${
                  item.destructive
                    ? "text-[rgb(var(--status-danger))] hover:bg-[rgb(var(--status-danger)/0.1)]"
                    : "text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))]"
                }`}
              >
                {item.icon && <span className="w-4 h-4 shrink-0 opacity-60 flex items-center">{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <kbd className="font-mono text-[10px] text-[rgb(var(--text-tertiary))] ml-4">{item.shortcut}</kbd>
                )}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function DropdownMenuPage() {
  const [log, setLog] = useState<string[]>([]);

  const editItems: MenuItem[] = [
    { label: "Edit", icon: <Edit2 size={14} />, shortcut: "⌘E" },
    { label: "Duplicate", icon: <Copy size={14} />, shortcut: "⌘D" },
    { label: "Open in new tab", icon: <ExternalLink size={14} /> },
    { type: "separator" },
    { label: "Delete", icon: <Trash2 size={14} />, destructive: true },
  ];

  const sortItems: MenuItem[] = [
    { label: "Sort by Name" },
    { label: "Sort by Date modified" },
    { label: "Sort by Status" },
    { type: "separator" },
    { label: "Ascending" },
    { label: "Descending" },
  ];

  return (
    <div>
      <PageHeader
        title="Dropdown Menu"
        description="A button-anchored floating menu for actions and commands. Glass-backed panel, click-to-toggle, auto-dismisses on outside click or Escape. Supports icons, keyboard shortcuts, separators, and destructive items."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Preview</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-8 flex flex-wrap items-start gap-4">
          <DemoDropdown label="Options" items={editItems} log={log} setLog={setLog} />
          <DemoDropdown label="Sort" items={sortItems} log={log} setLog={setLog} />
          <div className="relative inline-flex">
            <DemoDropdown
              label=""
              items={editItems}
              align="end"
              log={log}
              setLog={setLog}
            />
          </div>
        </div>
        {log.length > 0 && (
          <div className="mt-2 space-y-0.5 px-1">
            {log.map((l, i) => (
              <p key={i} className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">{l}</p>
            ))}
          </div>
        )}
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Variants</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The trigger can be any button style — text label with chevron, icon-only, or a split button action
          area. The panel aligns to the trigger edge via the <code className="font-mono text-[13px] text-[rgb(var(--accent))]">align</code> prop.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Variant", "Use when"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { variant: "Label + chevron", use: "Primary action area with a visible text label (Sort, Filter, Options)" },
                { variant: "Icon-only (⋯)", use: "Compact row actions where space is limited — pair with aria-label" },
                { variant: "Split button action", use: "Combined primary action + dropdown for secondary variants" },
                { variant: "Align: start", use: "Default — panel left-edge aligns with trigger left-edge" },
                { variant: "Align: end", use: "Panel right-edge aligns with trigger right-edge — use for right-side toolbars" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.variant}</td>
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
                { el: "Panel surface", spec: "blur(20px) saturate(160%), --surface at 92% opacity, --shadow-sheet, 1px border" },
                { el: "Specular top edge", spec: "1px gradient line: transparent → white/15% → transparent" },
                { el: "Action item", spec: "13px, py-1.5, px-3, hover: --surface-raised. Optional leading icon (16px, 60% opacity) and trailing kbd shortcut" },
                { el: "Destructive item", spec: "--status-danger text, hover: --status-danger/10% background. Always last, always after a separator" },
                { el: "Separator", spec: "1px --border-subtle, my-1 vertical margin, role='separator'" },
                { el: "Min width", spec: "180px — grows to fit the longest item" },
                { el: "Offset from trigger", spec: "6px gap (mt-1.5 / mb-1.5)" },
                { el: "Border radius", spec: "--radius-md (10px)" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.el}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* vs Context Menu */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Dropdown vs Context Menu</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["", "Dropdown Menu", "Context Menu"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { prop: "Trigger", dm: "Explicit button click", cm: "Right-click / long-press" },
                { prop: "Discovery", dm: "Always visible (button label or ⋯)", cm: "Hidden — user must know to right-click" },
                { prop: "Position", dm: "Anchored to the trigger element", cm: "Floats at cursor position" },
                { prop: "Best for", dm: "Toolbars, row actions, filter menus", cm: "Canvas items, list rows, text selections" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.prop}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.dm}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Set aria-haspopup='menu' and aria-expanded on the trigger button. Update aria-expanded when the panel opens and closes.",
            "Set role='menu' on the panel and role='menuitem' on each action. The panel must not be focusable itself.",
            "Arrow keys (↑ ↓) navigate items; Enter / Space activates; Escape closes and returns focus to trigger.",
            "For icon-only triggers, provide aria-label describing the menu purpose (e.g. 'Row actions', 'Sort options').",
            "Destructive items should always be last and separated by a divider so they are not accidentally activated.",
            "Disabled items use aria-disabled='true' and pointer-events-none — they remain in the tab order but do not execute.",
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
