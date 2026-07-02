"use client";

import { PageHeader } from "@/site/docs/PageHeader";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { useState, useRef, useEffect } from "react";
import { Settings, Bell, Filter, X } from "lucide-react";

const PROPS = [
  {
    name: "content",
    type: "ReactNode",
    description: "Rich content rendered inside the popover panel. Can include any React node — forms, settings, previews.",
  },
  {
    name: "trigger",
    type: "ReactNode",
    description: "The trigger element. Rendered as a button that toggles the popover on click.",
  },
  {
    name: "side",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"bottom"',
    description: "Preferred placement relative to the trigger. Flips automatically if it would overflow the viewport.",
  },
  {
    name: "align",
    type: '"start" | "center" | "end"',
    default: '"start"',
    description: "Horizontal alignment of the panel relative to the trigger.",
  },
  {
    name: "width",
    type: "number | string",
    default: "320",
    description: "Panel width in pixels, or any CSS width value.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the popover opens or closes.",
  },
];

const CODE = {
  react: {
    filename: "Popover.tsx",
    code: `"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib";

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
}`,
  },
  html: {
    filename: "popover.html",
    code: `<!-- Popover — HTML + vanilla JS implementation -->

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
</style>`,
  },
  swift: {
    filename: "SitkaPopover.swift",
    code: `import SwiftUI

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
}`,
  },
  macos: {
    filename: "SitkaPopover+macOS.swift",
    code: `import SwiftUI

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
}`,
  },
};

function DemoPopover({
  triggerLabel,
  triggerIcon,
  title,
  children,
  width = 300,
}: {
  triggerLabel: string;
  triggerIcon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  width?: number;
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
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] text-[13px] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))] transition-colors"
      >
        {triggerIcon}
        {triggerLabel}
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          className="absolute z-50 top-full mt-2 left-0 rounded-[var(--radius-lg)] border border-[rgb(var(--border))] overflow-hidden"
          style={{
            width,
            background: "rgb(var(--surface) / 0.94)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            boxShadow: "var(--shadow-sheet), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgb(var(--border-subtle))]">
            <span className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{title}</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="p-0.5 rounded text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}

export default function PopoverPage() {
  const [emailDigests, setEmailDigests] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);

  const [showName, setShowName] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [showStatus, setShowStatus] = useState(true);
  const [showOwner, setShowOwner] = useState(false);

  return (
    <div>
      <PageHeader
        title="Popover"
        description="A button-anchored floating panel for rich content — forms, settings, previews, and pickers. Unlike a Tooltip, a Popover is interactive and is triggered by click, not hover."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Preview</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-8 flex flex-wrap items-start gap-4">
          <DemoPopover triggerLabel="Notifications" triggerIcon={<Bell size={14} className="opacity-60" />} title="Notification settings" width={280}>
            <div className="px-4 py-3 space-y-3">
              {[
                { label: "Email digests", value: emailDigests, set: setEmailDigests },
                { label: "Push notifications", value: pushNotif, set: setPushNotif },
                { label: "Weekly summary", value: weeklySummary, set: setWeeklySummary },
              ].map(({ label, value, set }) => (
                <label key={label} className="flex items-center justify-between cursor-pointer">
                  <span className="text-[13px] text-[rgb(var(--text-primary))]">{label}</span>
                  <button
                    onClick={() => set((v) => !v)}
                    className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${value ? "bg-[rgb(var(--accent))]" : "bg-[rgb(var(--border))]"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${value ? "translate-x-4" : ""}`} />
                  </button>
                </label>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-[rgb(var(--border-subtle))] flex justify-end">
              <button className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-[rgb(var(--accent))] text-white text-[12px] font-medium hover:opacity-90 transition-opacity">
                Save
              </button>
            </div>
          </DemoPopover>

          <DemoPopover triggerLabel="Columns" triggerIcon={<Filter size={14} className="opacity-60" />} title="Visible columns" width={240}>
            <div className="py-1">
              {[
                { label: "Name", value: showName, set: setShowName },
                { label: "Date modified", value: showDate, set: setShowDate },
                { label: "Status", value: showStatus, set: setShowStatus },
                { label: "Owner", value: showOwner, set: setShowOwner },
              ].map(({ label, value, set }, i, arr) => (
                <label key={label} className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[rgb(var(--surface-raised))] transition-colors ${i < arr.length - 1 ? "border-b border-[rgb(var(--border-subtle))]" : ""}`}>
                  <span className="text-[13px] text-[rgb(var(--text-primary))]">{label}</span>
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${value ? "bg-[rgb(var(--accent))] border-[rgb(var(--accent))]" : "border-[rgb(var(--border))]"}`}
                    onClick={() => set((v) => !v)}>
                    {value && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </label>
              ))}
            </div>
          </DemoPopover>

          <DemoPopover triggerLabel="Settings" triggerIcon={<Settings size={14} className="opacity-60" />} title="Workspace settings" width={300}>
            <div className="px-4 py-3 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-1.5">Display name</label>
                <input
                  type="text"
                  defaultValue="Sitka Design System"
                  className="w-full px-3 py-1.5 rounded-[var(--radius-sm)] border border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[13px] text-[rgb(var(--text-primary))] outline-none focus:border-[rgb(var(--accent))] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-1.5">Language</label>
                <select className="w-full px-3 py-1.5 rounded-[var(--radius-sm)] border border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[13px] text-[rgb(var(--text-primary))] outline-none">
                  <option>English</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-[rgb(var(--border-subtle))] flex justify-end gap-2">
              <button className="px-3 py-1.5 rounded-[var(--radius-sm)] border border-[rgb(var(--border))] text-[12px] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] transition-colors">Cancel</button>
              <button className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-[rgb(var(--accent))] text-white text-[12px] font-medium hover:opacity-90 transition-opacity">Save</button>
            </div>
          </DemoPopover>
        </div>
      </section>

      {/* Popover vs Tooltip vs Modal */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">When to use</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Component", "Trigger", "Content", "Blocking"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { comp: "Popover", trigger: "Click", content: "Rich interactive content", blocking: "No" },
                { comp: "Tooltip", trigger: "Hover / focus", content: "Short supplementary label", blocking: "No" },
                { comp: "Dropdown Menu", trigger: "Click", content: "List of commands/actions", blocking: "No" },
                { comp: "Modal", trigger: "Explicit action", content: "Critical task requiring full attention", blocking: "Yes" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.comp}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.trigger}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.content}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.blocking}</td>
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
                { el: "Panel surface", spec: "blur(24px) saturate(160%), --surface at 94% opacity, --shadow-sheet, 1px border" },
                { el: "Specular top edge", spec: "1px gradient line: transparent → white/15% → transparent" },
                { el: "Header", spec: "13px semibold title, close button (X), border-bottom: --border-subtle, px-4 py-3" },
                { el: "Body", spec: "px-4 py-3, content area — forms, toggles, pickers, text" },
                { el: "Footer (optional)", spec: "border-top: --border-subtle, px-4 py-3, flex justify-end, action buttons" },
                { el: "Width", spec: "240–400px depending on content. Fixed width, not full-screen on desktop" },
                { el: "Offset from trigger", spec: "8px gap (mt-2 / mb-2)" },
                { el: "Border radius", spec: "--radius-lg (14px)" },
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
            "Set aria-haspopup='dialog' and aria-expanded on the trigger. Update aria-expanded when the panel opens and closes.",
            "Set role='dialog' and aria-modal='false' on the panel. A popover is non-modal — the user can still interact with the page behind it.",
            "Escape always closes the panel and returns focus to the trigger button.",
            "Move focus into the panel on open — focus the first interactive element (input, toggle, close button).",
            "Trap focus inside the panel only when aria-modal='true' (full modal behavior). For non-modal popovers, allow Tab to leave the panel naturally.",
            "Provide a visible close button (×) for users who cannot press Escape.",
            "Never put content required to complete a task inside a popover — use a Modal for blocking, critical flows.",
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
