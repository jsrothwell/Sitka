(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89664,e=>{"use strict";let r=(0,e.i(56420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["Check",0,r],89664)},8734,e=>{"use strict";let r=(0,e.i(56420).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",0,r],8734)},61939,e=>{"use strict";var r=e.i(43476),t=e.i(71645),a=e.i(89664),s=e.i(8734),i=e.i(46932),n=e.i(88653),d=e.i(45060);e.s(["CodeBlock",0,function({code:e,language:o="tsx",filename:l,className:c}){let[g,b]=(0,t.useState)(!1),m=async()=>{await navigator.clipboard.writeText(e.trim()),b(!0),setTimeout(()=>b(!1),2e3)};return(0,r.jsxs)("div",{className:(0,d.cn)("relative group rounded-xl overflow-hidden border border-[rgb(var(--border))]","bg-[rgb(var(--surface))]",c),children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsxs)("div",{className:"flex gap-1.5",children:[(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#ff5f57]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#febc2e]"}),(0,r.jsx)("div",{className:"w-3 h-3 rounded-full bg-[#28c840]"})]}),l&&(0,r.jsx)("span",{className:"text-[11px] text-[rgb(var(--text-tertiary))] ml-2",children:l})]}),(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)("span",{className:"text-[10px] uppercase tracking-wider font-medium text-[rgb(var(--text-tertiary))]",children:o}),(0,r.jsx)("button",{onClick:m,className:(0,d.cn)("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",g?"bg-green-500/10 text-green-500 border border-green-500/20":"bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"),children:(0,r.jsx)(n.AnimatePresence,{mode:"wait",initial:!1,children:g?(0,r.jsxs)(i.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(a.Check,{className:"w-3 h-3"}),"Copied!"]},"check"):(0,r.jsxs)(i.motion.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"flex items-center gap-1.5",children:[(0,r.jsx)(s.Copy,{className:"w-3 h-3"}),"Copy"]},"copy")})})]})]}),(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsx)("pre",{className:"p-4 text-[13px] leading-relaxed text-[rgb(var(--text-primary))] font-mono",children:(0,r.jsx)("code",{children:e.trim()})})})]})}])},64147,e=>{"use strict";var r=e.i(43476),t=e.i(71645),a=e.i(46932),s=e.i(61939),i=e.i(45060);let n={react:"React / TSX",html:"HTML / CSS",swift:"SwiftUI · iOS",macos:"SwiftUI · macOS"},d={react:"tsx",html:"html",swift:"swift",macos:"swift"};e.s(["PlatformTabs",0,function({code:e,className:o}){let[l,c]=(0,t.useState)("react"),g=["react","html","swift",...e.macos?["macos"]:[]],b=e[l]??e.swift;return(0,r.jsxs)("div",{className:(0,i.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",o),children:[(0,r.jsx)("div",{className:"flex bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:g.map(e=>(0,r.jsxs)("button",{onClick:()=>c(e),className:(0,i.cn)("relative px-4 py-2.5 text-[12px] font-medium transition-colors",l===e?"text-[rgb(var(--text-primary))]":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:[l===e&&(0,r.jsx)(a.motion.div,{layoutId:"platform-tab-indicator",className:"absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]",transition:{type:"spring",stiffness:500,damping:40}}),n[e]]},e))}),(0,r.jsx)(s.CodeBlock,{code:b.code,language:d[l],filename:b.filename,className:"rounded-none border-0"})]})}])},46017,e=>{"use strict";var r=e.i(43476),t=e.i(71645),a=e.i(46513);let s=(0,e.i(56420).default)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var i=e.i(45060);e.s(["ComponentPreview",0,function({children:e,label:n,className:d,dark:o,grid:l}){let[c,g]=(0,t.useState)("desktop");return(0,r.jsxs)("div",{className:(0,i.cn)("rounded-xl overflow-hidden border border-[rgb(var(--border))]",d),children:[(0,r.jsxs)("div",{className:"px-4 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] flex items-center justify-between gap-2 min-h-[40px]",children:[n?(0,r.jsx)("span",{className:"text-[11px] font-medium text-[rgb(var(--text-tertiary))] uppercase tracking-wider",children:n}):(0,r.jsx)("span",{}),(0,r.jsx)("div",{className:"flex items-center p-0.5 rounded-[var(--radius)] bg-[rgb(var(--surface))] border border-[rgb(var(--border))]",children:[{value:"desktop",Icon:a.Monitor,ariaLabel:"Desktop preview"},{value:"mobile",Icon:s,ariaLabel:"Mobile preview"}].map(({value:e,Icon:t,ariaLabel:a})=>(0,r.jsx)("button",{onClick:()=>g(e),"aria-label":a,className:(0,i.cn)("p-1 rounded-[var(--radius-sm)] transition-standard",c===e?"bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-primary))] shadow-sm":"text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]"),children:(0,r.jsx)(t,{className:"w-3.5 h-3.5"})},e))})]}),(0,r.jsx)("div",{className:(0,i.cn)("relative flex items-start justify-center transition-all duration-300","mobile"===c?"p-6":"p-10",o?"bg-neutral-950":"bg-[rgb(var(--background))]",l&&"bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)]"),children:(0,r.jsx)("div",{className:(0,i.cn)("w-full flex flex-wrap items-center justify-center gap-4 transition-all duration-300","mobile"===c&&"max-w-[390px]"),children:e})})]})}],46017)},52953,e=>{"use strict";var r=e.i(43476),t=e.i(45060);e.s(["PageHeader",0,function({title:e,description:a,badge:s,className:i}){return(0,r.jsxs)("div",{className:(0,t.cn)("mb-10 pb-8 border-b border-[rgb(var(--border))]",i),children:[s&&(0,r.jsxs)("div",{className:"inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-[rgb(var(--accent-muted))] bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-[10px] font-semibold uppercase tracking-wider",children:[(0,r.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-current"}),s]}),(0,r.jsx)("h1",{className:"mb-2.5",children:e}),(0,r.jsx)("p",{className:"text-[15px] text-[rgb(var(--text-secondary))] leading-relaxed max-w-lg",children:a})]})}])},62696,e=>{"use strict";var r=e.i(43476),t=e.i(52953),a=e.i(46017),s=e.i(64147),i=e.i(71645);let n={react:{filename:"DragAndDrop.tsx",code:`"use client";

import { useState, useRef, DragEvent } from "react";
import { cn } from "@/lib/cn";

// ── Reorderable List ───────────────────────────────────────

interface DraggableItem {
  id: string;
  title: string;
  description?: string;
}

interface DraggableListProps<T extends DraggableItem> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

export function DraggableList<T extends DraggableItem>({
  items,
  onChange,
  renderItem,
  className,
}: DraggableListProps<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  function handleDragStart(e: DragEvent<HTMLDivElement>, index: number) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
    setDraggedIndex(index);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>, targetIndex: number) {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    onChange(newItems);
    setDraggedIndex(targetIndex);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
  }

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={cn(
            "p-4 rounded-lg border cursor-grab active:cursor-grabbing transition-all",
            "bg-[rgb(var(--surface))] border-[rgb(var(--border))]",
            "hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--surface-raised))]",
            draggedIndex === index && "opacity-50 border-[rgb(var(--accent))]",
          )}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

// ── Drop Zone ──────────────────────────────────────────────

interface DropZoneProps {
  onDrop: (files: File[]) => void;
  children: React.ReactNode;
  className?: string;
  multiple?: boolean;
  accept?: string;
}

export function DropZone({
  onDrop,
  children,
  className,
  multiple = true,
  accept,
}: DropZoneProps) {
  const [isOver, setIsOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onDrop(files);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsOver(true);
  }

  function handleDragLeave() {
    setIsOver(false);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length) onDrop(files);
  }

  return (
    <div className="space-y-2">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "p-8 rounded-xl border-2 border-dashed transition-all text-center cursor-pointer",
          "bg-[rgb(var(--surface))] border-[rgb(var(--border))]",
          isOver
            ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))]"
            : "hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--surface-raised))]",
          className
        )}
        aria-label="Drop files here or click to browse"
      >
        {children}
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileInput}
        className="sr-only"
      />
    </div>
  );
}

// ── Kanban Board ──────────────────────────────────────────

interface Column<T> {
  id: string;
  title: string;
  items: T[];
}

interface KanbanBoardProps<T extends { id: string }> {
  columns: Column<T>[];
  onChange: (columns: Column<T>[]) => void;
  renderItem: (item: T) => React.ReactNode;
}

export function KanbanBoard<T extends { id: string }>({
  columns,
  onChange,
  renderItem,
}: KanbanBoardProps<T>) {
  const [draggedItem, setDraggedItem] = useState<{ item: T; fromCol: string } | null>(null);

  function handleDragStart(item: T, fromCol: string) {
    setDraggedItem({ item, fromCol });
  }

  function handleDrop(toColId: string) {
    if (!draggedItem) return;

    const newColumns = columns.map((col) => {
      if (col.id === draggedItem.fromCol) {
        return {
          ...col,
          items: col.items.filter((i) => i.id !== draggedItem.item.id),
        };
      }
      if (col.id === toColId) {
        return {
          ...col,
          items: [...col.items, draggedItem.item],
        };
      }
      return col;
    });

    onChange(newColumns);
    setDraggedItem(null);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((col) => (
        <div
          key={col.id}
          className="w-72 flex-shrink-0 rounded-xl border bg-[rgb(var(--surface-raised))]"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(col.id)}
        >
          <div className="px-4 py-3 border-b border-[rgb(var(--border))]">
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[rgb(var(--text-secondary))]">
              {col.title} ({col.items.length})
            </h3>
          </div>
          <div className="p-2 space-y-2 min-h-[100px]">
            {col.items.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item, col.id)}
                className="p-3 rounded-lg border cursor-grab active:cursor-grabbing transition-all bg-[rgb(var(--surface))] border-[rgb(var(--border))] hover:border-[rgb(var(--accent))]"
              >
                {renderItem(item)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
`},html:{filename:"drag-and-drop.html",code:`<div class="drag-container">
  <!-- Reorderable List -->
  <div class="drag-list">
    <div class="drag-item" draggable="true">
      <span class="drag-handle">:::</span>
      <span class="item-content">Task 1</span>
    </div>
    <div class="drag-item" draggable="true">
      <span class="drag-handle">:::</span>
      <span class="item-content">Task 2</span>
    </div>
  </div>

  <!-- Drop Zone -->
  <div class="drop-zone">
    <p>Drop files here or click to upload</p>
    <input type="file" class="file-input" hidden />
  </div>

  <!-- Kanban -->
  <div class="kanban-board">
    <div class="kanban-column">
      <h3>To Do</h3>
      <div class="kanban-items">
        <div class="kanban-card" draggable="true">Task A</div>
      </div>
    </div>
  </div>
</div>

<style>
.drag-list { display: flex; flex-direction: column; gap: 8px; }
.drag-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px; background: var(--surface);
  border: 1px solid var(--border); border-radius: 8px;
  cursor: grab;
}
.drag-item:active { cursor: grabbing; }
.drag-handle { color: var(--text-tertiary); }

.drop-zone {
  border: 2px dashed var(--border);
  border-radius: 8px; padding: 32px;
  text-align: center; cursor: pointer;
  transition: all 0.2s;
}
.drop-zone:hover, .drop-zone.drag-over {
  border-color: var(--accent);
  background: var(--accent-subtle);
}

.kanban-board {
  display: flex; gap: 16px; overflow-x: auto;
}
.kanban-column {
  min-width: 250px; background: var(--surface);
  border: 1px solid var(--border); border-radius: 8px;
}
.kanban-items { padding: 8px; min-height: 100px; }
.kanban-card {
  padding: 12px; background: var(--surface-raised);
  border: 1px solid var(--border); border-radius: 6px;
  margin-bottom: 8px; cursor: grab;
}
.kanban-card:active { cursor: grabbing; }
</style>

<script>
// Reorderable list
const list = document.querySelector('.drag-list');
let draggedItem = null;

list.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains('drag-item')) {
    draggedItem = e.target;
    e.target.style.opacity = '0.5';
  }
});

list.addEventListener('dragend', (e) => {
  if (draggedItem) {
    draggedItem.style.opacity = '1';
    draggedItem = null;
  }
});

list.addEventListener('dragover', (e) => {
  e.preventDefault();
  const after = getDragAfterElement(list, e.clientY);
  if (after) list.insertBefore(draggedItem, after);
  else list.appendChild(draggedItem);
});

function getDragAfterElement(container, y) {
  const elements = [...container.querySelectorAll('.drag-item:not(.dragging)')];
  return elements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) return { offset, element: child };
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Drop zone
const dropZone = document.querySelector('.drop-zone');
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  console.log('Files dropped:', e.dataTransfer.files);
});

// Kanban
const kanbanCards = document.querySelectorAll('.kanban-card');
kanbanCards.forEach(card => {
  card.addEventListener('dragstart', () => {
    card.classList.add('dragging');
  });
  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });
});

const columns = document.querySelectorAll('.kanban-items');
columns.forEach(col => {
  col.addEventListener('dragover', (e) => {
    e.preventDefault();
    const after = getDragAfterElement(col, e.clientY);
    const dragging = document.querySelector('.dragging');
    if (dragging) {
      if (after) col.insertBefore(dragging, after);
      else col.appendChild(dragging);
    }
  });
});
</script>`},swift:{filename:"DragDropView.swift",code:`import SwiftUI

struct DraggableItem: Identifiable {
    let id = UUID()
    var title: String
}

struct ReorderableList: View {
    @State private var items = [
        DraggableItem(title: "Design mockups"),
        DraggableItem(title: "Write copy"),
        DraggableItem(title: "Build prototype"),
        DraggableItem(title: "Run user tests"),
    ]

    var body: some View {
        List {
            ForEach(items) { item in
                HStack {
                    Image(systemName: "line.3.horizontal")
                        .foregroundStyle(.secondary)
                    Text(item.title)
                }
                .padding(.vertical, 4)
            }
            .onMove { from, to in
                items.move(fromOffsets: from, toOffset: to)
            }
        }
        .environment(\\.editMode, .constant(.active))
    }
}

#Preview {
    ReorderableList()
}`}},d=[{type:"Reorderable lists",desc:"Drag items to re-prioritize tasks, sort tables, or organize content"},{type:"File uploads",desc:"Drag and drop files onto designated zones for quick uploads with visual feedback"},{type:"Kanban boards",desc:"Move cards between columns to track workflow state and progress"},{type:"Builder interfaces",desc:"Compose layouts by dragging components onto a canvas or container"}];e.s(["default",0,function(){let[e,o]=(0,i.useState)([{id:"1",title:"Research competitors",description:"Analyze top 5 competitors"},{id:"2",title:"Design wireframes",description:"Create low-fidelity mockups"},{id:"3",title:"User testing",description:"Conduct 5 user interviews"},{id:"4",title:"Finalize designs",description:"Prepare handoff documentation"}]),[l,c]=(0,i.useState)([{id:"todo",title:"To Do",items:[{id:"task-1",title:"Set up project",description:"Initialize repo and tooling"},{id:"task-2",title:"Research",description:"Gather requirements and constraints"}]},{id:"in-progress",title:"In Progress",items:[{id:"task-3",title:"Design mockups",description:"Create high-fidelity designs"}]},{id:"done",title:"Done",items:[{id:"task-4",title:"Kickoff meeting",description:"Align with stakeholders"}]}]);return(0,r.jsxs)("div",{children:[(0,r.jsx)(t.PageHeader,{title:"Drag and Drop",description:"Intuitive interaction patterns for reordering, organizing, and transferring content through direct manipulation. Essential for productivity tools, builders, and content management interfaces."}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Reorderable lists"}),(0,r.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"Allow users to reorganize items by dragging and dropping. Provides immediate visual feedback during the drag operation."}),(0,r.jsx)(a.ComponentPreview,{children:(0,r.jsxs)("div",{className:"w-full max-w-md mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",children:[(0,r.jsx)("h3",{className:"text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-3",children:"Project tasks"}),(0,r.jsx)("div",{className:"space-y-2",children:e.map(e=>(0,r.jsx)("div",{className:"p-3 rounded-lg border cursor-grab active:cursor-grabbing transition-all bg-[rgb(var(--surface))] border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--surface-raised))]",draggable:!0,onDragStart:e=>{e.dataTransfer.effectAllowed="move",e.currentTarget.style.opacity="0.5"},onDragEnd:e=>{e.currentTarget.style.opacity="1"},children:(0,r.jsxs)("div",{className:"flex items-start gap-2",children:[(0,r.jsx)("span",{className:"text-[rgb(var(--text-tertiary))] mt-1 select-none",children:"⋮⋮"}),(0,r.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,r.jsx)("p",{className:"text-[13px] font-medium text-[rgb(var(--text-primary))]",children:e.title}),(0,r.jsx)("p",{className:"text-[12px] text-[rgb(var(--text-secondary))]",children:e.description})]})]})},e.id))}),(0,r.jsx)("p",{className:"text-[11px] text-[rgb(var(--text-tertiary))] mt-3 text-center",children:"Drag items to reorder (demo only)"})]})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"File drop zone"}),(0,r.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"Designated areas where users can drag and drop files for upload. Provides clear visual feedback during the drag operation."}),(0,r.jsx)(a.ComponentPreview,{children:(0,r.jsx)("div",{className:"w-full max-w-lg mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",children:(0,r.jsxs)("div",{className:"p-8 rounded-xl border-2 border-dashed transition-all text-center cursor-pointer border-[rgb(var(--border))] bg-[rgb(var(--surface))] hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--surface-raised))]",onDragOver:e=>{e.preventDefault(),e.currentTarget.classList.add("border-[rgb(var(--accent))]","bg-[rgb(var(--accent-subtle))]"),e.currentTarget.classList.remove("border-[rgb(var(--border))]","bg-[rgb(var(--surface))]")},onDragLeave:e=>{e.currentTarget.classList.remove("border-[rgb(var(--accent))]","bg-[rgb(var(--accent-subtle))]"),e.currentTarget.classList.add("border-[rgb(var(--border))]","bg-[rgb(var(--surface))]")},onDrop:e=>{e.preventDefault(),e.currentTarget.classList.remove("border-[rgb(var(--accent))]","bg-[rgb(var(--accent-subtle))]"),e.currentTarget.classList.add("border-[rgb(var(--border))]","bg-[rgb(var(--surface))]"),console.log("Files dropped:",Array.from(e.dataTransfer.files))},children:[(0,r.jsx)("svg",{className:"w-10 h-10 mx-auto text-[rgb(var(--text-tertiary))] mb-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})}),(0,r.jsx)("p",{className:"text-[13px] font-medium text-[rgb(var(--text-primary))]",children:"Drop files here to upload"}),(0,r.jsx)("p",{className:"text-[12px] text-[rgb(var(--text-secondary))]",children:"or click to browse"}),(0,r.jsx)("input",{type:"file",className:"sr-only",multiple:!0})]})})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Kanban board"}),(0,r.jsx)("p",{className:"text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed",children:"Visual task management using columns and draggable cards. Move items between stages to track progress."}),(0,r.jsx)(a.ComponentPreview,{children:(0,r.jsx)("div",{className:"w-full overflow-x-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",children:(0,r.jsx)("div",{className:"flex gap-4 min-w-max",children:l.map(e=>(0,r.jsxs)("div",{className:"w-64 flex-shrink-0 rounded-xl border bg-[rgb(var(--surface-raised))]",onDragOver:e=>e.preventDefault(),children:[(0,r.jsx)("div",{className:"px-4 py-3 border-b border-[rgb(var(--border))]",children:(0,r.jsxs)("h3",{className:"text-[12px] font-semibold uppercase tracking-wider text-[rgb(var(--text-secondary))]",children:[e.title," (",e.items.length,")"]})}),(0,r.jsx)("div",{className:"p-2 space-y-2",children:e.items.map(e=>(0,r.jsxs)("div",{className:"p-3 rounded-lg border cursor-grab active:cursor-grabbing transition-all bg-[rgb(var(--surface))] border-[rgb(var(--border))] hover:border-[rgb(var(--accent))]",draggable:!0,onDragStart:e=>e.currentTarget.classList.add("opacity-50"),onDragEnd:e=>e.currentTarget.classList.remove("opacity-50"),children:[(0,r.jsx)("p",{className:"text-[12px] font-medium text-[rgb(var(--text-primary))]",children:e.title}),(0,r.jsx)("p",{className:"text-[11px] text-[rgb(var(--text-tertiary))]",children:e.description})]},e.id))})]},e.id))})})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Use cases"}),(0,r.jsx)("div",{className:"grid grid-cols-2 gap-4",children:d.map(e=>(0,r.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] p-4 bg-[rgb(var(--surface))]",children:[(0,r.jsx)("h3",{className:"text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1",children:e.type}),(0,r.jsx)("p",{className:"text-[12px] text-[rgb(var(--text-secondary))]",children:e.desc})]},e.type))})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6",children:"Drag handle anatomy"}),(0,r.jsx)("div",{className:"rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex items-center justify-center",children:(0,r.jsxs)("svg",{viewBox:"0 0 300 120",width:"300",height:"120",className:"max-w-full",children:[(0,r.jsx)("rect",{x:"20",y:"20",width:"260",height:"80",rx:"8",fill:"rgb(var(--surface))",stroke:"rgb(var(--border))",strokeWidth:"1"}),(0,r.jsxs)("g",{transform:"translate(40, 50)",children:[(0,r.jsx)("circle",{cx:"0",cy:"0",r:"2",fill:"rgb(var(--text-tertiary))"}),(0,r.jsx)("circle",{cx:"0",cy:"8",r:"2",fill:"rgb(var(--text-tertiary))"}),(0,r.jsx)("circle",{cx:"0",cy:"-8",r:"2",fill:"rgb(var(--text-tertiary))"}),(0,r.jsx)("circle",{cx:"10",cy:"0",r:"2",fill:"rgb(var(--text-tertiary))"}),(0,r.jsx)("circle",{cx:"10",cy:"8",r:"2",fill:"rgb(var(--text-tertiary))"}),(0,r.jsx)("circle",{cx:"10",cy:"-8",r:"2",fill:"rgb(var(--text-tertiary))"})]}),(0,r.jsx)("text",{x:"80",y:"60",fontSize:"13",fill:"rgb(var(--text-primary))",children:"Draggable item content"}),(0,r.jsx)("line",{x1:"20",y1:"110",x2:"280",y2:"110",stroke:"var(--nav-active-color)",strokeWidth:"2",strokeDasharray:"4 4",opacity:"0.5"}),(0,r.jsx)("text",{x:"150",y:"130",fontSize:"9",fill:"rgb(var(--text-tertiary))",textAnchor:"middle",children:"Drop position indicator"}),(0,r.jsx)("text",{x:"260",y:"50",fontSize:"20",children:"🤚"}),(0,r.jsx)("text",{x:"280",y:"50",fontSize:"14",fill:"rgb(var(--text-tertiary))",children:"cursor-grab"}),(0,r.jsx)("text",{x:"40",y:"10",fontSize:"8",fill:"rgb(var(--text-tertiary))",children:"DRAG HANDLE"}),(0,r.jsx)("text",{x:"80",y:"10",fontSize:"8",fill:"rgb(var(--text-tertiary))",children:"CONTENT"})]})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Interaction states"}),(0,r.jsx)("div",{className:"overflow-hidden rounded-xl border border-[rgb(var(--border))]",children:(0,r.jsxs)("table",{className:"w-full text-[13px]",children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{className:"bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]",children:["State","Appearance","Notes"].map(e=>(0,r.jsx)("th",{className:"px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",children:e},e))})}),(0,r.jsx)("tbody",{children:[{state:"Idle",appearance:"Normal cursor, no visual feedback",notes:"Default state; ready for interaction"},{state:"Hover",appearance:"Border highlight, cursor changes to grab",notes:"Indicates item is draggable on mouseover"},{state:"Dragging",appearance:"Opacity reduction, cursor changes to grabbing",notes:"Visual clone follows cursor; original item dims"},{state:"Drag over",appearance:"Drop zone highlight, dashed border",notes:"Indicates valid drop target area"},{state:"Drop",appearance:"Smooth transition to new position",notes:"Immediate reordering with animation"}].map((e,t)=>(0,r.jsxs)("tr",{className:`border-b border-[rgb(var(--border-subtle))] last:border-0 ${t%2==0?"bg-[rgb(var(--surface))]":"bg-[rgb(var(--background))]"}`,children:[(0,r.jsx)("td",{className:"px-4 py-3 font-medium text-[rgb(var(--text-primary))]",children:e.state}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-secondary))]",children:e.appearance}),(0,r.jsx)("td",{className:"px-4 py-3 text-[rgb(var(--text-tertiary))]",children:e.notes})]},e.state))})]})})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4",children:"Usage guidelines"}),(0,r.jsx)("div",{className:"grid grid-cols-2 gap-4",children:[{type:"do",items:["Provide clear visual affordances for draggable items (e.g., grip handles)","Show immediate feedback during drag (ghost image, opacity change)","Indicate valid drop targets with highlighting","Support keyboard alternatives for accessibility"]},{type:"dont",items:["Don't require drag for essential tasks (provide alternative controls)","Avoid drag in small click targets (hard to initiate)","Don't allow dropping in invalid areas without feedback","Avoid excessive drag distance for simple reordering"]}].map(({type:e,items:t})=>(0,r.jsxs)("div",{className:"rounded-xl border border-[rgb(var(--border))] overflow-hidden",children:[(0,r.jsx)("div",{className:`px-4 py-2.5 border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider ${"do"===e?"text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20":"text-red-500 bg-red-50 dark:bg-red-950/20"}`,children:"do"===e?"✓ Do":"✗ Don't"}),(0,r.jsx)("ul",{className:"p-4 space-y-2",children:t.map(t=>(0,r.jsxs)("li",{className:"text-[12px] text-[rgb(var(--text-secondary))] flex gap-2",children:[(0,r.jsx)("span",{className:"do"===e?"text-emerald-500":"text-red-400",children:"·"}),t]},t))})]},e))})]}),(0,r.jsxs)("section",{className:"mb-12",children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Implementation"}),(0,r.jsx)(s.PlatformTabs,{code:n})]}),(0,r.jsxs)("section",{children:[(0,r.jsx)("h2",{className:"text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2",children:"Accessibility"}),(0,r.jsx)("ul",{className:"space-y-2 text-[14px] text-[rgb(var(--text-secondary))]",children:["Provide keyboard alternatives for all drag operations (e.g., Move Up/Down buttons).","Use aria-grabbed to indicate drag state for screen readers.","Announce drops with aria-live regions when order changes.","Ensure drop targets are focusable and indicate focus state.","Support Enter/Space to pick up and drop items via keyboard.","Provide visual focus indicators for keyboard navigation."].map(e=>(0,r.jsxs)("li",{className:"flex gap-2",children:[(0,r.jsx)("span",{className:"text-[rgb(var(--accent))] mt-0.5",children:"→"}),e]},e))})]})]})}])}]);