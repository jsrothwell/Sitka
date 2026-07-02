"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib";

export interface NavMenuLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavMenuGroup {
  title?: string;
  links: NavMenuLink[];
}

export interface NavMenuItem {
  label: string;
  href?: string;
  groups?: NavMenuGroup[];
}

interface NavigationMenuProps {
  items: NavMenuItem[];
  className?: string;
}

function Dropdown({ item, onClose }: { item: NavMenuItem; onClose: () => void }) {
  const allLinks = item.groups?.flatMap((g) => g.links) ?? [];
  const hasGroups = (item.groups?.length ?? 0) > 1 || !!item.groups?.[0]?.title;

  return (
    <div
      role="menu"
      className={cn(
        "absolute top-full left-0 mt-1 z-50 min-w-[220px]",
        "rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
        "shadow-lg shadow-black/10 backdrop-blur-sm",
        "animate-in fade-in-0 zoom-in-95 duration-100",
        hasGroups && "grid grid-cols-2 gap-0 min-w-[440px]",
      )}
    >
      {item.groups?.map((group, gi) => (
        <div key={gi} className={cn("p-2", gi > 0 && hasGroups && "border-l border-[rgb(var(--border-subtle))]")}>
          {group.title && (
            <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
              {group.title}
            </p>
          )}
          {group.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="menuitem"
              onClick={onClose}
              className="flex flex-col gap-0.5 px-3 py-2 rounded-lg hover:bg-[rgb(var(--surface-raised))] transition-colors"
            >
              <span className="text-[13px] font-medium text-[rgb(var(--text-primary))]">{link.label}</span>
              {link.description && (
                <span className="text-[12px] text-[rgb(var(--text-tertiary))]">{link.description}</span>
              )}
            </a>
          ))}
        </div>
      ))}
      <div className="sr-only" aria-live="polite">
        {allLinks.length} links available
      </div>
    </div>
  );
}

export function NavigationMenu({ items, className }: NavigationMenuProps) {
  const [open, setOpen] = useState<number | null>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(e: KeyboardEvent, index: number) {
    if (e.key === "Escape") {
      setOpen(null);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(index);
    }
  }

  return (
    <nav ref={menuRef} aria-label="Main navigation" className={cn("relative flex items-center gap-1", className)}>
      {items.map((item, i) => (
        <div key={item.label} className="relative">
          {item.groups ? (
            <button
              aria-haspopup="menu"
              aria-expanded={open === i}
              onMouseEnter={() => setOpen(i)}
              onMouseLeave={() => setOpen(null)}
              onFocus={() => setOpen(i)}
              onBlur={() => setOpen(null)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors",
                "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))]",
                open === i && "bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))]",
              )}
            >
              {item.label}
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", open === i && "rotate-180")}
                aria-hidden="true"
              />
            </button>
          ) : (
            <a
              href={item.href}
              className="flex items-center px-3 py-1.5 rounded-lg text-[13px] font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))] transition-colors"
            >
              {item.label}
            </a>
          )}

          {item.groups && open === i && (
            <div
              onMouseEnter={() => setOpen(i)}
              onMouseLeave={() => setOpen(null)}
            >
              <Dropdown item={item} onClose={() => setOpen(null)} />
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
