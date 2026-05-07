(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89664,e=>{"use strict";let t=(0,e.i(56420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,t],89664)},8734,e=>{"use strict";let t=(0,e.i(56420).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,t],8734)},61939,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(89664),s=e.i(8734),n=e.i(46932),o=e.i(88653),i=e.i(45060);e.s(["CodeBlock",0,function({code:e,language:d="tsx",filename:l,className:c}){let[p,b]=(0,r.useState)(!1),m=async()=>{await navigator.clipboard.writeText(e.trim()),b(!0),setTimeout(()=>b(!1),2e3)};return(0,t.jsxs)("div",{className:(0,i.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",c),children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex gap-1.5",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),l&&(0,t.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:l})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:d}),(0,t.jsx)("button",{onClick:m,className:(0,i.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",p?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,t.jsx)(o.AnimatePresence,{mode:"wait",initial:!1,children:p?(0,t.jsxs)(n.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(a.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,t.jsxs)(n.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(s.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,t.jsx)("code",{children:e.trim()})})})]})}])},64147,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(61939),n=e.i(45060);let o={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},i={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:d}){let[l,c]=(0,r.useState)("react"),p=["react","html","swift",...e.macos?["macos"]:[]],b=e[l]??e.swift;return(0,t.jsxs)("div",{className:(0,n.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",d),children:[(0,t.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:p.map(e=>(0,t.jsxs)("button",{onClick:()=>c(e),className:(0,n.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",l===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[l===e&&(0,t.jsx)(a.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),o[e]]},e))}),(0,t.jsx)(s.CodeBlock,{code:b.code,language:i[l],filename:b.filename,className:"rounded-none border-0"})]})}])},73474,e=>{"use strict";let t=(0,e.i(56420).default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);e.s(["Trash2",0,t],73474)},52953,e=>{"use strict";var t=e.i(43476),r=e.i(45060);e.s(["PageHeader",0,function({title:e,description:a,badge:s,className:n}){return(0,t.jsxs)("div",{className:(0,r.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",n),children:[s&&(0,t.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,t.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),s]}),(0,t.jsx)("h1",{className:"mb-2.5",children:e}),(0,t.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:a})]})}])},32610,e=>{"use strict";var t=e.i(43476),r=e.i(45060);e.s(["PropsTable",0,function({props:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("overflow-hidden rounded-xl border border-[rgb(var(--border))]",a),children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:["Prop","Type","Default","Description"].map(e=>(0,t.jsx)("th",{className:"px-4 py-3 text-left font-semibold text-[rgb(var(--text-tertiary))] text-[11px] uppercase tracking-wider",children:e},e))})}),(0,t.jsx)("tbody",{children:e.map((e,a)=>(0,t.jsxs)("tr",{className:(0,r.cn)("border-b border-[rgb(var(--border-subtle))] last:border-0",a%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"),children:[(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsxs)("code",{className:"text-[rgb(var(--accent))] font-mono text-[12px]",children:[e.name,e.required&&(0,t.jsx)("span",{className:"text-red-400 ml-0.5",children:"*"})]})}),(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsx)("code",{className:"text-[rgb(var(--text-secondary))] font-mono text-[11px] bg-[rgb(var(--surface-raised))] px-1.5 py-0.5 rounded",children:e.type})}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-tertiary))]",children:e.default?(0,t.jsx)("code",{className:"font-mono text-[11px]",children:e.default}):(0,t.jsx)("span",{className:"opacity-40",children:"—"})}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))] leading-relaxed",children:e.description})]},e.name))})]})})}])},16327,e=>{"use strict";let t=(0,e.i(56420).default)("chevron-down",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);e.s(["ChevronDown",0,t],16327)},26583,e=>{"use strict";var t=e.i(43476),r=e.i(52953),a=e.i(32610),s=e.i(64147),n=e.i(71645),o=e.i(16327),i=e.i(8734),d=e.i(56420);let l=(0,d.default)("pen",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]]);var c=e.i(73474);let p=(0,d.default)("external-link",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]),b=[{name:"items",type:"DropdownItem[]",description:"Array of menu items. Use { type: 'separator' } to insert a divider between groups."},{name:"trigger",type:"ReactNode",description:"The trigger element. Rendered as-is — the Dropdown wraps it in a button if needed."},{name:"align",type:'"start" | "end"',default:'"start"',description:"Horizontal alignment of the panel relative to the trigger."},{name:"side",type:'"top" | "bottom"',default:'"bottom"',description:"Preferred vertical side. Flips automatically if the panel would overflow the viewport."},{name:"onOpenChange",type:"(open: boolean) => void",description:"Called when the panel opens or closes."}],m={react:{filename:"DropdownMenu.tsx",code:`"use client";

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
}`},html:{filename:"dropdown-menu.html",code:`<!-- Dropdown Menu — HTML + vanilla JS -->

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
</style>`},swift:{filename:"SitkaDropdownMenu.swift",code:`import SwiftUI

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
}`},macos:{filename:"SitkaDropdownMenu+macOS.swift",code:`import SwiftUI

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
}`}};function u({label:e,items:r,align:a="start",log:s,setLog:i}){let[d,l]=(0,n.useState)(!1),c=(0,n.useRef)(null),p=(0,n.useRef)(null);return(0,n.useEffect)(()=>{if(!d)return;let e=e=>{(!(e instanceof KeyboardEvent)||"Escape"===e.key)&&(e instanceof MouseEvent&&(c.current?.contains(e.target)||p.current?.contains(e.target))||l(!1))};return document.addEventListener("mousedown",e),document.addEventListener("keydown",e),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("keydown",e)}},[d]),(0,t.jsxs)("div",{className:"relative inline-flex",children:[(0,t.jsxs)("button",{ref:c,onClick:()=>l(e=>!e),"aria-haspopup":"menu","aria-expanded":d,className:"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] text-[13px] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))] transition-colors",children:[e,(0,t.jsx)(o.ChevronDown,{className:`w-3.5 h-3.5 text-[rgb(var(--text-tertiary))] transition-transform duration-150 ${d?"rotate-180":""}`})]}),d&&(0,t.jsxs)("div",{ref:p,role:"menu",className:`absolute z-50 min-w-[180px] py-1 top-full mt-1.5 rounded-[var(--radius-md)] border border-[rgb(var(--border))] ${"end"===a?"right-0":"left-0"}`,style:{background:"rgb(var(--surface) / 0.92)",backdropFilter:"blur(20px) saturate(160%)",WebkitBackdropFilter:"blur(20px) saturate(160%)",boxShadow:"var(--shadow-sheet), inset 0 1px 0 rgba(255,255,255,0.08)"},children:[(0,t.jsx)("div",{className:"absolute inset-x-0 top-0 h-px rounded-t-[var(--radius-md)] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"}),r.map((e,r)=>"separator"===e.type?(0,t.jsx)("div",{className:"my-1 h-px bg-[rgb(var(--border-subtle))]",role:"separator"},r):(0,t.jsxs)("button",{role:"menuitem",onClick:()=>{i(t=>[`→ ${e.label} selected`,...t].slice(0,5)),l(!1)},className:`w-full flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-left transition-colors duration-75 ${e.destructive?"text-[rgb(var(--status-danger))] hover:bg-[rgb(var(--status-danger)/0.1)]":"text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))]"}`,children:[e.icon&&(0,t.jsx)("span",{className:"w-4 h-4 shrink-0 opacity-60 flex items-center",children:e.icon}),(0,t.jsx)("span",{className:"flex-1",children:e.label}),e.shortcut&&(0,t.jsx)("kbd",{className:"font-mono text-[10px] text-[rgb(var(--text-tertiary))] ml-4",children:e.shortcut})]},r))]})]})}e.s(["default",0,function(){let[e,o]=(0,n.useState)([]),d=[{label:"Edit",icon:(0,t.jsx)(l,{size:14}),shortcut:"⌘E"},{label:"Duplicate",icon:(0,t.jsx)(i.Copy,{size:14}),shortcut:"⌘D"},{label:"Open in new tab",icon:(0,t.jsx)(p,{size:14})},{type:"separator"},{label:"Delete",icon:(0,t.jsx)(c.Trash2,{size:14}),destructive:!0}];return(0,t.jsxs)("div",{children:[(0,t.jsx)(r.PageHeader,{title:"Dropdown Menu",description:"A button-anchored floating menu for actions and commands. Glass-backed panel, click-to-toggle, auto-dismisses on outside click or Escape. Supports icons, keyboard shortcuts, separators, and destructive items."}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4",children:"Preview"}),(0,t.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-8 flex flex-wrap items-start gap-4",children:[(0,t.jsx)(u,{label:"Options",items:d,log:e,setLog:o}),(0,t.jsx)(u,{label:"Sort",items:[{label:"Sort by Name"},{label:"Sort by Date modified"},{label:"Sort by Status"},{type:"separator"},{label:"Ascending"},{label:"Descending"}],log:e,setLog:o}),(0,t.jsx)("div",{className:"relative inline-flex",children:(0,t.jsx)(u,{label:"",items:d,align:"end",log:e,setLog:o})})]}),e.length>0&&(0,t.jsx)("div",{className:"mt-2 space-y-0.5 px-1",children:e.map((e,r)=>(0,t.jsx)("p",{className:"text-[11px] font-mono text-[rgb(var(--text-tertiary))]",children:e},r))})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Variants"}),(0,t.jsxs)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5",children:["The trigger can be any button style — text label with chevron, icon-only, or a split button action area. The panel aligns to the trigger edge via the ",(0,t.jsx)("code",{className:"font-mono text-[13px] text-[rgb(var(--accent))]",children:"align"})," prop."]}),(0,t.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden",children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:["Variant","Use when"].map(e=>(0,t.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:e},e))})}),(0,t.jsx)("tbody",{children:[{variant:"Label + chevron",use:"Primary action area with a visible text label (Sort, Filter, Options)"},{variant:"Icon-only (⋯)",use:"Compact row actions where space is limited — pair with aria-label"},{variant:"Split button action",use:"Combined primary action + dropdown for secondary variants"},{variant:"Align: start",use:"Default — panel left-edge aligns with trigger left-edge"},{variant:"Align: end",use:"Panel right-edge aligns with trigger right-edge — use for right-side toolbars"}].map((e,r)=>(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]",children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap",children:e.variant}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.use})]},r))})]})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Anatomy"}),(0,t.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden",children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:["Element","Spec"].map(e=>(0,t.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:e},e))})}),(0,t.jsx)("tbody",{children:[{el:"Panel surface",spec:"blur(20px) saturate(160%), --surface at 92% opacity, --shadow-sheet, 1px border"},{el:"Specular top edge",spec:"1px gradient line: transparent → white/15% → transparent"},{el:"Action item",spec:"13px, py-1.5, px-3, hover: --surface-raised. Optional leading icon (16px, 60% opacity) and trailing kbd shortcut"},{el:"Destructive item",spec:"--status-danger text, hover: --status-danger/10% background. Always last, always after a separator"},{el:"Separator",spec:"1px --border-subtle, my-1 vertical margin, role='separator'"},{el:"Min width",spec:"180px — grows to fit the longest item"},{el:"Offset from trigger",spec:"6px gap (mt-1.5 / mb-1.5)"},{el:"Border radius",spec:"--radius-md (10px)"}].map((e,r)=>(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]",children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap",children:e.el}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.spec})]},r))})]})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Dropdown vs Context Menu"}),(0,t.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden",children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:["","Dropdown Menu","Context Menu"].map(e=>(0,t.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:e},e))})}),(0,t.jsx)("tbody",{children:[{prop:"Trigger",dm:"Explicit button click",cm:"Right-click / long-press"},{prop:"Discovery",dm:"Always visible (button label or ⋯)",cm:"Hidden — user must know to right-click"},{prop:"Position",dm:"Anchored to the trigger element",cm:"Floats at cursor position"},{prop:"Best for",dm:"Toolbars, row actions, filter menus",cm:"Canvas items, list rows, text selections"}].map((e,r)=>(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]",children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap",children:e.prop}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.dm}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.cm})]},r))})]})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Implementation"}),(0,t.jsx)(s.PlatformTabs,{code:m})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5",children:"Props"}),(0,t.jsx)(a.PropsTable,{props:b})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Accessibility"}),(0,t.jsx)("ul",{className:"space-y-2 text-[14px] text-[rgb(var(--text-secondary))]",children:["Set aria-haspopup='menu' and aria-expanded on the trigger button. Update aria-expanded when the panel opens and closes.","Set role='menu' on the panel and role='menuitem' on each action. The panel must not be focusable itself.","Arrow keys (↑ ↓) navigate items; Enter / Space activates; Escape closes and returns focus to trigger.","For icon-only triggers, provide aria-label describing the menu purpose (e.g. 'Row actions', 'Sort options').","Destructive items should always be last and separated by a divider so they are not accidentally activated.","Disabled items use aria-disabled='true' and pointer-events-none — they remain in the tab order but do not execute."].map(e=>(0,t.jsxs)("li",{className:"flex gap-2",children:[(0,t.jsx)("span",{className:"text-[rgb(var(--accent))] mt-0.5",children:"→"}),e]},e))})]})]})}],26583)}]);