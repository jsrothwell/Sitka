"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { CommandPalette } from "@/components/search/CommandPalette";
import { motion } from "framer-motion";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

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
      <Sidebar onSearchOpen={() => setSearchOpen(true)} />

      <div
        className="flex-1 flex flex-col"
        style={{ marginLeft: "var(--sidebar-width)" }}
      >
        <Header />

        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 px-8 pt-[calc(var(--header-height)+48px)] pb-20 max-w-4xl mx-auto w-full"
        >
          {children}
        </motion.main>
      </div>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
