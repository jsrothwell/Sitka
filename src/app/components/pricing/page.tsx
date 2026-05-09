import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PricingTable, FeatureComparison } from "@/components/ui/PricingTable";

export const metadata: Metadata = { title: "Pricing Table" };

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    description: "For individuals and small projects",
    price: { monthly: 0, yearly: 0 },
    features: [
      { name: "5 conversations/month", included: true },
      { name: "Basic AI models", included: true },
      { name: "Email support", included: false },
      { name: "API access", included: false },
    ],
    cta: { label: "Get Started", variant: "secondary" as const },
  },
  {
    id: "pro",
    name: "Pro",
    description: "For teams and power users",
    price: { monthly: 29, yearly: 23 },
    features: [
      { name: "Unlimited conversations", included: true },
      { name: "All AI models", included: true },
      { name: "Priority support", included: true },
      { name: "API access", included: true },
    ],
    cta: { label: "Start Pro Trial", variant: "primary" as const },
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For organizations with custom needs",
    price: { monthly: 99, yearly: 79 },
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Custom model fine-tuning", included: true },
      { name: "Dedicated support", included: true },
      { name: "SSO & audit logs", included: true },
    ],
    cta: { label: "Contact Sales", variant: "ghost" as const },
  },
];

const TABLE_PROPS = [
  { name: "tiers", type: "PricingTier[]", description: "Array of tier objects." },
  { name: "showBillingToggle", type: "boolean", default: "false", description: "Monthly/yearly toggle." },
  { name: "defaultBilling", type: '"monthly" | "yearly"', default: '"monthly"', description: "Initial billing period." },
  { name: "onBillingChange", type: "(period: string) => void", description: "Toggle callback." },
];

export default function PricingPage() {
  return (
    <div>
      <PageHeader
        title="Pricing Table"
        description="Flexible pricing card and feature comparison components. Supports monthly/yearly billing toggles, popular badge highlighting, and detailed feature lists."
      />

      {/* Simple cards */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Pricing cards</h2>
        <ComponentPreview className="p-6">
          <PricingTable tiers={TIERS} showBillingToggle={true} />
        </ComponentPreview>
      </section>

      {/* Without toggle */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Fixed billing</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Remove the toggle and show a single price per plan.
        </p>
        <ComponentPreview className="p-6">
          <PricingTable tiers={TIERS.map(t => ({
            ...t,
            price: { monthly: t.price.monthly }
          }))} />
        </ComponentPreview>
      </section>

      {/* Feature comparison table */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Feature comparison</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Tabular view for side-by-side feature matrix.
        </p>
        <ComponentPreview className="p-6 overflow-x-auto">
          <FeatureComparison
            tiers={[
              { id: "starter", name: "Starter" },
              { id: "pro", name: "Pro", highlight: true },
              { id: "enterprise", name: "Enterprise" },
            ]}
            features={[
              { name: "AI Assistant", tiers: { starter: true, pro: true, enterprise: true } },
              { name: "Code completion", tiers: { starter: false, pro: true, enterprise: true } },
              { name: "Custom models", tiers: { starter: false, pro: false, enterprise: true } },
              { name: "Support SLA", tiers: { starter: "48h", pro: "24h", enterprise: "1h" } },
            ]}
          />
        </ComponentPreview>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">PricingTable props</h2>
        <PropsTable props={TABLE_PROPS} />
      </section>

      {/* Tier shape */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">PricingTier shape</h2>
        <pre className="rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] p-4 text-sm text-[rgb(var(--text-secondary))] overflow-x-auto">
{`interface PricingTier {
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
  cta?: { label: string; variant?: "primary" | "secondary" | "ghost" };
  popular?: boolean;
}`}
        </pre>
      </section>

      {/* Best practices */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Best practices</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Highlight one plan as 'Most Popular' using the popular flag (accent border and glow).",
            "Show savings on yearly plan — '2 months free' language or percentage badge.",
            "Order plans low→high; three tiers is optimal.",
            "Features list should be scannable; use checkmarks for included, X for excluded.",
            "Free tier should always exist to lower barrier to entry.",
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
