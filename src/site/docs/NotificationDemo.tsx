"use client";

import { useState, useEffect } from "react";
import { Toast } from "@/components/ui/Toast";
import {
  MessageCircle, Heart, UserPlus, AlertTriangle,
  CheckCircle2, XCircle, Info,
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
      {children}
      <div className="flex-shrink-0 h-5 flex items-center justify-center bg-[rgb(var(--surface))]">
        <div className="w-20 h-[3px] rounded-full bg-[rgb(var(--text-primary))] opacity-20" />
      </div>
    </div>
  );
}

// ── Notification types config ─────────────────────────────

const NOTIFICATION_TYPES = [
  {
    key: "message",
    label: "Message",
    icon: MessageCircle,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/15",
    app: "Messages",
    title: "Jamie replied to you",
    body: "Sounds good, see you at 3pm!",
  },
  {
    key: "like",
    label: "Like",
    icon: Heart,
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/15",
    app: "Social",
    title: "Alex liked your post",
    body: "\"Beautiful shot from the trail...\"",
  },
  {
    key: "follow",
    label: "Follow",
    icon: UserPlus,
    iconColor: "text-green-400",
    iconBg: "bg-green-500/15",
    app: "Social",
    title: "Sam started following you",
    body: "Tap to view their profile",
  },
  {
    key: "alert",
    label: "Alert",
    icon: AlertTriangle,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/15",
    app: "System",
    title: "Low storage warning",
    body: "Only 2 GB remaining on your device",
  },
] as const;

type NotifKey = typeof NOTIFICATION_TYPES[number]["key"];

// ── Mobile notification demo ──────────────────────────────

export function MobileNotificationDemo() {
  const [active, setActive] = useState<NotifKey | null>(null);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setActive(null), 3500);
    return () => clearTimeout(t);
  }, [active]);

  const notif = NOTIFICATION_TYPES.find((n) => n.key === active);

  return (
    <div className="flex flex-col items-center gap-6">
      <PhoneFrame>
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {/* App-like background */}
          <div className="flex-1 flex flex-col items-center justify-center gap-2 px-5">
            <p className="text-[11px] font-semibold text-[rgb(var(--text-tertiary))] uppercase tracking-wider">
              Tap a type below
            </p>
            <p className="text-[10px] text-[rgb(var(--text-tertiary))] text-center">
              Banner slides in from the top and auto-dismisses after 3.5 s
            </p>
          </div>

          {/* Banner — slides in from top */}
          <div
            className={cn(
              "absolute top-0 left-0 right-0 z-20 px-3 pt-2 transition-transform duration-300 ease-out",
              notif ? "translate-y-0" : "-translate-y-full"
            )}
          >
            {notif && (
              <div
                className={cn(
                  "flex items-start gap-2.5 px-3 py-2.5 rounded-2xl",
                  "bg-[rgb(var(--surface-raised))]/90 backdrop-blur-sm",
                  "border border-[rgb(var(--border))]",
                  "shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                )}
              >
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", notif.iconBg)}>
                  <notif.icon className={cn("w-3.5 h-3.5", notif.iconColor)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="text-[9px] font-semibold text-[rgb(var(--text-tertiary))] uppercase tracking-wide truncate">
                      {notif.app}
                    </span>
                    <span className="text-[9px] text-[rgb(var(--text-tertiary))] flex-shrink-0">now</span>
                  </div>
                  <p className="text-[11px] font-semibold text-[rgb(var(--text-primary))] mt-0.5 truncate">{notif.title}</p>
                  <p className="text-[10px] text-[rgb(var(--text-secondary))] truncate">{notif.body}</p>
                </div>
              </div>
            )}
          </div>

          {/* Trigger buttons */}
          <div className="p-3 grid grid-cols-2 gap-1.5">
            {NOTIFICATION_TYPES.map((n) => (
              <button
                key={n.key}
                onClick={() => setActive(n.key)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[10px] font-medium",
                  "border transition-colors",
                  active === n.key
                    ? "bg-[rgb(var(--accent))] border-[rgb(var(--accent))] text-white"
                    : "bg-[rgb(var(--surface))] border-[rgb(var(--border))] text-[rgb(var(--text-secondary))]"
                )}
              >
                <n.icon className={cn("w-3 h-3", active === n.key ? "text-white" : n.iconColor)} />
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

// ── Desktop toast demo ────────────────────────────────────

const TOAST_VARIANTS = [
  { variant: "success" as const, label: "Success", icon: CheckCircle2, title: "Changes saved",     description: "Your profile has been updated." },
  { variant: "error"   as const, label: "Error",   icon: XCircle,      title: "Upload failed",     description: "File exceeds the 10 MB limit." },
  { variant: "warning" as const, label: "Warning", icon: AlertTriangle, title: "Session expiring", description: "You'll be logged out in 5 minutes." },
  { variant: "info"    as const, label: "Info",    icon: Info,          title: "New version ready", description: "Refresh to update the app." },
] as const;

export function DesktopToastDemo() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  function fire(idx: number) {
    setOpen(false);
    setTimeout(() => {
      setCurrent(idx);
      setOpen(true);
    }, 50);
  }

  const toast = TOAST_VARIANTS[current];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {TOAST_VARIANTS.map((v, i) => (
          <button
            key={v.variant}
            onClick={() => fire(i)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium border transition-colors",
              "bg-[rgb(var(--surface))] border-[rgb(var(--border))] text-[rgb(var(--text-secondary))]",
              "hover:bg-[rgb(var(--surface-raised))] hover:text-[rgb(var(--text-primary))]"
            )}
          >
            <v.icon className="w-3.5 h-3.5" />
            {v.label}
          </button>
        ))}
      </div>
      <p className="text-[12px] text-[rgb(var(--text-tertiary))]">
        Toast appears bottom-right and auto-dismisses after 4 s
      </p>
      <Toast
        open={open}
        onClose={() => setOpen(false)}
        variant={toast.variant}
        title={toast.title}
        description={toast.description}
        position="bottom-right"
      />
    </div>
  );
}
