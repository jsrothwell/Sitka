"use client";

import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { useState } from "react";
import { Plus, MoreHorizontal, Circle } from "lucide-react";

const COLUMNS = [
  { id: "todo",       label: "To Do",       color: "#78716C", count: 3 },
  { id: "inprogress", label: "In Progress",  color: "#3B82F6", count: 2 },
  { id: "review",    label: "In Review",    color: "#F59E0B", count: 1 },
  { id: "done",      label: "Done",         color: "#10B981", count: 4 },
];

const INITIAL_CARDS: Record<string, Array<{ id: string; title: string; tags: string[]; date: string }>> = {
  todo: [
    { id: "t1", title: "Redesign onboarding flow", tags: ["Design", "UX"], date: "Jun 12" },
    { id: "t2", title: "Audit colour token usage", tags: ["Tokens"], date: "Jun 15" },
    { id: "t3", title: "Write motion guidelines", tags: ["Docs"], date: "Jun 18" },
  ],
  inprogress: [
    { id: "p1", title: "Build KPI Tile component", tags: ["React", "Component"], date: "Jun 10" },
    { id: "p2", title: "Implement Gauge arc math", tags: ["SVG", "Math"], date: "Jun 11" },
  ],
  review: [
    { id: "r1", title: "Progress Bar tokens", tags: ["Tokens"], date: "Jun 9" },
  ],
  done: [
    { id: "d1", title: "Set up docs site", tags: ["Infra"], date: "Jun 1" },
    { id: "d2", title: "Define spacing scale", tags: ["Tokens"], date: "Jun 3" },
    { id: "d3", title: "Button component", tags: ["React"], date: "Jun 5" },
    { id: "d4", title: "Typography system", tags: ["Tokens"], date: "Jun 7" },
  ],
};

const TAG_COLORS: Record<string, string> = {
  Design: "#8B5CF6", UX: "#EC4899", Tokens: "#F59E0B",
  Docs: "#6B7280", React: "#3B82F6", Component: "#06B6D4",
  SVG: "#10B981", Math: "#14B8A6", Infra: "#78716C",
};

const CODE = {
  react: {
    filename: "KanbanBoard.tsx",
    code: `"use client";

import { useState, DragEvent } from "react";

interface KanbanCard {
  id: string;
  title: string;
  tags?: string[];
  date?: string;
}

interface KanbanColumn {
  id: string;
  label: string;
  color: string;
  cards: KanbanCard[];
}

export function KanbanBoard({ columns: initial }: { columns: KanbanColumn[] }) {
  const [columns, setColumns] = useState(initial);
  const [dragging, setDragging] = useState<{ cardId: string; fromCol: string } | null>(null);
  const [target, setTarget] = useState<string | null>(null);

  function handleDragStart(cardId: string, fromCol: string) {
    setDragging({ cardId, fromCol });
  }

  function handleDrop(toColId: string) {
    if (!dragging || dragging.fromCol === toColId) { setDragging(null); setTarget(null); return; }

    setColumns((cols) => {
      const next = cols.map((col) => ({ ...col, cards: [...col.cards] }));
      const from = next.find((c) => c.id === dragging.fromCol)!;
      const to   = next.find((c) => c.id === toColId)!;
      const cardIdx = from.cards.findIndex((c) => c.id === dragging.cardId);
      const [card] = from.cards.splice(cardIdx, 1);
      to.cards.push(card);
      return next;
    });

    setDragging(null);
    setTarget(null);
  }

  return (
    <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "4px 0" }}>
      {columns.map((col) => (
        <div
          key={col.id}
          onDragOver={(e) => { e.preventDefault(); setTarget(col.id); }}
          onDrop={() => handleDrop(col.id)}
          onDragLeave={() => setTarget(null)}
          style={{
            minWidth: 240,
            borderRadius: 12,
            background: target === col.id
              ? \`\${col.color}18\`
              : "rgb(var(--surface))",
            border: \`1px solid \${target === col.id ? col.color + "60" : "rgb(var(--border))"}\`,
            transition: "background 0.15s, border-color 0.15s",
            overflow: "hidden",
          }}
        >
          {/* Column header */}
          <div style={{ padding: "12px 14px 10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: col.color }} />
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {col.label}
              </span>
              <span style={{
                marginLeft: "auto",
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 7px",
                borderRadius: 99,
                background: col.color + "20",
                color: col.color,
              }}>
                {col.cards.length}
              </span>
            </div>
            {/* Accent gradient strip */}
            <div style={{
              marginTop: 8,
              height: 2,
              borderRadius: 1,
              background: \`linear-gradient(to right, \${col.color}, transparent)\`,
            }} />
          </div>

          {/* Cards */}
          <div style={{ padding: "0 10px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
            {col.cards.length === 0 && (
              <div style={{ textAlign: "center", padding: "32px 0", color: "rgb(var(--text-tertiary))", fontSize: 12 }}>
                Drop here
              </div>
            )}
            {col.cards.map((card) => (
              <div
                key={card.id}
                draggable
                onDragStart={() => handleDragStart(card.id, col.id)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  background: "rgb(var(--surface-raised))",
                  border: "1px solid rgb(var(--border-subtle))",
                  cursor: "grab",
                  boxShadow: "var(--shadow-card)",
                  opacity: dragging?.cardId === card.id ? 0.4 : 1,
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>{card.title}</p>
                {card.tags && (
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {card.tags.slice(0, 2).map((tag) => (
                      <span key={tag} style={{
                        fontSize: 11, padding: "2px 7px", borderRadius: 99,
                        background: tagColor(tag) + "20", color: tagColor(tag), fontWeight: 500,
                      }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}`,
  },
  html: {
    filename: "kanban.html",
    code: `<!-- Kanban board — drag and drop via HTML5 API -->
<div class="kanban-board" role="list">
  <div class="kanban-column" data-column="todo" role="listitem">
    <div class="kanban-column__header">
      <span class="kanban-column__dot" style="background:#78716C"></span>
      <span class="kanban-column__label">To Do</span>
      <span class="kanban-column__count">3</span>
    </div>
    <div class="kanban-column__accent-bar" style="background:linear-gradient(to right,#78716C,transparent)"></div>
    <div class="kanban-column__cards" role="list">
      <div class="kanban-card" draggable="true" role="listitem">
        <p class="kanban-card__title">Redesign onboarding flow</p>
        <div class="kanban-card__tags">
          <span class="kanban-tag">Design</span>
          <span class="kanban-tag">UX</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.kanban-board {
  display: flex;
  gap: 12px;
  overflow-x: auto;
}
.kanban-column {
  min-width: 240px;
  border-radius: 12px;
  background: rgb(var(--surface));
  border: 1px solid rgb(var(--border));
  overflow: hidden;
  transition: background 0.15s, border-color 0.15s;
}
.kanban-column.is-target {
  background: color-mix(in srgb, var(--col-color) 8%, transparent);
  border-color: color-mix(in srgb, var(--col-color) 40%, transparent);
}
.kanban-column__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px 0;
}
.kanban-column__accent-bar {
  height: 2px;
  margin: 8px 14px 0;
  border-radius: 1px;
}
.kanban-card {
  padding: 10px 12px;
  border-radius: 8px;
  background: rgb(var(--surface-raised));
  border: 1px solid rgb(var(--border-subtle));
  box-shadow: var(--shadow-card);
  cursor: grab;
}
.kanban-card:hover {
  box-shadow: var(--shadow-card-lifted);
  transform: translateY(-1px);
}
</style>`,
  },
  swift: {
    filename: "KanbanView.swift",
    code: `import SwiftUI

// Mirrors JobFlo's KanbanView and Warren's TaskBoardView

struct KanbanBoard<Card: Identifiable & Equatable>: View {
    @Binding var columns: [KanbanColumn<Card>]

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(alignment: .top, spacing: 12) {
                ForEach($columns) { $col in
                    KanbanColumnView(column: $col, onDrop: { card, fromId in
                        move(card: card, from: fromId, to: col.id)
                    })
                }
            }
            .padding(.horizontal, 16)
        }
    }

    private func move(card: Card, from fromId: String, to toId: String) {
        // Move card between columns with spring animation
        withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
            guard fromId != toId else { return }
            columns[indexed: fromId]?.cards.removeAll { $0 == card }
            columns[indexed: toId]?.cards.append(card)
        }
    }
}

struct KanbanColumnView<Card: Identifiable>: View {
    @Binding var column: KanbanColumn<Card>
    @State private var isTargeted = false
    let onDrop: (Card, String) -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Column header
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Circle()
                        .fill(column.color)
                        .frame(width: 8)
                    Text(column.label)
                        .font(.system(size: 12, weight: .semibold))
                        .textCase(.uppercase)
                        .kerning(0.8)
                    Spacer()
                    // Count badge
                    Text("\\(column.cards.count)")
                        .font(.system(size: 11, weight: .semibold))
                        .padding(.horizontal, 7)
                        .padding(.vertical, 2)
                        .background(column.color.opacity(0.2))
                        .foregroundStyle(column.color)
                        .clipShape(Capsule())
                }

                // Accent gradient strip
                LinearGradient(
                    colors: [column.color, .clear],
                    startPoint: .leading,
                    endPoint: .trailing
                )
                .frame(height: 1.5)
                .clipShape(Capsule())
            }
            .padding(14)

            // Cards
            VStack(spacing: 8) {
                ForEach(column.cards) { card in
                    KanbanCardView(card: card)
                        .draggable(card)
                }

                if column.cards.isEmpty {
                    Text("Drop here")
                        .font(.system(size: 12))
                        .foregroundStyle(.sfTextTertiary)
                        .frame(maxWidth: .infinity)
                        .frame(height: 64)
                }
            }
            .padding([.horizontal, .bottom], 10)
        }
        .frame(width: 240)
        .background(
            isTargeted
                ? column.color.opacity(0.10)
                : Color.sfSurface
        )
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(
                    isTargeted ? column.color.opacity(0.5) : Color.sfBorder,
                    lineWidth: 1
                )
        )
        .animation(.easeInOut(duration: 0.15), value: isTargeted)
        .dropDestination(for: Card.self) { items, _ in
            items.forEach { onDrop($0, /* fromId */ "") }
            isTargeted = false
            return true
        } isTargeted: { isTargeted = $0 }
    }
}`,
  },
  macos: {
    filename: "KanbanView.swift",
    code: `// macOS — identical SwiftUI implementation.
// Warren uses .contextMenu on each card for keyboard-driven moves.

extension KanbanCardView {
    func withContextMenu(columns: [KanbanColumn]) -> some View {
        self.contextMenu {
            Text("Move to…").font(.headline)
            Divider()
            ForEach(columns) { col in
                Button(col.label) {
                    // Move card to col via binding
                }
            }
            Divider()
            Button("Delete", role: .destructive) { /* … */ }
        }
    }
}`,
  },
};

function KanbanDemo() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [dragCard, setDragCard] = useState<{ id: string; col: string } | null>(null);
  const [targetCol, setTargetCol] = useState<string | null>(null);

  function handleDrop(toColId: string) {
    if (!dragCard || dragCard.col === toColId) {
      setDragCard(null); setTargetCol(null); return;
    }
    setCards((prev) => {
      const next = { ...prev };
      const from = [...next[dragCard.col]];
      const to = [...next[toColId]];
      const idx = from.findIndex((c) => c.id === dragCard.id);
      const [card] = from.splice(idx, 1);
      to.push(card);
      next[dragCard.col] = from;
      next[toColId] = to;
      return next;
    });
    setDragCard(null); setTargetCol(null);
  }

  return (
    <div style={{ overflowX: "auto", padding: "16px 8px" }}>
      <div style={{ display: "flex", gap: 10, minWidth: "max-content" }}>
        {COLUMNS.map((col) => {
          const colCards = cards[col.id] || [];
          const isTarget = targetCol === col.id;
          return (
            <div
              key={col.id}
              onDragOver={(e) => { e.preventDefault(); setTargetCol(col.id); }}
              onDrop={() => handleDrop(col.id)}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setTargetCol(null);
              }}
              style={{
                width: 220,
                borderRadius: 12,
                background: isTarget ? col.color + "14" : "rgb(var(--surface))",
                border: `1px solid ${isTarget ? col.color + "55" : "rgb(var(--border))"}`,
                transition: "background 0.15s, border-color 0.15s",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div style={{ padding: "12px 12px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: col.color }} />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgb(var(--text-secondary))" }}>
                    {col.label}
                  </span>
                  <span style={{
                    marginLeft: "auto", fontSize: 11, fontWeight: 600,
                    padding: "1px 7px", borderRadius: 99,
                    background: col.color + "25", color: col.color,
                  }}>
                    {colCards.length}
                  </span>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgb(var(--text-tertiary))", padding: 0, lineHeight: 1 }}>
                    <Plus size={13} />
                  </button>
                </div>
                {/* Gradient strip */}
                <div style={{ marginTop: 8, height: 1.5, borderRadius: 1, background: `linear-gradient(to right, ${col.color}, transparent)` }} />
              </div>

              {/* Cards */}
              <div style={{ padding: "8px 8px 8px", display: "flex", flexDirection: "column", gap: 7 }}>
                {colCards.length === 0 && (
                  <div style={{ textAlign: "center", padding: "28px 0", color: "rgb(var(--text-tertiary))", fontSize: 12 }}>
                    Drop here
                  </div>
                )}
                {colCards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={() => setDragCard({ id: card.id, col: col.id })}
                    onDragEnd={() => { setDragCard(null); setTargetCol(null); }}
                    style={{
                      padding: "9px 11px",
                      borderRadius: 8,
                      background: "rgb(var(--surface-raised))",
                      border: "1px solid rgb(var(--border-subtle))",
                      cursor: "grab",
                      boxShadow: "var(--shadow-card)",
                      opacity: dragCard?.id === card.id ? 0.35 : 1,
                      transition: "opacity 0.15s",
                    }}
                  >
                    <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 7, lineHeight: 1.4 }}>{card.title}</p>
                    <div style={{ display: "flex", gap: 4, justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {card.tags.slice(0, 2).map((tag) => (
                          <span key={tag} style={{
                            fontSize: 10, padding: "2px 6px", borderRadius: 99,
                            background: (TAG_COLORS[tag] || "#888") + "22",
                            color: TAG_COLORS[tag] || "#888", fontWeight: 600,
                          }}>{tag}</span>
                        ))}
                      </div>
                      <span style={{ fontSize: 10, color: "rgb(var(--text-tertiary))", whiteSpace: "nowrap" }}>{card.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function KanbanPage() {
  return (
    <div>
      <PageHeader
        title="Kanban Board"
        description="A horizontal multi-column board for visualising and managing work items through stages. Composes Card, Badge, and drag-and-drop primitives."
        badge="New"
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Demo</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed">Drag cards between columns. The column highlights when it is a valid drop target.</p>
        <ComponentPreview>
          <KanbanDemo />
        </ComponentPreview>
      </section>

      <section className="mb-10 mt-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Element</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Description</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Token / spec</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Column header</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Status dot + uppercase label + count badge + add button</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">12 px semibold, tracking 0.8</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Accent strip</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">1.5 px gradient bar below header (status colour → transparent)</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Status colour</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Drop target</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Column fill and border shift to status colour on drag-over</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--border-subtle</code> → status/0.4</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Card surface</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Raised surface with card shadow; lifted on hover</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--surface-raised</code>, <code className="font-mono text-[11px] text-[rgb(var(--accent))]">--shadow-card</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Card tags</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Capsule pills, max 2 + overflow count</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Source colour / 0.15 background</td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Empty column</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Ghost label centred at 32 px vertical padding</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">--text-tertiary</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Animations</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Trigger</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Property</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">Curve</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Card drop</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Layout reflow</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">spring(response: 0.3, damping: 0.7)</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Column hover</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Background + border colour</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">easeInOut 0.15s</code></td>
              </tr>
              <tr className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">Card hover</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">Shadow level + translateY(−1px)</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">easeOut 0.12s</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Context menu (desktop)</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed">
          On macOS and right-click desktop, each card exposes a context menu for keyboard-driven
          column changes. See the <a href="/components/context-menu" className="text-[rgb(var(--accent))] hover:underline">Context Menu</a> component.
        </p>
        <ul className="list-disc list-inside space-y-2 text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          <li>Group 1: <strong>Move to …</strong> — one item per column (excluding current)</li>
          <li>Divider</li>
          <li>Destructive: <strong>Delete</strong> (danger colour, requires confirmation)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>
    </div>
  );
}
