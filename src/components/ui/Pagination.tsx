"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblings?: number;
  className?: string;
}

function getPageRange(page: number, total: number, siblings: number): (number | "…")[] {
  const totalButtons = siblings * 2 + 5;

  if (total <= totalButtons) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblings, 1);
  const rightSibling = Math.min(page + siblings, total);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = Array.from({ length: 3 + siblings * 2 }, (_, i) => i + 1);
    return [...leftRange, "…", total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = Array.from(
      { length: 3 + siblings * 2 },
      (_, i) => total - (3 + siblings * 2) + i + 1
    );
    return [1, "…", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i
  );
  return [1, "…", ...middleRange, "…", total];
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblings = 1,
  className,
}: PaginationProps) {
  const items = getPageRange(page, totalPages, siblings);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
      <PaginationButton
        onClick={() => onPageChange(page - 1)}
        disabled={!canPrev}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={2} />
      </PaginationButton>

      {items.map((item, i) =>
        item === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-[rgb(var(--text-tertiary))]"
            aria-hidden="true"
          >
            <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
          </span>
        ) : (
          <PaginationButton
            key={item}
            onClick={() => onPageChange(item as number)}
            aria-label={`Go to page ${item}`}
            aria-current={item === page ? "page" : undefined}
            isActive={item === page}
          >
            {item}
          </PaginationButton>
        )
      )}

      <PaginationButton
        onClick={() => onPageChange(page + 1)}
        disabled={!canNext}
        aria-label="Go to next page"
      >
        <ChevronRight className="w-4 h-4" strokeWidth={2} />
      </PaginationButton>
    </nav>
  );
}

function PaginationButton({
  children,
  isActive,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--background))]",
        isActive
          ? "bg-[rgb(var(--accent))] text-white shadow-[0_0_0_1px_rgba(0,192,232,0.3)]"
          : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] hover:text-[rgb(var(--text-primary))]",
        props.disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
