import type { Meta, StoryObj } from "@storybook/react";
import { PricingTable, FeatureComparison } from "@/components/ui/PricingTable";
import type { PricingTier } from "@/components/ui/PricingTable";

const meta: Meta<typeof PricingTable> = {
  title: "Marketing/PricingTable",
  component: PricingTable,
  tags: ["autodocs"],
  argTypes: {
    showBillingToggle: { control: "boolean" },
    defaultBilling: { control: "select", options: ["monthly", "yearly"] },
  },
};

export default meta;
type Story = StoryObj<typeof PricingTable>;

const tiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    description: "For individuals and small experiments",
    price: { monthly: "$0", yearly: "$0" },
    cta: { label: "Get started", variant: "secondary" },
    features: [
      { name: "Up to 3 projects", included: true },
      { name: "5 GB storage", included: true },
      { name: "Basic analytics", included: true },
      { name: "Email support", included: false },
      { name: "Team collaboration", included: false },
      { name: "Custom domain", included: false },
      { name: "Priority support", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams and serious projects",
    price: { monthly: 19, yearly: 15 },
    cta: { label: "Start free trial" },
    popular: true,
    features: [
      { name: "Unlimited projects", included: true },
      { name: "50 GB storage", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Email support", included: true },
      { name: "Team collaboration", included: true },
      { name: "Custom domain", included: true },
      { name: "Priority support", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large-scale organizations",
    price: { monthly: "Custom", yearly: "Custom" },
    cta: { label: "Contact sales", variant: "ghost" },
    features: [
      { name: "Unlimited projects", included: true },
      { name: "Unlimited storage", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority email & phone", included: true },
      { name: "Team collaboration", included: true },
      { name: "Custom domain", included: true },
      { name: "Priority support", included: true },
    ],
  },
];

export const Default: Story = {
  render: () => <PricingTable tiers={tiers} />,
};

export const WithBillingToggle: Story = {
  render: () => <PricingTable tiers={tiers} showBillingToggle defaultBilling="monthly" />,
};

export const Comparison: Story = {
  render: () => (
    <FeatureComparison
      tiers={[
        { id: "free", name: "Free" },
        { id: "pro", name: "Pro", highlight: true },
        { id: "enterprise", name: "Enterprise" },
      ]}
      features={[
        { name: "Projects", tiers: { free: "3", pro: "Unlimited", enterprise: "Unlimited" } },
        { name: "Storage", tiers: { free: "5 GB", pro: "50 GB", enterprise: "Unlimited" } },
        { name: "Team members", tiers: { free: false, pro: true, enterprise: true } },
        { name: "Custom domain", tiers: { free: false, pro: true, enterprise: true } },
        { name: "Analytics", tiers: { free: "Basic", pro: "Advanced", enterprise: "Advanced" } },
        { name: "Priority support", tiers: { free: false, pro: false, enterprise: true } },
        { name: "SLA guarantee", tiers: { free: false, pro: false, enterprise: true } },
      ]}
    />
  ),
};
