(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89664,e=>{"use strict";let t=(0,e.i(56420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,t],89664)},8734,e=>{"use strict";let t=(0,e.i(56420).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,t],8734)},61939,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(89664),s=e.i(8734),n=e.i(46932),o=e.i(88653),i=e.i(45060);e.s(["CodeBlock",0,function({code:e,language:c="tsx",filename:l,className:d}){let[u,x]=(0,r.useState)(!1),m=async()=>{await navigator.clipboard.writeText(e.trim()),x(!0),setTimeout(()=>x(!1),2e3)};return(0,t.jsxs)("div",{className:(0,i.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",d),children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex gap-1.5",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),l&&(0,t.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:l})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:c}),(0,t.jsx)("button",{onClick:m,className:(0,i.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",u?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,t.jsx)(o.AnimatePresence,{mode:"wait",initial:!1,children:u?(0,t.jsxs)(n.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(a.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,t.jsxs)(n.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(s.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,t.jsx)("code",{children:e.trim()})})})]})}])},64147,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(61939),n=e.i(45060);let o={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},i={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:c}){let[l,d]=(0,r.useState)("react"),u=["react","html","swift",...e.macos?["macos"]:[]],x=e[l]??e.swift;return(0,t.jsxs)("div",{className:(0,n.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",c),children:[(0,t.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:u.map(e=>(0,t.jsxs)("button",{onClick:()=>d(e),className:(0,n.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",l===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[l===e&&(0,t.jsx)(a.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),o[e]]},e))}),(0,t.jsx)(s.CodeBlock,{code:x.code,language:i[l],filename:x.filename,className:"rounded-none border-0"})]})}])},52953,e=>{"use strict";var t=e.i(43476),r=e.i(45060);e.s(["PageHeader",0,function({title:e,description:a,badge:s,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",n),children:[s&&(0,t.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,t.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),s]}),(0,t.jsx)("h1",{className:"mb-2.5",children:e}),(0,t.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:a})]})}])},32610,e=>{"use strict";var t=e.i(43476),r=e.i(45060);e.s(["PropsTable",0,function({props:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("overflow-hidden rounded-xl border border-[rgb(var(--border))]",a),children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:["Prop","Type","Default","Description"].map(e=>(0,t.jsx)("th",{className:"px-4 py-3 text-left font-semibold text-[rgb(var(--text-tertiary))] text-[11px] uppercase tracking-wider",children:e},e))})}),(0,t.jsx)("tbody",{children:e.map((e,a)=>(0,t.jsxs)("tr",{className:(0,r.cn)("border-b border-[rgb(var(--border-subtle))] last:border-0",a%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"),children:[(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsxs)("code",{className:"text-[rgb(var(--accent))] font-mono text-[12px]",children:[e.name,e.required&&(0,t.jsx)("span",{className:"text-red-400 ml-0.5",children:"*"})]})}),(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsx)("code",{className:"text-[rgb(var(--text-secondary))] font-mono text-[11px] bg-[rgb(var(--surface-raised))] px-1.5 py-0.5 rounded",children:e.type})}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-tertiary))]",children:e.default?(0,t.jsx)("code",{className:"font-mono text-[11px]",children:e.default}):(0,t.jsx)("span",{className:"opacity-40",children:"—"})}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))] leading-relaxed",children:e.description})]},e.name))})]})})}])},64742,e=>{"use strict";var t=e.i(43476),r=e.i(52953),a=e.i(32610),s=e.i(64147),n=e.i(71645);let o=[{name:"items",type:"ContextMenuItem[]",description:"Array of menu items. Use { type: 'separator' } to insert a divider between groups."},{name:"children",type:"ReactNode",description:"The element that receives the right-click / long-press trigger."},{name:"onOpenChange",type:"(open: boolean) => void",description:"Called when the menu opens or closes."}],i={react:{filename:"ContextMenu.tsx",code:`"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";

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
}`},html:{filename:"context-menu.html",code:`<!-- Context menu — HTML + vanilla JS implementation -->

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
</style>`},swift:{filename:"SitkaContextMenu.swift",code:`import SwiftUI

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
}`},macos:{filename:"SitkaContextMenu+macOS.swift",code:`import SwiftUI

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
}`}};e.s(["default",0,function(){let[e,c]=(0,n.useState)([]),[l,d]=(0,n.useState)(null),u=(0,n.useRef)(null),x=e=>c(t=>[`→ ${e}`,...t].slice(0,4));return(0,n.useEffect)(()=>{if(!l)return;let e=e=>{e instanceof KeyboardEvent&&"Escape"!==e.key||e instanceof MouseEvent&&u.current?.contains(e.target)||d(null)};return document.addEventListener("mousedown",e),document.addEventListener("keydown",e),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("keydown",e)}},[l]),(0,t.jsxs)("div",{children:[(0,t.jsx)(r.PageHeader,{title:"Context Menu",description:"Right-click (desktop) or long-press (mobile) contextual action panel. Glass-backed floating surface with support for grouped actions, keyboard shortcuts, dividers, and destructive items."}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4",children:"Preview"}),(0,t.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6",children:[(0,t.jsx)("div",{className:"relative rounded-[var(--radius-lg)] border border-dashed border-[rgb(var(--border))] p-8 text-center cursor-default select-none text-[13px] text-[rgb(var(--text-tertiary))] hover:border-[rgb(var(--accent-muted))] transition-colors",onContextMenu:e=>{e.preventDefault(),d({x:e.clientX,y:e.clientY})},children:"Right-click anywhere in this zone"}),e.length>0&&(0,t.jsx)("div",{className:"mt-3 space-y-1",children:e.map((e,r)=>(0,t.jsx)("p",{className:"text-[11px] font-mono text-[rgb(var(--text-tertiary))]",children:e},r))})]}),l&&(0,t.jsxs)("div",{ref:u,role:"menu",className:"fixed z-50 min-w-[180px] py-1 rounded-[var(--radius-md)] border border-[rgb(var(--border))]",style:{top:l.y,left:l.x,background:"rgb(var(--surface) / 0.92)",backdropFilter:"blur(20px) saturate(160%)",WebkitBackdropFilter:"blur(20px) saturate(160%)",boxShadow:"var(--shadow-sheet), inset 0 1px 0 rgba(255,255,255,0.08)"},children:[(0,t.jsx)("div",{className:"absolute inset-x-0 top-0 h-px rounded-t-[var(--radius-md)] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"}),[{label:"Edit",shortcut:"⌘E",onSelect:()=>x("Edit selected")},{label:"Duplicate",shortcut:"⌘D",onSelect:()=>x("Duplicate selected")},{label:"Move to Done",onSelect:()=>x("Moved to Done")},{type:"separator"},{label:"Delete",destructive:!0,shortcut:"⌫",onSelect:()=>x("Delete selected")}].map((e,r)=>"separator"===e.type?(0,t.jsx)("div",{className:"my-1 h-px bg-[rgb(var(--border-subtle))]"},r):(0,t.jsxs)("button",{role:"menuitem",className:`w-full flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-left transition-colors duration-75 ${e.destructive?"text-[rgb(var(--status-danger))] hover:bg-[rgb(var(--status-danger)/0.1)]":"text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))]"}`,onClick:()=>{e.onSelect?.(),d(null)},children:[(0,t.jsx)("span",{className:"flex-1",children:e.label}),e.shortcut&&(0,t.jsx)("kbd",{className:"font-mono text-[10px] text-[rgb(var(--text-tertiary))]",children:e.shortcut})]},r))]})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Anatomy"}),(0,t.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden",children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:["Element","Spec"].map(e=>(0,t.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:e},e))})}),(0,t.jsx)("tbody",{children:[{el:"Panel surface",spec:"blur(20px) saturate(160%), --surface at 92% opacity, --shadow-sheet, 1px border"},{el:"Specular top edge",spec:"1px gradient line: transparent → white/15% → transparent"},{el:"Action item",spec:"13px, py-1.5, px-3, hover: --surface-raised, optional icon (16px, 60% opacity) + shortcut kbd"},{el:"Destructive item",spec:"--status-danger text, hover: --status-danger/10% background"},{el:"Separator",spec:"1px --border-subtle, my-1 vertical margin, role='separator'"},{el:"Min width",spec:"180px — expands to fit content"},{el:"Border radius",spec:"--radius-md (10px)"}].map((e,r)=>(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]",children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap",children:e.el}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.spec})]},r))})]})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Implementation"}),(0,t.jsx)(s.PlatformTabs,{code:i})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5",children:"Props"}),(0,t.jsx)(a.PropsTable,{props:o})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Accessibility"}),(0,t.jsx)("ul",{className:"space-y-2 text-[14px] text-[rgb(var(--text-secondary))]",children:["Set role='menu' on the panel and role='menuitem' on each action button.","Escape always closes the menu and returns focus to the trigger element.","Arrow keys navigate between items; Enter / Space activates the focused item.","Long-press triggers the menu on touch screens — set a 500ms delay matching OS convention.","Destructive items should be placed last and separated by a divider — never first.","Disabled items remain focusable (aria-disabled='true') but do not execute their action."].map(e=>(0,t.jsxs)("li",{className:"flex gap-2",children:[(0,t.jsx)("span",{className:"text-[rgb(var(--accent))] mt-0.5",children:"→"}),e]},e))})]})]})}])}]);