"use client";

import { useState, useCallback } from "react";
import { Trash2, Download, Tag, Archive } from "lucide-react";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Button } from "@/components/ui/Button";

interface Row {
  id: number;
  name: string;
  type: string;
  size: string;
  modified: string;
}

const ROWS: Row[] = [
  { id: 1, name: "design-tokens.json",   type: "JSON",  size: "48 KB",  modified: "Today" },
  { id: 2, name: "button.stories.tsx",   type: "TSX",   size: "12 KB",  modified: "Today" },
  { id: 3, name: "color-palette.fig",    type: "Figma", size: "2.4 MB", modified: "Yesterday" },
  { id: 4, name: "motion-spec.md",       type: "MD",    size: "8 KB",   modified: "May 6" },
  { id: 5, name: "component-index.csv",  type: "CSV",   size: "3 KB",   modified: "May 5" },
  { id: 6, name: "accessibility-audit.pdf", type: "PDF", size: "1.1 MB", modified: "May 4" },
];

const CODE = {
  react: {
    filename: "MultiSelectTable.tsx",
    code: `"use client";

import { useState, useCallback } from "react";

function MultiSelectTable({ rows }: { rows: Row[] }) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggleAll = useCallback(() => {
    setSelected((s) =>
      s.size === rows.length
        ? new Set()
        : new Set(rows.map((r) => r.id))
    );
  }, [rows]);

  const toggle = useCallback((id: number) => {
    setSelected((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const allChecked  = selected.size === rows.length;
  const someChecked = selected.size > 0 && !allChecked;

  return (
    <div>
      {/* Bulk action bar — only mounts when items are selected */}
      {selected.size > 0 && (
        <div
          role="toolbar"
          aria-label="Bulk actions"
          className="flex items-center gap-3 p-3 mb-3 rounded-xl
            bg-[rgb(var(--accent-subtle))] border border-[rgb(var(--accent-muted))]"
        >
          <span className="text-[13px] font-medium text-[rgb(var(--accent))]">
            {selected.size} selected
          </span>
          <Button size="sm" variant="ghost" onClick={handleDelete}>
            Delete
          </Button>
          <Button size="sm" variant="ghost" onClick={handleExport}>
            Export
          </Button>
        </div>
      )}

      <table aria-label="Files" aria-multiselectable="true">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                aria-label="Select all"
                checked={allChecked}
                ref={(el) => { if (el) el.indeterminate = someChecked; }}
                onChange={toggleAll}
              />
            </th>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Modified</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              aria-selected={selected.has(row.id)}
              onClick={() => toggle(row.id)}
            >
              <td>
                <input
                  type="checkbox"
                  aria-label={\`Select \${row.name}\`}
                  checked={selected.has(row.id)}
                  onChange={() => toggle(row.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.type}</td>
              <td>{row.size}</td>
              <td>{row.modified}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
  },
  html: {
    filename: "multi-select.html",
    code: `<!-- Bulk action bar (shown conditionally) -->
<div
  id="bulk-bar"
  role="toolbar"
  aria-label="Bulk actions"
  hidden
  style="display:flex; gap:12px; align-items:center;
    padding:12px; border-radius:12px;
    background:rgb(var(--accent-subtle)); margin-bottom:12px;"
>
  <span id="selected-count" style="font-size:13px; font-weight:500; color:rgb(var(--accent));">
    0 selected
  </span>
  <button onclick="deleteSelected()">Delete</button>
  <button onclick="exportSelected()">Export</button>
</div>

<table aria-label="Files" aria-multiselectable="true">
  <thead>
    <tr>
      <th>
        <input
          type="checkbox"
          id="select-all"
          aria-label="Select all"
          onchange="toggleAll(this)"
        />
      </th>
      <th>Name</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr aria-selected="false" onclick="toggleRow(this, 1)">
      <td>
        <input
          type="checkbox"
          aria-label="Select design-tokens.json"
          onchange="toggleRow(null, 1)"
          onclick="event.stopPropagation()"
        />
      </td>
      <td>design-tokens.json</td>
      <td>JSON</td>
    </tr>
  </tbody>
</table>`,
  },
  swift: {
    filename: "MultiSelectView.swift",
    code: `import SwiftUI

struct FileItem: Identifiable {
  let id: Int
  let name: String
  let type: String
  let size: String
}

struct MultiSelectView: View {
  let items: [FileItem]
  @State private var selected: Set<Int> = []
  @Environment(\\.editMode) private var editMode

  var body: some View {
    List(items, selection: $selected) { item in
      HStack {
        VStack(alignment: .leading) {
          Text(item.name).font(.callout)
          Text(item.type + " · " + item.size)
            .font(.caption)
            .foregroundStyle(.secondary)
        }
      }
      .tag(item.id)
    }
    .environment(\\.editMode, .constant(.active))
    .toolbar {
      if !selected.isEmpty {
        ToolbarItemGroup {
          Button("Delete", role: .destructive) {
            deleteItems()
          }
          Button("Export") {
            exportItems()
          }
        }
      }
    }
    .navigationTitle("\\(selected.isEmpty ? "" : "\\(selected.count) selected")")
  }
}`,
  },
};

function Demo() {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggleAll = useCallback(() => {
    setSelected((s) => s.size === ROWS.length ? new Set() : new Set(ROWS.map((r) => r.id)));
  }, []);

  const toggle = useCallback((id: number) => {
    setSelected((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const allChecked = selected.size === ROWS.length;
  const someChecked = selected.size > 0 && !allChecked;

  return (
    <div className="w-full max-w-2xl">
      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div
          role="toolbar"
          aria-label="Bulk actions"
          className="flex items-center gap-3 px-4 py-2.5 mb-3 rounded-xl bg-[rgb(var(--accent-subtle))] border border-[rgb(var(--accent-muted))]"
        >
          <span className="text-[13px] font-medium text-[rgb(var(--accent))] flex-1">
            {selected.size} selected
          </span>
          <button className="flex items-center gap-1.5 text-[12px] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] px-3 py-1.5 rounded-lg hover:bg-[rgb(var(--surface-raised))] transition-colors">
            <Tag size={13} /> Label
          </button>
          <button className="flex items-center gap-1.5 text-[12px] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] px-3 py-1.5 rounded-lg hover:bg-[rgb(var(--surface-raised))] transition-colors">
            <Archive size={13} /> Archive
          </button>
          <button className="flex items-center gap-1.5 text-[12px] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] px-3 py-1.5 rounded-lg hover:bg-[rgb(var(--surface-raised))] transition-colors">
            <Download size={13} /> Export
          </button>
          <button className="flex items-center gap-1.5 text-[12px] text-[rgb(var(--status-danger))] hover:bg-[rgb(var(--status-danger)/0.1)] px-3 py-1.5 rounded-lg transition-colors">
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
        <table className="w-full text-[13px]" aria-label="Files" aria-multiselectable="true">
          <thead>
            <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
              <th className="px-4 py-2.5 w-10">
                <input
                  type="checkbox"
                  aria-label="Select all"
                  checked={allChecked}
                  ref={(el) => { if (el) el.indeterminate = someChecked; }}
                  onChange={toggleAll}
                  className="rounded"
                />
              </th>
              {["Name", "Type", "Size", "Modified"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr
                key={row.id}
                aria-selected={selected.has(row.id)}
                onClick={() => toggle(row.id)}
                className={`border-b border-[rgb(var(--border-subtle))] last:border-0 cursor-pointer transition-colors ${
                  selected.has(row.id)
                    ? "bg-[rgb(var(--accent-subtle))]"
                    : "bg-[rgb(var(--surface))] hover:bg-[rgb(var(--surface-raised))]"
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label={`Select ${row.name}`}
                    checked={selected.has(row.id)}
                    onChange={() => toggle(row.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.name}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.type}</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.size}</td>
                <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.modified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function MultiSelectPage() {
  return (
    <div>
      <PageHeader
        title="Multi-select & Bulk Actions"
        description="Select multiple rows with checkboxes (including shift-click range selection) then apply a bulk action via the contextual toolbar that appears above the list. The toolbar is only present when items are selected — keeping the default state clean."
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Preview</h2>
        <ComponentPreview>
          <Demo />
        </ComponentPreview>
      </section>

      {/* ── Selection states ─────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Selection states</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["State", "Header checkbox", "Row visual", "Bulk bar"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { state: "None selected",   header: "Unchecked",      row: "Default background",  bar: "Hidden" },
                { state: "Some selected",   header: "Indeterminate",  row: "Accent tint on selected rows", bar: "Visible with count" },
                { state: "All selected",    header: "Checked",        row: "All rows accent tinted", bar: "Visible — 'N selected'" },
              ].map((row) => (
                <tr key={row.state} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{row.state}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.header}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.row}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.bar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Keyboard ─────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Keyboard & interactions</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Input", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { input: "Space on checkbox",     action: "Toggle selection for that row" },
                { input: "Shift+Click",            action: "Select range from last-selected to clicked row" },
                { input: "Cmd/Ctrl+A",             action: "Select all rows" },
                { input: "Escape",                 action: "Deselect all" },
                { input: "Delete / Backspace",     action: "Delete selected (when bulk bar is focused)" },
              ].map((row) => (
                <tr key={row.input} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.input}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-3">Guidelines</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Show the bulk action toolbar only when items are selected — never as a permanent chrome element.",
            "Include a selection count ('3 selected') in the toolbar so users know what scope the actions apply to.",
            "Support Shift+Click range selection — it is the primary power-user flow and expected in any table.",
            "Make rows clickable as an alternative to the checkbox — clicking anywhere on the row should toggle selection.",
            "Escape should deselect all. This is the expected keyboard escape hatch across selection patterns.",
            "For destructive actions (Delete), show a confirmation dialog when more than 5 items are selected.",
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
