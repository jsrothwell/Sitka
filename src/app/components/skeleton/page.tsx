import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Skeleton" };

const PROPS = [
  {
    name: "width",
    type: "string | number",
    description: "CSS width of the skeleton block. Pass a number for pixel value, or any CSS string.",
  },
  {
    name: "height",
    type: "string | number",
    description: "CSS height of the skeleton block.",
  },
  {
    name: "rounded",
    type: '"none" | "sm" | "md" | "lg" | "full"',
    default: '"md"',
    description: "Border radius of the block. Use 'full' for circular avatars and badge pills.",
  },
  {
    name: "animate",
    type: "boolean",
    default: "true",
    description: "Enable the shimmer animation. Set false to show a static placeholder (e.g. when printing).",
  },
  {
    name: "className",
    type: "string",
    description: "Additional Tailwind classes to override width, height, or margin inline.",
  },
];

const CODE = {
  react: {
    filename: "Skeleton.tsx",
    code: `import { cn } from "@/lib/cn";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  animate?: boolean;
  className?: string;
}

const RADIUS = {
  none: "rounded-none",
  sm:   "rounded",
  md:   "rounded-lg",
  lg:   "rounded-xl",
  full: "rounded-full",
} as const;

export function Skeleton({
  width,
  height,
  rounded = "md",
  animate = true,
  className,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-[rgb(var(--surface-raised))]",
        RADIUS[rounded],
        animate && "animate-pulse",
        className
      )}
      style={{
        width:  typeof width  === "number" ? \`\${width}px\`  : width,
        height: typeof height === "number" ? \`\${height}px\` : height,
      }}
      aria-hidden="true"
    />
  );
}

// --- Composed patterns ---

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="p-4 rounded-xl border border-[rgb(var(--border))] space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton width={36} height={36} rounded="full" />
        <div className="space-y-1.5 flex-1">
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
      <Skeleton height={12} />
      <Skeleton height={12} width="80%" />
      <Skeleton height={12} width="65%" />
    </div>
  );
}

// Table row skeleton
export function TableRowSkeleton({ cols = 4 }: { cols?: number }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-[rgb(var(--border-subtle))]">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} height={14} className="flex-1" style={{ maxWidth: i === 0 ? "40%" : undefined }} />
      ))}
    </div>
  );
}

// List item skeleton
export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5">
      <Skeleton width={32} height={32} rounded="full" />
      <div className="space-y-1.5 flex-1">
        <Skeleton height={13} width="55%" />
        <Skeleton height={11} width="35%" />
      </div>
      <Skeleton width={60} height={24} rounded="full" />
    </div>
  );
}`,
  },
  html: {
    filename: "skeleton.html",
    code: `<!-- Skeleton — pure CSS shimmer, no JS required -->

<!-- Single block -->
<div class="skeleton" style="width: 200px; height: 16px;"></div>

<!-- Card skeleton -->
<div class="card-skeleton">
  <div class="skel-row">
    <div class="skeleton skel-avatar"></div>
    <div class="skel-meta">
      <div class="skeleton" style="width: 60%; height: 14px;"></div>
      <div class="skeleton" style="width: 40%; height: 12px; margin-top: 6px;"></div>
    </div>
  </div>
  <div class="skeleton" style="height: 12px; margin-top: 12px;"></div>
  <div class="skeleton" style="width: 80%; height: 12px; margin-top: 6px;"></div>
  <div class="skeleton" style="width: 65%; height: 12px; margin-top: 6px;"></div>
</div>

<!-- List item skeleton -->
<div class="list-skel">
  <div class="skeleton skel-avatar"></div>
  <div class="skel-meta" style="flex: 1;">
    <div class="skeleton" style="width: 55%; height: 13px;"></div>
    <div class="skeleton" style="width: 35%; height: 11px; margin-top: 6px;"></div>
  </div>
  <div class="skeleton skel-pill"></div>
</div>

<style>
  /* Base skeleton block */
  .skeleton {
    display: block;
    background: rgb(var(--surface-raised));
    border-radius: 8px;
    animation: shimmer 1.5s ease-in-out infinite;
    background-image: linear-gradient(
      90deg,
      rgb(var(--surface-raised)) 0%,
      rgb(var(--border)) 50%,
      rgb(var(--surface-raised)) 100%
    );
    background-size: 200% 100%;
  }

  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .skeleton { animation: none; }
  }

  /* Composed layouts */
  .card-skeleton {
    padding: 16px;
    border-radius: 12px;
    border: 1px solid rgb(var(--border));
  }
  .skel-row    { display: flex; align-items: center; gap: 12px; }
  .skel-meta   { display: flex; flex-direction: column; }
  .skel-avatar { width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0; }
  .skel-pill   { width: 60px; height: 24px; border-radius: 9999px; flex-shrink: 0; }

  .list-skel {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    border-bottom: 1px solid rgb(var(--border-subtle));
  }
</style>`,
  },
  swift: {
    filename: "SitkaSkeleton.swift",
    code: `import SwiftUI

// Skeleton shimmer for SwiftUI using a redacted modifier (iOS 15+)
// or a custom shimmer effect for granular control.

// -- Option 1: Native .redacted (recommended for simple lists) --
struct UserListView: View {
    @State private var users: [User]? = nil

    var body: some View {
        List(placeholder ?? users ?? []) { user in
            UserRow(user: user)
        }
        .redacted(reason: users == nil ? .placeholder : [])
        .task { users = await fetchUsers() }
    }

    private var placeholder: [User]? {
        users == nil ? (1...5).map { User(id: $0, name: "Placeholder Name", role: "Role") } : nil
    }
}

// -- Option 2: Custom shimmer view --
struct ShimmerView: View {
    @State private var phase: CGFloat = -1

    var body: some View {
        GeometryReader { geo in
            Rectangle()
                .fill(Color(.secondarySystemBackground))
                .overlay(
                    LinearGradient(
                        colors: [.clear, Color(.tertiarySystemBackground).opacity(0.8), .clear],
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                    .offset(x: phase * geo.size.width)
                    .animation(.linear(duration: 1.3).repeatForever(autoreverses: false), value: phase)
                )
                .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                .onAppear { phase = 1 }
        }
    }
}

// -- Composed card skeleton --
struct CardSkeletonView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 10) {
                ShimmerView()
                    .frame(width: 36, height: 36)
                    .clipShape(Circle())

                VStack(alignment: .leading, spacing: 6) {
                    ShimmerView().frame(height: 14)
                    ShimmerView().frame(width: 120, height: 12)
                }
            }

            ShimmerView().frame(height: 12)
            ShimmerView().frame(height: 12)
            ShimmerView().frame(width: 180, height: 12)
        }
        .padding(16)
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
    }
}

#Preview {
    VStack(spacing: 12) {
        CardSkeletonView()
        CardSkeletonView()
    }
    .padding()
}`,
  },
  macos: {
    filename: "SitkaSkeleton+macOS.swift",
    code: `import SwiftUI

// macOS — same approach as iOS. Prefer .redacted for lists.
// Use ShimmerView for custom layouts.

struct TableSkeletonView: View {
    let rows: Int

    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack(spacing: 0) {
                ForEach(["Name", "Status", "Date", "Owner"], id: \\.self) { col in
                    Text(col)
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundStyle(.secondary)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 8)
                }
            }
            .background(Color(.controlBackgroundColor))

            Divider()

            // Skeleton rows
            ForEach(0..<rows, id: \\.self) { _ in
                HStack(spacing: 12) {
                    ShimmerView().frame(height: 13).frame(maxWidth: .infinity)
                    ShimmerView().frame(width: 72, height: 22).clipShape(Capsule())
                    ShimmerView().frame(width: 90, height: 13)
                    ShimmerView().frame(width: 80, height: 13)
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 10)

                Divider()
            }
        }
        .background(Color(.controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 8, style: .continuous)
                .stroke(Color(.separatorColor), lineWidth: 1)
        )
    }
}

struct ShimmerView: View {
    @State private var phase: CGFloat = -1

    var body: some View {
        GeometryReader { geo in
            RoundedRectangle(cornerRadius: 4, style: .continuous)
                .fill(Color(.unemphasizedSelectedContentBackgroundColor))
                .overlay(
                    LinearGradient(
                        colors: [.clear, Color(.controlBackgroundColor).opacity(0.6), .clear],
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                    .offset(x: phase * geo.size.width)
                    .animation(.linear(duration: 1.3).repeatForever(autoreverses: false), value: phase)
                )
                .clipShape(RoundedRectangle(cornerRadius: 4, style: .continuous))
                .onAppear { phase = 1 }
        }
    }
}

#Preview {
    TableSkeletonView(rows: 5)
        .frame(width: 640)
        .padding()
}`,
  },
};

function Skeleton({
  width,
  height = 14,
  rounded = "md",
  className = "",
}: {
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
}) {
  const radius = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full",
  }[rounded];

  return (
    <div
      className={`bg-[rgb(var(--surface-raised))] animate-pulse ${radius} ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
      aria-hidden="true"
    />
  );
}

function CardSkeleton() {
  return (
    <div className="p-4 rounded-xl border border-[rgb(var(--border))] space-y-3 bg-[rgb(var(--surface))]">
      <div className="flex items-center gap-3">
        <Skeleton width={36} height={36} rounded="full" />
        <div className="space-y-1.5 flex-1">
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
      <Skeleton height={12} className="w-full" />
      <Skeleton height={12} width="80%" />
      <Skeleton height={12} width="65%" />
    </div>
  );
}

function ListItemSkeleton({ last = false }: { last?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 ${last ? "" : "border-b border-[rgb(var(--border-subtle))]"}`}>
      <Skeleton width={32} height={32} rounded="full" />
      <div className="space-y-1.5 flex-1">
        <Skeleton height={13} width="55%" />
        <Skeleton height={11} width="35%" />
      </div>
      <Skeleton width={60} height={22} rounded="full" />
    </div>
  );
}

function TableRowSkeleton({ last = false }: { last?: boolean }) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3 ${last ? "" : "border-b border-[rgb(var(--border-subtle))]"}`}>
      <Skeleton height={13} width="40%" />
      <Skeleton height={22} width={72} rounded="full" />
      <Skeleton height={13} width={90} />
      <Skeleton height={13} width={80} />
    </div>
  );
}

function KPISkeleton() {
  return (
    <div className="p-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton height={12} width={80} />
        <Skeleton width={24} height={24} rounded="md" />
      </div>
      <Skeleton height={28} width={120} />
      <Skeleton height={11} width={100} />
    </div>
  );
}

export default function SkeletonPage() {
  return (
    <div>
      <PageHeader
        title="Skeleton"
        description="Placeholder blocks that mimic the shape of loading content. Skeletons reduce perceived wait time by giving the user a preview of layout before data arrives."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Preview</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 space-y-6">
          {/* Inline skeletons */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">Inline blocks</p>
            <Skeleton height={20} width={200} />
            <Skeleton height={14} width="75%" />
            <Skeleton height={14} width="60%" />
            <Skeleton height={14} width="50%" />
          </div>

          {/* Cards */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">Cards</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>

          {/* List */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">List</p>
            <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden bg-[rgb(var(--surface))]">
              {[0, 1, 2, 3].map((i) => <ListItemSkeleton key={i} last={i === 3} />)}
            </div>
          </div>

          {/* Table */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">Table rows</p>
            <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden bg-[rgb(var(--surface))]">
              <div className="flex items-center gap-4 px-4 py-2.5 bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Name", "Status", "Date", "Owner"].map((h) => (
                  <span key={h} className="flex-1 text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</span>
                ))}
              </div>
              {[0, 1, 2, 3].map((i) => <TableRowSkeleton key={i} last={i === 3} />)}
            </div>
          </div>

          {/* KPI tiles */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3">KPI tiles</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => <KPISkeleton key={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Guidelines</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Principle", "Guidance"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { p: "Match the layout", g: "Skeleton shapes should closely match the final content — same height, width proportion, and border radius. A mismatch causes layout shift on load." },
                { p: "Show count intent", g: "If a list typically shows 5 items, show 5 skeleton rows — not 1 or 20. This sets accurate user expectations." },
                { p: "Avoid over-animation", g: "Use the shimmer only on the blocks themselves. Do not animate the surrounding container or add spin loaders alongside skeletons." },
                { p: "Respect reduced motion", g: "Set animation: none when prefers-reduced-motion: reduce is active. The static placeholder still communicates loading state." },
                { p: "Duration threshold", g: "Only show skeletons for loads expected to take >300ms. For instant data, skeletons cause more flicker than they prevent." },
                { p: "Skeleton vs spinner", g: "Use a skeleton when content has a predictable shape (text, cards, rows). Use a spinner for indeterminate progress (upload, export, AI generation)." },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap align-top">{row.p}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Element", "Spec"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { el: "Fill", spec: "--surface-raised (same token used for hover states — blends naturally in both light and dark modes)" },
                { el: "Animation", spec: "animate-pulse (Tailwind) — opacity cycle, 1.5s ease-in-out infinite. Alternatively: shimmer gradient sweep at 200% background-size" },
                { el: "Reduced motion", spec: "animation: none — static placeholder remains visible" },
                { el: "aria-hidden", spec: "true — skeleton blocks are decorative and must be hidden from screen readers" },
                { el: "Border radius", spec: "Match the final element. Text lines: rounded-lg. Avatars: rounded-full. Cards: rounded-xl." },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.el}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Set aria-hidden='true' on all skeleton blocks — they are purely decorative and must not be announced by screen readers.",
            "Wrap the loading region in a live region: <div aria-live='polite' aria-busy='true'>. When content loads, update aria-busy='false' and replace skeletons with real content.",
            "Screen readers will announce the live region update, giving non-visual users an equivalent loading cue.",
            "Never use skeleton text as a substitute for real content — remove it completely once data is available.",
            "Respect prefers-reduced-motion: disable the shimmer animation for users who have requested reduced motion in their OS settings.",
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
