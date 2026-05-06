"use client";

import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { useState } from "react";
import { Lock, Sparkles, Zap, BarChart3, Users, Shield } from "lucide-react";

const PROPS = [
  {
    name: "feature",
    type: "string",
    description: "Human-readable name of the gated feature, shown in the upgrade prompt.",
  },
  {
    name: "isLocked",
    type: "boolean",
    default: "true",
    description: "When false, renders children without any overlay.",
  },
  {
    name: "variant",
    type: '"inline" | "sheet"',
    default: '"inline"',
    description: "Inline overlays the locked content; sheet opens a full paywall modal.",
  },
  {
    name: "onUpgrade",
    type: "() => void",
    description: "Callback fired when the user taps the upgrade CTA.",
  },
  {
    name: "description",
    type: "string",
    description: "Optional supporting text shown below the feature name in the overlay.",
  },
];

const CODE = {
  react: {
    filename: "FeatureGate.tsx",
    code: `"use client";

import { useState, ReactNode } from "react";
import { Lock, Sparkles } from "lucide-react";

interface FeatureGateProps {
  feature: string;
  isLocked?: boolean;
  description?: string;
  onUpgrade?: () => void;
  children: ReactNode;
}

export function FeatureGate({
  feature,
  isLocked = true,
  description,
  onUpgrade,
  children,
}: FeatureGateProps) {
  if (!isLocked) return <>{children}</>;

  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
      {/* Blurred content */}
      <div style={{ filter: "blur(4px)", pointerEvents: "none", userSelect: "none" }}>
        {children}
      </div>

      {/* Glass overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          background: "rgb(var(--surface) / 0.7)",
          // Specular top edge
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "rgb(var(--accent) / 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgb(var(--accent))",
          }}
        >
          <Lock size={20} />
        </div>

        <div style={{ textAlign: "center", maxWidth: 240 }}>
          <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
            {feature}
          </p>
          {description && (
            <p style={{ fontSize: 12, color: "rgb(var(--text-secondary))", lineHeight: 1.5 }}>
              {description}
            </p>
          )}
        </div>

        <button
          onClick={onUpgrade}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 8,
            background: "rgb(var(--accent))",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          <Sparkles size={14} />
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
}`,
  },
  html: {
    filename: "feature-gate.html",
    code: `<div class="feature-gate">
  <!-- Blurred content underneath -->
  <div class="feature-gate__content">
    <!-- your locked content here -->
  </div>

  <!-- Glass overlay -->
  <div class="feature-gate__overlay">
    <div class="feature-gate__icon">
      <!-- lock icon -->
    </div>
    <p class="feature-gate__title">Advanced Analytics</p>
    <p class="feature-gate__description">Upgrade to Pro to access team insights.</p>
    <button class="btn-upgrade">✦ Upgrade to Pro</button>
  </div>
</div>

<style>
.feature-gate {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}
.feature-gate__content {
  filter: blur(4px);
  pointer-events: none;
  user-select: none;
}
.feature-gate__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  backdrop-filter: blur(20px) saturate(160%);
  background: rgb(var(--surface) / 0.7);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
  border-radius: 12px;
}
.btn-upgrade {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  background: rgb(var(--accent));
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
</style>`,
  },
  swift: {
    filename: "FeatureGate.swift",
    code: `import SwiftUI

struct FeatureGate<Content: View>: View {
    let feature: String
    var description: String? = nil
    var isLocked: Bool = true
    var onUpgrade: (() -> Void)? = nil

    @ViewBuilder let content: () -> Content

    var body: some View {
        content()
            .blur(radius: isLocked ? 4 : 0)
            .overlay {
                if isLocked {
                    overlayContent
                }
            }
            .clipShape(RoundedRectangle(cornerRadius: 12))
    }

    private var overlayContent: some View {
        ZStack {
            // Glass backing
            SFBlurView(material: .sheet)
                .overlay(alignment: .top) {
                    // Specular top edge
                    LinearGradient(
                        colors: [.white.opacity(0.12), .clear],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                    .frame(height: 1)
                }

            VStack(spacing: 12) {
                // Icon well
                RoundedRectangle(cornerRadius: 10)
                    .fill(Color.sfBrand(.accent).opacity(0.15))
                    .frame(width: 44, height: 44)
                    .overlay {
                        Image(systemName: "lock.fill")
                            .foregroundStyle(.sfBrand(.accent))
                    }

                VStack(spacing: 4) {
                    Text(feature)
                        .font(.system(size: 14, weight: .semibold))

                    if let description {
                        Text(description)
                            .font(.system(size: 12))
                            .foregroundStyle(.sfTextSecondary)
                            .multilineTextAlignment(.center)
                    }
                }
                .padding(.horizontal, 24)

                Button {
                    onUpgrade?()
                } label: {
                    Label("Upgrade to Pro", systemImage: "sparkles")
                        .font(.system(size: 13, weight: .semibold))
                        .padding(.horizontal, 16)
                        .padding(.vertical, 8)
                        .background(Color.sfBrand(.accent))
                        .foregroundStyle(.white)
                        .clipShape(RoundedRectangle(cornerRadius: 8))
                }
            }
        }
    }
}

// Usage
struct AnalyticsView: View {
    var body: some View {
        FeatureGate(
            feature: "Team Insights",
            description: "See how your team is performing across all projects.",
            isLocked: !userIsProSubscriber
        ) {
            TeamUtilizationSection()
        }
    }
}`,
  },
  macos: {
    filename: "FeatureGate.swift",
    code: `// macOS — identical SwiftUI API, uses .sheet material
// for the blur which is appropriate for macOS vibrancy

struct FeatureGate<Content: View>: View {
    let feature: String
    var isLocked: Bool = true
    var onUpgrade: (() -> Void)? = nil
    @ViewBuilder let content: () -> Content

    var body: some View {
        content()
            .blur(radius: isLocked ? 4 : 0)
            .overlay {
                if isLocked {
                    ZStack {
                        VisualEffectView(material: .sheet, blendingMode: .withinWindow)
                        VStack(spacing: 12) {
                            Image(systemName: "lock.fill")
                                .font(.system(size: 18))
                                .foregroundStyle(.accent)
                            Text(feature).font(.headline)
                            Button("Upgrade to Pro") { onUpgrade?() }
                                .buttonStyle(.borderedProminent)
                                .tint(.accent)
                        }
                    }
                }
            }
            .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}`,
  },
};

function InlineGateDemo() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => setUnlocked((u) => !u)}
          style={{
            padding: "6px 14px",
            borderRadius: 8,
            border: "1px solid rgb(var(--border))",
            background: "rgb(var(--surface-raised))",
            color: "rgb(var(--text-primary))",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          {unlocked ? "Lock again" : "Simulate upgrade"}
        </button>
      </div>

      {/* Gate wrapper */}
      <div style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
        {/* Blurred content */}
        <div
          style={{
            filter: unlocked ? "none" : "blur(4px)",
            transition: "filter 0.3s",
            pointerEvents: unlocked ? "auto" : "none",
            userSelect: unlocked ? "auto" : "none",
            padding: 20,
            background: "rgb(var(--surface))",
            border: "1px solid rgb(var(--border))",
            borderRadius: 12,
          }}
        >
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", color: "rgb(var(--text-tertiary))", textTransform: "uppercase", marginBottom: 16 }}>
            Team Insights
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { icon: <Users size={16} />, label: "Members", value: "12" },
              { icon: <BarChart3 size={16} />, label: "Utilization", value: "87%" },
              { icon: <Zap size={16} />, label: "Velocity", value: "34 pts" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: 14,
                  borderRadius: 8,
                  background: "rgb(var(--surface-raised))",
                  border: "1px solid rgb(var(--border-subtle))",
                }}
              >
                <div style={{ color: "rgb(var(--accent))", marginBottom: 8 }}>{stat.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: "rgb(var(--text-tertiary))", marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Glass overlay */}
        {!unlocked && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
              background: "rgb(var(--surface) / 0.72)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
              borderRadius: 12,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgb(var(--accent) / 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgb(var(--accent))",
              }}
            >
              <Lock size={20} />
            </div>

            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Team Insights</p>
              <p style={{ fontSize: 12, color: "rgb(var(--text-secondary))", maxWidth: 220 }}>
                See how your team is performing across all projects.
              </p>
            </div>

            <button
              onClick={() => setUnlocked(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 18px",
                borderRadius: 8,
                background: "rgb(var(--accent))",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              <Sparkles size={14} />
              Upgrade to Pro
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PaywallFeatureRow({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "rgb(var(--accent) / 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgb(var(--accent))",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{title}</p>
        <p style={{ fontSize: 12, color: "rgb(var(--text-secondary))" }}>{description}</p>
      </div>
    </div>
  );
}

function SheetPaywallDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 20px",
          borderRadius: 8,
          background: "rgb(var(--accent))",
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
        }}
      >
        <Lock size={14} />
        Show paywall sheet
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: 24,
          }}
          onClick={() => setOpen(false)}
        >
          {/* Scrim */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />

          {/* Sheet */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 420,
              borderRadius: 16,
              background: "rgb(var(--surface))",
              border: "1px solid rgb(var(--border))",
              boxShadow: "var(--shadow-sheet)",
              overflow: "hidden",
            }}
          >
            {/* Specular top edge */}
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />

            <div style={{ padding: 28 }}>
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: "rgb(var(--accent) / 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgb(var(--accent))",
                    margin: "0 auto 12px",
                  }}
                >
                  <Shield size={24} />
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Upgrade to Pro</h2>
                <p style={{ fontSize: 14, color: "rgb(var(--text-secondary))" }}>
                  Unlock the full power of your workspace.
                </p>
              </div>

              {/* Features */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                <PaywallFeatureRow icon={<BarChart3 size={16} />} title="Advanced Analytics" description="Detailed insights into team performance and project health." />
                <PaywallFeatureRow icon={<Users size={16} />} title="Unlimited Members" description="Invite your entire team with no seat limits." />
                <PaywallFeatureRow icon={<Zap size={16} />} title="Priority Support" description="Get help from our team within 4 hours." />
              </div>

              {/* CTA */}
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  background: "rgb(var(--accent))",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  marginBottom: 10,
                }}
              >
                Start 14-day free trial
              </button>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: 10,
                  background: "transparent",
                  color: "rgb(var(--text-secondary))",
                  fontSize: 14,
                  border: "1px solid rgb(var(--border))",
                  cursor: "pointer",
                }}
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FeatureGatePage() {
  return (
    <div>
      <PageHeader
        title="Feature Gate"
        description="Locks premium content behind a glass overlay and provides a path to upgrade. Reuses surface and accent tokens; no new tokens required."
        badge="New"
      />

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Inline gate</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed">
          The inline variant blurs the locked content in place and overlays a glass CTA. Use this
          for feature sections within a larger screen — it preserves layout while signalling premium
          content.
        </p>
        <ComponentPreview>
          <InlineGateDemo />
        </ComponentPreview>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Sheet paywall</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed">
          The sheet variant opens a focused modal with feature highlights and a pricing CTA. Use
          this when the user explicitly triggers a locked action, such as tapping a locked nav item.
        </p>
        <ComponentPreview>
          <SheetPaywallDemo />
        </ComponentPreview>
      </section>

      <section className="mb-10 mt-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Layer</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Description</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Token</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Blur content</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Children rendered at blur(4px) with pointer-events disabled</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">—</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Glass surface</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">backdrop-filter blur(20px) saturate(160%)</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--surface-glass</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Specular edge</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">inset 0 1px 0 rgba(255,255,255,0.08) — hairline on top</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">—</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Icon well</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">44×44 rounded rect, accent-tinted background</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--accent / 0.15</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Upgrade button</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Solid accent fill, white label</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--accent</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Usage guidelines</h2>
        <ul className="list-disc list-inside space-y-2 text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          <li>Always show enough of the locked content to communicate value — don&apos;t hide it entirely.</li>
          <li>Keep the feature name concise (2–4 words). Put extra context in the description line.</li>
          <li>The upgrade CTA must always be visible and tappable, even on small screens.</li>
          <li>Apply <code className="font-mono text-[11px] text-[rgb(var(--accent))]">prefers-reduced-transparency</code> fallback: replace <code className="font-mono text-[11px] text-[rgb(var(--accent))]">backdrop-filter</code> with a solid <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--surface</code> background.</li>
          <li>Do not gate core navigation or destructive/dangerous actions — only feature upsells.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      <PropsTable props={PROPS} />
    </div>
  );
}
