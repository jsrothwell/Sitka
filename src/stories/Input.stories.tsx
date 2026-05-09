import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/Input";

const meta: Meta<typeof Input> = {
  title: "Inputs/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "url"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Enter text…" },
};

export const WithValue: Story = {
  args: { defaultValue: "Jamie Rothwell" },
};

export const Email: Story = {
  args: { type: "email", placeholder: "you@example.com" },
};

export const Password: Story = {
  args: { type: "password", placeholder: "••••••••" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Locked value" },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label htmlFor="demo-input" style={{ fontSize: 13, fontWeight: 500 }}>
        Email address
      </label>
      <Input id="demo-input" type="email" placeholder="you@example.com" />
    </div>
  ),
};
