"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { navigation } from "@/lib/navigation";
import { Search, Hexagon } from "lucide-react";

interface SidebarProps {
  onSearchOpen?: () => void;
}

export function Sidebar({ onSearchOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-30"
      style={{ width: "var(--sidebar-width)" }}
    >
      {/* Glass background */}
      <div className="absolute inset-0 glass border-r border-[rgb(var(--border))]" />

      <div className="relative flex flex-col h-full overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-[var(--header-height)] border-b border-[rgb(var(--border))]">
          <div className="w-7 h-7 rounded-lg bg-[rgb(var(--accent))] flex items-center justify-center shadow-glow">
            <Hexagon className="w-4 h-4 text-white fill-white/20" strokeWidth={1.5} />
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-[rgb(var(--text-primary))]">
            Sitka
          </span>
          <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]">
            v1.0
          </span>
        </div>

        {/* Search trigger */}
        <div className="px-3 py-3 border-b border-[rgb(var(--border))]">
          <button
            onClick={onSearchOpen}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[rgb(var(--text-secondary))] bg-[rgb(var(--surface))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] transition-colors text-sm group"
          >
            <Search className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="flex-1 text-left text-[13px]">Search...</span>
            <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] font-medium text-[rgb(var(--text-tertiary))] bg-[rgb(var(--border))] px-1.5 py-0.5 rounded-md">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
          {navigation.map((section) => (
            <div key={section.title}>
              <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "relative flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition-colors",
                          isActive
                            ? "text-[rgb(var(--accent))] font-medium"
                            : "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface))]"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute inset-0 rounded-md bg-[rgb(var(--accent-subtle))]"
                            transition={{ type: "spring", stiffness: 400, damping: 40 }}
                          />
                        )}
                        <span className="relative z-10">{item.title}</span>
                        {item.badge && (
                          <span className="relative z-10 ml-auto text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[rgb(var(--accent))] text-white">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-[rgb(var(--border))] text-[11px] text-[rgb(var(--text-tertiary))]">
          Sitka Design System © 2026
        </div>
      </div>
    </aside>
  );
}
