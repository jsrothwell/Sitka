"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export type DrawerSide = "left" | "right";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  width?: string | number;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const slideVariants = {
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
};

export function Drawer({
  open,
  onClose,
  side = "right",
  width = 360,
  title,
  children,
  className,
}: DrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => prev?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const variants = slideVariants[side];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label={typeof title === "string" ? title : "Drawer"}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "fixed top-0 bottom-0 z-50 flex flex-col",
              "bg-[rgb(var(--surface))] border-[rgb(var(--border))]",
              side === "left"
                ? "left-0 border-r"
                : "right-0 border-l",
              className
            )}
            style={{ width }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[rgb(var(--border))] shrink-0">
              {title && (
                <h2 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] leading-none">
                  {title}
                </h2>
              )}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className={cn(
                  "ml-auto p-1.5 rounded-[var(--radius)] text-[rgb(var(--text-secondary))]",
                  "hover:bg-[rgb(var(--surface-raised))] hover:text-[rgb(var(--text-primary))]",
                  "transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))]"
                )}
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
