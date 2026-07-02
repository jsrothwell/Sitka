"use client";

import { Sun, Moon, Monitor, Menu } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib";

export function Header({ title, onMenuOpen }: { title?: string; onMenuOpen?: () => void }) {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className="fixed top-0 right-0 z-20 flex items-center justify-between px-4 md:px-6 border-b border-[rgb(var(--border))] left-0 md:left-[var(--sidebar-width)]"
      style={{
        height: "var(--header-height)",
        backgroundColor: "rgb(var(--surface) / 0.88)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
      }}
    >
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuOpen}
        className="md:hidden p-1.5 -ml-1 mr-2 rounded-[var(--radius)] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] hover:text-[rgb(var(--text-primary))] transition-standard shrink-0"
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] min-w-0 flex-1">
        {title ? (
          <>
            <span className="text-[rgb(var(--text-tertiary))] shrink-0 hidden sm:inline">Docs</span>
            <span className="text-[rgb(var(--border))] mx-0.5 hidden sm:inline">/</span>
            <span className="font-medium text-[rgb(var(--text-primary))] truncate">{title}</span>
          </>
        ) : null}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 shrink-0">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-[var(--radius)] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] hover:text-[rgb(var(--text-primary))] transition-standard"
          aria-label="GitHub"
        >
          <GithubIcon className="w-4 h-4" />
        </a>

        <div className="w-px h-4 bg-[rgb(var(--border))] mx-2" />

        {/* Theme switcher */}
        <div className="flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))]">
          {(
            [
              { value: "light",  icon: Sun,     label: "Light"  },
              { value: "system", icon: Monitor, label: "System" },
              { value: "dark",   icon: Moon,    label: "Dark"   },
            ] as const
          ).map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              aria-label={`${label} theme`}
              className={cn(
                "p-1.5 rounded-[var(--radius-sm)] transition-standard",
                theme === value
                  ? "bg-[rgb(var(--surface))] text-[rgb(var(--text-primary))] shadow-sm"
                  : "text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
