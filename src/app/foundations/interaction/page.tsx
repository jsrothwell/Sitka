"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";

function HoverDemo() {
  const [hovered, setHovered] = useState<string | null>(null);

  const states = [
    { id: "default", label: "Default", bg: "rgb(var(--surface))", border: "rgb(var(--border))" },
    { id: "hover", label: "Hover", bg: "rgb(var(--surface-hover))", border: "rgb(var(--border))" },
    { id: "active", label: "Active / Pressed", bg: "rgb(var(--surface-raised))", border: "rgb(var(--border))" },
    { id: "focus", label: "Keyboard focus", bg: "rgb(var(--surface))", border: "var(--nav-active-color)", ring: true },
    { id: "disabled", label: "Disabled", bg: "rgb(var(--surface-raised))", border: "rgb(var(--border))", opacity: 0.45 },
  ];

  return (
    <div className="flex flex-col gap-3">
      {states.map(({ id, label, bg, border, ring, opacity }) => (
        <div
          key={id}
          className="flex items-center gap-4 rounded-xl px-4 py-3 border transition-all"
          style={{
            background: bg,
            borderColor: ring ? border : `rgb(var(--border))`,
            boxShadow: ring ? `0 0 0 3px ${border}33` : undefined,
            opacity,
            cursor: id === "disabled" ? "not-allowed" : "default",
          }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: ring ? border : "rgb(var(--text-tertiary))" }}
          />
          <span className="text-[13px] font-medium text-[rgb(var(--text-primary))]">{label}</span>
          <code
            className="ml-auto text-[10px] font-mono text-[rgb(var(--text-tertiary))] bg-[rgb(var(--surface-raised))] px-2 py-0.5 rounded"
          >
            {id}
          </code>
        </div>
      ))}
    </div>
  );
}

function TouchTargetDemo() {
  return (
    <div className="flex flex-wrap items-end gap-8 p-6 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
      {[
        { label: "Too small", size: 28, bad: true },
        { label: "Minimum", size: 44, bad: false },
        { label: "Comfortable", size: 48, bad: false },
      ].map(({ label, size, bad }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <div
            className="rounded-xl flex items-center justify-center text-[11px] font-semibold"
            style={{
              width: size,
              height: size,
              background: bad ? "rgba(239,68,68,0.1)" : "rgba(52,168,101,0.1)",
              border: `1.5px dashed ${bad ? "rgb(239,68,68)" : "rgb(52,168,101)"}`,
              color: bad ? "rgb(220,38,38)" : "rgb(33,150,83)",
            }}
          >
            {size}
          </div>
          <span className="text-[11px] text-[rgb(var(--text-secondary))]">{label}</span>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">{size}px</span>
        </div>
      ))}
    </div>
  );
}

const GESTURE_PATTERNS = [
  { gesture: "Tap", use: "Activate buttons, links, toggles" },
  { gesture: "Long press", use: "Context menus, selection mode on list items" },
  { gesture: "Swipe left", use: "Reveal destructive actions (delete, archive)" },
  { gesture: "Swipe right", use: "Reveal secondary actions (reply, star)" },
  { gesture: "Pull to refresh", use: "Reload content in scrollable lists only" },
  { gesture: "Pinch", use: "Zoom — images and maps only" },
  { gesture: "Drag", use: "Reorder only — avoid for navigation" },
];

const KEYBOARD_PATTERNS = [
  { key: "Tab / Shift+Tab", action: "Move focus forward / backward through interactive elements" },
  { key: "Enter / Space", action: "Activate the focused button or link" },
  { key: "Escape", action: "Close modals, drawers, dropdowns, and popovers" },
  { key: "Arrow keys", action: "Navigate within a component (radio group, tabs, menu)" },
  { key: "Home / End", action: "Jump to first / last item in a list or menu" },
  { key: "Ctrl+K / ⌘K", action: "Open the command palette" },
];

export default function InteractionPage() {
  return (
    <div>
      <PageHeader
        title="Interaction"
        description="Consistent interaction patterns build user confidence. This page defines hover, focus, and active states, touch target sizes, gesture conventions, and keyboard navigation rules."
      />

      {/* Interactive states */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Interactive States</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          Every interactive element must express all five states below. Never suppress hover or focus styles — doing so breaks keyboard navigation and assistive technology.
        </p>
        <HoverDemo />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {[
            { title: "Hover", token: "--surface-hover", desc: "Applied on cursor enter. Transition at 150ms ease-out. Use background fill, not border change." },
            { title: "Active / Pressed", token: "--surface-raised", desc: "Applied on mousedown or touchstart. Often a slight scale reduction (scale: 0.97) for buttons." },
            { title: "Focus (keyboard)", token: "--nav-active-color", desc: "3px ring at 33% opacity. Never use outline: none without a custom focus style. WCAG 2.2 requires visible focus." },
            { title: "Disabled", token: "opacity: 0.45", desc: "Reduces opacity — do not change the colour of individual elements. The element must still be visible enough to understand what it was." },
          ].map(({ title, token, desc }) => (
            <div key={title} className="p-4 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{title}</h3>
                <code className="text-[10px] font-mono text-[rgb(var(--text-tertiary))] bg-[rgb(var(--surface-raised))] px-1.5 py-0.5 rounded">{token}</code>
              </div>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Touch targets */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Touch Targets</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          WCAG 2.2 requires a 24×24px minimum touch target for all interactive elements; Sitka sets 44×44px as the baseline. If the visual element is smaller (e.g. an icon), expand the hit area invisibly using padding or a pseudo-element.
        </p>
        <TouchTargetDemo />
        <div className="mt-4 p-4 rounded-xl bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))]">
          <p className="text-[12px] font-mono text-[rgb(var(--text-secondary))]">
            {`/* Expand hit area without affecting layout */`}<br />
            {`.icon-button {`}<br />
            {`  padding: 10px; /* visual icon 24px → hit area 44px */`}<br />
            {`  min-width: 44px; min-height: 44px;`}<br />
            {`}`}
          </p>
        </div>
      </section>

      {/* Gesture patterns */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Gesture Patterns (iOS)</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Use platform-native gestures for their established meanings. Inventing custom gestures increases cognitive load and removes discoverability.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Gesture", "Use for"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GESTURE_PATTERNS.map((row, i) => (
                <tr key={row.gesture} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-semibold text-[rgb(var(--text-primary))]">{row.gesture}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Keyboard navigation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Keyboard Navigation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          All interactive functionality must be reachable by keyboard alone. Implement the keyboard shortcuts below consistently across all products.
        </p>
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
              {KEYBOARD_PATTERNS.map((row, i) => (
                <tr key={row.key} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3">
                    <kbd className="font-mono text-[11px] px-2 py-0.5 rounded border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))]">
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

      {/* Principles */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Predictable, not surprising", body: "Interactive elements behave the way users have learned to expect. Reserve creative interactions for the edges of the interface, not the core tasks." },
            { title: "Feedback within 100ms", body: "Users perceive responses under 100ms as instantaneous. Hover and active states must appear immediately. Loading states should appear within 300ms." },
            { title: "No interaction-only affordances", body: "If an element is interactive, it must look interactive. Don't rely on hover to reveal that something is clickable." },
          ].map(({ title, body }) => (
            <div key={title} className="p-4 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-2">{title}</h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
