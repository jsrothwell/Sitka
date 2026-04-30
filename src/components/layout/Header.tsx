"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/cn";

export function Header({ title }: { title?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className="fixed top-0 right-0 z-20 flex items-center justify-between px-8 border-b border-[rgb(var(--border))] glass"
      style={{
        left: "var(--sidebar-width)",
        height: "var(--header-height)",
      }}
    >
      <div className="flex items-center gap-2">
        {title && (
          <span className="text-[13px] text-[rgb(var(--text-secondary))]">{title}</span>
        )}
      </div>

      {/* Theme switcher */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-[rgb(var(--surface))] border border-[rgb(var(--border))]">
        {(
          [
            { value: "light", icon: Sun },
            { value: "system", icon: Monitor },
            { value: "dark", icon: Moon },
          ] as const
        ).map(({ value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              theme === value
                ? "bg-[rgb(var(--accent))] text-white shadow-sm"
                : "text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))]"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
    </header>
  );
}
