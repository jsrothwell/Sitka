"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";

function SettingsDemo() {
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState({ email: true, push: false, digest: true });
  const [lang, setLang] = useState("en");

  return (
    <div className="rounded-2xl overflow-hidden border border-[rgb(var(--border))] bg-[rgb(var(--surface))] max-w-lg">
      {/* Page header */}
      <div className="px-5 py-4 border-b border-[rgb(var(--border))]">
        <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))]">Settings</h3>
      </div>

      {/* Section: Appearance */}
      <div className="px-5 pt-5 pb-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">
          Appearance
        </p>

        {/* Theme selection */}
        <div className="mb-4">
          <p className="text-[13px] font-medium text-[rgb(var(--text-primary))] mb-2">Theme</p>
          <div className="flex gap-2">
            {[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "system", label: "System" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className="flex-1 py-2 rounded-lg text-[12px] font-medium border transition-all"
                style={{
                  background: theme === value ? "rgba(52,168,101,0.1)" : "rgb(var(--surface-raised))",
                  borderColor: theme === value ? "rgba(52,168,101,0.4)" : "rgb(var(--border))",
                  color: theme === value ? "var(--nav-active-color)" : "rgb(var(--text-secondary))",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="mb-4 pb-4 border-b border-[rgb(var(--border-subtle))]">
          <label className="text-[13px] font-medium text-[rgb(var(--text-primary))] block mb-2">Language</label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full rounded-lg px-3 py-2 text-[13px] border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] focus:outline-none"
            style={{ appearance: "none" }}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>

      {/* Section: Notifications */}
      <div className="px-5 pt-3 pb-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">
          Notifications
        </p>
        {(Object.entries(notifications) as [keyof typeof notifications, boolean][]).map(([key, val], i, arr) => (
          <div
            key={key}
            className="flex items-center justify-between py-3"
            style={{ borderBottom: i < arr.length - 1 ? "1px solid rgb(var(--border-subtle))" : undefined }}
          >
            <div>
              <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">
                {key === "email" ? "Email alerts" : key === "push" ? "Push notifications" : "Weekly digest"}
              </p>
              <p className="text-[11px] text-[rgb(var(--text-tertiary))]">
                {key === "email" ? "Important updates sent to your email" : key === "push" ? "Real-time alerts on your device" : "Summary of activity each Monday"}
              </p>
            </div>
            <button
              onClick={() => setNotifications((n) => ({ ...n, [key]: !val }))}
              className="w-9 h-5 rounded-full flex items-center shrink-0 ml-4 transition-colors"
              style={{
                background: val ? "var(--nav-active-color)" : "rgb(var(--surface-hover))",
                border: `1px solid ${val ? "var(--nav-active-color)" : "rgb(var(--border))"}`,
                padding: "2px",
                justifyContent: val ? "flex-end" : "flex-start",
              }}
              aria-pressed={val}
              aria-label={key}
            >
              <span className="w-3.5 h-3.5 rounded-full bg-white block transition-all" />
            </button>
          </div>
        ))}
      </div>

      {/* Section: Danger zone */}
      <div className="px-5 pt-4 pb-5 mt-2 border-t border-[rgb(var(--border))]">
        <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: "rgb(220,38,38)" }}>
          Danger zone
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">Delete account</p>
            <p className="text-[11px] text-[rgb(var(--text-tertiary))]">Permanently deletes your account and all data.</p>
          </div>
          <button
            className="px-3 py-2 rounded-lg text-[12px] font-semibold border transition-colors hover:bg-red-50 dark:hover:bg-red-950"
            style={{ borderColor: "rgba(220,38,38,0.4)", color: "rgb(220,38,38)", background: "rgba(220,38,38,0.06)" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Settings pages let users control their experience. Group related controls, surface destructive actions clearly, and always confirm before irreversible changes."
      />

      {/* Live demo */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Interactive Example</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-6 leading-relaxed">
          A settings page with appearance controls, notification toggles, and a danger zone. All controls are live.
        </p>
        <SettingsDemo />
      </section>

      {/* Structure */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Page Structure</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Settings pages should be scannable. Group controls into labelled sections, ordered from most frequently changed to least. Destructive actions always appear last, visually separated.
        </p>
        <div className="flex flex-col gap-2">
          {[
            { order: "1", section: "Profile / Account", what: "Name, avatar, email. The most personal and most-changed settings." },
            { order: "2", section: "Appearance", what: "Theme, language, density. Quick wins that personalise the experience." },
            { order: "3", section: "Notifications", what: "Granular control over how and when the product reaches the user." },
            { order: "4", section: "Integrations", what: "Connected tools and services. Each has an independent connect/disconnect action." },
            { order: "5", section: "Privacy &amp; Security", what: "Two-factor auth, session management, data export." },
            { order: "6", section: "Billing", what: "Plan, payment method, invoices. Only show if relevant to the account type." },
            { order: "7", section: "Danger zone", what: "Delete account, reset all data. Always separated visually with a red accent." },
          ].map(({ order, section, what }) => (
            <div
              key={order}
              className="flex items-start gap-4 rounded-xl p-3.5 border border-[rgb(var(--border))] bg-[rgb(var(--surface))]"
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                style={{ background: "rgba(52,168,101,0.1)", color: "var(--nav-active-color)" }}
              >
                {order}
              </span>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))]" dangerouslySetInnerHTML={{ __html: section }} />
                <p className="text-[12px] text-[rgb(var(--text-secondary))]" dangerouslySetInnerHTML={{ __html: what }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Control patterns */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Control Patterns</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Use case", "Control", "Note"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { use: "Binary preference", control: "Toggle (Switch)", note: "Instant — no Save button required." },
                { use: "One-of-several options", control: "Segmented button or Radio group", note: "Use segmented for 2–4 options, radios for 5+." },
                { use: "Free-text entry", control: "Input with label", note: "Always show current value. Require explicit save." },
                { use: "Select from a list", control: "Select / Dropdown", note: "Show the current value as the trigger label." },
                { use: "File upload", control: "Drag-and-drop zone + button fallback", note: "Always provide a button fallback for accessibility." },
                { use: "Dangerous action", control: "Red outlined button → Confirmation dialog", note: "Two-step confirmation. Name the exact consequence." },
              ].map((row, i) => (
                <tr key={row.use} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 text-[rgb(var(--text-primary))]">{row.use}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "var(--nav-active-color)" }}>{row.control}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Danger zone */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Destructive Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Separate visually", body: "The danger zone is always at the bottom of the page, separated by a border or background change. Never intersperse destructive actions with regular settings." },
            { title: "Name the consequence", body: "The button label names what will be destroyed. The confirmation dialog title repeats it. \"Delete project\" not \"Delete\" — context is critical when confirming." },
            { title: "Two-step minimum", body: "One click is never enough for an irreversible action. A confirmation dialog with a red CTA is the minimum. For very destructive actions (account deletion), type-to-confirm the resource name." },
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
