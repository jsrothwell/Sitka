import type { Meta, StoryObj } from "@storybook/react";
import { Briefcase } from "lucide-react";
import { KPITile } from "@/components/ui/KPITile";

const meta: Meta<typeof KPITile> = {
  title: "Data/KPI Tile",
  component: KPITile,
  tags: ["autodocs"],
  args: {
    title: "Applications",
    value: 42,
    icon: <Briefcase className="h-5 w-5" />,
    trend: { value: 12, label: "vs last week", direction: "up" },
  },
  argTypes: { variant: { control: "select", options: ["default", "accent", "success", "warning", "danger"] } },
};
export default meta;
type Story = StoryObj<typeof KPITile>;

export const Default: Story = {};
export const WithProgress: Story = { args: { variant: "success", progress: 70, subtitle: "Weekly goal 60" } };
export const Declining: Story = { args: { variant: "danger", trend: { value: 8, label: "vs last week", direction: "down" } } };
