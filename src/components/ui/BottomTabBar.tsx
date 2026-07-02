"use client";

import { cn } from "@/lib";
import type { ReactNode } from "react";

export interface BottomTabItem {
  value: string;
  label: string;
  icon: ReactNode;
  badge?: number | string;
}

export interface BottomTabBarProps {
  items: BottomTabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function BottomTabBar({ items, value, onChange, className }: BottomTabBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Navigation"
      className={cn(
        "flex items-stretch border-t border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
        className
      )}
      style={{
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.value)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 py-2.5 relative transition-colors",
              isActive
                ? "text-[rgb(var(--accent))]"
                : "text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"
            )}
          >
            {item.badge !== undefined && (
              <span className="absolute top-1.5 left-[calc(50%+6px)] min-w-[15px] h-[15px] flex items-center justify-center rounded-full bg-[rgb(var(--accent))] text-white text-[9px] font-bold px-1 leading-none">
                {typeof item.badge === "number" && item.badge > 99 ? "99+" : item.badge}
              </span>
            )}
            <span className={cn("transition-transform duration-150", isActive && "scale-110")}>
              {item.icon}
            </span>
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
