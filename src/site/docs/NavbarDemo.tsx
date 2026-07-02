"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import {
  Search, Bell, Menu, X, ChevronDown,
  LayoutDashboard, Users, BarChart2, Settings, LogOut, User, Plus,
} from "lucide-react";
import { cn } from "@/lib";

const NAV_LINKS = [
  { label: "Dashboard", href: "#", icon: LayoutDashboard },
  { label: "Team",      href: "#", icon: Users },
  { label: "Analytics", href: "#", icon: BarChart2 },
  { label: "Settings",  href: "#", icon: Settings },
];

export function NavbarDemo() {
  const [active, setActive]           = useState("Dashboard");
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [userOpen, setUserOpen]       = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);

  return (
    <div className="w-full rounded-xl border border-[rgb(var(--border))] overflow-visible bg-[rgb(var(--background))]">
      {/* Navbar */}
      <nav className="rounded-t-xl border-b border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
        <div className="px-4 h-14 flex items-center gap-3">

          {/* Brand */}
          <div className="flex items-center gap-2 flex-shrink-0 mr-1">
            <div className="w-7 h-7 rounded-lg bg-[rgb(var(--accent))] flex items-center justify-center">
              <span className="text-white font-bold text-[11px] leading-none">S</span>
            </div>
            <span className="text-[14px] font-semibold text-[rgb(var(--text-primary))] hidden sm:block">Sitka</span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5 flex-1">
            {NAV_LINKS.map(({ label }) => (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors",
                  active === label
                    ? "bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]"
                    : "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))]"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex-1 md:flex-none" />

          {/* Search bar (expands on focus) */}
          <div className={cn(
            "hidden sm:flex items-center gap-2 px-3 h-8 rounded-lg border transition-all",
            searchOpen
              ? "border-[rgb(var(--accent))] bg-[rgb(var(--surface-raised))] w-52"
              : "border-[rgb(var(--border))] bg-[rgb(var(--surface))] w-32 cursor-pointer hover:border-[rgb(var(--accent))]"
          )}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-3.5 h-3.5 text-[rgb(var(--text-tertiary))] flex-shrink-0" />
            <input
              placeholder="Search…"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
              className="flex-1 bg-transparent text-[12px] text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-tertiary))] outline-none w-full"
            />
            {searchOpen && (
              <kbd className="text-[10px] text-[rgb(var(--text-tertiary))] font-mono bg-[rgb(var(--border))] px-1.5 py-0.5 rounded flex-shrink-0">⌘K</kbd>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[rgb(var(--text-tertiary))] hover:bg-[rgb(var(--surface-raised))] transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[rgb(var(--accent))]" />
          </div>

          {/* New button */}
          <button className="hidden sm:flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[rgb(var(--accent))] text-white text-[12px] font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" />
            New
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => { setUserOpen(!userOpen); setMobileOpen(false); }}
              className={cn(
                "flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-lg transition-colors",
                userOpen ? "bg-[rgb(var(--surface-raised))]" : "hover:bg-[rgb(var(--surface-raised))]"
              )}
            >
              <Avatar alt="Jamieson Rothwell" size="xs" status="online" />
              <ChevronDown className={cn("w-3 h-3 text-[rgb(var(--text-tertiary))] transition-transform duration-150", userOpen && "rotate-180")} />
            </button>

            {userOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-52 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] shadow-[0_8px_32px_rgba(0,0,0,0.25)] py-1 z-50">
                <div className="px-3 py-2.5 border-b border-[rgb(var(--border-subtle))]">
                  <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">Jamieson Rothwell</p>
                  <p className="text-[11px] text-[rgb(var(--text-tertiary))] mt-0.5">jamieson@sitka.design</p>
                </div>
                {[
                  { label: "Profile",  icon: User },
                  { label: "Settings", icon: Settings },
                ].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => setUserOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface))] hover:text-[rgb(var(--text-primary))] transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
                <div className="border-t border-[rgb(var(--border-subtle))] mt-1 pt-1">
                  <button
                    onClick={() => setUserOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => { setMobileOpen(!mobileOpen); setUserOpen(false); }}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[rgb(var(--text-tertiary))] hover:bg-[rgb(var(--surface-raised))] transition-colors"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[rgb(var(--border))] px-3 pb-3 pt-2">
            {NAV_LINKS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => { setActive(label); setMobileOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors text-left",
                  active === label
                    ? "bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]"
                    : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] hover:text-[rgb(var(--text-primary))]"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Simulated page body */}
      <div className="px-5 py-5 flex items-center justify-between rounded-b-xl">
        <div>
          <p className="text-[14px] font-medium text-[rgb(var(--text-primary))]">{active}</p>
          <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-0.5">Click nav links to change the active state</p>
        </div>
        <Badge variant="ghost">{active}</Badge>
      </div>
    </div>
  );
}

export function SidebarNavDemo() {
  const [active, setActive] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="w-full rounded-xl border border-[rgb(var(--border))] overflow-hidden bg-[rgb(var(--background))] flex" style={{ height: 340 }}>
      {/* Sidebar */}
      <div className={cn(
        "flex-shrink-0 border-r border-[rgb(var(--border))] bg-[rgb(var(--surface))] flex flex-col transition-all duration-200",
        collapsed ? "w-14" : "w-52"
      )}>
        {/* Sidebar header */}
        <div className="h-14 flex items-center justify-between px-3 border-b border-[rgb(var(--border))]">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[rgb(var(--accent))] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-[9px]">S</span>
              </div>
              <span className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">Sitka</span>
            </div>
          )}
          {collapsed && (
            <div className="w-6 h-6 rounded-md bg-[rgb(var(--accent))] flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-[9px]">S</span>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="w-6 h-6 flex items-center justify-center rounded text-[rgb(var(--text-tertiary))] hover:bg-[rgb(var(--surface-raised))] transition-colors"
            >
              <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
            </button>
          )}
        </div>

        {/* Nav items */}
        <div className="flex-1 p-2 space-y-0.5">
          {NAV_LINKS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              title={collapsed ? label : undefined}
              className={cn(
                "w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors",
                active === label
                  ? "bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]"
                  : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] hover:text-[rgb(var(--text-primary))]"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && label}
            </button>
          ))}
        </div>

        {/* Collapse toggle */}
        {collapsed && (
          <div className="p-2">
            <button
              onClick={() => setCollapsed(false)}
              className="w-full flex items-center justify-center py-2 rounded-lg text-[rgb(var(--text-tertiary))] hover:bg-[rgb(var(--surface-raised))] transition-colors"
            >
              <ChevronDown className="w-3.5 h-3.5 rotate-90" />
            </button>
          </div>
        )}
      </div>

      {/* Page content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-14 border-b border-[rgb(var(--border))] flex items-center px-4 gap-3">
          <h1 className="text-[14px] font-semibold text-[rgb(var(--text-primary))] flex-1">{active}</h1>
          <Avatar alt="Jamieson Rothwell" size="xs" status="online" />
        </div>
        <div className="flex-1 p-4 flex items-center justify-center">
          <p className="text-[12px] text-[rgb(var(--text-tertiary))]">
            {collapsed ? "Expand sidebar →" : "← Collapse sidebar"} • Active: <span className="text-[rgb(var(--accent))]">{active}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
