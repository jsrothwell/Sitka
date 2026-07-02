"use client";

import {
  Search,
  Upload,
  Lock,
  WifiOff,
  Bookmark,
  Trash2,
} from "lucide-react";

interface EmptyStateProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  primaryAction?: string;
  secondaryAction?: string;
}

function EmptyStateCard({
  icon,
  iconBg,
  iconColor,
  title,
  description,
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-8 flex flex-col items-center text-center gap-3">
      <div
        className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center`}
      >
        <span className={iconColor}>{icon}</span>
      </div>
      <div className="space-y-1.5">
        <h3 className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">{title}</h3>
        <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-[220px]">
          {description}
        </p>
      </div>
      {(primaryAction || secondaryAction) && (
        <div className="flex items-center gap-2 mt-1">
          {primaryAction && (
            <button className="px-3.5 py-1.5 rounded-lg bg-[rgb(var(--accent))] text-white text-[12px] font-medium hover:opacity-90 transition-opacity">
              {primaryAction}
            </button>
          )}
          {secondaryAction && (
            <button className="px-3.5 py-1.5 rounded-lg border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] text-[12px] font-medium hover:bg-[rgb(var(--surface-raised))] transition-colors">
              {secondaryAction}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function EmptyStatesDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <EmptyStateCard
        icon={<Search className="w-6 h-6" />}
        iconBg="bg-[rgb(var(--accent-subtle))]"
        iconColor="text-[rgb(var(--accent))]"
        title="No results found"
        description={'Nothing matches “dark mode tokens”. Try a different query or browse all foundations.'}
        primaryAction="Clear search"
        secondaryAction="Browse all"
      />
      <EmptyStateCard
        icon={<Upload className="w-6 h-6" />}
        iconBg="bg-violet-500/10"
        iconColor="text-violet-400"
        title="Upload your first file"
        description="Drag a PDF, DOCX, or image here to get started. Supports files up to 25 MB."
        primaryAction="Choose file"
      />
      <EmptyStateCard
        icon={<Lock className="w-6 h-6" />}
        iconBg="bg-amber-500/10"
        iconColor="text-amber-400"
        title="Pro feature"
        description="Advanced analytics are available on the Pro plan. Upgrade to unlock this section."
        primaryAction="View plans"
        secondaryAction="Contact sales"
      />
      <EmptyStateCard
        icon={<WifiOff className="w-6 h-6" />}
        iconBg="bg-red-500/10"
        iconColor="text-red-400"
        title="Connection lost"
        description="Can't reach the server. Check your connection and try again. Offline mode is available."
        primaryAction="Retry"
        secondaryAction="Go offline"
      />
      <EmptyStateCard
        icon={<Bookmark className="w-6 h-6" />}
        iconBg="bg-emerald-500/10"
        iconColor="text-emerald-400"
        title="No bookmarks yet"
        description="Save important pages by clicking the bookmark icon. They'll appear here for quick access."
        primaryAction="Browse docs"
      />
      <EmptyStateCard
        icon={<Trash2 className="w-6 h-6" />}
        iconBg="bg-[rgb(var(--surface-raised))]"
        iconColor="text-[rgb(var(--text-tertiary))]"
        title="Project deleted"
        description="This project was removed. You can restore it from the trash within 30 days."
        primaryAction="Restore"
        secondaryAction="Other projects"
      />
    </div>
  );
}
