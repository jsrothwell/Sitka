"use client";

import { useState } from "react";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import {
  Home, Search, Bell, User, Menu, X, ChevronRight,
  Settings, CreditCard, HelpCircle, LogOut, MoreHorizontal,
  LayoutDashboard, Users, BarChart2,
} from "lucide-react";
import { cn } from "@/lib";
import type { ReactNode } from "react";

// ── Shared phone frame ────────────────────────────────────

function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto overflow-hidden rounded-[2.25rem] flex flex-col shadow-2xl",
        "border-[6px] border-[rgb(var(--text-primary))] bg-[rgb(var(--background))]",
        className
      )}
      style={{ width: 260, height: 488 }}
    >
      {/* Status bar */}
      <div className="flex-shrink-0 h-7 flex items-center justify-between px-4 bg-[rgb(var(--surface))]">
        <span className="text-[9px] font-semibold text-[rgb(var(--text-primary))]">9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="flex items-end gap-[2px]">
            {[1, 2, 3, 4].map((h) => (
              <div key={h} className="w-[3px] rounded-[1px] bg-[rgb(var(--text-primary))]" style={{ height: h * 2.5 }} />
            ))}
          </div>
          <div className="w-4 h-2.5 rounded-[2px] border border-[rgb(var(--text-primary))] relative">
            <div className="absolute inset-[1.5px] right-auto w-2/3 bg-[rgb(var(--text-primary))] rounded-[1px]" />
            <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[3px] h-1.5 bg-[rgb(var(--text-primary))] rounded-r-[1px]" />
          </div>
        </div>
      </div>
      {children}
      {/* Home indicator */}
      <div className="flex-shrink-0 h-5 flex items-center justify-center bg-[rgb(var(--surface))]">
        <div className="w-20 h-[3px] rounded-full bg-[rgb(var(--text-primary))] opacity-20" />
      </div>
    </div>
  );
}

// ── 1. Bottom Tab Bar demo ────────────────────────────────

const TABS = [
  { value: "home",    label: "Home",    icon: <Home className="w-[18px] h-[18px]" /> },
  { value: "search",  label: "Search",  icon: <Search className="w-[18px] h-[18px]" /> },
  { value: "inbox",   label: "Inbox",   icon: <Bell className="w-[18px] h-[18px]" />, badge: 3 },
  { value: "profile", label: "Profile", icon: <User className="w-[18px] h-[18px]" /> },
];

const TAB_SCREENS: Record<string, { heading: string; body: string; Icon: typeof Home }> = {
  home:    { heading: "Home",    body: "Your feed and recent activity", Icon: Home },
  search:  { heading: "Search",  body: "Find people and content",       Icon: Search },
  inbox:   { heading: "Inbox",   body: "3 unread notifications",        Icon: Bell },
  profile: { heading: "Profile", body: "Your account and settings",     Icon: User },
};

export function BottomTabBarDemo() {
  const [tab, setTab] = useState("home");
  const screen = TAB_SCREENS[tab];
  const ScreenIcon = screen.Icon;

  return (
    <PhoneFrame>
      {/* Screen content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-11 h-11 rounded-xl bg-[rgb(var(--accent-subtle))] flex items-center justify-center mx-auto mb-3 text-[rgb(var(--accent))]">
            <ScreenIcon className="w-5 h-5" />
          </div>
          <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))] mb-1">{screen.heading}</p>
          <p className="text-[11px] text-[rgb(var(--text-tertiary))]">{screen.body}</p>
        </div>
      </div>
      {/* Tab bar */}
      <BottomTabBar items={TABS} value={tab} onChange={setTab} />
    </PhoneFrame>
  );
}

// Standalone (no phone frame) — for component reference page
export function BottomTabBarStandaloneDemo() {
  const [tab, setTab] = useState("home");

  return (
    <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-[rgb(var(--border))]">
      <div className="h-24 flex items-center justify-center bg-[rgb(var(--background))]">
        <p className="text-[12px] text-[rgb(var(--text-tertiary))]">Active: <span className="text-[rgb(var(--accent))]">{tab}</span></p>
      </div>
      <BottomTabBar items={TABS} value={tab} onChange={setTab} />
    </div>
  );
}

// ── 2. Navigation drawer demo ─────────────────────────────

const DRAWER_ITEMS = [
  { label: "Dashboard",     icon: LayoutDashboard },
  { label: "Team",          icon: Users },
  { label: "Analytics",     icon: BarChart2 },
  { label: "Notifications", icon: Bell },
  { label: "Settings",      icon: Settings },
];

export function NavigationDrawerDemo() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <PhoneFrame>
      {/* App header */}
      <div className="flex-shrink-0 h-11 flex items-center px-3 gap-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="w-4 h-4" />
        </button>
        <span className="text-[13px] font-semibold text-[rgb(var(--text-primary))] flex-1">{active}</span>
      </div>

      {/* Page content */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[11px] text-[rgb(var(--text-tertiary))]">Tap ☰ to open the drawer</p>
      </div>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="absolute inset-0 bg-black/50 z-10"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "absolute top-0 left-0 bottom-0 z-20 flex flex-col bg-[rgb(var(--surface))] border-r border-[rgb(var(--border))]",
          "transition-transform duration-300 ease-in-out",
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ width: 188 }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Drawer header */}
        <div className="h-11 flex items-center justify-between px-3 border-b border-[rgb(var(--border))]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[rgb(var(--accent))] flex items-center justify-center flex-shrink-0">
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                <path d="M6 1.5L10.5 4.125V7.875L6 10.5L1.5 7.875V4.125L6 1.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[12px] font-semibold text-[rgb(var(--text-primary))]">Sitka</span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-6 h-6 flex items-center justify-center rounded text-[rgb(var(--text-tertiary))] hover:bg-[rgb(var(--surface-raised))] transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-2 overflow-y-auto">
          {DRAWER_ITEMS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => { setActive(label); setDrawerOpen(false); }}
              className={cn(
                "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] font-medium transition-colors text-left",
                active === label
                  ? "bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]"
                  : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] hover:text-[rgb(var(--text-primary))]"
              )}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </PhoneFrame>
  );
}

// ── 3. Bottom sheet navigation demo ──────────────────────

const MORE_ITEMS = [
  { label: "Settings",  icon: Settings,   danger: false },
  { label: "Billing",   icon: CreditCard, danger: false },
  { label: "Help",      icon: HelpCircle, danger: false },
  { label: "Sign out",  icon: LogOut,     danger: true  },
];

const SHEET_TABS = [
  { value: "home",   label: "Home",   icon: <Home className="w-[18px] h-[18px]" /> },
  { value: "search", label: "Search", icon: <Search className="w-[18px] h-[18px]" /> },
  { value: "more",   label: "More",   icon: <MoreHorizontal className="w-[18px] h-[18px]" /> },
];

export function BottomSheetNavDemo() {
  const [tab, setTab] = useState("home");
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleTabChange(v: string) {
    if (v === "more") {
      setSheetOpen(true);
    } else {
      setTab(v);
      setSheetOpen(false);
    }
  }

  return (
    <PhoneFrame>
      {/* Page content */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <p className="text-[11px] text-[rgb(var(--text-tertiary))]">Tap "More" to open sheet</p>

        {/* Inline bottom sheet (absolute, not portal) */}
        {sheetOpen && (
          <div
            className="absolute inset-0 bg-black/40 z-10"
            onClick={() => { setSheetOpen(false); }}
            aria-hidden="true"
          />
        )}
        <div
          className={cn(
            "absolute left-0 right-0 bottom-0 z-20",
            "bg-[rgb(var(--surface-raised))] rounded-t-2xl border-t border-[rgb(var(--border))]",
            "shadow-[0_-4px_24px_rgba(0,0,0,0.25)]",
            "transition-transform duration-300 ease-out",
            sheetOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          {/* Handle */}
          <div className="pt-2.5 flex justify-center">
            <div className="w-8 h-[3px] rounded-full bg-[rgb(var(--border))]" />
          </div>
          <div className="px-3 py-2 border-b border-[rgb(var(--border-subtle))]">
            <p className="text-[12px] font-semibold text-[rgb(var(--text-primary))]">More</p>
          </div>
          <nav className="p-1.5">
            {MORE_ITEMS.map(({ label, icon: Icon, danger }) => (
              <button
                key={label}
                onClick={() => setSheetOpen(false)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-[12px] font-medium text-left transition-colors",
                  danger
                    ? "text-red-400 hover:bg-red-400/10"
                    : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface))] hover:text-[rgb(var(--text-primary))]"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {!danger && <ChevronRight className="w-3 h-3 text-[rgb(var(--text-tertiary))]" />}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab bar */}
      <BottomTabBar items={SHEET_TABS} value={tab} onChange={handleTabChange} />
    </PhoneFrame>
  );
}

// ── 4. BottomSheet component demo (for component page) ───

const SNAP_HEIGHTS: Record<"auto" | "half" | "full", string> = {
  auto: "max-h-[85%]",
  half: "h-1/2",
  full: "h-[90%]",
};

export function BottomSheetDemo() {
  const [open, setOpen] = useState(false);
  const [snap, setSnap] = useState<"auto" | "half" | "full">("auto");

  return (
    <div className="flex flex-col items-center gap-6">
      <PhoneFrame>
        {/* Screen content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
          <p className="text-[11px] text-[rgb(var(--text-tertiary))] px-4 text-center">
            Tap a button to preview snap heights
          </p>
          <div className="flex flex-col gap-2 w-full px-4">
            {(["auto", "half", "full"] as const).map((s) => (
              <button
                key={s}
                onClick={() => { setSnap(s); setOpen(true); }}
                className="w-full h-8 rounded-xl bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] text-[11px] font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--accent))] transition-colors"
              >
                Open · <span className="font-mono text-[rgb(var(--accent))]">{s}</span>
              </button>
            ))}
          </div>

          {/* Backdrop */}
          {open && (
            <div
              className="absolute inset-0 bg-black/50 z-10"
              style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Inline sheet panel */}
          <div
            className={cn(
              "absolute left-0 right-0 bottom-0 z-20 flex flex-col",
              "bg-[rgb(var(--surface-raised))] rounded-t-[20px]",
              "border-t border-[rgb(var(--border))]",
              "shadow-[0_-8px_40px_rgba(0,0,0,0.30)]",
              "transition-transform duration-300 ease-out",
              SNAP_HEIGHTS[snap],
              open ? "translate-y-0" : "translate-y-full"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            {/* Drag handle */}
            <div className="flex-shrink-0 pt-2.5 px-4 pb-1 flex justify-center">
              <div className="w-8 h-[3px] rounded-full bg-[rgb(var(--border))]" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-[rgb(var(--border-subtle))]">
              <p className="text-[12px] font-semibold text-[rgb(var(--text-primary))]">Navigation</p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-6 h-6 flex items-center justify-center rounded-full bg-[rgb(var(--surface))] text-[rgb(var(--text-secondary))]"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            {/* Content */}
            <nav className="flex-1 overflow-y-auto p-1.5">
              {[
                { label: "Home",     icon: Home },
                { label: "Search",   icon: Search },
                { label: "Settings", icon: Settings },
                { label: "Help",     icon: HelpCircle },
              ].map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-[12px] font-medium text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface))] hover:text-[rgb(var(--text-primary))] transition-colors text-left"
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0 text-[rgb(var(--text-tertiary))]" />
                  <span className="flex-1">{label}</span>
                  <ChevronRight className="w-3 h-3 text-[rgb(var(--text-tertiary))]" />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
