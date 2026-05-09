import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@/components/ui/Switch";

const meta: Meta<typeof Switch> = {
  title: "Inputs/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Off: Story = {
  args: { defaultChecked: false },
};

export const On: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: false },
};

export const DisabledOn: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[
        { label: "Email notifications", defaultChecked: true },
        { label: "SMS alerts", defaultChecked: false },
        { label: "Weekly digest", defaultChecked: true },
      ].map(({ label, defaultChecked }) => (
        <label key={label} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <Switch defaultChecked={defaultChecked} />
          <span style={{ fontSize: 13 }}>{label}</span>
        </label>
      ))}
    </div>
  ),
};
