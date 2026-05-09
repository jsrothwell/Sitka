import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "@/components/ui/Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs
      tabs={[
        { id: "overview", label: "Overview" },
        { id: "details", label: "Details" },
        { id: "settings", label: "Settings" },
      ]}
    >
      {(active) => (
        <div style={{ padding: "16px 4px", fontSize: 14, color: "rgb(var(--text-secondary))" }}>
          {active === "overview" && "Overview panel content"}
          {active === "details" && "Details panel content"}
          {active === "settings" && "Settings panel content"}
        </div>
      )}
    </Tabs>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Tabs
      tabs={[
        { id: "inbox", label: "Inbox", badge: "12" },
        { id: "sent", label: "Sent" },
        { id: "drafts", label: "Drafts", badge: "3" },
      ]}
    >
      {(active) => (
        <div style={{ padding: "16px 4px", fontSize: 14 }}>
          Active tab: <strong>{active}</strong>
        </div>
      )}
    </Tabs>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Tabs
      tabs={[
        { id: "code", label: "Code" },
        { id: "preview", label: "Preview" },
        { id: "docs", label: "Docs" },
      ]}
      defaultTab="preview"
    >
      {(active) => (
        <div style={{ padding: "16px 4px", fontSize: 14 }}>
          Active: <strong>{active}</strong>
        </div>
      )}
    </Tabs>
  ),
};
