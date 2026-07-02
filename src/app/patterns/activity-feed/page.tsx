"use client";

import { useState } from "react";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

type EventType = "commit" | "comment" | "deploy" | "alert" | "member";

interface FeedItem {
  id: number;
  type: EventType;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
  unread?: boolean;
}

const ITEMS: FeedItem[] = [
  { id: 1, type: "deploy",  user: "Jamie R",  avatar: "JR", action: "deployed",           target: "v1.3.0 → production",  time: "2m ago",   unread: true },
  { id: 2, type: "comment", user: "Sam T",    avatar: "ST", action: "commented on",         target: "PR #214 — Grid system", time: "14m ago",  unread: true },
  { id: 3, type: "commit",  user: "Alex K",   avatar: "AK", action: "merged",               target: "feat/density-tokens",   time: "1h ago" },
  { id: 4, type: "alert",   user: "System",   avatar: "SY", action: "error spike detected", target: "API — /v2/export",      time: "2h ago" },
  { id: 5, type: "member",  user: "Mia C",    avatar: "MC", action: "joined",               target: "Design Systems team",   time: "3h ago" },
  { id: 6, type: "commit",  user: "Jamie R",  avatar: "JR", action: "pushed 3 commits to",  target: "main",                  time: "5h ago" },
];

const TYPE_STYLES: Record<EventType, { dot: string; icon: string }> = {
  commit:  { dot: "bg-[rgb(var(--accent))]",          icon: "⤳" },
  comment: { dot: "bg-[rgb(var(--status-warning))]",  icon: "◎" },
  deploy:  { dot: "bg-[rgb(var(--status-success))]",  icon: "▲" },
  alert:   { dot: "bg-[rgb(var(--status-danger))]",   icon: "!" },
  member:  { dot: "bg-purple-400",                    icon: "+" },
};

const CODE = {
  react: {
    filename: "ActivityFeed.tsx",
    code: `interface FeedItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
  type: "commit" | "comment" | "deploy" | "alert" | "member";
  unread?: boolean;
}

function ActivityFeed({ items }: { items: FeedItem[] }) {
  return (
    <ol
      aria-label="Activity feed"
      className="relative flex flex-col"
    >
      {/* Vertical connector line */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-[19px] w-px bg-[rgb(var(--border))]"
      />

      {items.map((item) => (
        <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Type dot */}
          <span
            className={\`
              relative z-10 flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full text-[11px] font-bold text-white
              \${typeStyles[item.type]}
            \`}
            aria-hidden="true"
          >
            {item.avatar}
          </span>

          <div className="flex-1 pt-1.5">
            <p className="text-[13px] text-[rgb(var(--text-secondary))]">
              <strong className="font-medium text-[rgb(var(--text-primary))]">
                {item.user}
              </strong>{" "}
              {item.action}{" "}
              <span className="font-medium text-[rgb(var(--text-primary))]">
                {item.target}
              </span>
            </p>
            <time className="text-[12px] text-[rgb(var(--text-tertiary))]">
              {item.time}
            </time>
          </div>

          {item.unread && (
            <span
              className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[rgb(var(--accent))]"
              aria-label="Unread"
            />
          )}
        </li>
      ))}
    </ol>
  );
}`,
  },
  html: {
    filename: "activity-feed.html",
    code: `<ol aria-label="Activity feed" style="position:relative; padding:0; list-style:none;">
  <!-- Connector line -->
  <div aria-hidden="true" style="
    position:absolute; left:19px; top:0; bottom:0;
    width:1px; background:rgb(var(--border));
  "></div>

  <!-- Feed item -->
  <li style="position:relative; display:flex; gap:16px; padding-bottom:24px;">
    <span aria-hidden="true" style="
      position:relative; z-index:1;
      width:40px; height:40px; border-radius:50%;
      background:rgb(var(--status-success));
      display:flex; align-items:center; justify-content:center;
      font-size:11px; font-weight:700; color:#fff; flex-shrink:0;
    ">JR</span>

    <div style="flex:1; padding-top:6px;">
      <p style="font-size:13px; color:rgb(var(--text-secondary));">
        <strong>Jamie R</strong> deployed
        <strong>v1.3.0 → production</strong>
      </p>
      <time style="font-size:12px; color:rgb(var(--text-tertiary));">2m ago</time>
    </div>

    <!-- Unread dot -->
    <span aria-label="Unread" style="
      margin-top:8px; width:8px; height:8px; border-radius:50%;
      background:rgb(var(--accent)); flex-shrink:0;
    "></span>
  </li>
</ol>`,
  },
  swift: {
    filename: "ActivityFeedView.swift",
    code: `import SwiftUI

struct FeedItem: Identifiable {
  let id: Int
  let user: String
  let initials: String
  let action: String
  let target: String
  let time: String
  var unread: Bool = false
  var type: ItemType = .commit

  enum ItemType { case commit, comment, deploy, alert, member }
}

struct ActivityFeedView: View {
  let items: [FeedItem]

  var body: some View {
    ScrollView {
      LazyVStack(alignment: .leading, spacing: 0) {
        ForEach(items) { item in
          HStack(alignment: .top, spacing: 12) {
            ZStack {
              Circle()
                .fill(color(for: item.type))
              Text(item.initials)
                .font(.caption2).bold()
                .foregroundStyle(.white)
            }
            .frame(width: 36, height: 36)

            VStack(alignment: .leading, spacing: 2) {
              Text(item.user).bold() + Text(" \\(item.action) ") +
                Text(item.target).bold()
              Text(item.time)
                .font(.caption)
                .foregroundStyle(.secondary)
            }
            .padding(.top, 4)

            Spacer()
            if item.unread {
              Circle().fill(.blue).frame(width: 8, height: 8)
                .padding(.top, 8)
                .accessibilityLabel("Unread")
            }
          }
          .padding(.vertical, 8)
        }
      }
      .padding()
    }
  }

  func color(for type: FeedItem.ItemType) -> Color {
    switch type {
    case .deploy:  return .green
    case .alert:   return .red
    case .comment: return .orange
    case .member:  return .purple
    case .commit:  return .blue
    }
  }
}`,
  },
};

function Demo() {
  const [filter, setFilter] = useState<EventType | "all">("all");
  const filtered = filter === "all" ? ITEMS : ITEMS.filter((i) => i.type === filter);

  return (
    <div className="w-full max-w-md">
      {/* Filter strip */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(["all", "deploy", "commit", "comment", "alert", "member"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-[12px] font-medium transition-colors ${
              filter === f
                ? "bg-[rgb(var(--accent))] text-white"
                : "bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ol aria-label="Activity feed" className="relative flex flex-col">
        <div aria-hidden="true" className="absolute inset-y-0 left-[19px] w-px bg-[rgb(var(--border))]" />
        {filtered.map((item) => (
          <li key={item.id} className="relative flex gap-4 pb-5 last:pb-0">
            <span
              aria-hidden="true"
              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${TYPE_STYLES[item.type].dot}`}
            >
              {item.avatar}
            </span>
            <div className="flex-1 pt-1.5 min-w-0">
              <p className="text-[13px] text-[rgb(var(--text-secondary))] leading-relaxed">
                <strong className="font-medium text-[rgb(var(--text-primary))]">{item.user}</strong>{" "}
                {item.action}{" "}
                <strong className="font-medium text-[rgb(var(--text-primary))]">{item.target}</strong>
              </p>
              <time className="text-[11px] text-[rgb(var(--text-tertiary))]">{item.time}</time>
            </div>
            {item.unread && (
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[rgb(var(--accent))]" aria-label="Unread" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function ActivityFeedPage() {
  return (
    <div>
      <PageHeader
        title="Activity Feed"
        description="A chronological timeline of events — commits, comments, deployments, alerts, and membership changes. Supports filtering, unread indicators, and infinite scroll."
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Preview</h2>
        <ComponentPreview>
          <Demo />
        </ComponentPreview>
      </section>

      {/* ── Anatomy ─────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Part", "Element", "Description"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { part: "Container", el: "<ol>",    desc: "Ordered list — events have temporal order. aria-label='Activity feed'." },
                { part: "Connector", el: "div",     desc: "Vertical line between items. aria-hidden='true' — purely decorative." },
                { part: "Avatar",    el: "span",    desc: "Type-coloured circle with user initials. aria-hidden — user name is in the text." },
                { part: "Body",      el: "p + time", desc: "Actor + action + target sentence. <time> element for the timestamp." },
                { part: "Unread dot",el: "span",    desc: "Solid accent dot with aria-label='Unread'." },
              ].map((row) => (
                <tr key={row.part} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.part}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.el}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Filtering ───────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Filtering</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
          Filter chips above the feed allow users to isolate event types. Filters are additive — selecting multiple types shows the union. The &quot;all&quot; chip clears all active filters. Apply filters client-side for local lists; use query parameters for server-paginated feeds so filtered URLs are shareable.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Guidelines</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Write each event as a complete sentence: Actor + verb + target. Avoid terse tokens like 'push' with no context.",
            "Use relative time (2m ago) for events within the last 24 hours; switch to absolute dates for older events.",
            "Color-code by event type, not by user — users scanning for deploys should be able to spot the type at a glance.",
            "Paginate or virtualise for lists exceeding 100 items — DOM and accessibility tree overhead is significant.",
            "Mark events as read on visibility (Intersection Observer) or on explicit 'Mark all read' action — not on hover.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
