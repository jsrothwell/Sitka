"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ArrowList, DocSection, DocTable, PreviewSection, SourceNote, UsageGrid } from "@/site/docs/PatternDoc";

type SyncState = "synced" | "syncing" | "stalled" | "error" | "signedOut" | "disabled";

const STATES: Record<SyncState, { icon: string; short: string; spoken: string; token: string; pulse?: boolean }> = {
  synced: { icon: "☁︎✓", short: "Synced", spoken: "iCloud synced just now", token: "--status-success-text" },
  syncing: { icon: "☁︎", short: "Syncing…", spoken: "iCloud syncing", token: "--accent", pulse: true },
  stalled: { icon: "☁︎!", short: "Taking longer than usual", spoken: "iCloud sync taking longer than usual", token: "--status-caution-text" },
  error: { icon: "☁︎!", short: "Sync error", spoken: "iCloud sync error: quota exceeded", token: "--status-caution-text" },
  signedOut: { icon: "☁︎👤", short: "Sign in to iCloud", spoken: "Not signed in to iCloud", token: "--status-caution-text" },
  disabled: { icon: "☁︎⃠", short: "iCloud off", spoken: "iCloud disabled", token: "--text-secondary" },
};

const CODE = {
  react: {
    filename: "SyncStatus.tsx",
    code: `type SyncState =
  | { kind: "synced"; at: Date }
  | { kind: "syncing" }
  | { kind: "stalled" }                 // syncing for longer than expected — never "stuck on Syncing…"
  | { kind: "error"; message: string }
  | { kind: "signedOut" }
  | { kind: "disabled" };

const TOKEN: Record<SyncState["kind"], string> = {
  synced: "--status-success-text", syncing: "--accent", stalled: "--status-caution-text",
  error: "--status-caution-text", signedOut: "--status-caution-text", disabled: "--text-secondary",
};

function shortLabel(s: SyncState) {
  switch (s.kind) {
    case "synced":    return Date.now() - s.at.getTime() < 60_000 ? "Synced" : relative(s.at);
    case "syncing":   return "Syncing…";
    case "stalled":   return "Taking longer than usual";
    case "error":     return "Sync error";
    case "signedOut": return "Sign in to iCloud";
    case "disabled":  return "iCloud off";
  }
}

/** compact: icon only, for toolbars. labeled: icon + text, for settings rows. */
export function SyncStatus({ state, style = "compact" }: { state: SyncState; style?: "compact" | "labeled" }) {
  const color = \`rgb(var(\${TOKEN[state.kind]}))\`;
  const spoken = state.kind === "error" ? \`Sync error: \${state.message}\` : shortLabel(state);
  return (
    <span role="status" aria-label={spoken} className="inline-flex items-center gap-1 text-[12px] font-medium" style={{ color }}>
      <CloudIcon state={state.kind} className={state.kind === "syncing" ? "motion-safe:animate-pulse" : ""} />
      {style === "labeled" && <span aria-hidden>{shortLabel(state)}</span>}
    </span>
  );
}`,
  },
  html: {
    filename: "sync-status.html",
    code: `<!-- Compact (toolbar) -->
<span class="sync" data-state="syncing" role="status" aria-label="iCloud syncing">
  <svg class="sync__icon" aria-hidden="true"><!-- cloud --></svg>
</span>

<!-- Labeled (settings row) -->
<span class="sync" data-state="stalled" role="status">
  <svg class="sync__icon" aria-hidden="true"></svg>
  <span>Taking longer than usual</span>
</span>

<style>
.sync { --c: var(--status-success-text); display: inline-flex; align-items: center; gap: 4px;
        font-size: 12px; font-weight: 500; color: rgb(var(--c)); }
.sync[data-state="syncing"]  { --c: var(--accent); }
.sync[data-state="stalled"],
.sync[data-state="error"],
.sync[data-state="signedOut"] { --c: var(--status-caution-text); }
.sync[data-state="disabled"] { --c: var(--text-secondary); }
@media (prefers-reduced-motion: no-preference) {
  .sync[data-state="syncing"] .sync__icon { animation: pulse 1.6s ease-in-out infinite; }
}
@keyframes pulse { 50% { opacity: .45; } }
</style>`,
  },
  swift: {
    filename: "SyncStatusView.swift",
    code: `import SwiftUI

/// Cross-platform iCloud sync indicator.
/// \`.compact\` for toolbar/camera contexts; \`.labeled\` for settings rows.
struct SyncStatusView: View {
    @ObservedObject var sync: SyncService
    var style: Style = .compact
    enum Style { case compact, labeled }

    var body: some View {
        switch style {
        case .compact:
            Image(systemName: iconName)
                .font(.system(size: 15, weight: .medium))
                .foregroundStyle(iconColor)
                .symbolEffect(.pulse, isActive: isSyncing)
                .accessibilityLabel(accessibilityLabel)
        case .labeled:
            Label(shortLabel, systemImage: iconName)
                .font(.caption.weight(.medium))
                .symbolEffect(.pulse, isActive: isSyncing)
                .foregroundStyle(iconColor)
                .accessibilityLabel(accessibilityLabel)
        }
    }

    private var isSyncing: Bool { if case .syncing = sync.state { true } else { false } }

    private var iconName: String {
        switch sync.state {
        case .synced:      "checkmark.icloud.fill"
        case .syncing:     "icloud"
        case .stalled:     "exclamationmark.icloud"
        case .error:       "exclamationmark.icloud.fill"
        case .notSignedIn: "person.icloud"
        case .disabled:    "icloud.slash"
        }
    }

    private var iconColor: Color {
        switch sync.state {
        case .synced:                          .statusSuccess
        case .syncing:                         .accentColor
        case .stalled, .error, .notSignedIn:   .statusCaution
        case .disabled:                        .secondary
        }
    }

    private var shortLabel: String {
        switch sync.state {
        case .synced(let d): Date().timeIntervalSince(d) < 60 ? "Synced" : d.formatted(.relative(presentation: .named))
        case .syncing:       "Syncing…"
        case .stalled:       "Taking longer than usual"
        case .error:         "Sync error"
        case .notSignedIn:   "Sign in to iCloud"
        case .disabled:      "iCloud off"
        }
    }

    private var accessibilityLabel: String {
        switch sync.state {
        case .error(let m): "iCloud sync error: \\(m)"
        default:            "iCloud \\(shortLabel.lowercased())"
        }
    }
}`,
  },
};

export default function SyncStatusPage() {
  const [state, setState] = useState<SyncState>("syncing");
  const s = STATES[state];
  const color = `rgb(var(${s.token}))`;
  const [showReport, setShowReport] = useState(false);

  return (
    <div>
      <PageHeader
        title="Sync Status"
        badge="New"
        description="A single indicator for background sync in two densities — icon-only for toolbars, icon + label for settings — backed by an explicit 'stalled' state and a troubleshooting path that ends in a previewable diagnostic report. For any local-first app that syncs through iCloud, Wi-Fi peers, or a server."
      />
      <SourceNote
        sources={[
          { app: "scanflo", file: "DesignTokens/SyncStatusView.swift" },
          { app: "scanflo", file: "DesignTokens/LLMStatusView.swift" },
          { app: "JobFlo", file: "Shared/Views/DiagnosticReportSheet.swift" },
        ]}
      />

      <PreviewSection>
        <div className="mx-auto max-w-md space-y-5">
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(STATES) as SyncState[]).map((k) => (
              <button
                key={k}
                onClick={() => setState(k)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  k === state
                    ? "bg-[rgb(var(--accent))] text-[rgb(var(--on-accent))]"
                    : "bg-[rgb(var(--surface))] text-[rgb(var(--text-secondary))] border border-[rgb(var(--border))]"
                }`}
              >
                {k}
              </button>
            ))}
          </div>

          {/* Compact: toolbar */}
          <div className="flex items-center justify-between rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-2.5">
            <span className="text-[15px] font-semibold text-[rgb(var(--text-primary))]">Library</span>
            <span role="status" aria-label={s.spoken} className={`text-[15px] ${s.pulse ? "motion-safe:animate-pulse" : ""}`} style={{ color }}>
              {s.icon}
            </span>
          </div>

          {/* Labeled: settings row */}
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-[14px] text-[rgb(var(--text-primary))]">iCloud Sync</span>
              <span role="status" className="flex items-center gap-1 text-[12px] font-medium" style={{ color }}>
                <span className={s.pulse ? "motion-safe:animate-pulse" : ""} aria-hidden>
                  {s.icon}
                </span>
                {s.short}
              </span>
            </div>
            {(state === "stalled" || state === "error") && (
              <button
                onClick={() => setShowReport(true)}
                className="flex w-full items-center justify-between border-t border-[rgb(var(--border-subtle))] px-4 py-3 text-left text-[14px] text-[rgb(var(--accent))]"
              >
                Sync Troubleshooting <span aria-hidden>›</span>
              </button>
            )}
          </div>

          {showReport && (state === "stalled" || state === "error") && (
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <p className="mb-2 text-[15px] font-semibold text-[rgb(var(--text-primary))]">Send Report</p>
              <p className="mb-2 text-[12px] text-[rgb(var(--text-secondary))]">This is exactly what will be sent:</p>
              <pre className="mb-3 max-h-32 overflow-auto rounded-lg bg-[rgb(var(--surface-raised))] p-2.5 text-[11px] leading-relaxed text-[rgb(var(--text-secondary))]">
{`Subject: Sync report — 2.7 (75)
Device: iPhone 16 · iOS 26.1
Account: signed in · Production
Pending uploads: 14 (oldest 3h)
Last error: CKError.quotaExceeded
Records: 1,204 · Partially failed: 3`}
              </pre>
              <input
                type="email"
                placeholder="Reply-to address"
                aria-label="Reply-to address"
                className="mb-2 w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-[13px]"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowReport(false)} className="px-3 py-1.5 text-[13px] text-[rgb(var(--text-secondary))]">
                  Cancel
                </button>
                <button className="rounded-full bg-[rgb(var(--accent))] px-4 py-1.5 text-[13px] font-semibold text-[rgb(var(--on-accent))]">Send</button>
              </div>
            </div>
          )}
        </div>
      </PreviewSection>

      <DocSection title="States" intro="Six states, each with an icon, a short label for the labeled style, and a fuller spoken label. ‘Stalled’ is the one most apps forget.">
        <DocTable
          headers={["State", "Label", "Token", "Notes"]}
          rows={[
            ["Synced", "“Synced” → “5 min ago”", <code key="1">--status-success-text</code>, "Switches from “Synced” to a relative time after 60 s so it never claims a freshness it doesn't have."],
            ["Syncing", "“Syncing…”", <code key="2">--accent</code>, "The only animated state: a slow pulse, disabled under reduced motion."],
            ["Stalled", "“Taking longer than usual”", <code key="3">--status-caution-text</code>, "Entered after a timeout. Prevents the indicator sticking on “Syncing…” forever when uploads silently fail (a real JobFlo bug)."],
            ["Error", "“Sync error”", <code key="4">--status-caution-text</code>, "Spoken label includes the reason. Offers Sync Troubleshooting."],
            ["Signed out", "“Sign in to iCloud”", <code key="5">--status-caution-text</code>, "Phrased as the fix, not the problem."],
            ["Disabled", "“iCloud off”", <code key="6">--text-secondary</code>, "Neutral — the user chose this. Never use warning colors for a deliberate setting."],
          ]}
        />
      </DocSection>

      <DocSection title="Troubleshooting & diagnostic report">
        <ArrowList
          items={[
            "From Stalled or Error, the labeled row gains a “Sync Troubleshooting” link: run checks off the main thread (the app must stay responsive while it talks to iCloud), then show results in plain language.",
            "The final step is a diagnostic report that previews the exact subject and text before sending. Capture state once when the sheet opens, and generate both the preview and the sent report from that snapshot so they can't differ.",
            "Keep an unsent report on device so closing the sheet or a failed send doesn't lose it; clear it once sent. Disclose diagnostic reports in the privacy policy.",
            "If a repair replaces records, take the content away entirely (a cover view) until the user taps Done — then rebuild, so no view holds a deleted record.",
          ]}
        />
      </DocSection>

      <DocSection title="When to use">
        <UsageGrid
          items={[
            { heading: "Local-first apps", body: "Data lives on device and syncs in the background. The indicator answers “is my other device going to see this?” without a modal.", good: true },
            { heading: "Sibling indicators", body: "Reuse the same compact/labeled API for other background services — scanflo's LLMStatusView mirrors SyncStatusView for on-device model state.", good: true },
            { heading: "Blocking saves", body: "If an action can't complete without the server, show progress on that action instead. A toolbar indicator is for background work.", good: false },
            { heading: "Alerting on every hiccup", body: "Transient errors that retry successfully shouldn't flash orange. Only enter Stalled after a meaningful timeout.", good: false },
          ]}
        />
      </DocSection>

      <DocSection title="Implementation">
        <PlatformTabs code={CODE} />
      </DocSection>

      <DocSection title="Accessibility">
        <ArrowList
          items={[
            "The compact style is icon-only, so it must carry a full spoken label (“iCloud sync taking longer than usual”), not the SF Symbol name.",
            "Use role=\"status\" (polite) rather than an alert. Don't announce Syncing ↔ Synced transitions; do announce entering Error.",
            "The pulse uses .symbolEffect(.pulse) / CSS animation gated on prefers-reduced-motion. Never blink.",
            "Error, stalled and signed-out share a color, so the icon shape and the label are what distinguish them.",
          ]}
        />
      </DocSection>
    </div>
  );
}
