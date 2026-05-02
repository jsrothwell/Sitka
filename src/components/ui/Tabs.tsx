"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface Tab {
  id: string;
  label: string;
  badge?: string;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  children: (activeId: string) => React.ReactNode;
  className?: string;
}

export function Tabs({ tabs, defaultTab, children, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  return (
    <div className={cn("flex flex-col gap-0", className)}>
      <div
        role="tablist"
        className="flex items-center gap-0.5 border-b border-[rgb(var(--border))] px-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "relative flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium transition-colors duration-150 outline-none",
              "focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] rounded-t",
              active === tab.id
                ? "text-[rgb(var(--text-primary))]"
                : "text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"
            )}
          >
            {tab.label}
            {tab.badge && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]">
                {tab.badge}
              </span>
            )}
            {active === tab.id && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(var(--accent))] rounded-t-full"
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-4">
        {children(active)}
      </div>
    </div>
  );
}
