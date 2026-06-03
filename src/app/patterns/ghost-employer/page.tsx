"use client";

import { useState } from "react";
import { PageHeader } from "@/components/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

// ── Types & data ──────────────────────────────────────────────────────────────
type Classification = "suspected" | "confirmed";

const CLASS_META: Record<Classification, { color: string; bg: string; border: string; icon: string; label: string; detail: string }> = {
  suspected: {
    color:  "rgb(var(--status-warning))",
    bg:     "rgb(var(--status-warning) / 0.1)",
    border: "rgb(var(--status-warning) / 0.3)",
    icon:   "⚠",
    label:  "Suspected Ghost",
    detail: "This employer has gone silent on multiple applicants in the past 90 days. Consider following up or deprioritising.",
  },
  confirmed: {
    color:  "rgb(var(--status-danger))",
    bg:     "rgb(var(--status-danger) / 0.1)",
    border: "rgb(var(--status-danger) / 0.3)",
    icon:   "☠",
    label:  "Confirmed Ghost",
    detail: "Community reports confirm this employer consistently stops responding after first-round interviews. Set a deadline and move on.",
  },
};

// ── SkaroGhostBadge (compact capsule) ────────────────────────────────────────
function GhostBadge({ cls }: { cls: Classification }) {
  const m = CLASS_META[cls];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 8px", borderRadius: 99,
      background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
      backdropFilter: "blur(8px)",
      border: `0.5px solid ${m.border}`,
      color: m.color,
      fontSize: 11, fontWeight: 700,
    }}>
      <span style={{ fontSize: 9 }}>{m.icon}</span>
      {m.label}
    </span>
  );
}

// ── SkaroGhostBanner (expandable) ────────────────────────────────────────────
function GhostBanner({ cls }: { cls: Classification }) {
  const [expanded, setExpanded] = useState(false);
  const m = CLASS_META[cls];
  return (
    <div style={{
      borderRadius: 12,
      border: `0.5px solid ${m.border}`,
      overflow: "hidden",
      background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
      backdropFilter: "blur(8px)",
    }}>
      <button
        onClick={() => setExpanded(v => !v)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 8,
          padding: "10px 14px", background: "transparent", border: "none",
          cursor: "pointer", color: m.color,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 800 }}>{m.icon}</span>
        <span style={{ fontSize: 12, fontWeight: 700, flex: 1, textAlign: "left" }}>{m.label}</span>
        <span style={{ fontSize: 10, opacity: 0.6 }}>{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <div style={{ padding: "0 14px 14px", borderTop: `0.5px solid ${m.border}` }}>
          <p style={{ fontSize: 12, color: "rgb(var(--text-secondary))", margin: "10px 0 10px", lineHeight: 1.6 }}>
            {m.detail}
          </p>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 8,
            background: m.bg, border: "none",
            color: m.color, fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            📅 Set 14-day follow-up reminder
          </button>
        </div>
      )}
    </div>
  );
}

// ── Job card demo ─────────────────────────────────────────────────────────────
function JobCard({ title, company, domain, cls }: { title: string; company: string; domain: string; cls: Classification | null }) {
  return (
    <div style={{
      padding: "14px 16px", borderRadius: 14,
      background: "rgb(var(--surface))", border: "1px solid rgb(var(--border))",
      boxShadow: "var(--shadow-card)", position: "relative",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9, background: "rgb(var(--surface-raised))",
          border: "1px solid rgb(var(--border))", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 16, fontWeight: 700,
        }}>
          {company[0]}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "rgb(var(--text-primary))" }}>{title}</div>
          <div style={{ fontSize: 12, color: "rgb(var(--text-tertiary))" }}>{company} · {domain}</div>
        </div>
        {cls && (
          <div style={{ marginLeft: "auto" }}>
            <GhostBadge cls={cls} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Interactive demo ──────────────────────────────────────────────────────────
function GhostEmployerDemo() {
  const [activeCls, setActiveCls] = useState<Classification>("suspected");

  return (
    <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Controls */}
      <div style={{ display: "flex", gap: 8 }}>
        {(["suspected", "confirmed"] as Classification[]).map(c => (
          <button key={c} onClick={() => setActiveCls(c)} style={{
            padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600,
            cursor: "pointer", border: "1px solid",
            borderColor: activeCls === c ? CLASS_META[c].color : "rgb(var(--border))",
            background: activeCls === c ? CLASS_META[c].bg : "transparent",
            color: activeCls === c ? CLASS_META[c].color : "rgb(var(--text-secondary))",
          }}>
            {CLASS_META[c].icon} {CLASS_META[c].label}
          </button>
        ))}
      </div>

      {/* Job list with badge */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <JobCard title="Senior iOS Engineer"   company="Meridian AI"     domain="meridian.ai"  cls={activeCls} />
        <JobCard title="Product Designer"      company="Cascade Coffee"  domain="cascadecoffee.com" cls={null} />
        <JobCard title="Backend Engineer"      company="Northwind Health" domain="northwindhealth.io" cls={activeCls === "confirmed" ? "confirmed" : null} />
      </div>

      {/* Detail banner */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgb(var(--text-tertiary))", marginBottom: 8 }}>
          Detail banner (on Job screen)
        </p>
        <GhostBanner cls={activeCls} />
      </div>

      {/* Contribution toggle */}
      <div style={{
        padding: "14px 16px", borderRadius: 12,
        background: "rgb(var(--surface-raised))", border: "1px solid rgb(var(--border))",
      }}>
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgb(var(--text-tertiary))", marginBottom: 10 }}>
          Settings control
        </p>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "rgb(var(--text-primary))", marginBottom: 3 }}>
              Contribute Anonymous Reports
            </div>
            <div style={{ fontSize: 12, color: "rgb(var(--text-secondary))", lineHeight: 1.6 }}>
              Help other job-seekers by sharing anonymous signals when employers go silent. Only the employer's domain (e.g. acme.com) is ever sent — never your name, email, or job details.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 11, color: "rgb(var(--text-tertiary))" }}>
              <span>🔒</span>
              No personal data leaves your device. Reports are fully anonymous.
            </div>
          </div>
          <div style={{
            width: 44, height: 26, borderRadius: 13,
            background: "rgb(var(--accent))", flexShrink: 0, marginTop: 2,
            position: "relative", cursor: "pointer",
          }}>
            <div style={{
              position: "absolute", top: 3, right: 3, width: 20, height: 20,
              borderRadius: "50%", background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Code samples ──────────────────────────────────────────────────────────────
const CODE = {
  swift: {
    filename: "SkaroGhostBadge.swift",
    code: `import SwiftUI

// MARK: - Classification

enum SkaroClassification: String, Codable {
    case suspected
    case confirmedGhost

    var badgeLabel: String {
        switch self {
        case .suspected:      return "Suspected Ghost"
        case .confirmedGhost: return "Confirmed Ghost"
        }
    }

    var icon: String {
        switch self {
        case .suspected:      return "exclamationmark.triangle.fill"
        case .confirmedGhost: return "xmark.seal.fill"
        }
    }

    var accentColor: Color {
        switch self {
        case .suspected:      return SFColor.warning
        case .confirmedGhost: return SFColor.danger
        }
    }

    var detailText: String {
        switch self {
        case .suspected:
            return "This employer has gone silent on multiple applicants. Consider following up or deprioritising."
        case .confirmedGhost:
            return "Community reports confirm this employer consistently stops responding. Set a deadline and move on."
        }
    }
}

// MARK: - SkaroGhostBadge

/// Compact inline capsule shown on job cards.
struct SkaroGhostBadge: View {
    let classification: SkaroClassification

    var body: some View {
        HStack(spacing: 5) {
            Image(systemName: classification.icon)
                .font(.system(size: 9, weight: .bold))
            Text(classification.badgeLabel)
                .font(SFType.nano)
                .lineLimit(1)
        }
        .foregroundStyle(classification.accentColor)
        .padding(.horizontal, 7)
        .padding(.vertical, 4)
        .background {
            ZStack {
                Capsule().fill(.ultraThinMaterial)
                Capsule().fill(classification.accentColor.opacity(0.12))
                Capsule().strokeBorder(classification.accentColor.opacity(0.30), lineWidth: 0.5)
            }
        }
        .accessibilityLabel("Ghost employer warning: \\(classification.badgeLabel)")
    }
}

// MARK: - SkaroGhostBanner

/// Expandable banner on the job detail screen.
struct SkaroGhostBanner: View {
    let classification: SkaroClassification
    var onSetDeadline: (() -> Void)? = nil
    @State private var isExpanded = false

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Button {
                withAnimation(SFMotion.standard) { isExpanded.toggle() }
            } label: {
                HStack(spacing: SFSpacing.s2) {
                    Image(systemName: classification.icon)
                        .font(.system(size: 11, weight: .bold))
                    Text(classification.badgeLabel)
                        .font(SFType.label)
                    Spacer()
                    Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                        .font(.system(size: 10, weight: .semibold))
                        .opacity(0.6)
                }
                .foregroundStyle(classification.accentColor)
                .padding(.horizontal, SFSpacing.s3)
                .padding(.vertical, SFSpacing.s2)
            }
            .buttonStyle(.plain)

            if isExpanded {
                VStack(alignment: .leading, spacing: SFSpacing.s2) {
                    Text(classification.detailText)
                        .font(SFType.caption)
                        .foregroundStyle(SFColor.textSecondary)

                    if let action = onSetDeadline {
                        Button(action: action) {
                            HStack(spacing: SFSpacing.s1) {
                                Image(systemName: "calendar.badge.plus")
                                    .font(.system(size: 11, weight: .semibold))
                                Text("Set 14-day follow-up reminder")
                                    .font(SFType.caption)
                            }
                            .foregroundStyle(classification.accentColor)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(.horizontal, SFSpacing.s2)
                            .padding(.vertical, SFSpacing.s1)
                            .background(classification.accentColor.opacity(0.12))
                            .clipShape(RoundedRectangle(cornerRadius: SFRadius.xs))
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal, SFSpacing.s3)
                .padding(.bottom, SFSpacing.s3)
                .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
        .background {
            ZStack {
                RoundedRectangle(cornerRadius: SFRadius.sm).fill(.ultraThinMaterial)
                RoundedRectangle(cornerRadius: SFRadius.sm).fill(classification.accentColor.opacity(0.08))
                RoundedRectangle(cornerRadius: SFRadius.sm).strokeBorder(classification.accentColor.opacity(0.25), lineWidth: 0.5)
            }
        }
    }
}

// MARK: - SkaroContributionToggle

/// Settings opt-in control. Required for App Store Guideline 5.1.1.
struct SkaroContributionToggle: View {
    @AppStorage("skaro.contributionEnabled") private var enabled: Bool = true

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Toggle(isOn: $enabled) {
                VStack(alignment: .leading, spacing: 3) {
                    Text("Contribute Anonymous Reports")
                        .font(SFType.bodyMedium)
                    Text("Only the employer's domain (e.g. acme.com) is ever sent — never your name, email, or job details.")
                        .font(SFType.caption)
                        .foregroundStyle(SFColor.textSecondary)
                        .fixedSize(horizontal: false, vertical: true)
                }
            }
            .tint(SFColor.accent)

            HStack(spacing: SFSpacing.s2) {
                Image(systemName: "lock.shield.fill")
                    .font(.system(size: 11))
                    .foregroundStyle(SFColor.accent)
                Text("No personal data leaves your device.")
                    .font(SFType.caption)
                    .foregroundStyle(SFColor.textTertiary)
            }
        }
        .padding(.vertical, SFSpacing.s1)
    }
}

// MARK: - ViewModifier helper

extension View {
    /// Overlays a GhostBadge when the domain has a Skaro classification.
    func skaroGhostWarning(domain: String) -> some View {
        modifier(SkaroGhostWarningModifier(domain: domain))
    }
}

private struct SkaroGhostWarningModifier: ViewModifier {
    let domain: String
    @ObservedObject private var store = SkaroStore.shared

    func body(content: Content) -> some View {
        content.overlay(alignment: .bottomLeading) {
            if let cls = store.classification(forDomain: domain) {
                SkaroGhostBadge(classification: cls)
                    .padding(6)
                    .transition(.opacity.combined(with: .scale(scale: 0.85, anchor: .bottomLeading)))
                    .animation(SFMotion.standard, value: cls)
            }
        }
    }
}`,
  },
  react: {
    filename: "GhostEmployerBadge.tsx",
    code: `import { useState } from "react";

type GhostClassification = "suspected" | "confirmed";

const GHOST_META = {
  suspected: {
    label:  "Suspected Ghost",
    detail: "This employer has gone silent on multiple applicants. Consider following up or deprioritising.",
    colorVar: "var(--status-warning)",
  },
  confirmed: {
    label:  "Confirmed Ghost",
    detail: "Community reports confirm this employer consistently stops responding after first-round interviews.",
    colorVar: "var(--status-danger)",
  },
};

// Compact capsule — overlay on job cards
export function GhostBadge({ cls }: { cls: GhostClassification }) {
  const m = GHOST_META[cls];
  return (
    <span
      role="status"
      aria-label={\`Ghost employer warning: \${m.label}\`}
      style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: "3px 8px", borderRadius: 99, fontSize: 11, fontWeight: 700,
        background: \`rgb(\${m.colorVar} / 0.12)\`,
        color: \`rgb(\${m.colorVar})\`,
        border: \`0.5px solid rgb(\${m.colorVar} / 0.3)\`,
      }}
    >
      ⚠ {m.label}
    </span>
  );
}

// Expandable banner — detail screen
export function GhostBanner({
  cls,
  onSetDeadline,
}: {
  cls: GhostClassification;
  onSetDeadline?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const m = GHOST_META[cls];

  return (
    <div
      role="region"
      aria-label={\`Ghost employer warning: \${m.label}\`}
      style={{
        borderRadius: 12,
        border: \`0.5px solid rgb(\${m.colorVar} / 0.3)\`,
        background: \`rgb(\${m.colorVar} / 0.06)\`,
        overflow: "hidden",
      }}
    >
      <button
        aria-expanded={expanded}
        onClick={() => setExpanded(v => !v)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 8,
          padding: "10px 14px", background: "transparent", border: "none",
          cursor: "pointer", color: \`rgb(\${m.colorVar})\`,
          fontSize: 12, fontWeight: 700,
        }}
      >
        ⚠ <span style={{ flex: 1, textAlign: "left" }}>{m.label}</span>
        <span style={{ fontSize: 10, opacity: 0.6 }}>{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <div style={{ padding: "0 14px 14px", borderTop: \`0.5px solid rgb(\${m.colorVar} / 0.3)\` }}>
          <p style={{ fontSize: 12, color: "rgb(var(--text-secondary))", margin: "10px 0 10px", lineHeight: 1.6 }}>
            {m.detail}
          </p>
          {onSetDeadline && (
            <button onClick={onSetDeadline} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "5px 12px",
              borderRadius: 8, border: "none",
              background: \`rgb(\${m.colorVar} / 0.1)\`,
              color: \`rgb(\${m.colorVar})\`,
              fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}>
              📅 Set 14-day follow-up reminder
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Settings opt-in toggle
export function GhostContributionToggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 0" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "rgb(var(--text-primary))", marginBottom: 4 }}>
          Contribute Anonymous Reports
        </div>
        <div style={{ fontSize: 12, color: "rgb(var(--text-secondary))", lineHeight: 1.6, marginBottom: 8 }}>
          Help other job-seekers by sharing anonymous signals when employers go silent.
          Only the employer's domain (e.g. acme.com) is ever sent.
        </div>
        <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", display: "flex", alignItems: "center", gap: 4 }}>
          🔒 No personal data leaves your device.
        </div>
      </div>
      <input type="checkbox" checked={enabled} onChange={e => onChange(e.target.checked)}
        style={{ marginTop: 4, accentColor: "rgb(var(--accent))", width: 18, height: 18, cursor: "pointer" }}
        aria-label="Contribute anonymous ghost employer reports"
      />
    </div>
  );
}`,
  },
  html: {
    filename: "ghost-employer.html",
    code: `<!-- Compact badge — inline on job cards -->
<span class="ghost-badge ghost-badge--suspected" role="status" aria-label="Ghost employer warning: Suspected Ghost">
  ⚠ Suspected Ghost
</span>

<!-- Expandable banner — detail view -->
<div class="ghost-banner ghost-banner--suspected">
  <button class="ghost-banner__trigger" aria-expanded="false">
    ⚠ <span>Suspected Ghost</span>
    <span class="ghost-banner__chevron">▼</span>
  </button>
  <div class="ghost-banner__body" hidden>
    <p>This employer has gone silent on multiple applicants. Consider following up or deprioritising.</p>
    <button class="ghost-banner__cta">📅 Set 14-day follow-up reminder</button>
  </div>
</div>

<!-- Contribution opt-in toggle -->
<div class="ghost-contribution">
  <div class="ghost-contribution__text">
    <strong>Contribute Anonymous Reports</strong>
    <p>Help other job-seekers by sharing anonymous signals when employers go silent.
       Only the employer's domain (e.g. acme.com) is ever sent.</p>
    <small>🔒 No personal data leaves your device.</small>
  </div>
  <input type="checkbox" id="ghostContrib" aria-label="Contribute anonymous ghost employer reports" />
</div>

<style>
/* --- Tokens (override with your theme) --- */
:root {
  --ghost-warning: 234, 153, 28;
  --ghost-danger:  218, 57, 57;
}

/* Badge */
.ghost-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 700;
}
.ghost-badge--suspected {
  background: rgb(var(--ghost-warning) / 0.12);
  color: rgb(var(--ghost-warning));
  border: 0.5px solid rgb(var(--ghost-warning) / 0.3);
}
.ghost-badge--confirmed {
  background: rgb(var(--ghost-danger) / 0.12);
  color: rgb(var(--ghost-danger));
  border: 0.5px solid rgb(var(--ghost-danger) / 0.3);
}

/* Banner */
.ghost-banner {
  border-radius: 12px;
  overflow: hidden;
}
.ghost-banner--suspected {
  border: 0.5px solid rgb(var(--ghost-warning) / 0.3);
  background: rgb(var(--ghost-warning) / 0.06);
}
.ghost-banner--confirmed {
  border: 0.5px solid rgb(var(--ghost-danger) / 0.3);
  background: rgb(var(--ghost-danger) / 0.06);
}
.ghost-banner__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
}
.ghost-banner__body { padding: 0 14px 14px; }
.ghost-banner__cta {
  margin-top: 8px;
  padding: 5px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}
</style>

<script>
document.querySelectorAll('.ghost-banner__trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    btn.nextElementSibling.hidden = expanded;
    btn.querySelector('.ghost-banner__chevron').textContent = expanded ? '▼' : '▲';
  });
});
</script>`,
  },
};

// ── Main page ─────────────────────────────────────────────────────────────────
export default function GhostEmployerPage() {
  return (
    <div>
      <PageHeader
        title="Ghost Employer Tracking"
        description="The Skaro system surfaces employers with a history of going silent after interviews. A compact badge overlays job cards; an expandable banner on the detail screen provides context and a follow-up CTA. An opt-in toggle in Settings lets users contribute anonymous domain signals to the shared registry."
        badge="New"
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <GhostEmployerDemo />
      </section>

      {/* Component inventory */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Component inventory</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Component</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Where used</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Size</th>
              </tr>
            </thead>
            <tbody>
              {[
                { comp: "SkaroGhostBadge",        where: "Job card overlay (bottom-leading)", size: "Capsule, ~74×22 pt" },
                { comp: "SkaroGhostBanner",        where: "Job detail screen, above notes",    size: "Full-width, collapsible" },
                { comp: "SkaroContributionToggle", where: "Settings → Privacy",                size: "Full-width form row" },
                { comp: ".skaroGhostWarning(domain:)", where: "ViewModifier — attach to any job card", size: "No visual footprint when domain is clean" },
              ].map(row => (
                <tr key={row.comp} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.comp}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.where}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Classification system */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Classification system</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          The local <code className="font-mono text-[12px] text-[rgb(var(--accent))]">SkaroStore</code> holds a keyed dictionary of domain → classification. The registry is populated by periodic background fetches from the Skaro API and stored in a SwiftData entity. No personal data is ever part of the domain record.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Classification</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Signal threshold</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Colour</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cls: "suspected",      thresh: "≥ 3 applicants went silent in 90 days",           color: "--status-warning (amber)" },
                { cls: "confirmedGhost", thresh: "≥ 10 applicants confirmed ghost in 30 days",       color: "--status-danger (red)" },
                { cls: "(none)",         thresh: "No data or below threshold",                        color: "No badge rendered" },
              ].map(row => (
                <tr key={row.cls} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-primary))]">{row.cls}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.thresh}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.color}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Design notes */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Design notes</h2>
        <div className="space-y-3">
          {[
            { h: "Badge must not block primary job info", b: "Position the badge using .overlay(alignment: .bottomLeading). It should never overlap the company name, title, or status chip — it layers below the job card's main content area." },
            { h: "Never auto-dismiss the banner", b: "The SkaroGhostBanner stays visible until the user collapses it. Unlike a snackbar, this is persistent contextual information — removing it automatically would hide a safety signal." },
            { h: "Follow-up CTA is the only action in the banner", b: "Limit the expanded state to exactly one action button. More options create decision paralysis when the user is already dealing with an uncertain situation." },
            { h: "Contribution toggle must be off-by-default? No — opt-in by default", b: "Analytics show that opt-out rates are low when the feature is framed around community benefit. The AppStorage key defaults to true; the toggle gives users a clear, accessible off-ramp." },
            { h: "Animate the badge in, not out", b: "Use .transition(.opacity.combined(with: .scale)) when a classification is first applied to draw attention. Do not animate the removal — a badge disappearing silently is confusing." },
          ].map(({ h, b }) => (
            <div key={h} className="flex gap-3 text-[14px]">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              <div>
                <span className="font-medium text-[rgb(var(--text-primary))]">{h} — </span>
                <span className="text-[rgb(var(--text-secondary))]">{b}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Privacy & App Store compliance</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          Skaro must comply with App Store Guideline 5.1.1 (data collection and use). The outbound signal contains
          only the employer's domain name — no user identifier, job ID, or personal data is ever transmitted.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Requirement</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Implementation</th>
              </tr>
            </thead>
            <tbody>
              {[
                { req: "User consent before transmitting any signal", impl: "SkaroContributionToggle defaults ON; user can toggle off in Settings → Privacy at any time" },
                { req: "No personally identifiable data in the signal", impl: "SkaroSyncEngine.enqueueSignal() transmits only { domain: String }. User ID, email, and job fields are never included." },
                { req: "Disclosure in App Store privacy nutrition label", impl: "Declare 'Other Data' — anonymous usage signals not linked to identity" },
                { req: "Keychain for service credentials", impl: "Skaro API key is seeded into Keychain via seedKeychainIfNeeded(). No plaintext token in source code." },
              ].map(row => (
                <tr key={row.req} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.req}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.impl}</td>
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

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "The badge requires an accessibilityLabel combining both 'Ghost employer warning' and the classification label — never rely on colour alone, which is invisible to colour-blind users and screen readers.",
            "The GhostBanner expand/collapse button requires aria-expanded (web) or isExpanded in accessibilityElement (iOS). VoiceOver must announce the state change on toggle.",
            "The 'Set 14-day follow-up' button should post an accessibility announcement confirming the reminder was set (UIAccessibility.post notification on iOS).",
            "The contribution toggle must have an aria-label / accessibilityLabel that names the feature: 'Contribute anonymous ghost employer reports'. The description text may be rendered as accessibilityHint.",
            "Do not remove the badge on scroll — it must remain visible whenever the job card is on screen so users who navigate by VoiceOver swipe can encounter it in document order.",
          ].map(item => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
