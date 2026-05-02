import { cn } from "@/lib/cn";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "offline" | "away" | "busy";

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { avatar: string; text: string; ring: string; status: string; statusPos: string }> = {
  xs: { avatar: "w-6 h-6",   text: "text-[9px]",  ring: "ring-[1.5px]", status: "w-1.5 h-1.5 ring-[1.5px]", statusPos: "bottom-0 right-0" },
  sm: { avatar: "w-8 h-8",   text: "text-[11px]", ring: "ring-2",       status: "w-2 h-2 ring-2",            statusPos: "bottom-0 right-0" },
  md: { avatar: "w-10 h-10", text: "text-[13px]", ring: "ring-2",       status: "w-2.5 h-2.5 ring-2",        statusPos: "bottom-0.5 right-0.5" },
  lg: { avatar: "w-12 h-12", text: "text-[15px]", ring: "ring-2",       status: "w-3 h-3 ring-2",            statusPos: "bottom-0.5 right-0.5" },
  xl: { avatar: "w-16 h-16", text: "text-[19px]", ring: "ring-[3px]",   status: "w-3.5 h-3.5 ring-[3px]",   statusPos: "bottom-1 right-1" },
};

const statusColors: Record<AvatarStatus, string> = {
  online:  "bg-emerald-500",
  offline: "bg-[rgb(var(--text-tertiary))]",
  away:    "bg-amber-400",
  busy:    "bg-red-400",
};

function getInitials(alt?: string, initials?: string): string {
  if (initials) return initials.slice(0, 2).toUpperCase();
  if (!alt) return "?";
  const words = alt.trim().split(/\s+/);
  return words.length >= 2
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : alt.slice(0, 2).toUpperCase();
}

export function Avatar({
  src,
  alt,
  initials,
  size = "md",
  status,
  className,
}: AvatarProps) {
  const s = sizeStyles[size];
  const label = getInitials(alt, initials);

  return (
    <span className={cn("relative inline-flex flex-shrink-0", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full overflow-hidden",
          "bg-[rgb(var(--accent-muted))] select-none",
          s.avatar
        )}
        aria-label={alt}
        role={alt ? "img" : undefined}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ""} className="w-full h-full object-cover" />
        ) : (
          <span
            className={cn(
              "font-semibold leading-none text-[rgb(var(--accent))]",
              s.text
            )}
          >
            {label}
          </span>
        )}
      </span>

      {status && (
        <span
          aria-label={status}
          className={cn(
            "absolute rounded-full ring-[rgb(var(--surface))]",
            statusColors[status],
            s.status,
            s.statusPos
          )}
        />
      )}
    </span>
  );
}

export function AvatarGroup({ children, size = "md", className }: AvatarGroupProps) {
  const s = sizeStyles[size];
  return (
    <div className={cn("flex items-center", className)}>
      {/* negative margin to create the overlap stack */}
      {Array.isArray(children)
        ? children.map((child, i) => (
            <span
              key={i}
              className={cn("relative inline-flex", s.ring, "ring-[rgb(var(--surface))] rounded-full", i > 0 && "-ml-2")}
            >
              {child}
            </span>
          ))
        : children}
    </div>
  );
}
