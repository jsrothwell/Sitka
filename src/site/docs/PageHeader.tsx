import { cn } from "@/lib";

interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
  className?: string;
}

export function PageHeader({ title, description, badge, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-10 pb-8 border-b border-[rgb(var(--border))]", className)}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {badge}
        </div>
      )}
      <h1 className="mb-2.5">{title}</h1>
      <p className="text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg">
        {description}
      </p>
    </div>
  );
}
