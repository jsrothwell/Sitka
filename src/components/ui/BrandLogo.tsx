"use client";

import { useState } from "react";
import { cn } from "@/lib";

export type BrandLogoSize = "sm" | "md" | "lg";

export interface BrandLogoProps {
  /** Image URL — a favicon, CDN logo, or uploaded asset. */
  src?: string;
  /** Entity name — used for the accessible label and the initials fallback. */
  name: string;
  /** Icon rendered when `src` is absent or fails to load, before falling back to initials. */
  icon?: React.ReactNode;
  size?: BrandLogoSize;
  /** "rounded" for app/company logos, "circle" for people or informal brands. */
  shape?: "rounded" | "circle";
  className?: string;
}

const sizeStyles: Record<BrandLogoSize, { box: string; text: string; icon: string }> = {
  sm: { box: "w-6 h-6", text: "text-[10px]", icon: "w-3 h-3" },
  md: { box: "w-9 h-9", text: "text-[13px]", icon: "w-4 h-4" },
  lg: { box: "w-12 h-12", text: "text-[16px]", icon: "w-5 h-5" },
};

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  return words.length >= 2
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : words[0].slice(0, 2).toUpperCase();
}

/**
 * Brand/Company Logo — image → icon → initials fallback chain.
 * Use for external entities (job sources, integrations, companies) where a
 * reliable image isn't guaranteed at render time.
 */
export function BrandLogo({
  src,
  name,
  icon,
  size = "md",
  shape = "rounded",
  className,
}: BrandLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const s = sizeStyles[size];
  const showImage = src && !imageFailed;

  return (
    <span
      role="img"
      aria-label={name}
      className={cn(
        "inline-flex items-center justify-center shrink-0 overflow-hidden select-none",
        "bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))]",
        shape === "circle" ? "rounded-full" : "rounded-[var(--radius-sm)]",
        s.box,
        className
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : icon ? (
        <span className={cn(s.icon, "text-[rgb(var(--text-secondary))]")}>{icon}</span>
      ) : (
        <span className={cn("font-semibold text-[rgb(var(--text-secondary))]", s.text)}>
          {getInitials(name)}
        </span>
      )}
    </span>
  );
}
