import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "@/components/ui/Select";

const meta: Meta<typeof Select> = {
  title: "Inputs/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const roleOptions = (
  <>
    <option value="admin">Admin</option>
    <option value="editor">Editor</option>
    <option value="viewer">Viewer</option>
  </>
);

export const Default: Story = {
  args: {
    label: "Role",
    placeholder: "Select a role…",
    children: roleOptions,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Timezone",
    helperText: "All times will be shown in this timezone.",
    children: (
      <>
        <option value="utc">UTC</option>
        <option value="est">Eastern (UTC-5)</option>
        <option value="pst">Pacific (UTC-8)</option>
      </>
    ),
  },
};

export const WithError: Story = {
  args: {
    label: "Country",
    error: "Please select a country.",
    children: (
      <>
        <option value="us">United States</option>
        <option value="gb">United Kingdom</option>
        <option value="au">Australia</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    label: "Plan",
    disabled: true,
    children: <option value="pro">Pro</option>,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Select key={size} label={`Size: ${size}`} size={size}>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </Select>
      ))}
    </div>
  ),
};
