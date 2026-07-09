"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib";

export interface ContextMenuAction {
  type?: "action";
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}
export interface ContextMenuSeparator {
  type: "separator";
}
export type ContextMenuItem = ContextMenuAction | ContextMenuSeparator;

interface ContextMenuProps {
  items: ContextMenuItem[];
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export function ContextMenu({ items, children, onOpenChange }: ContextMenuProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const open = (x: number, y: number) => {
    setPos({ x, y });
    onOpenChange?.(true);
  };
  const close = useCallback(() => {
    setPos(null);
    onOpenChange?.(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!pos) return;
    const handler = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e instanceof MouseEvent && menuRef.current?.contains(e.target as Node)) return;
      close();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", handler);
    };
  }, [pos, close]);

  return (
    <>
      <div onContextMenu={(e) => {
        e.preventDefault();
        open(e.clientX, e.clientY);
      }}>
        {children}
      </div>

      {pos && (
        <div
          ref={menuRef}
          role="menu"
          className="fixed z-50 min-w-[180px] py-1 rounded-[var(--radius-md)] border border-[rgb(var(--border))]"
          style={{
            top: pos.y,
            left: pos.x,
            background: "rgb(var(--surface) / 0.92)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            boxShadow: "var(--shadow-sheet), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px rounded-t-[var(--radius-md)] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

          {items.map((item, i) => {
            if (item.type === "separator") {
              return <div key={i} className="my-1 h-px bg-[rgb(var(--border-subtle))]" role="separator" />;
            }
            const action = item as ContextMenuAction;
            return (
              <button
                key={i}
                role="menuitem"
                disabled={action.disabled}
                onClick={() => { action.onSelect(); close(); }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-left transition-colors duration-100",
                  action.destructive
                    ? "text-[rgb(var(--status-danger))] hover:bg-[rgb(var(--status-danger)/0.1)]"
                    : "text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))]",
                  action.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                )}
              >
                {action.icon && <span className="w-4 h-4 shrink-0 opacity-60">{action.icon}</span>}
                <span className="flex-1">{action.label}</span>
                {action.shortcut && (
                  <kbd className="font-mono text-[10px] text-[rgb(var(--text-tertiary))] ml-4">{action.shortcut}</kbd>
                )}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}