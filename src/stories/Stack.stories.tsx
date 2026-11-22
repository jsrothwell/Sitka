import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "@/components/ui/Stack";

const Item = ({ n }: { n: number }) => (
  <div className="rounded-lg bg-[rgb(var(--surface-raised))] px-4 py-2 text-[13px] text-[rgb(var(--text-primary))]">Item {n}</div>
);

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  args: { gap: "3", direction: "col" },
  argTypes: {
    direction: { control: "inline-radio", options: ["col", "row"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around", "evenly"] },
  },
  render: (args) => (
    <Stack {...args}>
      <Item n={1} />
      <Item n={2} />
      <Item n={3} />
    </Stack>
  ),
};
export default meta;
type Story = StoryObj<typeof Stack>;

export const Column: Story = {};
export const Row: Story = { args: { direction: "row", align: "center" } };
