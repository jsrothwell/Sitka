(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89664,e=>{"use strict";let t=(0,e.i(56420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,t],89664)},8734,e=>{"use strict";let t=(0,e.i(56420).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,t],8734)},61939,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(89664),s=e.i(8734),o=e.i(46932),i=e.i(88653),n=e.i(45060);e.s(["CodeBlock",0,function({code:e,language:l="tsx",filename:d,className:c}){let[p,b]=(0,r.useState)(!1),x=async()=>{await navigator.clipboard.writeText(e.trim()),b(!0),setTimeout(()=>b(!1),2e3)};return(0,t.jsxs)("div",{className:(0,n.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",c),children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex gap-1.5",children:[(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,t.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),d&&(0,t.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:d})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:l}),(0,t.jsx)("button",{onClick:x,className:(0,n.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",p?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,t.jsx)(i.AnimatePresence,{mode:"wait",initial:!1,children:p?(0,t.jsxs)(o.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(a.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,t.jsxs)(o.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,t.jsx)(s.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,t.jsx)("code",{children:e.trim()})})})]})}])},64147,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(46932),s=e.i(61939),o=e.i(45060);let i={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},n={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:l}){let[d,c]=(0,r.useState)("react"),p=["react","html","swift",...e.macos?["macos"]:[]],b=e[d]??e.swift;return(0,t.jsxs)("div",{className:(0,o.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",l),children:[(0,t.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:p.map(e=>(0,t.jsxs)("button",{onClick:()=>c(e),className:(0,o.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",d===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[d===e&&(0,t.jsx)(a.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),i[e]]},e))}),(0,t.jsx)(s.CodeBlock,{code:b.code,language:n[d],filename:b.filename,className:"rounded-none border-0"})]})}])},66794,e=>{"use strict";let t=(0,e.i(56420).default)("settings",[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);e.s(["Settings",0,t],66794)},70812,e=>{"use strict";let t=(0,e.i(56420).default)("bell",[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]]);e.s(["Bell",0,t],70812)},52953,e=>{"use strict";var t=e.i(43476),r=e.i(45060);e.s(["PageHeader",0,function({title:e,description:a,badge:s,className:o}){return(0,t.jsxs)("div",{className:(0,r.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",o),children:[s&&(0,t.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,t.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),s]}),(0,t.jsx)("h1",{className:"mb-2.5",children:e}),(0,t.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:a})]})}])},32610,e=>{"use strict";var t=e.i(43476),r=e.i(45060);e.s(["PropsTable",0,function({props:e,className:a}){return(0,t.jsx)("div",{className:(0,r.cn)("overflow-hidden rounded-xl border border-[rgb(var(--border))]",a),children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:["Prop","Type","Default","Description"].map(e=>(0,t.jsx)("th",{className:"px-4 py-3 text-left font-semibold text-[rgb(var(--text-tertiary))] text-[11px] uppercase tracking-wider",children:e},e))})}),(0,t.jsx)("tbody",{children:e.map((e,a)=>(0,t.jsxs)("tr",{className:(0,r.cn)("border-b border-[rgb(var(--border-subtle))] last:border-0",a%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"),children:[(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsxs)("code",{className:"text-[rgb(var(--accent))] font-mono text-[12px]",children:[e.name,e.required&&(0,t.jsx)("span",{className:"text-red-400 ml-0.5",children:"*"})]})}),(0,t.jsx)("td",{className:"px-4 py-3",children:(0,t.jsx)("code",{className:"text-[rgb(var(--text-secondary))] font-mono text-[11px] bg-[rgb(var(--surface-raised))] px-1.5 py-0.5 rounded",children:e.type})}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-tertiary))]",children:e.default?(0,t.jsx)("code",{className:"font-mono text-[11px]",children:e.default}):(0,t.jsx)("span",{className:"opacity-40",children:"—"})}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))] leading-relaxed",children:e.description})]},e.name))})]})})}])},96787,e=>{"use strict";var t=e.i(43476),r=e.i(52953),a=e.i(32610),s=e.i(64147),o=e.i(71645),i=e.i(66794),n=e.i(70812);let l=(0,e.i(56420).default)("funnel",[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]]);var d=e.i(63676);let c=[{name:"content",type:"ReactNode",description:"Rich content rendered inside the popover panel. Can include any React node — forms, settings, previews."},{name:"trigger",type:"ReactNode",description:"The trigger element. Rendered as a button that toggles the popover on click."},{name:"side",type:'"top" | "bottom" | "left" | "right"',default:'"bottom"',description:"Preferred placement relative to the trigger. Flips automatically if it would overflow the viewport."},{name:"align",type:'"start" | "center" | "end"',default:'"start"',description:"Horizontal alignment of the panel relative to the trigger."},{name:"width",type:"number | string",default:"320",description:"Panel width in pixels, or any CSS width value."},{name:"onOpenChange",type:"(open: boolean) => void",description:"Called when the popover opens or closes."}],p={react:{filename:"Popover.tsx",code:`"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";

interface PopoverProps {
  content: React.ReactNode;
  trigger: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  width?: number | string;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({
  content,
  trigger,
  side = "bottom",
  align = "start",
  width = 320,
  onOpenChange,
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    onOpenChange?.(next);
  };

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

  const verticalClass =
    side === "top"   ? "bottom-full mb-2" :
    side === "left"  ? "right-full mr-2 top-0" :
    side === "right" ? "left-full ml-2 top-0"  :
                       "top-full mt-2";

  const alignClass =
    align === "end"    ? "right-0" :
    align === "center" ? "left-1/2 -translate-x-1/2" :
                         "left-0";

  return (
    <div className="relative inline-flex">
      <button ref={triggerRef} onClick={toggle} aria-expanded={open} aria-haspopup="dialog">
        {trigger}
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          className={cn("absolute z-50 rounded-[var(--radius-lg)] border border-[rgb(var(--border))] overflow-hidden", verticalClass, alignClass)}
          style={{
            width,
            background: "rgb(var(--surface) / 0.94)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            boxShadow: "var(--shadow-sheet), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
          {content}
        </div>
      )}
    </div>
  );
}`},html:{filename:"popover.html",code:`<!-- Popover — HTML + vanilla JS implementation -->

<div class="popover-wrap">
  <button class="btn" id="pop-trigger" aria-expanded="false" aria-haspopup="dialog">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
    Settings
  </button>

  <div class="popover-panel" id="pop-panel" role="dialog" aria-modal="false" aria-hidden="true">
    <div class="pop-specular"></div>
    <div class="pop-header">
      <span class="pop-title">Notification settings</span>
      <button class="pop-close" id="pop-close" aria-label="Close">✕</button>
    </div>
    <div class="pop-body">
      <label class="pop-row">
        <span class="pop-label">Email digests</span>
        <input type="checkbox" checked>
      </label>
      <label class="pop-row">
        <span class="pop-label">Push notifications</span>
        <input type="checkbox">
      </label>
      <label class="pop-row">
        <span class="pop-label">Weekly summary</span>
        <input type="checkbox" checked>
      </label>
    </div>
    <div class="pop-footer">
      <button class="btn btn-primary btn-sm">Save changes</button>
    </div>
  </div>
</div>

<script>
const trigger = document.getElementById("pop-trigger");
const panel   = document.getElementById("pop-panel");
const closeBtn = document.getElementById("pop-close");
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
  trigger.focus();
}

trigger.addEventListener("click", () => isOpen ? close() : open());
closeBtn.addEventListener("click", close);
document.addEventListener("mousedown", (e) => {
  if (!panel.contains(e.target) && e.target !== trigger) close();
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
</script>

<style>
  .popover-wrap {
    position: relative;
    display: inline-flex;
  }
  .popover-panel {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 9999;
    width: 320px;
    border-radius: 14px;
    border: 1px solid rgb(var(--border));
    background: rgb(var(--surface) / 0.94);
    backdrop-filter: blur(24px) saturate(160%);
    -webkit-backdrop-filter: blur(24px) saturate(160%);
    box-shadow: var(--shadow-sheet), inset 0 1px 0 rgba(255,255,255,0.08);
    overflow: hidden;
  }
  .pop-specular {
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    pointer-events: none;
  }
  .pop-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px 10px;
    border-bottom: 1px solid rgb(var(--border-subtle));
  }
  .pop-title { font-size: 13px; font-weight: 600; color: rgb(var(--text-primary)); }
  .pop-close  { background: none; border: none; font-size: 14px; color: rgb(var(--text-tertiary)); cursor: pointer; padding: 2px 4px; }
  .pop-body   { padding: 12px 16px; display: flex; flex-direction: column; gap: 10px; }
  .pop-row    { display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
  .pop-label  { font-size: 13px; color: rgb(var(--text-primary)); }
  .pop-footer { padding: 10px 16px 14px; border-top: 1px solid rgb(var(--border-subtle)); display: flex; justify-content: flex-end; }
</style>`},swift:{filename:"SitkaPopover.swift",code:`import SwiftUI

// On iOS 16+, use the native .popover modifier.
// It adapts to a bottom sheet on compact size classes automatically.

struct FilterPopover: View {
    @State private var showPopover = false
    @State private var minPrice = 0.0
    @State private var maxPrice = 500.0
    @State private var inStockOnly = false

    var body: some View {
        Button {
            showPopover.toggle()
        } label: {
            Label("Filter", systemImage: "line.3.horizontal.decrease.circle")
        }
        .popover(isPresented: $showPopover, arrowEdge: .top) {
            VStack(alignment: .leading, spacing: 0) {
                // Header
                HStack {
                    Text("Filters")
                        .font(.system(size: 15, weight: .semibold))
                    Spacer()
                    Button("Done") { showPopover = false }
                        .font(.system(size: 14, weight: .medium))
                        .foregroundColor(.accentColor)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)

                Divider()

                // Body
                VStack(alignment: .leading, spacing: 16) {
                    Toggle("In stock only", isOn: $inStockOnly)
                        .font(.system(size: 14))

                    VStack(alignment: .leading, spacing: 6) {
                        Text("Price range")
                            .font(.system(size: 12, weight: .medium))
                            .foregroundStyle(.secondary)
                        HStack {
                            Text("\\(Int(minPrice))").font(.system(size: 13))
                            Slider(value: $minPrice, in: 0...maxPrice)
                        }
                        HStack {
                            Text("\\(Int(maxPrice))").font(.system(size: 13))
                            Slider(value: $maxPrice, in: minPrice...1000)
                        }
                    }
                }
                .padding(16)

                Divider()

                // Footer
                Button("Apply filters") { showPopover = false }
                    .buttonStyle(.borderedProminent)
                    .frame(maxWidth: .infinity)
                    .padding(14)
            }
            .frame(width: 320)
            .presentationCompactAdaptation(.popover)
        }
    }
}

#Preview {
    FilterPopover()
        .padding()
}`},macos:{filename:"SitkaPopover+macOS.swift",code:`import SwiftUI

// macOS — popovers always render as floating panels.
// Use .popover modifier; arrowEdge controls which side the arrow points from.

struct ColumnSettingsPopover: View {
    @State private var showPopover = false
    @State private var showName    = true
    @State private var showDate    = true
    @State private var showStatus  = true
    @State private var showOwner   = false

    var body: some View {
        Button {
            showPopover.toggle()
        } label: {
            Image(systemName: "tablecells")
        }
        .help("Column settings")
        .popover(isPresented: $showPopover, arrowEdge: .top) {
            VStack(alignment: .leading, spacing: 0) {
                Text("Visible columns")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundStyle(.secondary)
                    .padding(.horizontal, 14)
                    .padding(.top, 14)
                    .padding(.bottom, 8)

                Divider()

                VStack(spacing: 0) {
                    ForEach([
                        ("Name",   $showName),
                        ("Date",   $showDate),
                        ("Status", $showStatus),
                        ("Owner",  $showOwner),
                    ], id: \\.0) { label, binding in
                        Toggle(label, isOn: binding)
                            .font(.system(size: 13))
                            .padding(.horizontal, 14)
                            .padding(.vertical, 7)
                        Divider().padding(.leading, 14)
                    }
                }
            }
            .frame(width: 220)
        }
    }
}

#Preview {
    ColumnSettingsPopover()
        .padding()
        .frame(width: 400, height: 300)
}`}};function b({triggerLabel:e,triggerIcon:r,title:a,children:s,width:i=300}){let[n,l]=(0,o.useState)(!1),c=(0,o.useRef)(null),p=(0,o.useRef)(null);return(0,o.useEffect)(()=>{if(!n)return;let e=e=>{(!(e instanceof KeyboardEvent)||"Escape"===e.key)&&(e instanceof MouseEvent&&(c.current?.contains(e.target)||p.current?.contains(e.target))||l(!1))};return document.addEventListener("mousedown",e),document.addEventListener("keydown",e),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("keydown",e)}},[n]),(0,t.jsxs)("div",{className:"relative inline-flex",children:[(0,t.jsxs)("button",{ref:c,onClick:()=>l(e=>!e),"aria-expanded":n,"aria-haspopup":"dialog",className:"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] text-[13px] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))] transition-colors",children:[r,e]}),n&&(0,t.jsxs)("div",{ref:p,role:"dialog","aria-modal":"false",className:"absolute z-50 top-full mt-2 left-0 rounded-[var(--radius-lg)] border border-[rgb(var(--border))] overflow-hidden",style:{width:i,background:"rgb(var(--surface) / 0.94)",backdropFilter:"blur(24px) saturate(160%)",WebkitBackdropFilter:"blur(24px) saturate(160%)",boxShadow:"var(--shadow-sheet), inset 0 1px 0 rgba(255,255,255,0.08)"},children:[(0,t.jsx)("div",{className:"absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"}),(0,t.jsxs)("div",{className:"flex items-center justify-between px-4 py-3 border-b border-[rgb(var(--border-subtle))]",children:[(0,t.jsx)("span",{className:"text-[13px] font-semibold text-[rgb(var(--text-primary))]",children:a}),(0,t.jsx)("button",{onClick:()=>l(!1),"aria-label":"Close",className:"p-0.5 rounded text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] transition-colors",children:(0,t.jsx)(d.X,{size:14})})]}),s]})]})}e.s(["default",0,function(){let[e,d]=(0,o.useState)(!0),[x,g]=(0,o.useState)(!1),[m,u]=(0,o.useState)(!0),[v,h]=(0,o.useState)(!0),[f,y]=(0,o.useState)(!0),[w,j]=(0,o.useState)(!0),[N,k]=(0,o.useState)(!1);return(0,t.jsxs)("div",{children:[(0,t.jsx)(r.PageHeader,{title:"Popover",description:"A button-anchored floating panel for rich content — forms, settings, previews, and pickers. Unlike a Tooltip, a Popover is interactive and is triggered by click, not hover."}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4",children:"Preview"}),(0,t.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-8 flex flex-wrap items-start gap-4",children:[(0,t.jsxs)(b,{triggerLabel:"Notifications",triggerIcon:(0,t.jsx)(n.Bell,{size:14,className:"opacity-60"}),title:"Notification settings",width:280,children:[(0,t.jsx)("div",{className:"px-4 py-3 space-y-3",children:[{label:"Email digests",value:e,set:d},{label:"Push notifications",value:x,set:g},{label:"Weekly summary",value:m,set:u}].map(({label:e,value:r,set:a})=>(0,t.jsxs)("label",{className:"flex items-center justify-between cursor-pointer",children:[(0,t.jsx)("span",{className:"text-[13px] text-[rgb(var(--text-primary))]",children:e}),(0,t.jsx)("button",{onClick:()=>a(e=>!e),className:`relative w-9 h-5 rounded-full transition-colors duration-200 ${r?"bg-[rgb(var(--accent))]":"bg-[rgb(var(--border))]"}`,children:(0,t.jsx)("span",{className:`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${r?"translate-x-4":""}`})})]},e))}),(0,t.jsx)("div",{className:"px-4 py-3 border-t border-[rgb(var(--border-subtle))] flex justify-end",children:(0,t.jsx)("button",{className:"px-3 py-1.5 rounded-[var(--radius-sm)] bg-[rgb(var(--accent))] text-white text-[12px] font-medium hover:opacity-90 transition-opacity",children:"Save"})})]}),(0,t.jsx)(b,{triggerLabel:"Columns",triggerIcon:(0,t.jsx)(l,{size:14,className:"opacity-60"}),title:"Visible columns",width:240,children:(0,t.jsx)("div",{className:"py-1",children:[{label:"Name",value:v,set:h},{label:"Date modified",value:f,set:y},{label:"Status",value:w,set:j},{label:"Owner",value:N,set:k}].map(({label:e,value:r,set:a},s,o)=>(0,t.jsxs)("label",{className:`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[rgb(var(--surface-raised))] transition-colors ${s<o.length-1?"border-b border-[rgb(var(--border-subtle))]":""}`,children:[(0,t.jsx)("span",{className:"text-[13px] text-[rgb(var(--text-primary))]",children:e}),(0,t.jsx)("div",{className:`w-3.5 h-3.5 rounded border flex items-center justify-center ${r?"bg-[rgb(var(--accent))] border-[rgb(var(--accent))]":"border-[rgb(var(--border))]"}`,onClick:()=>a(e=>!e),children:r&&(0,t.jsx)("svg",{width:"8",height:"6",viewBox:"0 0 8 6",fill:"none",children:(0,t.jsx)("path",{d:"M1 3L3 5L7 1",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]},e))})}),(0,t.jsxs)(b,{triggerLabel:"Settings",triggerIcon:(0,t.jsx)(i.Settings,{size:14,className:"opacity-60"}),title:"Workspace settings",width:300,children:[(0,t.jsxs)("div",{className:"px-4 py-3 space-y-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-1.5",children:"Display name"}),(0,t.jsx)("input",{type:"text",defaultValue:"Sitka Design System",className:"w-full px-3 py-1.5 rounded-[var(--radius-sm)] border border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[13px] text-[rgb(var(--text-primary))] outline-none focus:border-[rgb(var(--accent))] transition-colors"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-1.5",children:"Language"}),(0,t.jsxs)("select",{className:"w-full px-3 py-1.5 rounded-[var(--radius-sm)] border border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[13px] text-[rgb(var(--text-primary))] outline-none",children:[(0,t.jsx)("option",{children:"English"}),(0,t.jsx)("option",{children:"French"}),(0,t.jsx)("option",{children:"German"})]})]})]}),(0,t.jsxs)("div",{className:"px-4 py-3 border-t border-[rgb(var(--border-subtle))] flex justify-end gap-2",children:[(0,t.jsx)("button",{className:"px-3 py-1.5 rounded-[var(--radius-sm)] border border-[rgb(var(--border))] text-[12px] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] transition-colors",children:"Cancel"}),(0,t.jsx)("button",{className:"px-3 py-1.5 rounded-[var(--radius-sm)] bg-[rgb(var(--accent))] text-white text-[12px] font-medium hover:opacity-90 transition-opacity",children:"Save"})]})]})]})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"When to use"}),(0,t.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden",children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:["Component","Trigger","Content","Blocking"].map(e=>(0,t.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:e},e))})}),(0,t.jsx)("tbody",{children:[{comp:"Popover",trigger:"Click",content:"Rich interactive content",blocking:"No"},{comp:"Tooltip",trigger:"Hover / focus",content:"Short supplementary label",blocking:"No"},{comp:"Dropdown Menu",trigger:"Click",content:"List of commands/actions",blocking:"No"},{comp:"Modal",trigger:"Explicit action",content:"Critical task requiring full attention",blocking:"Yes"}].map((e,r)=>(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]",children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:e.comp}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.trigger}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.content}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.blocking})]},r))})]})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Anatomy"}),(0,t.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden",children:(0,t.jsxs)("table",{className:"w-full text-[13px]",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:["Element","Spec"].map(e=>(0,t.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:e},e))})}),(0,t.jsx)("tbody",{children:[{el:"Panel surface",spec:"blur(24px) saturate(160%), --surface at 94% opacity, --shadow-sheet, 1px border"},{el:"Specular top edge",spec:"1px gradient line: transparent → white/15% → transparent"},{el:"Header",spec:"13px semibold title, close button (X), border-bottom: --border-subtle, px-4 py-3"},{el:"Body",spec:"px-4 py-3, content area — forms, toggles, pickers, text"},{el:"Footer (optional)",spec:"border-top: --border-subtle, px-4 py-3, flex justify-end, action buttons"},{el:"Width",spec:"240–400px depending on content. Fixed width, not full-screen on desktop"},{el:"Offset from trigger",spec:"8px gap (mt-2 / mb-2)"},{el:"Border radius",spec:"--radius-lg (14px)"}].map((e,r)=>(0,t.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]",children:[(0,t.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap",children:e.el}),(0,t.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.spec})]},r))})]})})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Implementation"}),(0,t.jsx)(s.PlatformTabs,{code:p})]}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5",children:"Props"}),(0,t.jsx)(a.PropsTable,{props:c})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Accessibility"}),(0,t.jsx)("ul",{className:"space-y-2 text-[14px] text-[rgb(var(--text-secondary))]",children:["Set aria-haspopup='dialog' and aria-expanded on the trigger. Update aria-expanded when the panel opens and closes.","Set role='dialog' and aria-modal='false' on the panel. A popover is non-modal — the user can still interact with the page behind it.","Escape always closes the panel and returns focus to the trigger button.","Move focus into the panel on open — focus the first interactive element (input, toggle, close button).","Trap focus inside the panel only when aria-modal='true' (full modal behavior). For non-modal popovers, allow Tab to leave the panel naturally.","Provide a visible close button (×) for users who cannot press Escape.","Never put content required to complete a task inside a popover — use a Modal for blocking, critical flows."].map(e=>(0,t.jsxs)("li",{className:"flex gap-2",children:[(0,t.jsx)("span",{className:"text-[rgb(var(--accent))] mt-0.5",children:"→"}),e]},e))})]})]})}],96787)}]);