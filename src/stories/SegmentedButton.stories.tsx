import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SegmentedButton } from "@/components/ui/SegmentedButton";
import { Grid2x2, List, LayoutGrid } from "lucide-react";

const meta: Meta = {
  title: "Actions/SegmentedButton",
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("month");
    return (
      <SegmentedButton
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
          { value: "year", label: "Year" },
        ]}
        value={value}
        onChange={(v) => setValue(v as string)}
      />
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState("grid");
    return (
      <SegmentedButton
        options={[
          { value: "list", label: "List", icon: <List size={14} /> },
          { value: "grid", label: "Grid", icon: <Grid2x2 size={14} /> },
          { value: "kanban", label: "Kanban", icon: <LayoutGrid size={14} /> },
        ]}
        value={value}
        onChange={(v) => setValue(v as string)}
      />
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["bold"]);
    return (
      <SegmentedButton
        multiple
        options={[
          { value: "bold", label: "B" },
          { value: "italic", label: "I" },
          { value: "underline", label: "U" },
        ]}
        value={value}
        onChange={(v) => setValue(v as string[])}
      />
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const opts = [{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }, { value: "c", label: "Gamma" }];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {(["sm", "md", "lg"] as const).map((size) => (
          <SegmentedButton key={size} options={opts} value="a" onChange={() => {}} size={size} />
        ))}
      </div>
    );
  },
};
