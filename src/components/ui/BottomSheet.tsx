"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type BottomSheetSnap = "auto" | "half" | "full";

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  snapHeight?: BottomSheetSnap;
  className?: string;
}

const snapHeights: Record<BottomSheetSnap, string> = {
  auto: "max-h-[85vh]",
  half: "h-[50vh]",
  full: "h-[90vh]",
};

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  snapHeight = "auto",
  className,
}: BottomSheetProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col justify-end"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative flex flex-col rounded-t-[20px]",
          "bg-[rgb(var(--surface-raised))] border-t border-[rgb(var(--border))]",
          "shadow-[0_-8px_40px_rgba(0,0,0,0.30)]",
          snapHeights[snapHeight],
          className
        )}
      >
        {/* Drag handle */}
        <div className="flex-shrink-0 pt-3 px-4 pb-1">
          <div className="w-10 h-[3px] rounded-full bg-[rgb(var(--border))] mx-auto" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgb(var(--border-subtle))]">
            <h2 className="text-[15px] font-semibold text-[rgb(var(--text-primary))]">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-[rgb(var(--surface))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-hover))] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
