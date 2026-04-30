import { cn } from "@/lib/cn";

interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
  className?: string;
}

export function PageHeader({ title, description, badge, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-10", className)}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {badge}
        </span>
      )}
      <h1 className="text-[32px] font-semibold tracking-tight text-[rgb(var(--text-primary))] leading-tight mb-3">
        {title}
      </h1>
      <p className="text-[16px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-2xl">
        {description}
      </p>
    </div>
  );
}
