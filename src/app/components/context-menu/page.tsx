"use client";

import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { useState, useRef, useEffect } from "react";

// Metadata must be in a separate server component when using "use client",
// but Next.js allows metadata export alongside "use client" on the page itself.
// We declare it here — Next.js ignores it in client components; SEO is handled via layout.

const PROPS = [
  {
    name: "items",
    type: "ContextMenuItem[]",
    description: "Array of menu items. Use { type: 'separator' } to insert a divider between groups.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "The element that receives the right-click / long-press trigger.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the menu opens or closes.",
  },
];

const CODE = {
  react: {
    filename: "ContextMenu.tsx",
    code: `"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib";

export interface ContextMenuAction {
  type?: "action";
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}
export interface ContextMenuSeparator { type: "separator" }
export type ContextMenuItem = ContextMenuAction | ContextMenuSeparator;

interface ContextMenuProps {
  items: ContextMenuItem[];
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export function ContextMenu({ items, children, onOpenChange }: ContextMenuProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const open = (x: number, y: number) => {
    setPos({ x, y });
    onOpenChange?.(true);
  };
  const close = useCallback(() => {
    setPos(null);
    onOpenChange?.(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!pos) return;
    const handler = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e instanceof MouseEvent && menuRef.current?.contains(e.target as Node)) return;
      close();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", handler);
    };
  }, [pos, close]);

  return (
    <>
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          open(e.clientX, e.clientY);
        }}
      >
        {children}
      </div>

      {pos && (
        <div
          ref={menuRef}
          role="menu"
          className="fixed z-50 min-w-[180px] py-1 rounded-[var(--radius-md)] border border-[rgb(var(--border))]"
          style={{
            top: pos.y,
            left: pos.x,
            background: "rgb(var(--surface) / 0.92)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            boxShadow: "var(--shadow-sheet), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Specular top-edge */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-[var(--radius-md)] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

          {items.map((item, i) => {
            if (item.type === "separator") {
              return <div key={i} className="my-1 h-px bg-[rgb(var(--border-subtle))]" role="separator" />;
            }
            const action = item as ContextMenuAction;
            return (
              <button
                key={i}
                role="menuitem"
                disabled={action.disabled}
                onClick={() => { action.onSelect(); close(); }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-left transition-colors duration-100",
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
    </>
  );
}`,
  },
  html: {
    filename: "context-menu.html",
    code: `<!-- Context menu — HTML + vanilla JS implementation -->

<div id="trigger" style="padding: 2rem; border: 1px dashed rgba(255,255,255,0.1); border-radius: 12px; cursor: default; user-select: none;">
  Right-click anywhere in this area
</div>

<div id="ctx-menu" class="ctx-menu" role="menu" aria-hidden="true">
  <div class="ctx-specular"></div>
  <button class="ctx-item" role="menuitem">
    <span class="ctx-icon">✎</span> Edit
    <kbd class="ctx-shortcut">⌘E</kbd>
  </button>
  <button class="ctx-item" role="menuitem">
    <span class="ctx-icon">⊕</span> Duplicate
    <kbd class="ctx-shortcut">⌘D</kbd>
  </button>
  <div class="ctx-separator" role="separator"></div>
  <button class="ctx-item ctx-item-destructive" role="menuitem">
    <span class="ctx-icon">⊗</span> Delete
    <kbd class="ctx-shortcut">⌫</kbd>
  </button>
</div>

<script>
const trigger = document.getElementById("trigger");
const menu    = document.getElementById("ctx-menu");

function openMenu(x, y) {
  menu.style.left = x + "px";
  menu.style.top  = y + "px";
  menu.style.display = "block";
  menu.setAttribute("aria-hidden", "false");
}
function closeMenu() {
  menu.style.display = "none";
  menu.setAttribute("aria-hidden", "true");
}

trigger.addEventListener("contextmenu", (e) => { e.preventDefault(); openMenu(e.clientX, e.clientY); });
document.addEventListener("mousedown", (e) => { if (!menu.contains(e.target)) closeMenu(); });
document.addEventListener("keydown",   (e) => { if (e.key === "Escape") closeMenu(); });
</script>

<style>
  .ctx-menu {
    display: none;
    position: fixed;
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
  .ctx-specular {
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    pointer-events: none;
  }
  .ctx-item {
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
    transition: background-color 100ms;
  }
  .ctx-item:hover { background: rgb(var(--surface-raised)); }
  .ctx-item-destructive { color: #f87171; }
  .ctx-item-destructive:hover { background: rgba(248,113,113,0.1); }
  .ctx-icon    { width: 16px; opacity: 0.6; }
  .ctx-shortcut { margin-left: auto; font-family: monospace; font-size: 10px; color: rgb(var(--text-tertiary)); }
  .ctx-separator { height: 1px; background: rgb(var(--border-subtle)); margin: 4px 0; }
</style>`,
  },
  swift: {
    filename: "SitkaContextMenu.swift",
    code: `import SwiftUI

// On SwiftUI, context menus are native — use .contextMenu modifier.
// Sitka's specification maps directly to SwiftUI's API.

struct TaskCard: View {
    let title: String
    let status: String
    var onMove: (String) -> Void = { _ in }
    var onDelete: () -> Void = {}

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title).font(.system(size: 13, weight: .medium))
            Text(status).font(.system(size: 11)).foregroundStyle(.secondary)
        }
        .padding(12)
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
        .contextMenu {
            // Action group
            Button { onMove("In Progress") } label: {
                Label("Move to In Progress", systemImage: "arrow.right.circle")
            }
            Button { onMove("In Review") } label: {
                Label("Move to In Review", systemImage: "eye.circle")
            }
            Button { onMove("Done") } label: {
                Label("Move to Done", systemImage: "checkmark.circle")
            }

            Divider()

            // Destructive
            Button(role: .destructive) { onDelete() } label: {
                Label("Delete Task", systemImage: "trash")
            }
        }
    }
}

#Preview {
    VStack(spacing: 8) {
        TaskCard(title: "Design system tokens audit", status: "To Do")
        TaskCard(title: "Implement KPI Tile component", status: "In Progress")
    }
    .padding()
}`,
  },
  macos: {
    filename: "SitkaContextMenu+macOS.swift",
    code: `import SwiftUI

// macOS — same .contextMenu modifier, with additional keyboard shortcuts
// and right-click (NSEvent) support built-in by SwiftUI.

struct TaskRow: View {
    let title: String
    let assignee: String?
    var onEdit: () -> Void = {}
    var onDuplicate: () -> Void = {}
    var onDelete: () -> Void = {}

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                Text(title).font(.system(size: 13))
                if let a = assignee {
                    Text(a).font(.system(size: 11)).foregroundStyle(.secondary)
                }
            }
            Spacer()
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .contentShape(Rectangle())
        .contextMenu {
            Button { onEdit() } label: {
                Label("Edit", systemImage: "pencil")
            }
            .keyboardShortcut("e", modifiers: .command)

            Button { onDuplicate() } label: {
                Label("Duplicate", systemImage: "doc.on.doc")
            }
            .keyboardShortcut("d", modifiers: .command)

            Divider()

            Button(role: .destructive) { onDelete() } label: {
                Label("Delete", systemImage: "trash")
            }
        }
    }
}

#Preview {
    List {
        TaskRow(title: "Audit token usage in JobFlo", assignee: "Alex")
        TaskRow(title: "Migrate KanbanView to Sitka", assignee: "Sam")
        TaskRow(title: "Write release notes", assignee: nil)
    }
    .frame(width: 360, height: 200)
}`,
  },
};

export default function ContextMenuPage() {
  const [log, setLog] = useState<string[]>([]);
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => setLog((l) => [`→ ${msg}`, ...l].slice(0, 4));

  const items = [
    { label: "Edit", shortcut: "⌘E", onSelect: () => addLog("Edit selected") },
    { label: "Duplicate", shortcut: "⌘D", onSelect: () => addLog("Duplicate selected") },
    { label: "Move to Done", onSelect: () => addLog("Moved to Done") },
    { type: "separator" as const },
    { label: "Delete", destructive: true, shortcut: "⌫", onSelect: () => addLog("Delete selected") },
  ];

  const openMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (!menuPos) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && (e as KeyboardEvent).key !== "Escape") return;
      if (e instanceof MouseEvent && menuRef.current?.contains(e.target as Node)) return;
      setMenuPos(null);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", close); };
  }, [menuPos]);

  return (
    <div>
      <PageHeader
        title="Context Menu"
        description="Right-click (desktop) or long-press (mobile) contextual action panel. Glass-backed floating surface with support for grouped actions, keyboard shortcuts, dividers, and destructive items."
      />

      {/* Interactive demo */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Preview</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6">
          <div
            className="relative rounded-[var(--radius-lg)] border border-dashed border-[rgb(var(--border))] p-8 text-center cursor-default select-none text-[13px] text-[rgb(var(--text-tertiary))] hover:border-[rgb(var(--accent-muted))] transition-colors"
            onContextMenu={openMenu}
          >
            Right-click anywhere in this zone
          </div>
          {log.length > 0 && (
            <div className="mt-3 space-y-1">
              {log.map((l, i) => (
                <p key={i} className="text-[11px] font-mono text-[rgb(var(--text-tertiary))]">{l}</p>
              ))}
            </div>
          )}
        </div>

        {/* Floating menu */}
        {menuPos && (
          <div
            ref={menuRef}
            role="menu"
            className="fixed z-50 min-w-[180px] py-1 rounded-[var(--radius-md)] border border-[rgb(var(--border))]"
            style={{
              top: menuPos.y, left: menuPos.x,
              background: "rgb(var(--surface) / 0.92)",
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
              boxShadow: "var(--shadow-sheet), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px rounded-t-[var(--radius-md)] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
            {items.map((item, i) =>
              item.type === "separator" ? (
                <div key={i} className="my-1 h-px bg-[rgb(var(--border-subtle))]" />
              ) : (
                <button
                  key={i}
                  role="menuitem"
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-left transition-colors duration-75 ${
                    item.destructive
                      ? "text-[rgb(var(--status-danger))] hover:bg-[rgb(var(--status-danger)/0.1)]"
                      : "text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))]"
                  }`}
                  onClick={() => { item.onSelect?.(); setMenuPos(null); }}
                >
                  <span className="flex-1">{item.label}</span>
                  {item.shortcut && <kbd className="font-mono text-[10px] text-[rgb(var(--text-tertiary))]">{item.shortcut}</kbd>}
                </button>
              )
            )}
          </div>
        )}
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
                { el: "Action item", spec: "13px, py-1.5, px-3, hover: --surface-raised, optional icon (16px, 60% opacity) + shortcut kbd" },
                { el: "Destructive item", spec: "--status-danger text, hover: --status-danger/10% background" },
                { el: "Separator", spec: "1px --border-subtle, my-1 vertical margin, role='separator'" },
                { el: "Min width", spec: "180px — expands to fit content" },
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
            "Set role='menu' on the panel and role='menuitem' on each action button.",
            "Escape always closes the menu and returns focus to the trigger element.",
            "Arrow keys navigate between items; Enter / Space activates the focused item.",
            "Long-press triggers the menu on touch screens — set a 500ms delay matching OS convention.",
            "Destructive items should be placed last and separated by a divider — never first.",
            "Disabled items remain focusable (aria-disabled='true') but do not execute their action.",
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
