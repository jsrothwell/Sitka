"use client";

import { useState } from "react";
import {
  Search, Mail, Lock, Eye, EyeOff, Home, Bell, User, CreditCard,
  Star, Heart, MoreHorizontal, Check, ChevronRight, Plus, Trash2,
  Settings, MessageSquare, LayoutGrid, List, Map, ArrowUpDown,
  Filter, Package, Globe, Bookmark, AlignLeft,
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
      <div className="flex-1 overflow-hidden">{children}</div>
      <div className="flex-shrink-0 h-5 flex items-center justify-center bg-[rgb(var(--surface))]">
        <div className="w-20 h-[3px] rounded-full bg-[rgb(var(--text-primary))] opacity-20" />
      </div>
    </div>
  );
}

// ── Button mobile demo ────────────────────────────────────

export function ButtonMobileDemo() {
  const [pressed, setPressed] = useState<string | null>(null);

  const tap = (id: string) => {
    setPressed(id);
    setTimeout(() => setPressed(null), 600);
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-[rgb(var(--background))]">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-[rgb(var(--border))]">
          <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">Checkout</p>
          <p className="text-[11px] text-[rgb(var(--text-tertiary))]">Review your order</p>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-4 space-y-3">
          {[
            { name: "Pro plan", price: "$12/mo", icon: Star },
            { name: "Extra storage", price: "$2/mo", icon: CreditCard },
          ].map(({ name, price, icon: Icon }) => (
            <div key={name} className="flex items-center gap-3 p-3 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
              <div className="w-8 h-8 rounded-lg bg-[rgb(var(--accent-subtle))] flex items-center justify-center">
                <Icon className="w-4 h-4 text-[rgb(var(--accent))]" />
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-medium text-[rgb(var(--text-primary))]">{name}</p>
                <p className="text-[10px] text-[rgb(var(--text-tertiary))]">{price}</p>
              </div>
            </div>
          ))}

          <div className="pt-2 border-t border-[rgb(var(--border))]">
            <div className="flex justify-between text-[12px]">
              <span className="text-[rgb(var(--text-secondary))]">Total</span>
              <span className="font-semibold text-[rgb(var(--text-primary))]">$14/mo</span>
            </div>
          </div>
        </div>

        {/* Full-width CTA at bottom — the mobile button pattern */}
        <div className="px-4 pb-4 space-y-2">
          <button
            onClick={() => tap("primary")}
            className={cn(
              "w-full h-11 rounded-xl text-[13px] font-semibold transition-all",
              pressed === "primary"
                ? "bg-[rgb(var(--accent))] opacity-60 scale-[0.98] text-white"
                : "bg-[rgb(var(--accent))] text-white"
            )}
          >
            {pressed === "primary" ? "Processing…" : "Confirm & Pay"}
          </button>
          <button
            onClick={() => tap("secondary")}
            className={cn(
              "w-full h-10 rounded-xl text-[13px] font-medium border transition-all",
              pressed === "secondary"
                ? "border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] opacity-60 scale-[0.98]"
                : "border-[rgb(var(--border))] text-[rgb(var(--text-secondary))]"
            )}
          >
            Cancel
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── Input mobile demo ─────────────────────────────────────

export function InputMobileDemo() {
  const [showPw, setShowPw] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-[rgb(var(--background))]">
        <div className="px-4 pt-5 pb-4">
          <p className="text-[16px] font-semibold text-[rgb(var(--text-primary))]">Sign in</p>
          <p className="text-[11px] text-[rgb(var(--text-tertiary))] mt-0.5">Welcome back</p>
        </div>

        <div className="px-4 space-y-3 flex-1">
          {/* Email field */}
          <div className="space-y-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
              Email
            </label>
            <div
              className={cn(
                "flex items-center gap-2 px-3 h-11 rounded-xl border text-[12px] bg-[rgb(var(--surface))] transition-colors",
                active === "email"
                  ? "border-[rgb(var(--accent))] ring-2 ring-[rgb(var(--accent))]/20"
                  : "border-[rgb(var(--border))]"
              )}
              onClick={() => setActive("email")}
            >
              <Mail className="w-3.5 h-3.5 text-[rgb(var(--text-tertiary))]" />
              <span className={active === "email" ? "text-[rgb(var(--text-primary))]" : "text-[rgb(var(--text-tertiary))]"}>
                {active === "email" ? "hello@sitka.design" : "Enter email"}
              </span>
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
              Password
            </label>
            <div
              className={cn(
                "flex items-center gap-2 px-3 h-11 rounded-xl border text-[12px] bg-[rgb(var(--surface))] transition-colors",
                active === "password"
                  ? "border-[rgb(var(--accent))] ring-2 ring-[rgb(var(--accent))]/20"
                  : "border-[rgb(var(--border))]"
              )}
              onClick={() => setActive("password")}
            >
              <Lock className="w-3.5 h-3.5 text-[rgb(var(--text-tertiary))]" />
              <span className="flex-1 text-[rgb(var(--text-tertiary))]">
                {active === "password" ? (showPw ? "mysecret123" : "••••••••••••") : "Enter password"}
              </span>
              {active === "password" && (
                <button onClick={(e) => { e.stopPropagation(); setShowPw((v) => !v); }}>
                  {showPw
                    ? <EyeOff className="w-3.5 h-3.5 text-[rgb(var(--text-tertiary))]" />
                    : <Eye className="w-3.5 h-3.5 text-[rgb(var(--text-tertiary))]" />}
                </button>
              )}
            </div>
          </div>

          {/* Search field */}
          <div className="space-y-1 pt-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
              Search
            </label>
            <div
              className={cn(
                "flex items-center gap-2 px-3 h-11 rounded-xl border text-[12px] bg-[rgb(var(--surface))] transition-colors",
                active === "search"
                  ? "border-[rgb(var(--accent))] ring-2 ring-[rgb(var(--accent))]/20"
                  : "border-[rgb(var(--border))]"
              )}
              onClick={() => setActive("search")}
            >
              <Search className="w-3.5 h-3.5 text-[rgb(var(--text-tertiary))]" />
              <span className="text-[rgb(var(--text-tertiary))]">Search components…</span>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={() => setActive(null)}
            className="w-full h-11 rounded-xl bg-[rgb(var(--accent))] text-white text-[13px] font-semibold"
          >
            Continue
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── Card mobile demo ──────────────────────────────────────

export function CardMobileDemo() {
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const items = [
    { id: 1, title: "Design Principles", desc: "Core concepts behind Sitka's approach", tag: "Foundation", color: "text-violet-400", bg: "bg-violet-500/10" },
    { id: 2, title: "Button",            desc: "Interactive control for actions",       tag: "Component",  color: "text-blue-400",   bg: "bg-blue-500/10"   },
    { id: 3, title: "Glass Surface",     desc: "Layered blur and opacity system",       tag: "Foundation", color: "text-cyan-400",   bg: "bg-cyan-500/10"   },
  ];

  return (
    <PhoneFrame>
      <div className="h-full bg-[rgb(var(--background))] flex flex-col">
        <div className="px-4 pt-4 pb-3 border-b border-[rgb(var(--border))]">
          <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">Browse</p>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-3.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md", item.bg, item.color)}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{item.title}</p>
                  <p className="text-[11px] text-[rgb(var(--text-tertiary))] mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => setLiked((prev) => {
                    const next = new Set(prev);
                    next.has(item.id) ? next.delete(item.id) : next.add(item.id);
                    return next;
                  })}
                  className="flex-shrink-0 p-1"
                >
                  <Heart
                    className={cn("w-4 h-4 transition-colors", liked.has(item.id) ? "fill-red-400 text-red-400" : "text-[rgb(var(--text-tertiary))]")}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2.5">
                <button className="text-[11px] font-medium text-[rgb(var(--accent))]">Read more →</button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-shrink-0 flex items-center justify-around h-12 border-t border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
          {[{ icon: Home, label: "Home" }, { icon: Search, label: "Search" }, { icon: Bell, label: "Inbox" }, { icon: User, label: "Profile" }].map(({ icon: Icon, label }) => (
            <button key={label} className="flex flex-col items-center gap-0.5 px-3 opacity-60 first:opacity-100">
              <Icon className="w-4 h-4 text-[rgb(var(--text-primary))]" />
              <span className="text-[8px] text-[rgb(var(--text-primary))]">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── Badge mobile demo ─────────────────────────────────────

export function BadgeMobileDemo() {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  const notifications = [
    { id: 1, app: "Messages",   body: "Jamie: Sounds good, see you at 3pm",      time: "now",  unread: true,  dot: "bg-blue-400"   },
    { id: 2, app: "GitHub",     body: "PR #42 approved by Lena Müller",           time: "2m",   unread: true,  dot: "bg-emerald-400" },
    { id: 3, app: "Calendar",   body: "Design review starts in 15 minutes",       time: "14m",  unread: false, dot: "bg-amber-400"  },
    { id: 4, app: "Figma",      body: "Sam left a comment on Header.fig",         time: "1h",   unread: false, dot: "bg-violet-400" },
  ];

  const visible = notifications.filter((n) => !dismissed.has(n.id));

  return (
    <PhoneFrame>
      <div className="h-full bg-[rgb(var(--background))] flex flex-col">
        <div className="px-4 pt-4 pb-3 border-b border-[rgb(var(--border))] flex items-center justify-between">
          <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">Notifications</p>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[rgb(var(--accent))] text-white">
            {visible.filter((n) => n.unread).length} new
          </span>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-[rgb(var(--border-subtle))]">
          {visible.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-[12px] text-[rgb(var(--text-tertiary))]">All caught up!</p>
            </div>
          ) : (
            visible.map((n) => (
              <div key={n.id} className={cn("flex items-start gap-3 px-4 py-3 relative", n.unread && "bg-[rgb(var(--accent))]/5")}>
                {n.unread && <div className={cn("absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full", n.dot)} />}
                <div className="flex-1 min-w-0 pl-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[10px] font-semibold text-[rgb(var(--text-tertiary))]">{n.app}</span>
                    <span className="text-[9px] text-[rgb(var(--text-tertiary))] flex-shrink-0">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-[rgb(var(--text-secondary))] mt-0.5 truncate">{n.body}</p>
                </div>
                <button
                  onClick={() => setDismissed((prev) => new Set([...prev, n.id]))}
                  className="flex-shrink-0 p-0.5 opacity-40"
                >
                  <Trash2 className="w-3 h-3 text-[rgb(var(--text-secondary))]" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── Avatar mobile demo ────────────────────────────────────

const CONTACTS = [
  { id: 1, name: "Jamieson Rothwell", role: "Founder",   status: "online",  initials: "JR" },
  { id: 2, name: "Sam Park",          role: "Engineer",  status: "away",    initials: "SP" },
  { id: 3, name: "Lena Müller",       role: "Designer",  status: "offline", initials: "LM" },
  { id: 4, name: "Amir Karimi",       role: "Engineer",  status: "busy",    initials: "AK" },
  { id: 5, name: "Dev Bot",           role: "Bot",       status: "online",  initials: "DB" },
];

const STATUS_DOT: Record<string, string> = {
  online: "bg-emerald-400",
  away:   "bg-amber-400",
  busy:   "bg-red-400",
  offline:"bg-[rgb(var(--text-tertiary))]",
};

export function AvatarMobileDemo() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <PhoneFrame>
      <div className="h-full bg-[rgb(var(--background))] flex flex-col">
        <div className="px-4 pt-4 pb-3 border-b border-[rgb(var(--border))]">
          <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">Team</p>
          <p className="text-[11px] text-[rgb(var(--text-tertiary))]">{CONTACTS.filter((c) => c.status === "online").length} online</p>
        </div>

        {/* AvatarGroup row */}
        <div className="px-4 py-3 flex items-center gap-1">
          <div className="flex -space-x-2">
            {CONTACTS.slice(0, 4).map((c, i) => (
              <div
                key={c.id}
                className="w-8 h-8 rounded-full bg-[rgb(var(--accent-subtle))] border-2 border-[rgb(var(--background))] flex items-center justify-center text-[9px] font-bold text-[rgb(var(--accent))]"
                style={{ zIndex: 4 - i }}
              >
                {c.initials}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-[rgb(var(--surface))] border-2 border-[rgb(var(--background))] flex items-center justify-center text-[9px] font-semibold text-[rgb(var(--text-tertiary))]">
              +1
            </div>
          </div>
          <span className="ml-2 text-[11px] text-[rgb(var(--text-secondary))]">5 members</span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[rgb(var(--border-subtle))]">
          {CONTACTS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                selected === c.id && "bg-[rgb(var(--accent))]/8"
              )}
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[rgb(var(--accent-subtle))] flex items-center justify-center text-[11px] font-bold text-[rgb(var(--accent))]">
                  {c.initials}
                </div>
                <div className={cn("absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[rgb(var(--background))]", STATUS_DOT[c.status])} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-[rgb(var(--text-primary))] truncate">{c.name}</p>
                <p className="text-[10px] text-[rgb(var(--text-tertiary))]">{c.role}</p>
              </div>
              {selected === c.id && <Check className="w-4 h-4 text-[rgb(var(--accent))]" />}
            </button>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── Navigation (tabs) mobile demo ────────────────────────

export function NavigationMobileDemo() {
  const [active, setActive] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Activity" },
    { id: "settings", label: "Settings" },
  ];

  const content: Record<string, { icon: typeof Package; title: string; lines: string[] }> = {
    overview: {
      icon: Package,
      title: "Project Alpha",
      lines: ["v2.4.1 · Production", "Last deploy 2h ago", "3 members"],
    },
    activity: {
      icon: Globe,
      title: "Recent activity",
      lines: ["PR #42 merged", "Issue #17 closed", "Deployment succeeded"],
    },
    settings: {
      icon: Settings,
      title: "Configuration",
      lines: ["Branch: main", "Auto-deploy: on", "Notifications: email"],
    },
  };

  const { icon: Icon, title, lines } = content[active];

  return (
    <PhoneFrame>
      <div className="h-full bg-[rgb(var(--background))] flex flex-col">
        <div className="px-4 pt-4 pb-1">
          <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">Repository</p>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-[rgb(var(--border))] px-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "flex-1 py-2.5 text-[11px] font-medium transition-colors border-b-2 -mb-px",
                active === t.id
                  ? "text-[rgb(var(--accent))] border-[rgb(var(--accent))]"
                  : "text-[rgb(var(--text-tertiary))] border-transparent"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="flex-1 px-4 py-5 flex flex-col items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[rgb(var(--accent-subtle))] flex items-center justify-center">
            <Icon className="w-7 h-7 text-[rgb(var(--accent))]" />
          </div>
          <div className="text-center">
            <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-2">{title}</p>
            {lines.map((l) => (
              <p key={l} className="text-[11px] text-[rgb(var(--text-secondary))]">{l}</p>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── Tooltip mobile demo ───────────────────────────────────

export function TooltipMobileDemo() {
  const [shown, setShown] = useState<string | null>(null);

  const actions = [
    { id: "bookmark", icon: Bookmark, label: "Save for later", tip: "Saved!" },
    { id: "share",    icon: Globe,    label: "Share",          tip: "Link copied" },
    { id: "comment",  icon: MessageSquare, label: "Comment",   tip: "Open comments" },
    { id: "more",     icon: MoreHorizontal, label: "More",     tip: "More options" },
  ];

  const tap = (id: string) => {
    setShown(id);
    setTimeout(() => setShown(null), 1400);
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-[rgb(var(--background))] flex flex-col">
        <div className="px-4 pt-4 pb-3 border-b border-[rgb(var(--border))]">
          <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">Article</p>
          <p className="text-[11px] text-[rgb(var(--text-tertiary))]">Long press for tooltip</p>
        </div>
        <div className="flex-1 px-4 py-5">
          <div className="space-y-2">
            {[
              "Design systems scale teams",
              "by turning implicit decisions",
              "into explicit shared contracts.",
            ].map((line) => (
              <div key={line} className="h-2.5 rounded-full bg-[rgb(var(--surface-raised))]" style={{ width: `${60 + line.length}%` }} />
            ))}
          </div>
        </div>

        {/* Action bar with tooltip feedback */}
        <div className="flex-shrink-0 px-4 pb-4">
          <p className="text-[10px] text-[rgb(var(--text-tertiary))] mb-3 text-center">
            On mobile: tap-and-hold or use visible labels instead of hover tooltips
          </p>
          <div className="flex items-center justify-around rounded-2xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] p-2">
            {actions.map(({ id, icon: Icon, label, tip }) => (
              <div key={id} className="relative flex flex-col items-center">
                {shown === id && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-[rgb(var(--text-primary))] text-[rgb(var(--background))] text-[9px] font-medium whitespace-nowrap z-10">
                    {tip}
                  </div>
                )}
                <button
                  onClick={() => tap(id)}
                  className={cn(
                    "p-2.5 rounded-xl transition-colors",
                    shown === id ? "bg-[rgb(var(--accent-subtle))]" : "hover:bg-[rgb(var(--surface-raised))]"
                  )}
                >
                  <Icon className={cn("w-4 h-4", shown === id ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-secondary))]")} />
                </button>
                <span className="text-[8px] text-[rgb(var(--text-tertiary))] mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── Form controls mobile demo ─────────────────────────────

export function FormControlsMobileDemo() {
  const [checks, setChecks] = useState<Set<string>>(new Set(["notifications"]));
  const [radio, setRadio] = useState("email");
  const [toggle, setToggle] = useState(true);

  const toggleCheck = (id: string) =>
    setChecks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <PhoneFrame>
      <div className="h-full bg-[rgb(var(--background))] flex flex-col">
        <div className="px-4 pt-4 pb-3 border-b border-[rgb(var(--border))]">
          <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">Preferences</p>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-5">
          {/* Toggle */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">General</p>
            <div className="flex items-center justify-between py-3 border-b border-[rgb(var(--border-subtle))]">
              <div>
                <p className="text-[12px] font-medium text-[rgb(var(--text-primary))]">Dark mode</p>
                <p className="text-[10px] text-[rgb(var(--text-tertiary))]">System default</p>
              </div>
              <button
                onClick={() => setToggle((v) => !v)}
                className={cn(
                  "w-10 h-6 rounded-full relative transition-colors",
                  toggle ? "bg-[rgb(var(--accent))]" : "bg-[rgb(var(--surface-raised))]"
                )}
              >
                <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm", toggle ? "translate-x-5" : "translate-x-1")} />
              </button>
            </div>
          </div>

          {/* Checkboxes */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">Notifications</p>
            {[
              { id: "notifications", label: "Push notifications" },
              { id: "digest",        label: "Weekly digest" },
              { id: "marketing",     label: "Product updates" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => toggleCheck(id)}
                className="w-full flex items-center gap-3 py-3 border-b border-[rgb(var(--border-subtle))] last:border-0"
              >
                <div className={cn(
                  "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                  checks.has(id)
                    ? "bg-[rgb(var(--accent))] border-[rgb(var(--accent))]"
                    : "border-[rgb(var(--border))]"
                )}>
                  {checks.has(id) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-[12px] text-[rgb(var(--text-primary))]">{label}</span>
              </button>
            ))}
          </div>

          {/* Radio */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">Contact method</p>
            {[
              { id: "email", label: "Email" },
              { id: "sms",   label: "SMS" },
              { id: "none",  label: "None" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setRadio(id)}
                className="w-full flex items-center gap-3 py-3 border-b border-[rgb(var(--border-subtle))] last:border-0"
              >
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                  radio === id ? "border-[rgb(var(--accent))]" : "border-[rgb(var(--border))]"
                )}>
                  {radio === id && <div className="w-2.5 h-2.5 rounded-full bg-[rgb(var(--accent))]" />}
                </div>
                <span className="text-[12px] text-[rgb(var(--text-primary))]">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── Split button mobile demo ──────────────────────────────

export function SplitButtonMobileDemo() {
  const [dropOpen, setDropOpen] = useState(false);
  const [primary, setPrimary] = useState("Save draft");
  const [pressed, setPressed] = useState(false);

  const tap = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 600);
  };

  const options = ["Save draft", "Save & publish", "Schedule…"];

  return (
    <PhoneFrame>
      <div className="h-full bg-[rgb(var(--background))] flex flex-col" onClick={() => setDropOpen(false)}>
        <div className="px-4 pt-4 pb-3 border-b border-[rgb(var(--border))]">
          <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">New post</p>
        </div>

        <div className="flex-1 px-4 py-4 space-y-3">
          <div className="h-2.5 w-3/4 rounded-full bg-[rgb(var(--surface-raised))]" />
          <div className="h-2.5 w-full rounded-full bg-[rgb(var(--surface-raised))]" />
          <div className="h-2.5 w-5/6 rounded-full bg-[rgb(var(--surface-raised))]" />
          <div className="h-2.5 w-2/3 rounded-full bg-[rgb(var(--surface-raised))]" />
        </div>

        {/* Split button at bottom */}
        <div className="px-4 pb-5 relative" onClick={(e) => e.stopPropagation()}>
          <div className="flex rounded-xl overflow-hidden border border-[rgb(var(--accent))]">
            <button
              onClick={tap}
              className={cn(
                "flex-1 h-11 text-[12px] font-semibold bg-[rgb(var(--accent))] text-white transition-opacity",
                pressed && "opacity-60"
              )}
            >
              {pressed ? "Saving…" : primary}
            </button>
            <div className="w-px bg-[rgb(var(--accent-hover))]" />
            <button
              onClick={() => setDropOpen((v) => !v)}
              className="px-3 h-11 bg-[rgb(var(--accent))] text-white flex items-center"
            >
              <ChevronRight className={cn("w-4 h-4 transition-transform", dropOpen && "rotate-90")} />
            </button>
          </div>

          {dropOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] shadow-xl overflow-hidden">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setPrimary(opt); setDropOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-3 text-[12px] text-left",
                    opt === primary ? "text-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))]" : "text-[rgb(var(--text-primary))]"
                  )}
                >
                  {opt === primary && <Check className="w-3 h-3" />}
                  {opt !== primary && <div className="w-3" />}
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── Segmented button mobile demo ──────────────────────────

export function SegmentedButtonMobileDemo() {
  const [view, setView] = useState("list");

  const segments = [
    { id: "grid", icon: LayoutGrid, label: "Grid" },
    { id: "list", icon: List,       label: "List" },
    { id: "map",  icon: Map,        label: "Map"  },
  ];

  const items = ["Sitka HQ", "Remote — SF", "Remote — NYC", "Remote — London"];

  return (
    <PhoneFrame>
      <div className="h-full bg-[rgb(var(--background))] flex flex-col">
        <div className="px-4 pt-4 pb-3">
          <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))] mb-3">Locations</p>

          {/* Segmented control */}
          <div className="flex rounded-xl bg-[rgb(var(--surface-raised))] p-1 gap-1">
            {segments.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-[11px] font-medium transition-all",
                  view === id
                    ? "bg-[rgb(var(--surface))] text-[rgb(var(--text-primary))] shadow-sm border border-[rgb(var(--border))]"
                    : "text-[rgb(var(--text-tertiary))]"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 px-4 pb-4">
          {view === "grid" ? (
            <div className="grid grid-cols-2 gap-2">
              {items.map((item) => (
                <div key={item} className="rounded-xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] p-3">
                  <div className="w-6 h-6 rounded-lg bg-[rgb(var(--accent-subtle))] flex items-center justify-center mb-2">
                    <Globe className="w-3.5 h-3.5 text-[rgb(var(--accent))]" />
                  </div>
                  <p className="text-[10px] font-medium text-[rgb(var(--text-primary))] leading-tight">{item}</p>
                </div>
              ))}
            </div>
          ) : view === "list" ? (
            <div className="space-y-px">
              {items.map((item) => (
                <div key={item} className="flex items-center gap-3 py-3 border-b border-[rgb(var(--border-subtle))] last:border-0">
                  <Globe className="w-4 h-4 text-[rgb(var(--text-tertiary))]" />
                  <span className="text-[12px] text-[rgb(var(--text-primary))]">{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full rounded-2xl bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] flex items-center justify-center">
              <div className="text-center">
                <Map className="w-8 h-8 text-[rgb(var(--text-tertiary))] mx-auto mb-2" />
                <p className="text-[11px] text-[rgb(var(--text-tertiary))]">Map view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── Table mobile demo (card-stack layout) ─────────────────

export function TableMobileDemo() {
  const [sort, setSort] = useState<"name" | "status" | null>(null);

  const rows = [
    { name: "Homepage",   path: "/",        status: "Live",     visits: "12.4k" },
    { name: "Pricing",    path: "/pricing", status: "Live",     visits: "3.1k"  },
    { name: "Changelog",  path: "/log",     status: "Draft",    visits: "—"     },
    { name: "API docs",   path: "/api",     status: "Live",     visits: "8.9k"  },
  ];

  const sorted = sort
    ? [...rows].sort((a, b) => a[sort].localeCompare(b[sort]))
    : rows;

  return (
    <PhoneFrame>
      <div className="h-full bg-[rgb(var(--background))] flex flex-col">
        <div className="px-4 pt-4 pb-3 border-b border-[rgb(var(--border))] flex items-center justify-between">
          <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">Pages</p>
          <div className="flex gap-2">
            <button
              onClick={() => setSort(sort === "name" ? null : "name")}
              className={cn("p-1.5 rounded-lg transition-colors", sort === "name" ? "bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]" : "text-[rgb(var(--text-tertiary))]")}
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSort(sort === "status" ? null : "status")}
              className={cn("p-1.5 rounded-lg transition-colors", sort === "status" ? "bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]" : "text-[rgb(var(--text-tertiary))]")}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card-stack: mobile pattern for tables */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
          {sorted.map((row) => (
            <div key={row.name} className="rounded-2xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] p-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="text-[12px] font-semibold text-[rgb(var(--text-primary))]">{row.name}</p>
                  <p className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">{row.path}</p>
                </div>
                <span className={cn(
                  "text-[9px] font-semibold px-2 py-0.5 rounded-full",
                  row.status === "Live"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-amber-500/10 text-amber-400"
                )}>
                  {row.status}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-[rgb(var(--border-subtle))] pt-2">
                <span className="text-[10px] text-[rgb(var(--text-tertiary))]">Visits</span>
                <span className="text-[11px] font-medium text-[rgb(var(--text-primary))]">{row.visits}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── Modal / bottom-sheet mobile demo ─────────────────────

export function ModalMobileDemo() {
  const [open, setOpen] = useState(false);

  return (
    <PhoneFrame>
      <div className="h-full bg-[rgb(var(--background))] relative flex flex-col">
        {/* Screen content */}
        <div className="px-4 pt-4 pb-3 border-b border-[rgb(var(--border))]">
          <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">Settings</p>
        </div>
        <div className="flex-1 divide-y divide-[rgb(var(--border-subtle))]">
          {["Notifications", "Privacy", "Appearance", "Account"].map((item) => (
            <div key={item} className="flex items-center justify-between px-4 py-3">
              <span className="text-[12px] text-[rgb(var(--text-primary))]">{item}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[rgb(var(--text-tertiary))]" />
            </div>
          ))}
          <div className="px-4 py-3">
            <button
              onClick={() => setOpen(true)}
              className="w-full h-10 rounded-xl bg-red-500/10 text-red-400 text-[12px] font-medium"
            >
              Delete account
            </button>
          </div>
        </div>

        {/* Bottom-sheet modal overlay */}
        {open && (
          <>
            <div
              className="absolute inset-0 bg-black/40 z-10"
              onClick={() => setOpen(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 rounded-t-3xl bg-[rgb(var(--surface))] border-t border-[rgb(var(--border))] p-4 pb-6">
              <div className="w-10 h-1 rounded-full bg-[rgb(var(--border))] mx-auto mb-4" />
              <p className="text-[14px] font-semibold text-[rgb(var(--text-primary))] mb-1">Delete account?</p>
              <p className="text-[12px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed">
                This action is permanent. All your data will be removed within 30 days.
              </p>
              <div className="space-y-2">
                <button className="w-full h-11 rounded-xl bg-red-500 text-white text-[13px] font-semibold">
                  Delete permanently
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-full h-10 rounded-xl border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] text-[12px] font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </PhoneFrame>
  );
}
