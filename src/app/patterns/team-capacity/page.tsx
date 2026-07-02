import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Team Capacity Grid" };

const MEMBERS = [
  { name: "Alex Kim",    hours: 28, capacity: 40, initials: "AK", color: "#3B82F6" },
  { name: "Blake Torres", hours: 36, capacity: 40, initials: "BT", color: "#8B5CF6" },
  { name: "Casey Reyes", hours: 38, capacity: 40, initials: "CR", color: "#10B981" },
  { name: "Dana Patel",  hours: 41, capacity: 40, initials: "DP", color: "#F59E0B" },
  { name: "Emery Walsh", hours: 22, capacity: 40, initials: "EW", color: "#06B6D4" },
  { name: "Fran Moore",  hours: 40, capacity: 40, initials: "FM", color: "#EC4899" },
];

function utilizationStatus(hours: number, capacity: number): { label: string; color: string } {
  const pct = hours / capacity;
  if (pct > 1)   return { label: "Overloaded",   color: "rgb(var(--status-danger))" };
  if (pct >= 0.9) return { label: "Near Full",    color: "rgb(var(--status-caution))" };
  if (pct >= 0.7) return { label: "Moderate",     color: "rgb(var(--status-warning))" };
  return            { label: "Available",          color: "rgb(var(--status-success))" };
}

function ArcGauge({ pct, color, size = 80 }: { pct: number; color: string; size?: number }) {
  const R = size / 2 - 8;
  const sweepDeg = 270;
  const startDeg = 135;
  const fill = Math.min(pct, 1.05);

  function polar(deg: number) {
    const rad = (deg * Math.PI) / 180;
    return {
      x: size / 2 + R * Math.cos(rad),
      y: size / 2 + R * Math.sin(rad),
    };
  }

  function arc(from: number, to: number) {
    const s = polar(from);
    const e = polar(to);
    const span = to - from;
    const large = span > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${R} ${R} 0 ${large} 1 ${e.x} ${e.y}`;
  }

  const fillDeg = fill * sweepDeg;

  return (
    <svg width={size} height={size} style={{ overflow: "visible" }}>
      {/* Track */}
      <path
        d={arc(startDeg, startDeg + sweepDeg)}
        fill="none"
        stroke="rgb(var(--progress-track))"
        strokeWidth={8}
        strokeLinecap="round"
      />
      {/* Fill */}
      {fillDeg > 0 && (
        <path
          d={arc(startDeg, startDeg + fillDeg)}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
        />
      )}
      {/* Label */}
      <text
        x={size / 2}
        y={size / 2 + 5}
        textAnchor="middle"
        fontSize={13}
        fontWeight={700}
        fill="currentColor"
      >
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}

const CODE = {
  react: {
    filename: "TeamCapacityGrid.tsx",
    code: `import { ArcGauge } from "@/components/ui/ArcGauge";

interface Member {
  name: string;
  hours: number;
  capacity: number;
  avatarUrl?: string;
  initials?: string;
}

function utilizationStatus(hours: number, capacity: number) {
  const pct = hours / capacity;
  if (pct > 1)    return { label: "Overloaded", color: "rgb(var(--status-danger))" };
  if (pct >= 0.9) return { label: "Near Full",  color: "rgb(var(--status-caution))" };
  if (pct >= 0.7) return { label: "Moderate",   color: "rgb(var(--status-warning))" };
  return            { label: "Available",        color: "rgb(var(--status-success))" };
}

export function TeamCapacityGrid({ members }: { members: Member[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 12,
      }}
    >
      {members.map((member) => {
        const pct = member.hours / member.capacity;
        const status = utilizationStatus(member.hours, member.capacity);
        const isOverloaded = pct > 1;

        return (
          <div
            key={member.name}
            style={{
              padding: 14,
              borderRadius: 12,
              background: isOverloaded
                ? \`rgb(var(--status-danger) / 0.08)\`
                : "rgb(var(--surface))",
              border: "1px solid rgb(var(--border))",
              boxShadow: "var(--shadow-card)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              textAlign: "center",
            }}
          >
            <ArcGauge pct={pct} color={status.color} size={80} />

            <div>
              <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{member.name}</p>
              <p style={{ fontSize: 10, color: "rgb(var(--text-tertiary))" }}>
                {member.hours}h / {member.capacity}h
              </p>
            </div>

            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 99,
                background: status.color.replace(")", " / 0.15)").replace("rgb(", "rgba("),
                color: status.color,
              }}
            >
              {status.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}`,
  },
  html: {
    filename: "team-capacity.html",
    code: `<div class="team-capacity-grid">
  <div class="member-card">
    <!-- Arc gauge (SVG) -->
    <svg class="arc-gauge" width="80" height="80">
      <!-- Track arc (270°, starting at 135°) -->
      <path class="arc-gauge__track" d="M …" />
      <!-- Fill arc — width proportional to utilization -->
      <path class="arc-gauge__fill" d="M …" stroke="#10B981" />
      <!-- Centre label -->
      <text class="arc-gauge__label" x="40" y="45">70%</text>
    </svg>

    <p class="member-card__name">Alex Kim</p>
    <p class="member-card__hours">28h / 40h</p>
    <span class="member-card__badge member-card__badge--available">Available</span>
  </div>

  <div class="member-card member-card--overloaded">
    <!-- … -->
    <span class="member-card__badge member-card__badge--danger">Overloaded</span>
  </div>
</div>

<style>
.team-capacity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}
.member-card {
  padding: 14px;
  border-radius: 12px;
  background: rgb(var(--surface));
  border: 1px solid rgb(var(--border));
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}
.member-card--overloaded {
  background: rgb(var(--status-danger) / 0.08);
}
.member-card__name { font-size: 12px; font-weight: 600; }
.member-card__hours { font-size: 10px; color: rgb(var(--text-tertiary)); }
.arc-gauge__track { fill: none; stroke: rgb(var(--progress-track)); stroke-width: 8; stroke-linecap: round; }
.arc-gauge__fill  { fill: none; stroke-width: 8; stroke-linecap: round; }
.arc-gauge__label { font-size: 13px; font-weight: 700; fill: currentColor; text-anchor: middle; }
</style>`,
  },
  swift: {
    filename: "TeamCapacityGrid.swift",
    code: `import SwiftUI

// Mirrors Warren's TeamUtilizationSection

struct TeamCapacityGrid: View {
    let members: [TeamMember]

    // Responsive: min 5 columns on macOS, 2 on iPhone
    let columns = [GridItem(.adaptive(minimum: 140), spacing: 12)]

    var body: some View {
        LazyVGrid(columns: columns, spacing: 12) {
            ForEach(members) { member in
                MemberCard(member: member)
            }
        }
    }
}

struct MemberCard: View {
    let member: TeamMember

    private var pct: Double { member.hours / member.capacity }
    private var status: UtilizationStatus { .status(for: pct) }

    var body: some View {
        VStack(spacing: 8) {
            // Arc Gauge (from Sitka Gauge component)
            Gauge(pct: pct, size: 80)
                .tint(status.color)

            VStack(spacing: 2) {
                Text(member.name)
                    .font(.system(size: 12, weight: .semibold))
                Text("\\(Int(member.hours))h / \\(Int(member.capacity))h")
                    .font(.system(size: 10))
                    .foregroundStyle(.sfTextTertiary)
            }

            // Status badge
            Text(status.label)
                .font(.system(size: 10, weight: .semibold))
                .padding(.horizontal, 8)
                .padding(.vertical, 2)
                .background(status.color.opacity(0.15))
                .foregroundStyle(status.color)
                .clipShape(Capsule())
        }
        .padding(14)
        .background(
            pct > 1
                ? Color.sfStatusDanger.opacity(0.08)
                : Color.sfSurface
        )
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay {
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.sfBorder, lineWidth: 1)
        }
        .shadow(.card)
    }
}

enum UtilizationStatus {
    case available, moderate, nearFull, overloaded

    static func status(for pct: Double) -> UtilizationStatus {
        if pct > 1 { return .overloaded }
        if pct >= 0.9 { return .nearFull }
        if pct >= 0.7 { return .moderate }
        return .available
    }

    var label: String {
        switch self {
        case .available:  "Available"
        case .moderate:   "Moderate"
        case .nearFull:   "Near Full"
        case .overloaded: "Overloaded"
        }
    }

    var color: Color {
        switch self {
        case .available:  .sfStatusSuccess
        case .moderate:   .sfStatusWarning
        case .nearFull:   .sfStatusCaution
        case .overloaded: .sfStatusDanger
        }
    }
}`,
  },
  macos: {
    filename: "TeamCapacityGrid.swift",
    code: `// macOS — same SwiftUI implementation.
// Warren's ResourceLevelingView uses this grid in a detail panel
// alongside the GanttView, with a min 5-column layout.

// The grid adapts: on wide screens it shows 6+ members per row,
// on narrow it collapses to 2–3 columns via LazyVGrid adaptive.`,
  },
};

export default function TeamCapacityPage() {
  return (
    <div>
      <PageHeader
        title="Team Capacity Grid"
        description="A responsive grid of member utilization cards, each showing an arc gauge, hours logged versus capacity, and a status badge. Composes the Gauge component. Reference: Warren's TeamUtilizationSection."
        badge="New"
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Demo</h2>
        <ComponentPreview>
          <div style={{ padding: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {MEMBERS.map((m) => {
                const pct = m.hours / m.capacity;
                const status = utilizationStatus(m.hours, m.capacity);
                const isOverloaded = pct > 1;
                const badgeBg = status.color.replace("rgb(", "").replace(")", "");

                return (
                  <div
                    key={m.name}
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      background: isOverloaded ? "rgb(var(--status-danger) / 0.08)" : "rgb(var(--surface))",
                      border: "1px solid rgb(var(--border))",
                      boxShadow: "var(--shadow-card)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      textAlign: "center",
                    }}
                  >
                    <ArcGauge pct={pct} color={status.color} size={76} />
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{m.name}</p>
                      <p style={{ fontSize: 10, color: "rgb(var(--text-tertiary))" }}>{m.hours}h / {m.capacity}h</p>
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 99,
                      color: status.color,
                      background: `rgb(${badgeBg} / 0.15)`,
                    }}>
                      {status.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="mb-10 mt-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Status thresholds</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Utilization</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Token</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">&lt; 70%</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Available</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--status-success</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">70–89%</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Moderate</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--status-warning</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">90–100%</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Near Full</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--status-caution</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">&gt; 100%</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Overloaded</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--status-danger</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Card anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Element</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Spec</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Arc Gauge</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">80 px, 8 px track, centred in card</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Name</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">12 px semibold</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Hours</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">10 px, <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--text-tertiary</code>, format: <code className="font-mono text-[11px] text-[rgb(var(--accent))]">Xh / Yh</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Status badge</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Capsule pill, 10 px semibold, status colour on status/0.15 background</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Overloaded tint</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Card background gets <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--status-danger / 0.08</code> fill</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Grid layout</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] leading-relaxed">
          Use <code className="font-mono text-[11px] text-[rgb(var(--accent))]">grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))</code> for responsive
          behaviour. On macOS with wide panels, this yields 5–6 columns. On iPhone it collapses to 2.
          Minimum column width is 140 px to keep gauges legible.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>
    </div>
  );
}
