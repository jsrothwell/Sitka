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

      <section>
        <h2>Demo</h2>
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

      <section>
        <h2>Card anatomy</h2>
        <table>
          <thead>
            <tr><th>Element</th><th>Description</th><th>Token</th></tr>
          </thead>
          <tbody>
            <tr><td>Service logo</td><td>40×40 rounded rect, brand logo image or initial fallback</td><td><code>--surface-raised</code></td></tr>
            <tr><td>Name</td><td>14 px semibold</td><td>—</td></tr>
            <tr><td>Status badge</td><td>Connected = success green; Disconnected = neutral gray</td><td><code>--status-success</code>, <code>--border</code></td></tr>
            <tr><td>Description</td><td>12 px, secondary colour</td><td><code>--text-secondary</code></td></tr>
            <tr><td>Sync row</td><td>Timestamp or error message with icon, 11 px</td><td><code>--text-tertiary</code> / <code>--status-danger</code></td></tr>
            <tr><td>Connected tint</td><td>Card background gets <code>--status-success / 0.04</code> fill</td><td><code>--status-success</code></td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Auth flow</h2>
        <p>
          Tapping <strong>Connect</strong> opens either:
        </p>
        <ul>
          <li>An inline expanded section with an API key input + "Test & Connect" button (for API-key integrations)</li>
          <li>A bottom sheet or modal with OAuth instructions (for OAuth integrations)</li>
        </ul>
        <p>
          The "Test & Connect" button shows a loading spinner during the API check and surfaces
          error messages inline. On success, the card transitions to the Connected state with an
          animation.
        </p>
      </section>

      <section>
        <h2>Sync status indicators</h2>
        <table>
          <thead>
            <tr><th>State</th><th>Icon</th><th>Colour</th></tr>
          </thead>
          <tbody>
            <tr><td>Sync OK</td><td>checkmark.circle.fill</td><td><code>--status-success</code></td></tr>
            <tr><td>Sync error</td><td>exclamationmark.triangle.fill</td><td><code>--status-danger</code></td></tr>
            <tr><td>Syncing now</td><td>Spinner</td><td><code>--text-tertiary</code></td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>
    </div>
  );
}
