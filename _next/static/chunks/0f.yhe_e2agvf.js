(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89664,e=>{"use strict";let r=(0,e.i(56420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,r],89664)},8734,e=>{"use strict";let r=(0,e.i(56420).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,r],8734)},61939,e=>{"use strict";var r=e.i(43476),a=e.i(71645),t=e.i(89664),s=e.i(8734),n=e.i(46932),o=e.i(88653),d=e.i(45060);e.s(["CodeBlock",0,function({code:e,language:i="tsx",filename:l,className:c}){let[x,g]=(0,a.useState)(!1),b=async()=>{await navigator.clipboard.writeText(e.trim()),g(!0),setTimeout(()=>g(!1),2e3)};return(0,r.jsxs)("div",{className:(0,d.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",c),children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsxs)("div",{className:"flex gap-1.5",children:[(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),l&&(0,r.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:l})]}),(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:i}),(0,r.jsx)("button",{onClick:b,className:(0,d.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",x?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,r.jsx)(o.AnimatePresence,{mode:"wait",initial:!1,children:x?(0,r.jsxs)(n.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(t.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,r.jsxs)(n.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(s.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,r.jsx)("code",{children:e.trim()})})})]})}])},64147,e=>{"use strict";var r=e.i(43476),a=e.i(71645),t=e.i(46932),s=e.i(61939),n=e.i(45060);let o={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},d={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:i}){let[l,c]=(0,a.useState)("react"),x=["react","html","swift",...e.macos?["macos"]:[]],g=e[l]??e.swift;return(0,r.jsxs)("div",{className:(0,n.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",i),children:[(0,r.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:x.map(e=>(0,r.jsxs)("button",{onClick:()=>c(e),className:(0,n.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",l===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[l===e&&(0,r.jsx)(t.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),o[e]]},e))}),(0,r.jsx)(s.CodeBlock,{code:g.code,language:d[l],filename:g.filename,className:"rounded-none border-0"})]})}])},46017,e=>{"use strict";var r=e.i(43476),a=e.i(71645),t=e.i(46513);let s=(0,e.i(56420).default)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var n=e.i(45060);e.s(["ComponentPreview",0,function({children:e,label:o,className:d,dark:i,grid:l}){let[c,x]=(0,a.useState)("desktop");return(0,r.jsxs)("div",{className:(0,n.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",d),children:[(0,r.jsxs)("div",{className:"px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between gap-2 min-h-[40px]",children:[o?(0,r.jsx)("span",{className:"text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider",children:o}):(0,r.jsx)("span",{}),(0,r.jsx)("div",{className:"flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface))] border border-[rgb(var(--border))]",children:[{value:"desktop",Icon:t.Monitor,ariaLabel:"Desktop preview"},{value:"mobile",Icon:s,ariaLabel:"Mobile preview"}].map(({value:e,Icon:a,ariaLabel:t})=>(0,r.jsx)("button",{onClick:()=>x(e),"aria-label":t,className:(0,n.cn)("p-1 rounded-[var(--radius-sm)] transition-standard",c===e?"bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-sm":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:(0,r.jsx)(a,{className:"w-3.5 h-3.5"})},e))})]}),(0,r.jsx)("div",{className:(0,n.cn)("relative flex items-start justify-center transition-all duration-300","mobile"===c?"p-6":"p-10",i?"bg-neutral-950":"bg-[rgb(var(--background))]",l&&"bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"),children:(0,r.jsx)("div",{className:(0,n.cn)("w-full flex flex-wrap items-center justify-center gap-4 transition-all duration-300","mobile"===c&&"max-w-[390px]"),children:e})})]})}],46017)},52953,e=>{"use strict";var r=e.i(43476),a=e.i(45060);e.s(["PageHeader",0,function({title:e,description:t,badge:s,className:n}){return(0,r.jsxs)("div",{className:(0,a.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",n),children:[s&&(0,r.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,r.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),s]}),(0,r.jsx)("h1",{className:"mb-2.5",children:e}),(0,r.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:t})]})}])},77071,e=>{"use strict";let r=(0,e.i(56420).default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["Plus",0,r],77071)},53977,e=>{"use strict";var r=e.i(43476),a=e.i(52953),t=e.i(46017),s=e.i(64147),n=e.i(71645),o=e.i(77071);let d=[{id:"todo",label:"To Do",color:"#A0A0AF",count:3},{id:"inprogress",label:"In Progress",color:"#3B82F6",count:2},{id:"review",label:"In Review",color:"#F59E0B",count:1},{id:"done",label:"Done",color:"#10B981",count:4}],i={todo:[{id:"t1",title:"Redesign onboarding flow",tags:["Design","UX"],date:"Jun 12"},{id:"t2",title:"Audit colour token usage",tags:["Tokens"],date:"Jun 15"},{id:"t3",title:"Write motion guidelines",tags:["Docs"],date:"Jun 18"}],inprogress:[{id:"p1",title:"Build KPI Tile component",tags:["React","Component"],date:"Jun 10"},{id:"p2",title:"Implement Gauge arc math",tags:["SVG","Math"],date:"Jun 11"}],review:[{id:"r1",title:"Progress Bar tokens",tags:["Tokens"],date:"Jun 9"}],done:[{id:"d1",title:"Set up docs site",tags:["Infra"],date:"Jun 1"},{id:"d2",title:"Define spacing scale",tags:["Tokens"],date:"Jun 3"},{id:"d3",title:"Button component",tags:["React"],date:"Jun 5"},{id:"d4",title:"Typography system",tags:["Tokens"],date:"Jun 7"}]},l={Design:"#8B5CF6",UX:"#EC4899",Tokens:"#F59E0B",Docs:"#6B7280",React:"#3B82F6",Component:"#06B6D4",SVG:"#10B981",Math:"#14B8A6",Infra:"#78716C"},c={react:{filename:"KanbanBoard.tsx",code:`"use client";

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
}`},html:{filename:"kanban.html",code:`<!-- Kanban board — drag and drop via HTML5 API -->
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
</style>`},swift:{filename:"KanbanView.swift",code:`import SwiftUI

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
}`},macos:{filename:"KanbanView.swift",code:`// macOS — identical SwiftUI implementation.
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
}`}};function x(){let[e,a]=(0,n.useState)(i),[t,s]=(0,n.useState)(null),[c,x]=(0,n.useState)(null);return(0,r.jsx)("div",{style:{overflowX:"auto",padding:"16px 8px"},children:(0,r.jsx)("div",{style:{display:"flex",gap:10,minWidth:"max-content"},children:d.map(n=>{let d=e[n.id]||[],i=c===n.id;return(0,r.jsxs)("div",{onDragOver:e=>{e.preventDefault(),x(n.id)},onDrop:()=>(function(e){if(!t||t.col===e){s(null),x(null);return}a(r=>{let a={...r},s=[...a[t.col]],n=[...a[e]],o=s.findIndex(e=>e.id===t.id),[d]=s.splice(o,1);return n.push(d),a[t.col]=s,a[e]=n,a}),s(null),x(null)})(n.id),onDragLeave:e=>{e.currentTarget.contains(e.relatedTarget)||x(null)},style:{width:220,borderRadius:12,background:i?n.color+"14":"rgb(var(--surface))",border:`1px solid ${i?n.color+"55":"rgb(var(--border))"}`,transition:"background 0.15s, border-color 0.15s",overflow:"hidden"},children:[(0,r.jsxs)("div",{style:{padding:"12px 12px 0"},children:[(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:7},children:[(0,r.jsx)("div",{style:{width:7,height:7,borderRadius:"50%",background:n.color}}),(0,r.jsx)("span",{style:{fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:"rgb(var(--text-secondary))"},children:n.label}),(0,r.jsx)("span",{style:{marginLeft:"auto",fontSize:11,fontWeight:600,padding:"1px 7px",borderRadius:99,background:n.color+"25",color:n.color},children:d.length}),(0,r.jsx)("button",{style:{background:"none",border:"none",cursor:"pointer",color:"rgb(var(--text-tertiary))",padding:0,lineHeight:1},children:(0,r.jsx)(o.Plus,{size:13})})]}),(0,r.jsx)("div",{style:{marginTop:8,height:1.5,borderRadius:1,background:`linear-gradient(to right, ${n.color}, transparent)`}})]}),(0,r.jsxs)("div",{style:{padding:"8px 8px 8px",display:"flex",flexDirection:"column",gap:7},children:[0===d.length&&(0,r.jsx)("div",{style:{textAlign:"center",padding:"28px 0",color:"rgb(var(--text-tertiary))",fontSize:12},children:"Drop here"}),d.map(e=>(0,r.jsxs)("div",{draggable:!0,onDragStart:()=>s({id:e.id,col:n.id}),onDragEnd:()=>{s(null),x(null)},style:{padding:"9px 11px",borderRadius:8,background:"rgb(var(--surface-raised))",border:"1px solid rgb(var(--border-subtle))",cursor:"grab",boxShadow:"var(--shadow-card)",opacity:t?.id===e.id?.35:1,transition:"opacity 0.15s"},children:[(0,r.jsx)("p",{style:{fontSize:12,fontWeight:500,marginBottom:7,lineHeight:1.4},children:e.title}),(0,r.jsxs)("div",{style:{display:"flex",gap:4,justifyContent:"space-between",alignItems:"center"},children:[(0,r.jsx)("div",{style:{display:"flex",gap:4,flexWrap:"wrap"},children:e.tags.slice(0,2).map(e=>(0,r.jsx)("span",{style:{fontSize:10,padding:"2px 6px",borderRadius:99,background:(l[e]||"#888")+"22",color:l[e]||"#A0A0AF",fontWeight:600},children:e},e))}),(0,r.jsx)("span",{style:{fontSize:10,color:"rgb(var(--text-tertiary))",whiteSpace:"nowrap"},children:e.date})]})]},e.id))]})]},n.id)})})})}e.s(["default",0,function(){return(0,r.jsxs)("div",{children:[(0,r.jsx)(a.PageHeader,{title:"Kanban Board",description:"A horizontal multi-column board for visualising and managing work items through stages. Composes Card, Badge, and drag-and-drop primitives.",badge:"New"}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Demo"}),(0,r.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed",children:"Drag cards between columns. The column highlights when it is a valid drop target."}),(0,r.jsx)(t.ComponentPreview,{children:(0,r.jsx)(x,{})})]}),(0,r.jsxs)("section",{className:"mb-10 mt-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Anatomy"}),(0,r.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5",children:(0,r.jsxs)("table",{className:"w-full text-[13px]",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:[(0,r.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:"Element"}),(0,r.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:"Description"}),(0,r.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:"Token / spec"})]})}),(0,r.jsxs)("tbody",{children:[(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Column header"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"Status dot + uppercase label + count badge + add button"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"12 px semibold, tracking 0.8"})]}),(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Accent strip"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"1.5 px gradient bar below header (status colour → transparent)"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"Status colour"})]}),(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Drop target"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"Column fill and border shift to status colour on drag-over"}),(0,r.jsxs)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:[(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"--border-subtle"})," → status/0.4"]})]}),(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Card surface"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"Raised surface with card shadow; lifted on hover"}),(0,r.jsxs)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:[(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"--surface-raised"}),", ",(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"--shadow-card"})]})]}),(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Card tags"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"Capsule pills, max 2 + overflow count"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"Source colour / 0.15 background"})]}),(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--background))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Empty column"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"Ghost label centred at 32 px vertical padding"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"--text-tertiary"})})]})]})]})})]}),(0,r.jsxs)("section",{className:"mb-10",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Animations"}),(0,r.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden mb-5",children:(0,r.jsxs)("table",{className:"w-full text-[13px]",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:[(0,r.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:"Trigger"}),(0,r.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:"Property"}),(0,r.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:"Curve"})]})}),(0,r.jsxs)("tbody",{children:[(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Card drop"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"Layout reflow"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"spring(response: 0.3, damping: 0.7)"})})]}),(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--background))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Column hover"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"Background + border colour"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"easeInOut 0.15s"})})]}),(0,r.jsxs)("tr",{className:"border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]",children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:"Card hover"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:"Shadow level + translateY(−1px)"}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:(0,r.jsx)("code",{className:"font-mono text-[11px] text-[rgb(var(--accent))]",children:"easeOut 0.12s"})})]})]})]})})]}),(0,r.jsxs)("section",{className:"mb-10",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Context menu (desktop)"}),(0,r.jsxs)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-4 leading-relaxed",children:["On macOS and right-click desktop, each card exposes a context menu for keyboard-driven column changes. See the ",(0,r.jsx)("a",{href:"/components/context-menu",className:"text-[rgb(var(--accent))] hover:underline",children:"Context Menu"})," component."]}),(0,r.jsxs)("ul",{className:"list-disc list-inside space-y-2 text-[14px] text-[rgb(var(--text-secondary))] mb-5",children:[(0,r.jsxs)("li",{children:["Group 1: ",(0,r.jsx)("strong",{children:"Move to …"})," — one item per column (excluding current)"]}),(0,r.jsx)("li",{children:"Divider"}),(0,r.jsxs)("li",{children:["Destructive: ",(0,r.jsx)("strong",{children:"Delete"})," (danger colour, requires confirmation)"]})]})]}),(0,r.jsxs)("section",{className:"mb-10",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Implementation"}),(0,r.jsx)(s.PlatformTabs,{code:c})]})]})}])}]);