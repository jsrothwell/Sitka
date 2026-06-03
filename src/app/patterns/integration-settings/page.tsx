import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { CheckCircle2, AlertCircle, RotateCcw, Settings, Plug, Unplug } from "lucide-react";

export const metadata: Metadata = { title: "Integration Settings" };

const INTEGRATIONS = [
  { id: "slack",   name: "Slack",   description: "Post status updates and notifications to channels.", status: "connected",    lastSync: "2 mins ago",  syncError: null },
  { id: "harvest", name: "Harvest", description: "Sync tracked time entries and billable hours.",       status: "connected",    lastSync: "1 hour ago",  syncError: "Rate limit exceeded — retry in 10 min" },
  { id: "teams",   name: "Teams",   description: "Receive daily summaries in Microsoft Teams.",          status: "disconnected", lastSync: null,          syncError: null },
  { id: "notion",  name: "Notion",  description: "Export completed tasks to a Notion database.",         status: "disconnected", lastSync: null,          syncError: null },
];

const CODE = {
  react: {
    filename: "IntegrationSettings.tsx",
    code: `import { useState } from "react";

interface Integration {
  id: string;
  name: string;
  description: string;
  status: "connected" | "disconnected";
  lastSync?: string | null;
  syncError?: string | null;
}

export function IntegrationCard({ integration }: { integration: Integration }) {
  const [showAuth, setShowAuth] = useState(false);
  const isConnected = integration.status === "connected";

  return (
    <div
      style={{
        padding: "16px 20px",
        borderRadius: 12,
        background: isConnected
          ? "rgb(var(--status-success) / 0.04)"
          : "rgb(var(--surface))",
        border: "1px solid rgb(var(--border))",
        boxShadow: "var(--shadow-card)",
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
      }}
    >
      {/* Service logo placeholder */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "rgb(var(--surface-raised))",
          border: "1px solid rgb(var(--border))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {integration.name[0]}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{integration.name}</span>

          {/* Status badge */}
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99,
            background: isConnected ? "rgb(var(--status-success) / 0.12)" : "rgb(var(--border))",
            color: isConnected ? "rgb(var(--status-success))" : "rgb(var(--text-tertiary))",
          }}>
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>

        <p style={{ fontSize: 12, color: "rgb(var(--text-secondary))", marginBottom: 8 }}>
          {integration.description}
        </p>

        {/* Sync status */}
        {isConnected && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgb(var(--text-tertiary))" }}>
            {integration.syncError ? (
              <>
                <AlertCircle size={12} color="rgb(var(--status-danger))" />
                <span style={{ color: "rgb(var(--status-danger))" }}>{integration.syncError}</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={12} color="rgb(var(--status-success))" />
                <span>Last synced {integration.lastSync}</span>
              </>
            )}
          </div>
        )}

        {/* Auth flow */}
        {showAuth && !isConnected && (
          <div style={{
            marginTop: 12,
            padding: 14,
            borderRadius: 8,
            background: "rgb(var(--surface-raised))",
            border: "1px solid rgb(var(--border))",
            fontSize: 13,
          }}>
            <p style={{ marginBottom: 10, fontWeight: 500 }}>Connect {integration.name}</p>
            <input
              type="text"
              placeholder="Paste your API key or OAuth token"
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 7,
                border: "1px solid rgb(var(--border))",
                background: "rgb(var(--surface))",
                fontSize: 13,
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button style={{ padding: "7px 14px", borderRadius: 7, background: "rgb(var(--accent))", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                Test & Connect
              </button>
              <button onClick={() => setShowAuth(false)} style={{ padding: "7px 14px", borderRadius: 7, background: "transparent", border: "1px solid rgb(var(--border))", cursor: "pointer", fontSize: 13 }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        {isConnected ? (
          <>
            <button title="Sync now" style={{ padding: 8, borderRadius: 7, border: "1px solid rgb(var(--border))", background: "rgb(var(--surface-raised))", cursor: "pointer" }}>
              <RotateCcw size={14} color="rgb(var(--text-secondary))" />
            </button>
            <button title="Configure" style={{ padding: 8, borderRadius: 7, border: "1px solid rgb(var(--border))", background: "rgb(var(--surface-raised))", cursor: "pointer" }}>
              <Settings size={14} color="rgb(var(--text-secondary))" />
            </button>
            <button title="Disconnect" style={{ padding: 8, borderRadius: 7, border: "1px solid rgb(var(--border))", background: "rgb(var(--surface-raised))", cursor: "pointer" }}>
              <Unplug size={14} color="rgb(var(--status-danger))" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowAuth(true)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, background: "rgb(var(--accent))", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
          >
            <Plug size={13} />
            Connect
          </button>
        )}
      </div>
    </div>
  );
}`,
  },
  html: {
    filename: "integration-settings.html",
    code: `<div class="integration-list">
  <!-- Connected card -->
  <div class="integration-card integration-card--connected">
    <div class="integration-card__logo">S</div>
    <div class="integration-card__body">
      <div class="integration-card__header">
        <span class="integration-card__name">Slack</span>
        <span class="badge badge--success">Connected</span>
      </div>
      <p class="integration-card__description">
        Post status updates and notifications to channels.
      </p>
      <div class="integration-card__sync">
        <svg class="sync-icon sync-icon--success"><!-- checkmark --></svg>
        Last synced 2 mins ago
      </div>
    </div>
    <div class="integration-card__actions">
      <button class="btn-icon" title="Sync now"><!-- rotate icon --></button>
      <button class="btn-icon" title="Configure"><!-- settings icon --></button>
      <button class="btn-icon btn-icon--danger" title="Disconnect"><!-- unplug icon --></button>
    </div>
  </div>

  <!-- Disconnected card -->
  <div class="integration-card">
    <div class="integration-card__logo">H</div>
    <div class="integration-card__body">
      <div class="integration-card__header">
        <span class="integration-card__name">Harvest</span>
        <span class="badge badge--neutral">Disconnected</span>
      </div>
      <p class="integration-card__description">
        Sync tracked time entries and billable hours.
      </p>
    </div>
    <div class="integration-card__actions">
      <button class="btn btn--accent">Connect</button>
    </div>
  </div>
</div>

<style>
.integration-list { display: flex; flex-direction: column; gap: 10px; }
.integration-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 12px;
  background: rgb(var(--surface));
  border: 1px solid rgb(var(--border));
  box-shadow: var(--shadow-card);
}
.integration-card--connected {
  background: rgb(var(--status-success) / 0.04);
}
.integration-card__logo {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgb(var(--border));
  background: rgb(var(--surface-raised));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.integration-card__actions { display: flex; gap: 6px; margin-left: auto; }
.btn-icon { padding: 8px; border-radius: 7px; border: 1px solid rgb(var(--border)); background: rgb(var(--surface-raised)); cursor: pointer; }
</style>`,
  },
  swift: {
    filename: "IntegrationSettingsView.swift",
    code: `import SwiftUI

// Mirrors Warren's Slack/Teams/Harvest integration views

struct IntegrationSettingsView: View {
    @State private var integrations: [Integration] = Integration.all
    @State private var authIntegration: Integration? = nil

    var body: some View {
        ScrollView {
            LazyVStack(spacing: 10) {
                ForEach($integrations) { $integration in
                    IntegrationCard(integration: $integration) {
                        authIntegration = integration
                    }
                }
            }
            .padding(20)
        }
        .sheet(item: $authIntegration) { integration in
            AuthFlow(integration: integration)
        }
    }
}

struct IntegrationCard: View {
    @Binding var integration: Integration
    let onConnect: () -> Void

    var isConnected: Bool { integration.status == .connected }

    var body: some View {
        HStack(alignment: .top, spacing: 14) {
            // Service logo
            RoundedRectangle(cornerRadius: 10)
                .fill(Color.sfSurface)
                .frame(width: 40, height: 40)
                .overlay {
                    Text(String(integration.name.prefix(1)))
                        .font(.system(size: 18, weight: .semibold))
                }
                .overlay { RoundedRectangle(cornerRadius: 10).stroke(Color.sfBorder) }

            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(integration.name)
                        .font(.system(size: 14, weight: .semibold))

                    // Status badge
                    Text(isConnected ? "Connected" : "Disconnected")
                        .font(.system(size: 11, weight: .semibold))
                        .padding(.horizontal, 8).padding(.vertical, 2)
                        .background(isConnected ? Color.sfStatusSuccess.opacity(0.12) : Color.sfBorder)
                        .foregroundStyle(isConnected ? .sfStatusSuccess : .sfTextTertiary)
                        .clipShape(Capsule())
                }

                Text(integration.description)
                    .font(.system(size: 12))
                    .foregroundStyle(.sfTextSecondary)

                // Sync status
                if isConnected {
                    if let error = integration.syncError {
                        Label(error, systemImage: "exclamationmark.triangle.fill")
                            .font(.system(size: 11))
                            .foregroundStyle(.sfStatusDanger)
                    } else if let lastSync = integration.lastSync {
                        Label("Last synced \\(lastSync)", systemImage: "checkmark.circle.fill")
                            .font(.system(size: 11))
                            .foregroundStyle(.sfStatusSuccess)
                    }
                }
            }

            Spacer()

            // Actions
            HStack(spacing: 6) {
                if isConnected {
                    Button { syncNow() } label: { Image(systemName: "arrow.clockwise") }
                        .buttonStyle(.borderless)
                    Button { configure() } label: { Image(systemName: "gear") }
                        .buttonStyle(.borderless)
                    Button { disconnect() } label: { Image(systemName: "xmark.circle") }
                        .buttonStyle(.borderless)
                        .foregroundStyle(.sfStatusDanger)
                } else {
                    Button("Connect") { onConnect() }
                        .buttonStyle(.borderedProminent)
                        .tint(.sfBrand(.accent))
                }
            }
        }
        .padding(16)
        .background(isConnected ? Color.sfStatusSuccess.opacity(0.04) : Color.sfSurface)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay { RoundedRectangle(cornerRadius: 12).stroke(Color.sfBorder) }
        .shadow(.card)
    }
}

struct AuthFlow: View {
    let integration: Integration
    @State private var apiKey = ""
    @State private var isTesting = false
    @Environment(\\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                Section("API Key") {
                    SecureField("Paste your API key", text: $apiKey)
                }
                Section {
                    Button(isTesting ? "Testing…" : "Test & Connect") {
                        testAndConnect()
                    }
                    .disabled(apiKey.isEmpty || isTesting)
                }
            }
            .navigationTitle("Connect \\(integration.name)")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
            }
        }
    }
}`,
  },
  macos: {
    filename: "IntegrationSettingsView.swift",
    code: `// macOS — same SwiftUI. Warren uses dedicated windows for each OAuth flow.

extension IntegrationCard {
    // macOS adds sync error inline alert (not just an icon + text)
    @ViewBuilder
    var syncErrorAlert: some View {
        if let error = integration.syncError {
            GroupBox {
                HStack {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .foregroundStyle(.sfStatusDanger)
                    VStack(alignment: .leading) {
                        Text("Sync failed")
                            .font(.system(size: 12, weight: .semibold))
                        Text(error)
                            .font(.system(size: 11))
                            .foregroundStyle(.sfTextSecondary)
                    }
                    Spacer()
                    Button("Retry") { syncNow() }
                        .buttonStyle(.bordered)
                }
            }
        }
    }
}`,
  },
};

export default function IntegrationSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Integration Settings"
        description="A list of third-party service cards with connection status, sync health, and an inline auth flow. Composes Card, Badge, and Form components. Reference: Warren's Slack, Teams, and Harvest settings views."
        badge="New"
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Demo</h2>
        <ComponentPreview>
          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {INTEGRATIONS.map((integration) => {
              const isConnected = integration.status === "connected";
              return (
                <div
                  key={integration.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "16px 20px",
                    borderRadius: 12,
                    background: isConnected ? "rgb(var(--status-success) / 0.04)" : "rgb(var(--surface))",
                    border: "1px solid rgb(var(--border))",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  {/* Logo */}
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgb(var(--surface-raised))", border: "1px solid rgb(var(--border))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
                    {integration.name[0]}
                  </div>

                  {/* Body */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{integration.name}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99,
                        background: isConnected ? "rgb(var(--status-success) / 0.12)" : "rgb(var(--border-subtle))",
                        color: isConnected ? "rgb(var(--status-success))" : "rgb(var(--text-tertiary))",
                      }}>
                        {isConnected ? "Connected" : "Disconnected"}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, color: "rgb(var(--text-secondary))", marginBottom: 6 }}>{integration.description}</p>
                    {isConnected && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
                        {integration.syncError ? (
                          <>
                            <AlertCircle size={12} color="rgb(var(--status-danger))" />
                            <span style={{ color: "rgb(var(--status-danger))" }}>{integration.syncError}</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={12} color="rgb(var(--status-success))" />
                            <span style={{ color: "rgb(var(--text-tertiary))" }}>Last synced {integration.lastSync}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    {isConnected ? (
                      <>
                        <button title="Sync now" style={{ padding: 8, borderRadius: 7, border: "1px solid rgb(var(--border))", background: "rgb(var(--surface-raised))", cursor: "pointer", display: "flex" }}>
                          <RotateCcw size={14} color="rgb(var(--text-secondary))" />
                        </button>
                        <button title="Configure" style={{ padding: 8, borderRadius: 7, border: "1px solid rgb(var(--border))", background: "rgb(var(--surface-raised))", cursor: "pointer", display: "flex" }}>
                          <Settings size={14} color="rgb(var(--text-secondary))" />
                        </button>
                        <button title="Disconnect" style={{ padding: 8, borderRadius: 7, border: "1px solid rgb(var(--border))", background: "rgb(var(--surface-raised))", cursor: "pointer", display: "flex" }}>
                          <Unplug size={14} color="rgb(var(--status-danger))" />
                        </button>
                      </>
                    ) : (
                      <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, background: "rgb(var(--accent))", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                        <Plug size={13} />
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ComponentPreview>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Card anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Element</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Description</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Token</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Service logo</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">40×40 rounded rect, brand logo image or initial fallback</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--surface-raised</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Name</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">14 px semibold</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">—</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Status badge</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Connected = success green; Disconnected = neutral gray</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--status-success</code>, <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--border</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Description</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">12 px, secondary colour</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--text-secondary</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Sync row</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Timestamp or error message with icon, 11 px</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--text-tertiary</code> / <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--status-danger</code></td>
              </tr>
              <tr className="bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Connected tint</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Card background gets <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--status-success / 0.04</code> fill</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--status-success</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Auth flow</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-3">
          Tapping <strong className="text-[rgb(var(--text-primary))]">Connect</strong> opens either:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[14px] text-[rgb(var(--text-secondary))] mb-3">
          <li>An inline expanded section with an API key input + &ldquo;Test &amp; Connect&rdquo; button (for API-key integrations)</li>
          <li>A bottom sheet or modal with OAuth instructions (for OAuth integrations)</li>
        </ul>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The &ldquo;Test &amp; Connect&rdquo; button shows a loading spinner during the API check and surfaces
          error messages inline. On success, the card transitions to the Connected state with an
          animation.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sync status indicators</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">State</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Icon</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Colour</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Sync OK</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">checkmark.circle.fill</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--status-success</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Sync error</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">exclamationmark.triangle.fill</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--status-danger</code></td>
              </tr>
              <tr className="bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Syncing now</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Spinner</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--text-tertiary</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Multi-provider timesheet sync</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          Warren extends the basic integration-card pattern with a multi-provider timesheet sync engine. Each provider—
          Clockify, Toggl Track, and Timely—conforms to the same <code className="font-mono text-[11px] text-[rgb(var(--accent))]">TimesheetProvider</code> protocol
          and is orchestrated by a shared <code className="font-mono text-[11px] text-[rgb(var(--accent))]">TimesheetSyncEngine</code> singleton.
        </p>

        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Provider</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Auth</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">API endpoint</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Clockify</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">API key (Header <code className="font-mono text-[10px]">X-Api-Key</code>)</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">api.clockify.me/v1</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Toggl Track</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">API token (HTTP Basic)</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">api.track.toggl.com/api/v9</code></td>
              </tr>
              <tr className="bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Timely</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">OAuth 2.0 Bearer token + Account ID</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">api.timelyapp.com/1.1</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-2 mt-5">Protocol</h3>
        <pre className="rounded-lg bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] p-4 text-[12px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto mb-5 whitespace-pre">{`protocol TimesheetProvider: Sendable {
    var providerType: ProviderType { get }
    func testConnection() async throws
    func fetchProjects() async throws -> [LocalProject]
    func fetchUsers()    async throws -> [LocalUser]
    func fetchTimeEntries(since: Date) async throws -> [LocalTimeEntry]
}`}</pre>

        <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sync flow</h3>
        <ol className="list-decimal list-inside space-y-2 text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          <li><strong className="text-[rgb(var(--text-primary))]">Delete window</strong> — existing provider-prefixed logs inside the lookback window are removed, clearing stale data before reinsertion.</li>
          <li><strong className="text-[rgb(var(--text-primary))]">Fetch</strong> — <code className="font-mono text-[11px] text-[rgb(var(--accent))]">fetchTimeEntries(since:)</code> returns entries modified in the last 30 days.</li>
          <li><strong className="text-[rgb(var(--text-primary))]">Map</strong> — <code className="font-mono text-[11px] text-[rgb(var(--accent))]">TimesheetMappingStore</code> translates external project/user IDs to Warren IDs. Unmapped entries are skipped and surfaced to the user.</li>
          <li><strong className="text-[rgb(var(--text-primary))]">Insert</strong> — matched entries are written as <code className="font-mono text-[11px] text-[rgb(var(--accent))]">TimeLog</code> objects with a provider prefix in the description (e.g. <code className="font-mono text-[11px]">[clockify] </code>).</li>
        </ol>

        <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))] mb-2">Settings UI</h3>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          <code className="font-mono text-[11px] text-[rgb(var(--accent))]">TimesheetSettingsView</code> wraps all four providers (Harvest + the three new ones) under
          a segmented picker. Each pane shares the same three-section layout: Credentials → Member Mapping → Project Mapping → Sync.
          Credentials are stored in Keychain; project and member mappings are persisted in <code className="font-mono text-[11px] text-[rgb(var(--accent))]">TimesheetMappingStore</code>.
        </p>
        <pre className="rounded-lg bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] p-4 text-[12px] font-mono text-[rgb(var(--text-secondary))] overflow-x-auto mb-1 whitespace-pre">{`// Call from the background to sync all configured providers
await TimesheetSyncEngine.shared.syncAll(dataStore: dataStore, lookbackDays: 30)`}</pre>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>
    </div>
  );
}
