"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { TableOfContents } from "./TableOfContents";
import { CommandPalette } from "@/site/search/CommandPalette";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar on navigation
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex min-h-screen bg-[rgb(var(--background))]">
      <Sidebar
        onSearchOpen={() => setSearchOpen(true)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Content column */}
      <div className="flex flex-col flex-1 min-w-0 md:ml-[var(--sidebar-width)]">
        <Header onMenuOpen={() => setSidebarOpen(true)} />

        <div className="flex flex-1 min-w-0">
          <main
            className="flex-1 min-w-0 pb-32 px-5 md:pl-[clamp(3.5rem,8%,7rem)] md:pr-[clamp(2rem,5%,4rem)]"
            style={{ paddingTop: "calc(var(--header-height) + 2.5rem)", maxWidth: "860px" }}
          >
            {children}
          </main>

          {/* Right ToC — visible on xl screens only */}
          <aside
            className="hidden xl:block w-52 shrink-0 pr-8"
            style={{ paddingTop: "calc(var(--header-height) + 3rem)" }}
          >
            <div className="sticky" style={{ top: "calc(var(--header-height) + 2rem)" }}>
              <TableOfContents key={pathname} />
            </div>
          </aside>
        </div>
      </div>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
