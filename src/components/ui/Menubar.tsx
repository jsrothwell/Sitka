"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib";

export interface MenubarSeparator {
  type: "separator";
}

export interface MenubarCheckItem {
  type: "check";
  label: string;
  checked: boolean;
  shortcut?: string;
  onToggle: () => void;
}

export interface MenubarActionItem {
  type?: "action";
  label: string;
  shortcut?: string;
  disabled?: boolean;
  onSelect: () => void;
}

export interface MenubarSubItem {
  type: "sub";
  label: string;
  items: MenubarItem[];
}

export type MenubarItem =
  | MenubarActionItem
  | MenubarCheckItem
  | MenubarSubItem
  | MenubarSeparator;

export interface MenubarMenu {
  label: string;
  items: MenubarItem[];
}

interface MenubarProps {
  menus: MenubarMenu[];
  className?: string;
}

function MenuItem({ item, depth = 0 }: { item: MenubarItem; depth?: number }) {
  const [subOpen, setSubOpen] = useState(false);

  if (item.type === "separator") {
    return <div role="separator" className="my-1 h-px bg-[rgb(var(--border-subtle))]" />;
  }

  if (item.type === "sub") {
    return (
      <div
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={subOpen}
        className="relative flex items-center justify-between gap-8 px-3 py-1.5 rounded text-[13px] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--accent))] hover:text-white cursor-default select-none transition-colors"
        onMouseEnter={() => setSubOpen(true)}
        onMouseLeave={() => setSubOpen(false)}
      >
        {item.label}
        <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
        {subOpen && (
          <div
            role="menu"
            className="absolute left-full top-0 -mt-1 ml-1 min-w-[180px] rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-lg shadow-black/10 p-1 z-50"
          >
            {item.items.map((sub, i) => (
              <MenuItem key={i} item={sub} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (item.type === "check") {
    return (
      <button
        role="menuitemcheckbox"
        aria-checked={item.checked}
        onClick={item.onToggle}
        className="w-full flex items-center gap-2 px-3 py-1.5 rounded text-[13px] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--accent))] hover:text-white cursor-default select-none transition-colors"
      >
        <span className="w-4 flex justify-center">
          {item.checked && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
        </span>
        <span className="flex-1 text-left">{item.label}</span>
        {item.shortcut && (
          <kbd className="text-[11px] opacity-50">{item.shortcut}</kbd>
        )}
      </button>
    );
  }

  return (
    <button
      role="menuitem"
      disabled={item.disabled}
      onClick={item.onSelect}
      className={cn(
        "w-full flex items-center gap-2 px-3 py-1.5 rounded text-[13px] cursor-default select-none transition-colors",
        item.disabled
          ? "text-[rgb(var(--text-tertiary))] opacity-50 pointer-events-none"
          : "text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--accent))] hover:text-white",
      )}
    >
      <span className="w-4" aria-hidden="true" />
      <span className="flex-1 text-left">{item.label}</span>
      {item.shortcut && (
        <kbd className="text-[11px] opacity-50">{item.shortcut}</kbd>
      )}
    </button>
  );
}

export function Menubar({ menus, className }: MenubarProps) {
  const [open, setOpen] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key === "ArrowLeft") setOpen((p) => ((p ?? i) - 1 + menus.length) % menus.length);
    if (e.key === "ArrowRight") setOpen((p) => ((p ?? i) + 1) % menus.length);
    if (e.key === "Escape") setOpen(null);
    if (e.key === "Enter" || e.key === " ") setOpen(i);
  }

  return (
    <div
      ref={barRef}
      role="menubar"
      aria-label="Application menu"
      className={cn(
        "flex items-center gap-0.5 h-9 px-2",
        "bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border-subtle))]",
        className,
      )}
    >
      {menus.map((menu, i) => (
        <div key={menu.label} className="relative">
          <button
            role="menuitem"
            aria-haspopup="menu"
            aria-expanded={open === i}
            tabIndex={open === i ? 0 : -1}
            onMouseDown={() => setOpen(open === i ? null : i)}
            onMouseEnter={() => open !== null && setOpen(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={cn(
              "px-3 py-1 rounded text-[13px] font-medium transition-colors",
              open === i
                ? "bg-[rgb(var(--accent))] text-white"
                : "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface))]",
            )}
          >
            {menu.label}
          </button>

          {open === i && (
            <div
              role="menu"
              aria-label={menu.label}
              className="absolute top-full left-0 mt-1 min-w-[200px] rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-lg shadow-black/10 p-1 z-50"
              onMouseLeave={() => {}}
            >
              {menu.items.map((item, j) => (
                <MenuItem key={j} item={item} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
