"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronRight, Search, X } from "lucide-react";
import { cn } from "@/lib";
import { navigation, type NavGroup, type NavItem } from "@/site/navigation";

export function Sidebar({
  onSearchOpen,
  isOpen,
  onClose,
}: {
  onSearchOpen?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* ── Mobile backdrop ────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-30 flex flex-col transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          width: "var(--sidebar-width)",
          borderRight: "1px solid rgb(var(--border-subtle))",
          backgroundColor: "rgb(var(--surface))",
          backdropFilter: "blur(10px) saturate(160%)",
          WebkitBackdropFilter: "blur(10px) saturate(160%)",
        }}
      >
        {/* ── Logo ──────────────────────────────────────── */}
        <div
          className="sidebar-section flex items-center gap-2.5 shrink-0 border-b border-[rgb(var(--border))]"
          style={{ height: "var(--header-height)" }}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-standard"
          >
            <span className="w-6 h-6 rounded-full bg-white shrink-0 flex items-center justify-center overflow-hidden">
              <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/sitka-logo.png`} width={22} height={22} alt="Sitka logo" className="w-full h-full object-contain" />
            </span>
            <span className="font-semibold text-[14px] tracking-tight text-[rgb(var(--text-primary))] leading-none">
              Sitka
            </span>
          </Link>
          <span className="font-mono text-[10px] font-medium px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-tertiary))] border border-[rgb(var(--border))]">
            v1.7
          </span>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="md:hidden ml-auto p-1.5 rounded-[var(--radius)] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] hover:text-[rgb(var(--text-primary))] transition-standard"
            aria-label="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Search trigger ────────────────────────────── */}
        <div className="sidebar-section pt-4 pb-2 shrink-0">
          <button
            onClick={onSearchOpen}
            className="w-full flex items-center gap-2.5 rounded-[var(--radius-md)] text-[13px] text-[rgb(var(--text-tertiary))] bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent-muted))] hover:text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-hover))] transition-standard"
            style={{ height: "2.25rem", paddingLeft: "0.75rem", paddingRight: "0.75rem" }}
          >
            <Search className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
            <span className="flex-1 text-left">Search…</span>
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded-[var(--radius-sm)] border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text-tertiary))] leading-none">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* ── Nav ──────────────────────────────────────── */}
        <nav className="sidebar-section flex-1 overflow-y-auto py-3 flex flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <p className="label-mono mb-2">{section.title}</p>

              {section.groups ? (
                <div className="flex flex-col gap-1">
                  {section.groups.map((group) => (
                    <NavGroupRow
                      key={group.title}
                      group={group}
                      pathname={pathname}
                    />
                  ))}
                </div>
              ) : (
                <ul className="flex flex-col gap-0.5">
                  {section.items?.map((item) => (
                    <NavLinkItem
                      key={item.href}
                      item={item}
                      isActive={pathname === item.href}
                    />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* ── Footer ────────────────────────────────────── */}
        <div className="sidebar-section py-3.5 border-t border-[rgb(var(--border))] shrink-0">
          <p className="label-mono">Sitka</p>
        </div>
      </aside>
    </>
  );
}

function NavGroupRow({ group, pathname }: { group: NavGroup; pathname: string }) {
  const hasActive = group.items.some((item) => pathname === item.href);
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-1.5 px-2 py-1 rounded-[var(--radius)] text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] transition-standard"
        aria-expanded={open}
      >
        <ChevronRight
          className={cn(
            "w-3 h-3 shrink-0 transition-transform duration-200",
            open && "rotate-90"
          )}
          strokeWidth={2.5}
        />
        {group.title}
        {hasActive && !open && (
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[rgb(var(--accent))]" />
        )}
      </button>

      {open && (
        <ul className="mt-0.5 ml-[1.125rem] flex flex-col gap-0.5 pl-2.5 border-l border-[rgb(var(--border-subtle))]">
          {group.items.map((item) => (
            <NavLinkItem
              key={item.href}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function NavLinkItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <li>
      <Link
        href={item.href}
        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-[var(--radius)] text-[13px] font-medium transition-standard",
          isActive
            ? "bg-[rgb(var(--accent-subtle))]"
            : "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))]"
        )}
        style={isActive ? { color: "var(--nav-active-color)" } : undefined}
      >
        {item.title}
        {item.badge && (
          <span className="ml-auto text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]">
            {item.badge}
          </span>
        )}
      </Link>
    </li>
   );
 }

