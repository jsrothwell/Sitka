import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@/components/ui/Progress";

const meta: Meta<typeof Progress> = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: { value: 64, label: "Upload progress" },
  argTypes: {
    variant: { control: "select", options: ["default", "success", "warning", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {};
export const WithValue: Story = { args: { showValue: true } };
export const Indeterminate: Story = { args: { indeterminate: true, label: "Loading" } };
export const AllVariants: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      {(["default", "success", "warning", "danger"] as const).map((v) => (
        <Progress key={v} variant={v} value={72} label={`${v} progress`} />
      ))}
    </div>
  ),
};
