import type { Meta, StoryObj } from "@storybook/react";
import { Gauge } from "@/components/ui/Gauge";

const meta: Meta<typeof Gauge> = {
  title: "Data/Gauge",
  component: Gauge,
  tags: ["autodocs"],
  args: { value: 68, label: "68%", sublabel: "Utilisation" },
  argTypes: { variant: { control: "select", options: ["auto", "success", "warning", "caution", "danger"] } },
};
export default meta;
type Story = StoryObj<typeof Gauge>;

export const Default: Story = {};
/** "auto" picks the colour from the value: under 70% success, then warning, caution, danger. */
export const AutoThresholds: Story = {
  render: () => (
    <div className="flex gap-6">
      {[45, 78, 92, 104].map((v) => (
        <Gauge key={v} value={v} label={`${v}%`} />
      ))}
    </div>
  ),
};
