import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@/components/ui/Card";

const meta: Meta<typeof Card> = {
  title: "Display/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "elevated", "ghost", "accent"] },
    interactive: { control: "boolean" },
    as: { control: "select", options: ["div", "button", "a"] },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: "default",
    children: (
      <div style={{ padding: 20 }}>
        <p style={{ fontWeight: 600, marginBottom: 4 }}>Card title</p>
        <p style={{ color: "rgb(var(--text-secondary))", fontSize: 13 }}>Card body content goes here.</p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: <div style={{ padding: 20 }}><p style={{ fontWeight: 600 }}>Elevated card</p></div>,
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: <div style={{ padding: 20 }}><p style={{ fontWeight: 600 }}>Ghost card</p></div>,
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    children: <div style={{ padding: 20 }}><p style={{ fontWeight: 600 }}>Accent card</p></div>,
  },
};

export const Interactive: Story = {
  args: {
    variant: "default",
    interactive: true,
    as: "button",
    children: <div style={{ padding: 20 }}><p style={{ fontWeight: 600 }}>Click me</p><p style={{ fontSize: 13 }}>This card is interactive</p></div>,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
      {(["default", "elevated", "ghost", "accent"] as const).map((v) => (
        <Card key={v} variant={v}>
          <div style={{ padding: 16 }}>
            <p style={{ fontWeight: 600, textTransform: "capitalize" }}>{v}</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>variant="{v}"</p>
          </div>
        </Card>
      ))}
    </div>
  ),
};
