import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";

export const metadata: Metadata = { title: "Keyboard Shortcuts" };

const P = {
  surface:  "#0d0d11",
  raised:   "#14141a",
  border:   "#262630",
  text:     "#f2f2f6",
  subtle:   "#9b9baa",
  tertiary: "#646473",
  accent:   "#60a5fa",
  green:    "#34a865",
  amber:    "#f59e0b",
  purple:   "#c084fc",
  red:      "#f87171",
};

// ── Keyboard Chord diagram ────────────────────────────────────────────────────

function KeyboardDiagram() {
  const W = 560, H = 180;

  type Chord = { keys: string[]; label: string; x: number; y: number; color: string };

  const chords: Chord[] = [
    { keys: ["⌘", "K"],       label: "Command palette",   x: 30,  y: 30,  color: P.accent },
    { keys: ["⌘", "Z"],       label: "Undo",              x: 200, y: 30,  color: P.subtle },
    { keys: ["⌘", "⇧", "Z"], label: "Redo",              x: 370, y: 30,  color: P.subtle },
    { keys: ["⌘", "S"],       label: "Save",              x: 30,  y: 105, color: P.green },
    { keys: ["⌘", "⇧", "P"], label: "Quick actions",     x: 200, y: 105, color: P.purple },
    { keys: ["⌘", "/"],       label: "Toggle sidebar",    x: 370, y: 105, color: P.amber },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      <rect width={W} height={H} fill={P.surface} rx={12} />

      {chords.map(({ keys, label, x, y, color }) => {
        const keyW = 28, keyH = 28, gap = 4;
        const totalW = keys.length * keyW + (keys.length - 1) * gap;
        return (
          <g key={label}>
            {keys.map((k, i) => (
              <g key={i}>
                <rect
                  x={x + i * (keyW + gap)}
                  y={y}
                  width={keyW}
                  height={keyH}
                  rx={5}
                  fill={P.raised}
                  stroke={P.border}
                  strokeWidth={1}
                />
                {/* Key cap shadow at bottom */}
                <rect
                  x={x + i * (keyW + gap)}
                  y={y + keyH - 3}
                  width={keyW}
                  height={3}
                  rx={2}
                  fill="rgba(0,0,0,0.4)"
                />
                <text
                  x={x + i * (keyW + gap) + keyW / 2}
                  y={y + keyH / 2 + 4}
                  fontSize={12}
                  fill={color}
                  textAnchor="middle"
                  fontWeight={600}
                  fontFamily="monospace"
                >
                  {k}
                </text>
              </g>
            ))}
            <text
              x={x + totalW / 2}
              y={y + keyH + 18}
              fontSize={10}
              fill={P.subtle}
              textAnchor="middle"
              fontWeight={500}
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Context Menu diagram ──────────────────────────────────────────────────────

function ContextMenuDiagram() {
  const W = 560, H = 220;

  const items = [
    { label: "Open",          shortcut: "↵",      color: P.text,   dividerAfter: false },
    { label: "Open in Tab",   shortcut: "⌘↵",     color: P.text,   dividerAfter: true  },
    { label: "Cut",           shortcut: "⌘X",     color: P.text,   dividerAfter: false },
    { label: "Copy",          shortcut: "⌘C",     color: P.text,   dividerAfter: false },
    { label: "Paste",         shortcut: "⌘V",     color: P.text,   dividerAfter: true  },
    { label: "Move to Trash", shortcut: "⌘⌫",     color: P.red,    dividerAfter: false },
  ];

  const menuX = 160, menuY = 16, menuW = 240, rowH = 28, pad = 12;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      <rect width={W} height={H} fill={P.surface} rx={12} />

      {/* Target element being right-clicked */}
      <rect x={30} y={60} width={110} height={80} rx={8} fill={P.raised} stroke={P.accent} strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={85} y={105} fontSize={10} fill={P.subtle} textAnchor="middle">Right-click target</text>

      {/* Context menu shadow */}
      <rect x={menuX + 4} y={menuY + 6} width={menuW} height={items.length * rowH + 2 * pad + 3} rx={10} fill="rgba(0,0,0,0.5)" />

      {/* Context menu panel */}
      <rect
        x={menuX}
        y={menuY}
        width={menuW}
        height={items.length * rowH + 2 * pad + 3}
        rx={10}
        fill={P.raised}
        stroke={P.border}
        strokeWidth={1}
      />

      {/* Menu items */}
      {items.map((item, i) => {
        const itemY = menuY + pad + i * rowH;
        const isHovered = i === 2;
        return (
          <g key={item.label}>
            {isHovered && (
              <rect x={menuX + 4} y={itemY - 2} width={menuW - 8} height={rowH - 2} rx={6} fill={P.accent} opacity={0.15} />
            )}
            <text
              x={menuX + 14}
              y={itemY + 16}
              fontSize={12}
              fill={isHovered ? P.accent : item.color}
              fontWeight={isHovered ? 600 : 500}
            >
              {item.label}
            </text>
            <text
              x={menuX + menuW - 14}
              y={itemY + 16}
              fontSize={10}
              fill={isHovered ? P.accent : P.tertiary}
              textAnchor="end"
              fontFamily="monospace"
            >
              {item.shortcut}
            </text>
            {item.dividerAfter && (
              <line
                x1={menuX + 10}
                y1={itemY + rowH + 1}
                x2={menuX + menuW - 10}
                y2={itemY + rowH + 1}
                stroke={P.border}
                strokeWidth={1}
              />
            )}
          </g>
        );
      })}

      {/* Labels */}
      <text x={85} y={155} fontSize={9} fill={P.tertiary} textAnchor="middle" letterSpacing={0.5} fontWeight={600}>TARGET ELEMENT</text>
      <text x={menuX + menuW / 2} y={H - 10} fontSize={9} fill={P.tertiary} textAnchor="middle" letterSpacing={0.5} fontWeight={600}>CONTEXT MENU</text>
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const GLOBAL_SHORTCUTS = [
  { chord: "⌘K",    scope: "Global",    action: "Open command palette" },
  { chord: "⌘/",    scope: "Global",    action: "Toggle sidebar" },
  { chord: "⌘⇧P",  scope: "Global",    action: "Quick actions menu" },
  { chord: "⌘,",    scope: "Global",    action: "Open Preferences" },
  { chord: "⌘W",    scope: "Global",    action: "Close current panel" },
  { chord: "⌘Z",    scope: "Editing",   action: "Undo last action" },
  { chord: "⌘⇧Z",  scope: "Editing",   action: "Redo" },
  { chord: "⌘S",    scope: "Editing",   action: "Save / commit changes" },
  { chord: "⌘A",    scope: "Selection", action: "Select all" },
  { chord: "⌘⇧A",  scope: "Selection", action: "Deselect all" },
  { chord: "↵",     scope: "List",      action: "Open / confirm focused item" },
  { chord: "⌘↵",   scope: "List",      action: "Open in new tab / secondary view" },
  { chord: "⌫",     scope: "List",      action: "Delete focused item" },
  { chord: "↑ / ↓", scope: "List",      action: "Move focus through list" },
  { chord: "Esc",   scope: "Global",    action: "Dismiss overlay / cancel" },
];

const CONTEXT_MENU_RULES = [
  { rule: "Triggered by", detail: "Right-click (mouse), long-press (touch ≥ 500ms), or ⌘⌥Space / platform equivalent (keyboard)." },
  { rule: "Scope",        detail: "Items must be contextually relevant to the focused or hovered element. Don't include global actions." },
  { rule: "Order",        detail: "Open / primary action first. Destructive actions last, separated by a divider." },
  { rule: "Shortcuts",    detail: "Show the keyboard shortcut for every action that has one. Right-align in monospace." },
  { rule: "Submenus",     detail: "Max one level of nesting. If you need two levels, promote the submenu to a dedicated panel." },
  { rule: "Dismissal",    detail: "Closes on: item selection, click-outside, Esc, window blur, scroll > 8px." },
  { rule: "Width",        detail: "Min 160px, max 280px. Never wider than the viewport; clamp and scroll if items overflow." },
];

const MODIFIER_KEYS = [
  { symbol: "⌘", name: "Command (Cmd)",   windows: "Ctrl",  note: "Primary modifier for most actions" },
  { symbol: "⌥", name: "Option (Alt)",    windows: "Alt",   note: "Alternate or secondary action" },
  { symbol: "⌃", name: "Control (Ctrl)",  windows: "—",     note: "System-level; use sparingly in apps" },
  { symbol: "⇧", name: "Shift",           windows: "Shift", note: "Extends or inverts the action" },
  { symbol: "⌫", name: "Delete (Backspace)", windows: "Del", note: "Destructive — confirm before acting" },
  { symbol: "↵", name: "Return / Enter",  windows: "Enter", note: "Confirm or open primary action" },
  { symbol: "Esc", name: "Escape",        windows: "Esc",   note: "Cancel, dismiss, or go back" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function KeyboardShortcutsPage() {
  const scopeColor: Record<string, string> = {
    Global:    "text-[rgb(var(--accent))]",
    Editing:   "text-[#34a865]",
    Selection: "text-[#c084fc]",
    List:      "text-[#f59e0b]",
  };

  return (
    <div>
      <PageHeader
        title="Keyboard Shortcuts"
        description="Consistent keyboard shortcuts and context-menu patterns across the Sitka product suite — mac-first, with Windows equivalents documented."
      />

      {/* Diagram */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Chord Anatomy
        </h2>
        <div
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: P.surface, padding: "1.5rem" }}
        >
          <KeyboardDiagram />
        </div>
      </section>

      {/* Global shortcut table */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Global Shortcuts</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Every Sitka product must support these chords. Implement them at the application level so
          they work regardless of which panel or element has focus.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Shortcut", "Scope", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GLOBAL_SHORTCUTS.map((row, i) => (
                <tr key={row.chord} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3">
                    <code className="font-mono text-[12px] text-[rgb(var(--accent))]">{row.chord}</code>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${scopeColor[row.scope] ?? ""}`}>{row.scope}</span>
                  </td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modifier key reference */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Modifier Key Reference</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Symbols used throughout this documentation and in the UI. Always display modifiers in order:
          Ctrl → Alt → Shift → Cmd → Key.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Symbol", "Name", "Windows", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODIFIER_KEYS.map((row, i) => (
                <tr key={row.symbol} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3">
                    <code className="font-mono text-[18px] font-bold text-[rgb(var(--text-primary))]">{row.symbol}</code>
                  </td>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.name}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">
                    <code className="font-mono text-[11px]">{row.windows}</code>
                  </td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Context Menus */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Context Menus</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Context menus surface actions relevant to the focused element without consuming toolbar space.
          They are triggered by right-click on desktop and long-press on touch.
        </p>
        <div
          className="rounded-xl overflow-hidden mb-6"
          style={{ backgroundColor: P.surface, padding: "1.5rem" }}
        >
          <ContextMenuDiagram />
        </div>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Rule", "Detail"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CONTEXT_MENU_RULES.map((row, i) => (
                <tr key={row.rule} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))] whitespace-nowrap">{row.rule}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Displaying shortcuts in UI */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Displaying Shortcuts in the UI</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Use the <code className="font-mono text-[13px] text-[rgb(var(--accent))]">&lt;kbd&gt;</code> element for keyboard shortcut labels.
          The design system provides a <code className="font-mono text-[13px] text-[rgb(var(--accent))]">.kbd</code> utility class
          that renders the correct font, size, border, and background for both light and dark themes.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Context", "Placement", "Format"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { context: "Tooltip",       placement: "After label",     format: "⌘K in a <kbd> element" },
                { context: "Menu item",     placement: "Right-aligned",   format: "⌘Z right-aligned in monospace" },
                { context: "Empty state",   placement: "Inline with text", format: '"Press ⌘K to start"' },
                { context: "Onboarding",    placement: "Callout card",    format: "Large key cap illustration + action" },
                { context: "Settings page", placement: "Editable field",  format: "Record + display the full chord" },
              ].map((row, i) => (
                <tr key={row.context} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.context}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.placement}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))] font-mono text-[11px]">{row.format}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Every keyboard shortcut must have a menu or button equivalent — shortcuts are enhancements, not the only path.",
            'Announce shortcut hints to screen readers by placing them inside a visually-hidden <span aria-hidden="false"> after the label.',
            "Never override browser or OS system shortcuts (⌘T, ⌘N, ⌘Q, F5, etc.). Map conflicts to less common chords.",
            "Allow users to discover shortcuts via a searchable shortcut reference accessible from the ⌘K palette.",
            "Respect prefers-reduced-motion — do not tie shortcuts to animated transitions that cannot be disabled.",
            'Context menus triggered by keyboard must set focus to the first item and trap focus within the menu. Esc returns focus to the trigger.',
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
