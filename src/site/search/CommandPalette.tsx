"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Hash, Box, Layers, BookOpen } from "lucide-react";
import { allSearchableItems } from "@/site/navigation";
import { cn } from "@/lib";

const sectionIcons: Record<string, React.ElementType> = {
  "Getting Started": BookOpen,
  Foundations: Layers,
  Components: Box,
  Tokens: Hash,
};

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query
    ? allSearchableItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.section.toLowerCase().includes(query.toLowerCase())
      )
    : allSearchableItems.slice(0, 8);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") setSelected((s) => Math.min(s + 1, results.length - 1));
      if (e.key === "ArrowUp") setSelected((s) => Math.max(s - 1, 0));
      if (e.key === "Enter" && results[selected]) {
        router.push(results[selected].href);
        onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, results, selected, router, onClose]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
            className="fixed left-1/2 top-[20vh] z-50 w-full max-w-xl -translate-x-1/2"
          >
            <div className="glass rounded-2xl overflow-hidden shadow-xl">
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgb(var(--border))]">
                <Search className="w-4 h-4 text-[rgb(var(--text-tertiary))] flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search components, tokens, guides..."
                  className="flex-1 bg-transparent text-[rgb(var(--text-primary))] placeholder-[rgb(var(--text-tertiary))] text-[15px] outline-none"
                />
                <kbd className="text-[11px] text-[rgb(var(--text-tertiary))] bg-[rgb(var(--surface))] border border-[rgb(var(--border))] px-2 py-0.5 rounded-md">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <ul className="py-2 max-h-72 overflow-y-auto">
                {results.length === 0 ? (
                  <li className="px-4 py-8 text-center text-[13px] text-[rgb(var(--text-tertiary))]">
                    No results for &ldquo;{query}&rdquo;
                  </li>
                ) : (
                  results.map((item, i) => {
                    const Icon = sectionIcons[item.section] ?? Box;
                    return (
                      <li key={item.href}>
                        <button
                          onMouseEnter={() => setSelected(i)}
                          onClick={() => {
                            router.push(item.href);
                            onClose();
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                            i === selected
                              ? "bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))]"
                              : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface))]"
                          )}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0 opacity-60" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-medium truncate">{item.title}</div>
                            <div className="text-[11px] opacity-60 truncate">{item.section}</div>
                          </div>
                          {i === selected && (
                            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                          )}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-[rgb(var(--border))] flex items-center gap-4 text-[11px] text-[rgb(var(--text-tertiary))]">
                <span className="flex items-center gap-1.5">
                  <kbd className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] px-1.5 py-0.5 rounded text-[10px]">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] px-1.5 py-0.5 rounded text-[10px]">↵</kbd>
                  Select
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
