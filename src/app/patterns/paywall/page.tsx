"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

const PLANS = [
  {
    id: "free",
    name: "Free",
    description: "Get started at no cost",
    monthly: 0,
    yearly: 0,
    features: ["Up to 20 items", "Basic analytics", "1 workspace"],
    missing: ["Unlimited items", "Advanced analytics", "Team workspaces", "Priority support"],
    cta: "Current plan",
    ctaDisabled: true,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For power users who need more",
    monthly: 12,
    yearly: 9,
    features: ["Unlimited items", "Advanced analytics", "5 workspaces", "Priority support", "Custom integrations"],
    missing: [],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    description: "For teams and organizations",
    monthly: 29,
    yearly: 23,
    features: ["Everything in Pro", "Unlimited workspaces", "SSO & audit logs", "Dedicated CSM", "Custom SLA"],
    missing: [],
    cta: "Contact Sales",
  },
];

const CODE = {
  react: {
    filename: "Paywall.tsx",
    code: `"use client";

import { useState } from "react";

interface Plan {
  id: string;
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  features: string[];
  cta: string;
  popular?: boolean;
  ctaDisabled?: boolean;
}

interface PaywallProps {
  plans: Plan[];
  currentPlanId?: string;
  onUpgrade?: (planId: string, billing: "monthly" | "yearly") => void;
  onDismiss?: () => void;
}

export function Paywall({ plans, currentPlanId, onUpgrade, onDismiss }: PaywallProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
      className="flex flex-col items-center gap-8 rounded-2xl border border-[rgb(var(--border))]
                 bg-[rgb(var(--surface))] p-8 shadow-2xl max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 id="paywall-title" className="text-[22px] font-bold text-[rgb(var(--text-primary))]">
          Unlock everything
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))]">
          You&apos;ve hit the free plan limit. Upgrade to keep going.
        </p>
      </div>

      {/* Billing toggle */}
      <div className="flex items-center gap-2 rounded-full border border-[rgb(var(--border))]
                      bg-[rgb(var(--surface-raised))] p-1">
        {(["monthly", "yearly"] as const).map((period) => (
          <button
            key={period}
            onClick={() => setBilling(period)}
            className={\`relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium
                        transition-all \${billing === period
                          ? "bg-[rgb(var(--surface))] shadow-sm text-[rgb(var(--text-primary))]"
                          : "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]"
                        }\`}
            aria-pressed={billing === period}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
            {period === "yearly" && (
              <span className="rounded-full bg-[rgb(var(--status-success))] px-1.5 py-0.5
                               text-[10px] font-bold text-white">
                −25%
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Plan cards */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {plans.map((plan) => {
          const price = billing === "yearly" ? plan.yearly : plan.monthly;
          const isActive = plan.id === currentPlanId;
          return (
            <div
              key={plan.id}
              className={\`relative flex flex-col gap-4 rounded-xl border p-5
                          \${plan.popular
                            ? "border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))]"
                            : "border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]"
                          }\`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full
                                 border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent))]
                                 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-[15px] font-semibold text-[rgb(var(--text-primary))]">
                  {plan.name}
                </h3>
                <p className="text-[12px] text-[rgb(var(--text-tertiary))]">{plan.description}</p>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-[28px] font-bold leading-none text-[rgb(var(--text-primary))]">
                  {price === 0 ? "Free" : \`$\${price}\`}
                </span>
                {price > 0 && (
                  <span className="mb-0.5 text-[12px] text-[rgb(var(--text-tertiary))]">/mo</span>
                )}
              </div>
              <ul className="flex-1 space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px] text-[rgb(var(--text-secondary))]">
                    <span className="text-[rgb(var(--status-success))]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                disabled={plan.ctaDisabled || isActive}
                onClick={() => onUpgrade?.(plan.id, billing)}
                className={\`w-full rounded-lg py-2 text-[13px] font-semibold transition-all
                            \${plan.popular
                              ? "bg-[rgb(var(--accent))] text-white hover:opacity-90"
                              : "bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))]"
                            }
                            disabled:opacity-50 disabled:cursor-not-allowed\`}
              >
                {isActive ? "Current plan" : plan.cta}
              </button>
            </div>
          );
        })}
      </div>

      {/* Dismiss link */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-[12px] text-[rgb(var(--text-tertiary))] underline underline-offset-2
                     hover:text-[rgb(var(--text-secondary))]"
        >
          Maybe later
        </button>
      )}
    </div>
  );
}`,
  },
  html: {
    filename: "paywall.html",
    code: `<div class="paywall" role="dialog" aria-modal="true" aria-labelledby="paywall-title">
  <!-- Header -->
  <header class="paywall__header">
    <h2 id="paywall-title" class="paywall__title">Unlock everything</h2>
    <p class="paywall__subtitle">You've hit the free plan limit. Upgrade to keep going.</p>
  </header>

  <!-- Billing toggle -->
  <div class="billing-toggle" role="group" aria-label="Billing period">
    <button class="billing-toggle__option billing-toggle__option--active"
            data-period="monthly" aria-pressed="true">
      Monthly
    </button>
    <button class="billing-toggle__option" data-period="yearly" aria-pressed="false">
      Yearly
      <span class="billing-toggle__badge">−25%</span>
    </button>
  </div>

  <!-- Plan cards -->
  <div class="paywall__plans">
    <div class="plan-card">
      <h3 class="plan-card__name">Free</h3>
      <p class="plan-card__description">Get started at no cost</p>
      <div class="plan-card__price">Free</div>
      <ul class="plan-card__features">
        <li>✓ Up to 20 items</li>
        <li>✓ Basic analytics</li>
        <li>✓ 1 workspace</li>
      </ul>
      <button class="plan-card__cta" disabled>Current plan</button>
    </div>

    <div class="plan-card plan-card--popular">
      <span class="plan-card__badge">Most Popular</span>
      <h3 class="plan-card__name">Pro</h3>
      <p class="plan-card__description">For power users who need more</p>
      <div class="plan-card__price">
        <span class="plan-card__amount" data-monthly="12" data-yearly="9">$12</span>
        <span class="plan-card__period">/mo</span>
      </div>
      <ul class="plan-card__features">
        <li>✓ Unlimited items</li>
        <li>✓ Advanced analytics</li>
        <li>✓ 5 workspaces</li>
        <li>✓ Priority support</li>
      </ul>
      <button class="plan-card__cta plan-card__cta--primary">Upgrade to Pro</button>
    </div>

    <div class="plan-card">
      <h3 class="plan-card__name">Business</h3>
      <p class="plan-card__description">For teams and organizations</p>
      <div class="plan-card__price">
        <span class="plan-card__amount" data-monthly="29" data-yearly="23">$29</span>
        <span class="plan-card__period">/mo</span>
      </div>
      <ul class="plan-card__features">
        <li>✓ Everything in Pro</li>
        <li>✓ Unlimited workspaces</li>
        <li>✓ SSO & audit logs</li>
        <li>✓ Dedicated CSM</li>
      </ul>
      <button class="plan-card__cta">Contact Sales</button>
    </div>
  </div>

  <button class="paywall__dismiss">Maybe later</button>
</div>

<script>
document.querySelectorAll(".billing-toggle__option").forEach(btn => {
  btn.addEventListener("click", () => {
    const period = btn.dataset.period;
    document.querySelectorAll(".billing-toggle__option").forEach(b => {
      b.classList.toggle("billing-toggle__option--active", b.dataset.period === period);
      b.setAttribute("aria-pressed", String(b.dataset.period === period));
    });
    document.querySelectorAll(".plan-card__amount").forEach(el => {
      el.textContent = "$" + el.dataset[period];
    });
  });
});
</script>`,
  },
  swift: {
    filename: "PaywallView.swift",
    code: `import SwiftUI
import StoreKit

struct PaywallView: View {
    @State private var billing: BillingPeriod = .monthly
    @Environment(\\.dismiss) private var dismiss

    enum BillingPeriod { case monthly, yearly }

    struct Plan: Identifiable {
        let id: String
        let name: String
        let description: String
        let monthlyPrice: Double
        let yearlyPrice: Double
        let features: [String]
        var popular: Bool = false
        var isCurrent: Bool = false
    }

    let plans: [Plan] = [
        Plan(id: "free", name: "Free", description: "Get started at no cost",
             monthlyPrice: 0, yearlyPrice: 0,
             features: ["Up to 20 items", "Basic analytics", "1 workspace"],
             isCurrent: true),
        Plan(id: "pro", name: "Pro", description: "For power users",
             monthlyPrice: 12, yearlyPrice: 9,
             features: ["Unlimited items", "Advanced analytics", "5 workspaces", "Priority support"],
             popular: true),
        Plan(id: "business", name: "Business", description: "For teams",
             monthlyPrice: 29, yearlyPrice: 23,
             features: ["Everything in Pro", "Unlimited workspaces", "SSO & audit logs"]),
    ]

    var body: some View {
        VStack(spacing: 28) {
            // Dismiss handle
            Capsule()
                .fill(Color(.systemFill))
                .frame(width: 36, height: 4)

            // Header
            VStack(spacing: 6) {
                Text("Unlock everything")
                    .font(.title2.bold())
                Text("You've hit the free plan limit. Upgrade to keep going.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }

            // Billing toggle
            Picker("Billing", selection: $billing) {
                Text("Monthly").tag(BillingPeriod.monthly)
                HStack {
                    Text("Yearly")
                    Text("−25%")
                        .font(.system(size: 10, weight: .bold))
                        .padding(.horizontal, 5)
                        .padding(.vertical, 2)
                        .background(Color.green)
                        .foregroundColor(.white)
                        .clipShape(Capsule())
                }.tag(BillingPeriod.yearly)
            }
            .pickerStyle(.segmented)
            .padding(.horizontal)

            // Plan cards
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 12) {
                    ForEach(plans) { plan in
                        PlanCard(plan: plan, billing: billing)
                    }
                }
                .padding(.horizontal)
            }

            // Dismiss
            Button("Maybe later") { dismiss() }
                .font(.footnote)
                .foregroundStyle(.secondary)

            Spacer()
        }
        .padding(.top)
    }
}

struct PlanCard: View {
    let plan: PaywallView.Plan
    let billing: PaywallView.BillingPeriod

    private var price: Double {
        billing == .yearly ? plan.yearlyPrice : plan.monthlyPrice
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            VStack(alignment: .leading, spacing: 2) {
                Text(plan.name)
                    .font(.headline)
                Text(plan.description)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            if price == 0 {
                Text("Free")
                    .font(.system(size: 28, weight: .bold, design: .rounded))
            } else {
                HStack(alignment: .lastTextBaseline, spacing: 2) {
                    Text("$\\(Int(price))")
                        .font(.system(size: 28, weight: .bold, design: .rounded))
                    Text("/mo")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                }
            }

            Divider()

            ForEach(plan.features, id: \\.self) { feature in
                Label(feature, systemImage: "checkmark.circle.fill")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .labelStyle(LeadingIconLabelStyle())
            }

            Spacer()

            Button(plan.isCurrent ? "Current plan" : (plan.id == "business" ? "Contact Sales" : "Upgrade")) {
                // purchase action
            }
            .buttonStyle(.borderedProminent)
            .tint(plan.popular ? .accentColor : .secondary)
            .disabled(plan.isCurrent)
            .frame(maxWidth: .infinity)
        }
        .padding()
        .frame(width: 180)
        .background(plan.popular ? Color.accentColor.opacity(0.08) : Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .stroke(plan.popular ? Color.accentColor.opacity(0.4) : Color(.separator), lineWidth: 1)
        )
        .overlay(alignment: .top) {
            if plan.popular {
                Text("Most Popular")
                    .font(.system(size: 10, weight: .bold))
                    .padding(.horizontal, 8).padding(.vertical, 3)
                    .background(Color.accentColor)
                    .foregroundColor(.white)
                    .clipShape(Capsule())
                    .offset(y: -12)
            }
        }
    }
}

struct LeadingIconLabelStyle: LabelStyle {
    func makeBody(configuration: Configuration) -> some View {
        HStack(spacing: 6) {
            configuration.icon.foregroundStyle(.green)
            configuration.title
        }
    }
}

#Preview {
    PaywallView()
}`,
  },
  macos: {
    filename: "PaywallView+macOS.swift",
    code: `import SwiftUI

// macOS — sheet presentation with side-by-side plan columns.
// Same data model as iOS; different layout for the wider canvas.

struct MacPaywallView: View {
    @State private var billing: BillingPeriod = .monthly
    @Environment(\\.dismiss) private var dismiss

    enum BillingPeriod { case monthly, yearly }

    var body: some View {
        VStack(spacing: 24) {
            // Header
            VStack(spacing: 4) {
                Text("Unlock everything")
                    .font(.title.bold())
                Text("You've hit the free plan limit.")
                    .foregroundStyle(.secondary)
            }

            // Billing toggle
            Picker("Billing period", selection: $billing) {
                Text("Monthly").tag(BillingPeriod.monthly)
                Text("Yearly  (save 25%)").tag(BillingPeriod.yearly)
            }
            .pickerStyle(.segmented)
            .frame(maxWidth: 320)

            // Plans side by side
            HStack(alignment: .top, spacing: 16) {
                MacPlanCard(name: "Free",     price: billing == .yearly ? 0  : 0,  popular: false, isCurrent: true,
                            features: ["Up to 20 items", "Basic analytics", "1 workspace"])
                MacPlanCard(name: "Pro",      price: billing == .yearly ? 9  : 12, popular: true,
                            features: ["Unlimited items", "Advanced analytics", "5 workspaces", "Priority support"])
                MacPlanCard(name: "Business", price: billing == .yearly ? 23 : 29, popular: false,
                            features: ["Everything in Pro", "Unlimited workspaces", "SSO & audit logs", "Dedicated CSM"])
            }

            Button("Maybe later, I'll stay on Free") { dismiss() }
                .buttonStyle(.plain)
                .foregroundStyle(.secondary)
                .font(.footnote)
        }
        .padding(32)
        .frame(width: 680)
    }
}

struct MacPlanCard: View {
    let name: String
    let price: Int
    var popular: Bool = false
    var isCurrent: Bool = false
    let features: [String]

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            if popular {
                Text("Most Popular")
                    .font(.system(size: 10, weight: .bold))
                    .padding(.horizontal, 8).padding(.vertical, 3)
                    .background(Color.accentColor)
                    .foregroundColor(.white)
                    .clipShape(Capsule())
            }

            Text(name).font(.headline)

            Group {
                if price == 0 {
                    Text("Free").font(.system(size: 26, weight: .bold))
                } else {
                    HStack(alignment: .lastTextBaseline, spacing: 2) {
                        Text("$\\(price)").font(.system(size: 26, weight: .bold))
                        Text("/mo").font(.footnote).foregroundStyle(.secondary)
                    }
                }
            }

            Divider()

            ForEach(features, id: \\.self) { f in
                Label(f, systemImage: "checkmark.circle.fill")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Spacer(minLength: 0)

            Button(isCurrent ? "Current plan" : (name == "Business" ? "Contact Sales" : "Upgrade to \\(name)")) {}
                .buttonStyle(.borderedProminent)
                .tint(popular ? .accentColor : .secondary)
                .disabled(isCurrent)
                .controlSize(.regular)
                .frame(maxWidth: .infinity)
        }
        .padding()
        .frame(maxWidth: .infinity, minHeight: 280)
        .background(popular ? Color.accentColor.opacity(0.07) : Color(.controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous)
            .stroke(popular ? Color.accentColor.opacity(0.35) : Color(.separatorColor)))
    }
}

#Preview {
    MacPaywallView()
        .frame(width: 680)
}`,
  },
};

export default function PaywallPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [dismissed, setDismissed] = useState(false);
  const [upgraded, setUpgraded] = useState<string | null>(null);

  return (
    <div>
      <PageHeader
        title="Paywall / In-App Upsell"
        description="Full-screen upgrade prompt that appears when a user hits a feature gate or usage limit. Combines a billing period toggle, tiered plan cards, and a soft dismiss path to minimize friction while maximising conversion."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-6">
          {upgraded ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <span className="text-4xl">🎉</span>
              <p className="text-[16px] font-semibold text-[rgb(var(--text-primary))]">
                You&apos;re now on {upgraded.charAt(0).toUpperCase() + upgraded.slice(1)}!
              </p>
              <button
                onClick={() => { setUpgraded(null); setDismissed(false); }}
                className="text-[12px] text-[rgb(var(--accent))] underline underline-offset-2"
              >
                Reset demo
              </button>
            </div>
          ) : dismissed ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <p className="text-[14px] text-[rgb(var(--text-secondary))]">Paywall dismissed.</p>
              <button
                onClick={() => setDismissed(false)}
                className="text-[12px] text-[rgb(var(--accent))] underline underline-offset-2"
              >
                Show again
              </button>
            </div>
          ) : (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="demo-paywall-title"
              className="flex flex-col items-center gap-6 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-8 max-w-2xl mx-auto shadow-lg"
            >
              <div className="text-center space-y-2">
                <h2 id="demo-paywall-title" className="text-[20px] font-bold text-[rgb(var(--text-primary))]">
                  Unlock everything
                </h2>
                <p className="text-[13px] text-[rgb(var(--text-secondary))]">
                  You&apos;ve hit the 20-item limit on Free. Upgrade to keep going.
                </p>
              </div>

              {/* Billing toggle */}
              <div className="flex items-center gap-0.5 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-1">
                {(["monthly", "yearly"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setBilling(period)}
                    aria-pressed={billing === period}
                    className={[
                      "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium transition-all",
                      billing === period
                        ? "bg-[rgb(var(--surface))] shadow-sm text-[rgb(var(--text-primary))]"
                        : "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]",
                    ].join(" ")}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                    {period === "yearly" && (
                      <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                        −25%
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Plan cards */}
              <div className="grid w-full grid-cols-3 gap-3">
                {PLANS.map((plan) => {
                  const price = billing === "yearly" ? plan.yearly : plan.monthly;
                  return (
                    <div
                      key={plan.id}
                      className={[
                        "relative flex flex-col gap-3 rounded-xl border p-4",
                        plan.popular
                          ? "border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))]"
                          : "border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",
                      ].join(" ")}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent))] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                          Most Popular
                        </span>
                      )}
                      <div>
                        <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">{plan.name}</p>
                        <p className="text-[11px] text-[rgb(var(--text-tertiary))]">{plan.description}</p>
                      </div>
                      <div className="flex items-end gap-0.5">
                        <span className="text-[24px] font-bold leading-none text-[rgb(var(--text-primary))]">
                          {price === 0 ? "Free" : `$${price}`}
                        </span>
                        {price > 0 && (
                          <span className="mb-0.5 text-[11px] text-[rgb(var(--text-tertiary))]">/mo</span>
                        )}
                      </div>
                      <ul className="flex-1 space-y-1">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-1.5 text-[12px] text-[rgb(var(--text-secondary))]">
                            <span className="mt-0.5 shrink-0 text-emerald-500">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        disabled={plan.ctaDisabled}
                        onClick={() => !plan.ctaDisabled && setUpgraded(plan.id)}
                        className={[
                          "w-full rounded-lg py-1.5 text-[12px] font-semibold transition-all",
                          plan.popular
                            ? "bg-[rgb(var(--accent))] text-white hover:opacity-90"
                            : "border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))]",
                          plan.ctaDisabled ? "opacity-50 cursor-not-allowed" : "",
                        ].join(" ")}
                      >
                        {plan.cta}
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setDismissed(true)}
                className="text-[12px] text-[rgb(var(--text-tertiary))] underline underline-offset-2 hover:text-[rgb(var(--text-secondary))]"
              >
                Maybe later
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Every paywall screen has the same six structural zones. Keep all six visible — omitting the dismiss path or the billing toggle measurably hurts conversion.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Zone", "Purpose", "Required"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Trigger copy", "1–2 sentences naming the limit the user hit. Be specific — 'You've reached 20 items' outperforms 'Upgrade for more'.", "Yes"],
                ["Billing toggle", "Monthly / Yearly switcher. Show the savings percentage on the annual option to push the higher-LTV choice.", "Yes"],
                ["Plan cards", "2–3 tiers. Highlight one as 'Most Popular'. Show the price, feature list, and a single CTA per card.", "Yes"],
                ["Current plan indicator", "Disable the CTA on the user's active tier. Never let them re-purchase what they already have.", "Yes"],
                ["Primary CTA", "The recommended upgrade action. Use full-width buttons so the tap target is easy to hit on mobile.", "Yes"],
                ["Dismiss path", "'Maybe later' or 'Continue with Free'. Small, low-contrast, but always present. Friction creates resentment.", "Yes"],
              ].map(([zone, purpose, req], i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{zone}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{purpose}</td>
                  <td className="px-4 py-3 text-emerald-500 font-semibold">{req}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* When to use */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">When to use</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              heading: "Usage limit reached",
              body: "Trigger the paywall when the user attempts an action they can't complete on their current plan — adding the 21st item, running a second workspace, exporting a report.",
              good: true,
            },
            {
              heading: "Feature gate",
              body: "Show a locked state on the feature itself (a lock icon, greyed-out card) and let the user choose to learn more. The paywall appears after they tap the locked element, not before.",
              good: true,
            },
            {
              heading: "Forced on first launch",
              body: "Don't show the paywall before the user has experienced the product. They have no frame of reference for the value proposition.",
              good: false,
            },
            {
              heading: "Repeated interruptions",
              body: "After a dismiss, suppress the full paywall for at least 48 hours. Use a subtle banner or badge instead.",
              good: false,
            },
          ].map(({ heading, body, good }) => (
            <div
              key={heading}
              className={`rounded-xl border p-4 ${good ? "border-[rgb(var(--border))]" : "border-[rgb(var(--status-danger))]/30 bg-[rgb(var(--status-danger))]/5"}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={good ? "text-emerald-500" : "text-red-400"}>{good ? "✓" : "✗"}</span>
                <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{heading}</p>
              </div>
              <p className="text-[13px] text-[rgb(var(--text-secondary))]">{body}</p>
            </div>
          ))}
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
            "Wrap the paywall in role='dialog' aria-modal='true' and move focus to the heading on open so screen reader users are immediately aware of the context change.",
            "The billing toggle must use aria-pressed (toggle buttons) or a proper <fieldset>/<legend> with radio inputs — not two plain buttons.",
            "Each plan card's CTA must include the plan name in its accessible label: 'Upgrade to Pro' not just 'Upgrade', since multiple upgrade buttons share a page.",
            "The 'Maybe later' link must remain reachable via Tab. Never trap users in the paywall without an accessible exit.",
            "Price amounts must use aria-label to convey currency: aria-label='$12 per month' not just '12'.",
          ].map((item) => (
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
