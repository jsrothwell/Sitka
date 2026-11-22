import type { Meta, StoryObj } from "@storybook/react";
import { ContextMenu } from "@/components/ui/ContextMenu";

const meta: Meta<typeof ContextMenu> = {
  title: "Overlays/Context Menu",
  component: ContextMenu,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ContextMenu>;

/** Right-click (or long-press) the card to open the menu. */
export const Default: Story = {
  args: {
    items: [
      { label: "Open", shortcut: "↵", onSelect: () => {} },
      { label: "Duplicate", shortcut: "⌘D", onSelect: () => {} },
      { type: "separator" },
      { label: "Delete", destructive: true, onSelect: () => {} },
    ],
    children: (
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-8 text-[13px] text-[rgb(var(--text-secondary))]">
        Right-click here
      </div>
    ),
  },
};
