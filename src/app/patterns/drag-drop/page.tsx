"use client";

import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { useState } from "react";

export const metadata: Metadata = { title: "Drag and Drop" };

const CODE = {
  react: {
    filename: "DragAndDrop.tsx",
    code: `"use client";

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
`,
  },
  html: {
    filename: "drag-and-drop.html",
    code: `<div class="drag-container">
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
</script>`,
  },
};

const PATTERN_EXAMPLES = [
  { type: "Reorderable lists", desc: "Drag items to re-prioritize tasks, sort tables, or organize content" },
  { type: "File uploads", desc: "Drag and drop files onto designated zones for quick uploads with visual feedback" },
  { type: "Kanban boards", desc: "Move cards between columns to track workflow state and progress" },
  { type: "Builder interfaces", desc: "Compose layouts by dragging components onto a canvas or container" },
];

export default function DragAndDropPage() {
  const [listItems, setListItems] = useState([
    { id: "1", title: "Research competitors", description: "Analyze top 5 competitors" },
    { id: "2", title: "Design wireframes", description: "Create low-fidelity mockups" },
    { id: "3", title: "User testing", description: "Conduct 5 user interviews" },
    { id: "4", title: "Finalize designs", description: "Prepare handoff documentation" },
  ]);

  const [kanbanColumns, setKanbanColumns] = useState([
    {
      id: "todo",
      title: "To Do",
      items: [
        { id: "task-1", title: "Set up project", description: "Initialize repo and tooling" },
        { id: "task-2", title: "Research", description: "Gather requirements and constraints" },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      items: [
        { id: "task-3", title: "Design mockups", description: "Create high-fidelity designs" },
      ],
    },
    {
      id: "done",
      title: "Done",
      items: [
        { id: "task-4", title: "Kickoff meeting", description: "Align with stakeholders" },
      ],
    },
  ]);

  const handleFileDrop = (files: File[]) => {
    console.log("Files dropped:", files);
  };

  return (
    <div>
      <PageHeader
        title="Drag and Drop"
        description="Intuitive interaction patterns for reordering, organizing, and transferring content through direct manipulation. Essential for productivity tools, builders, and content management interfaces."
      />

      {/* Reorderable list */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Reorderable lists</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Allow users to reorganize items by dragging and dropping. Provides immediate visual feedback during the drag operation.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-md mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-3">Project tasks</h3>
            <div className="space-y-2">
              {listItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg border cursor-grab active:cursor-grabbing transition-all bg-[rgb(var(--surface))] border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--surface-raised))]"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.effectAllowed = "move";
                    e.currentTarget.style.opacity = "0.5";
                  }}
                  onDragEnd={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-[rgb(var(--text-tertiary))] mt-1 select-none">⋮⋮</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">{item.title}</p>
                      <p className="text-[12px] text-[rgb(var(--text-secondary))]">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[rgb(var(--text-tertiary))] mt-3 text-center">
              Drag items to reorder (demo only)
            </p>
          </div>
        </ComponentPreview>
      </section>

      {/* Drop zone */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">File drop zone</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Designated areas where users can drag and drop files for upload. Provides clear visual feedback during the drag operation.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-lg mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <div
              className="p-8 rounded-xl border-2 border-dashed transition-all text-center cursor-pointer border-[rgb(var(--border))] bg-[rgb(var(--surface))] hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--surface-raised))]"
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add("border-[rgb(var(--accent))]", "bg-[rgb(var(--accent-subtle))]");
                e.currentTarget.classList.remove("border-[rgb(var(--border))]", "bg-[rgb(var(--surface))]");
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove("border-[rgb(var(--accent))]", "bg-[rgb(var(--accent-subtle))]");
                e.currentTarget.classList.add("border-[rgb(var(--border))]", "bg-[rgb(var(--surface))]");
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove("border-[rgb(var(--accent))]", "bg-[rgb(var(--accent-subtle))]");
                e.currentTarget.classList.add("border-[rgb(var(--border))]", "bg-[rgb(var(--surface))]");
                const files = Array.from(e.dataTransfer.files);
                console.log("Files dropped:", files);
              }}
            >
              <svg className="w-10 h-10 mx-auto text-[rgb(var(--text-tertiary))] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">Drop files here to upload</p>
              <p className="text-[12px] text-[rgb(var(--text-secondary))]">or click to browse</p>
              <input type="file" className="sr-only" multiple />
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Kanban board */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Kanban board</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Visual task management using columns and draggable cards. Move items between stages to track progress.
        </p>
        <ComponentPreview>
          <div className="w-full overflow-x-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <div className="flex gap-4 min-w-max">
              {kanbanColumns.map((col) => (
                <div key={col.id} className="w-64 flex-shrink-0 rounded-xl border bg-[rgb(var(--surface-raised))]" onDragOver={(e) => e.preventDefault()}>
                  <div className="px-4 py-3 border-b border-[rgb(var(--border))]">
                    <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[rgb(var(--text-secondary))]">{col.title} ({col.items.length})</h3>
                  </div>
                  <div className="p-2 space-y-2">
                    {col.items.map((item) => (
                      <div key={item.id} className="p-3 rounded-lg border cursor-grab active:cursor-grabbing transition-all bg-[rgb(var(--surface))] border-[rgb(var(--border))] hover:border-[rgb(var(--accent))]" draggable onDragStart={(e) => e.currentTarget.classList.add("opacity-50")} onDragEnd={(e) => e.currentTarget.classList.remove("opacity-50")}>
                        <p className="text-[12px] font-medium text-[rgb(var(--text-primary))]">{item.title}</p>
                        <p className="text-[11px] text-[rgb(var(--text-tertiary))]">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Use cases */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Use cases</h2>
        <div className="grid grid-cols-2 gap-4">
          {PATTERN_EXAMPLES.map((ex) => (
            <div key={ex.type} className="rounded-xl border border-[rgb(var(--border))] p-4 bg-[rgb(var(--surface))]">
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1">{ex.type}</h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))]">{ex.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Drag handle anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-8 flex items-center justify-center">
          <svg viewBox="0 0 300 120" width="300" height="120" className="max-w-full">
            {/* List item */}
            <rect x="20" y="20" width="260" height="80" rx="8" fill="rgb(var(--surface))" stroke="rgb(var(--border))" strokeWidth="1" />
            
            {/* Drag handle */}
            <g transform="translate(40, 50)">
              <circle cx="0" cy="0" r="2" fill="rgb(var(--text-tertiary))" />
              <circle cx="0" cy="8" r="2" fill="rgb(var(--text-tertiary))" />
              <circle cx="0" cy="-8" r="2" fill="rgb(var(--text-tertiary))" />
              <circle cx="10" cy="0" r="2" fill="rgb(var(--text-tertiary))" />
              <circle cx="10" cy="8" r="2" fill="rgb(var(--text-tertiary))" />
              <circle cx="10" cy="-8" r="2" fill="rgb(var(--text-tertiary))" />
            </g>
            
            {/* Label */}
            <text x="80" y="60" fontSize="13" fill="rgb(var(--text-primary))">Draggable item content</text>
            
            {/* Drop indicator line */}
            <line x1="20" y1="110" x2="280" y2="110" stroke="var(--nav-active-color)" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
            <text x="150" y="130" fontSize="9" fill="rgb(var(--text-tertiary))" textAnchor="middle">Drop position indicator</text>
            
            {/* Cursor icons */}
            <text x="260" y="50" fontSize="20">🤚</text>
            <text x="280" y="50" fontSize="14" fill="rgb(var(--text-tertiary))">cursor-grab</text>
            
            {/* Annotations */}
            <text x="40" y="10" fontSize="8" fill="rgb(var(--text-tertiary))">DRAG HANDLE</text>
            <text x="80" y="10" fontSize="8" fill="rgb(var(--text-tertiary))">CONTENT</text>
          </svg>
        </div>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Interaction states</h2>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["State", "Appearance", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { state: "Idle", appearance: "Normal cursor, no visual feedback", notes: "Default state; ready for interaction" },
                { state: "Hover", appearance: "Border highlight, cursor changes to grab", notes: "Indicates item is draggable on mouseover" },
                { state: "Dragging", appearance: "Opacity reduction, cursor changes to grabbing", notes: "Visual clone follows cursor; original item dims" },
                { state: "Drag over", appearance: "Drop zone highlight, dashed border", notes: "Indicates valid drop target area" },
                { state: "Drop", appearance: "Smooth transition to new position", notes: "Immediate reordering with animation" },
              ].map((s, i) => (
                <tr key={s.state} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{s.state}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{s.appearance}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{s.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage guidelines */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Usage guidelines</h2>
        <div className="grid grid-cols-2 gap-4">
           {[{ type: "do", items: ["Provide clear visual affordances for draggable items (e.g., grip handles)", "Show immediate feedback during drag (ghost image, opacity change)", "Indicate valid drop targets with highlighting", "Support keyboard alternatives for accessibility"] },
            { type: "dont", items: ["Don't require drag for essential tasks (provide alternative controls)", "Avoid drag in small click targets (hard to initiate)", "Don't allow dropping in invalid areas without feedback", "Avoid excessive drag distance for simple reordering"] },
          ].map(({ type, items }) => (
            <div key={type} className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
              <div className={`px-4 py-2.5 border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider ${
                type === "do" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20" : "text-red-500 bg-red-50 dark:bg-red-950/20"
              }`}>
                {type === "do" ? "✓ Do" : "✗ Don't"}
              </div>
              <ul className="p-4 space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-[12px] text-[rgb(var(--text-secondary))] flex gap-2">
                    <span className={type === "do" ? "text-emerald-500" : "text-red-400"}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
           {["Provide keyboard alternatives for all drag operations (e.g., Move Up/Down buttons).",
            "Use aria-grabbed to indicate drag state for screen readers.",
            "Announce drops with aria-live regions when order changes.",
            "Ensure drop targets are focusable and indicate focus state.",
            "Support Enter/Space to pick up and drop items via keyboard.",
            "Provide visual focus indicators for keyboard navigation.",
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
