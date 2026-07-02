"use client";

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib";
import { Button } from "./Button";
import { CheckIcon, XIcon } from "@phosphor-icons/react";

export interface PricingTier {
  id: string;
  name: string;
  description?: string;
  price: {
    monthly?: number | string;
    yearly?: number | string;
  };
  features: Array<{
    name: string;
    included: boolean;
    note?: string;
  }>;
  cta?: {
    label: string;
    variant?: "primary" | "secondary" | "ghost";
  };
  popular?: boolean;
}

export interface PricingTableProps {
  tiers: PricingTier[];
  /** Whether to display toggle for monthly/yearly */
  showBillingToggle?: boolean;
  /** Default billing period */
  defaultBilling?: "monthly" | "yearly";
  /** On billing toggle change */
  onBillingChange?: (period: "monthly" | "yearly") => void;
  /** Custom class for container */
  className?: string;
}

export function PricingTable({
  tiers,
  showBillingToggle = false,
  defaultBilling = "monthly",
  onBillingChange,
  className,
}: PricingTableProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">(defaultBilling);

  const handleToggle = (newBilling: "monthly" | "yearly") => {
    setBilling(newBilling);
    onBillingChange?.(newBilling);
  };

  return (
    <div className={cn("w-full", className)}>
      {showBillingToggle && (
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className={cn("text-sm font-medium", billing === "monthly" ? "text-[rgb(var(--text-primary))]" : "text-[rgb(var(--text-secondary))]")}>
            Monthly
          </span>
          <button
            type="button"
            onClick={() => handleToggle(billing === "monthly" ? "yearly" : "monthly")}
            className={cn(
              "relative w-12 h-7 rounded-full transition-colors",
              billing === "yearly" ? "bg-[rgb(var(--accent))]" : "bg-[rgb(var(--border))]"
            )}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
              style={{ left: billing === "monthly" ? 4 : 28 }}
            />
          </button>
          <span className={cn("text-sm font-medium flex items-center gap-1", billing === "yearly" ? "text-[rgb(var(--text-primary))]" : "text-[rgb(var(--text-secondary))]")}>
            Yearly
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]">
              -20%
            </span>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={cn(
              "relative flex flex-col rounded-2xl p-6 border transition-all",
              tier.popular
                ? "bg-[rgb(var(--surface-raised))] border-[rgb(var(--accent))] shadow-[0_0_0_1px_rgba(0,192,232,0.3),0_8px_32px_rgba(0,192,232,0.12)]"
                : "bg-[rgb(var(--surface))] border-[rgb(var(--border))] hover:border-[rgb(var(--accent-muted))]",
              "hover:shadow-[var(--shadow-lg)]"
            )}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-[rgb(var(--accent))] text-white">
                Most Popular
              </div>
            )}

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))]">{tier.name}</h3>
              {tier.description && (
                <p className="mt-1 text-sm text-[rgb(var(--text-secondary))]">{tier.description}</p>
              )}

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[rgb(var(--text-primary))]">
                  {billing === "monthly" ? tier.price.monthly : tier.price.yearly}
                </span>
                {typeof tier.price.monthly === "number" && (
                  <span className="text-sm text-[rgb(var(--text-tertiary))]">/month</span>
                )}
              </div>

              {tier.cta && (
                <Button
                  variant={tier.cta.variant || (tier.popular ? "primary" : "secondary")}
                  className="w-full mt-6"
                  onClick={() => {}}
                >
                  {tier.cta.label}
                </Button>
              )}
            </div>

            <ul className="mt-6 space-y-3">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  {feature.included ? (
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[rgb(var(--accent-subtle))] flex items-center justify-center mt-0.5">
                      <CheckIcon className="w-3 h-3 text-[rgb(var(--accent))]" weight="bold" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[rgb(var(--surface-hover))] flex items-center justify-center mt-0.5">
                      <XIcon className="w-3 h-3 text-[rgb(var(--text-tertiary))]" weight="bold" />
                    </div>
                  )}
                  <div className="flex-1">
                    <span className={cn("text-sm", feature.included ? "text-[rgb(var(--text-primary))]" : "text-[rgb(var(--text-tertiary))]")}>
                      {feature.name}
                    </span>
                    {feature.note && (
                      <p className="text-xs text-[rgb(var(--text-tertiary))] mt-0.5">{feature.note}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

PricingTable.displayName = "PricingTable";

// Simple feature comparison table variant
export interface FeatureComparisonProps {
  features: Array<{
    name: string;
    description?: string;
    tiers: Record<string, boolean | string | null>;
  }>;
  tiers: Array<{ id: string; name: string; highlight?: boolean }>;
  className?: string;
}

export function FeatureComparison({ features, tiers, className }: FeatureComparisonProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="text-left py-3 px-4 text-sm font-medium text-[rgb(var(--text-tertiary))]">Feature</th>
            {tiers.map((tier) => (
              <th
                key={tier.id}
                className={cn(
                  "text-center py-3 px-4 text-sm font-semibold",
                  tier.highlight ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-primary))]"
                )}
              >
                {tier.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, i) => (
            <tr
              key={i}
              className={cn(i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-transparent", "border-b border-[rgb(var(--border-subtle))]")}
            >
              <td className="py-3 px-4">
                <div>
                  <div className="text-sm text-[rgb(var(--text-primary))]">{feature.name}</div>
                  {feature.description && (
                    <div className="text-xs text-[rgb(var(--text-tertiary))] mt-0.5">{feature.description}</div>
                  )}
                </div>
              </td>
              {tiers.map((tier) => {
                const value = feature.tiers[tier.id];
                return (
                  <td key={tier.id} className="py-3 px-4 text-center">
                    {typeof value === "boolean" ? (
                      value ? (
                        <CheckIcon className="w-5 h-5 mx-auto text-[rgb(var(--accent))]" weight="bold" />
                      ) : (
                        <XIcon className="w-5 h-5 mx-auto text-[rgb(var(--text-tertiary))]" weight="bold" />
                      )
                    ) : (
                      <span className="text-sm text-[rgb(var(--text-secondary))]">{value}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FeatureComparison.displayName = "FeatureComparison";
