import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Menubar } from "@/components/ui/Menubar";
import type { MenubarMenu } from "@/components/ui/Menubar";

const meta: Meta<typeof Menubar> = {
  title: "Navigation/Menubar",
  component: Menubar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  render: () => {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [showRuler, setShowRuler] = useState(true);

    const menus: MenubarMenu[] = [
      {
        label: "File",
        items: [
          { label: "New document", shortcut: "⌘N", onSelect: () => {} },
          { label: "Open…", shortcut: "⌘O", onSelect: () => {} },
          { label: "Save", shortcut: "⌘S", onSelect: () => {} },
          { type: "separator" },
          { label: "Export as PDF", onSelect: () => {} },
          { type: "separator" },
          { label: "Close", shortcut: "⌘W", onSelect: () => {} },
        ],
      },
      {
        label: "Edit",
        items: [
          { label: "Undo", shortcut: "⌘Z", onSelect: () => {} },
          { label: "Redo", shortcut: "⌘⇧Z", onSelect: () => {} },
          { type: "separator" },
          { label: "Cut", shortcut: "⌘X", onSelect: () => {} },
          { label: "Copy", shortcut: "⌘C", onSelect: () => {} },
          { label: "Paste", shortcut: "⌘V", onSelect: () => {} },
          { type: "separator" },
          { label: "Select All", shortcut: "⌘A", onSelect: () => {} },
        ],
      },
      {
        label: "Format",
        items: [
          { type: "check", label: "Bold", shortcut: "⌘B", checked: bold, onToggle: () => setBold((b) => !b) },
          { type: "check", label: "Italic", shortcut: "⌘I", checked: italic, onToggle: () => setItalic((b) => !b) },
          { type: "separator" },
          {
            type: "sub",
            label: "Alignment",
            items: [
              { label: "Left", onSelect: () => {} },
              { label: "Center", onSelect: () => {} },
              { label: "Right", onSelect: () => {} },
            ],
          },
        ],
      },
      {
        label: "View",
        items: [
          { type: "check", label: "Show Ruler", checked: showRuler, onToggle: () => setShowRuler((b) => !b) },
          { label: "Zoom In", shortcut: "⌘+", onSelect: () => {} },
          { label: "Zoom Out", shortcut: "⌘-", onSelect: () => {} },
          { type: "separator" },
          { label: "Full Screen", shortcut: "⌃⌘F", onSelect: () => {} },
        ],
      },
    ];

    return <Menubar menus={menus} />;
  },
};

export const Simple: Story = {
  render: () => {
    const menus: MenubarMenu[] = [
      {
        label: "App",
        items: [
          { label: "About", onSelect: () => {} },
          { type: "separator" },
          { label: "Preferences…", shortcut: "⌘,", onSelect: () => {} },
          { type: "separator" },
          { label: "Quit", shortcut: "⌘Q", onSelect: () => {} },
        ],
      },
      {
        label: "Help",
        items: [
          { label: "Documentation", onSelect: () => {} },
          { label: "Keyboard Shortcuts", onSelect: () => {} },
          { type: "separator" },
          { label: "Report a Bug", onSelect: () => {} },
        ],
      },
    ];

    return <Menubar menus={menus} />;
  },
};
