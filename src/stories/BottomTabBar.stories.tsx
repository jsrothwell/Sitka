import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { Home, Search, Bell, User, Grid3X3 } from "lucide-react";

const meta: Meta<typeof BottomTabBar> = {
  title: "Navigation/BottomTabBar",
  component: BottomTabBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BottomTabBar>;

const iconSize = 22;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <div style={{ maxWidth: 390, border: "1px solid rgb(var(--border))", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center", color: "rgb(var(--text-secondary))", fontSize: 14 }}>
          Active tab: <strong style={{ marginLeft: 6 }}>{active}</strong>
        </div>
        <BottomTabBar
          value={active}
          onChange={setActive}
          items={[
            { value: "home", label: "Home", icon: <Home size={iconSize} /> },
            { value: "search", label: "Search", icon: <Search size={iconSize} /> },
            { value: "notifications", label: "Alerts", icon: <Bell size={iconSize} /> },
            { value: "profile", label: "Profile", icon: <User size={iconSize} /> },
          ]}
        />
      </div>
    );
  },
};

export const WithBadges: Story = {
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <div style={{ maxWidth: 390, border: "1px solid rgb(var(--border))", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center", color: "rgb(var(--text-secondary))", fontSize: 14 }}>
          Tab with badge counts
        </div>
        <BottomTabBar
          value={active}
          onChange={setActive}
          items={[
            { value: "home", label: "Home", icon: <Home size={iconSize} /> },
            { value: "search", label: "Search", icon: <Search size={iconSize} /> },
            { value: "notifications", label: "Alerts", icon: <Bell size={iconSize} />, badge: 3 },
            { value: "apps", label: "Apps", icon: <Grid3X3 size={iconSize} />, badge: 100 },
            { value: "profile", label: "Profile", icon: <User size={iconSize} /> },
          ]}
        />
      </div>
    );
  },
};

export const FiveTabs: Story = {
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <div style={{ maxWidth: 390, border: "1px solid rgb(var(--border))", borderRadius: 16, overflow: "hidden" }}>
        <BottomTabBar
          value={active}
          onChange={setActive}
          items={[
            { value: "home", label: "Home", icon: <Home size={iconSize} /> },
            { value: "search", label: "Search", icon: <Search size={iconSize} /> },
            { value: "notifications", label: "Alerts", icon: <Bell size={iconSize} />, badge: 7 },
            { value: "apps", label: "Apps", icon: <Grid3X3 size={iconSize} /> },
            { value: "profile", label: "Profile", icon: <User size={iconSize} /> },
          ]}
        />
      </div>
    );
  },
};
