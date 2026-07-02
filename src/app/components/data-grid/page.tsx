"use client";

import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { DataGrid, DataGridColumn } from "@/components/ui/DataGrid";
import { Badge } from "@/components/ui/Badge";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "suspended";
  joined: string;
}

const ROWS: User[] = [
  { id: 1, name: "Jamie Rothwell", email: "jamie@example.com", role: "Admin",     status: "active",    joined: "2024-01-12" },
  { id: 2, name: "Sam Torres",     email: "sam@example.com",   role: "Editor",    status: "active",    joined: "2024-03-08" },
  { id: 3, name: "Alex Kim",       email: "alex@example.com",  role: "Viewer",    status: "invited",   joined: "2025-01-20" },
  { id: 4, name: "Mia Chen",       email: "mia@example.com",   role: "Editor",    status: "active",    joined: "2024-07-30" },
  { id: 5, name: "Jordan Park",    email: "jordan@example.com",role: "Viewer",    status: "suspended", joined: "2023-11-02" },
  { id: 6, name: "Taylor Nguyen",  email: "taylor@example.com",role: "Admin",     status: "active",    joined: "2023-06-14" },
  { id: 7, name: "Riley Shah",     email: "riley@example.com", role: "Editor",    status: "invited",   joined: "2025-02-28" },
  { id: 8, name: "Casey Lee",      email: "casey@example.com", role: "Viewer",    status: "active",    joined: "2024-09-17" },
];

const STATUS_VARIANT: Record<User["status"], "success" | "warning" | "danger"> = {
  active:    "success",
  invited:   "warning",
  suspended: "danger",
};

const COLUMNS: DataGridColumn<User>[] = [
  { key: "name",   header: "Name",   sortable: true, filterable: true, width: "200px" },
  { key: "email",  header: "Email",  sortable: true, filterable: true },
  { key: "role",   header: "Role",   sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (value) => (
      <Badge variant={STATUS_VARIANT[value as User["status"]]} size="sm">
        {String(value)}
      </Badge>
    ),
  },
  { key: "joined", header: "Joined", sortable: true, align: "right" },
];

function Demo() {
  return (
    <div className="w-full max-w-3xl">
      <DataGrid columns={COLUMNS} rows={ROWS} pageSize={5} selectable />
    </div>
  );
}

const CODE = {
  react: {
    filename: "DataGrid.tsx",
    code: `import { DataGrid } from "@/components/ui/DataGrid";
import { Badge } from "@/components/ui/Badge";

const columns = [
  { key: "name",   header: "Name",   sortable: true, filterable: true },
  { key: "email",  header: "Email",  sortable: true, filterable: true },
  { key: "role",   header: "Role",   sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (value) => (
      <Badge variant={statusVariant[value]}>
        {value}
      </Badge>
    ),
  },
  { key: "joined", header: "Joined", sortable: true, align: "right" },
];

<DataGrid
  columns={columns}
  rows={users}
  pageSize={10}
  selectable
  onSelectionChange={(ids) => console.log(ids)}
/>`,
  },
  html: {
    filename: "data-grid.html",
    code: `<div class="data-grid">
  <!-- Filter bar -->
  <div class="filters">
    <label>
      Name
      <input type="search" placeholder="Filter name…" />
    </label>
  </div>

  <!-- Table -->
  <table role="grid" aria-rowcount="100">
    <thead>
      <tr>
        <th aria-sort="none">
          <button>Name <span aria-hidden="true">⇅</span></button>
        </th>
        <th aria-sort="ascending">
          <button>Email <span aria-hidden="true">↑</span></button>
        </th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr aria-selected="true">
        <td><input type="checkbox" checked /></td>
        <td>Jamie Rothwell</td>
        <td>jamie@example.com</td>
        <td>Admin</td>
        <td><span class="badge badge--success">Active</span></td>
      </tr>
    </tbody>
  </table>

  <!-- Pagination -->
  <div aria-label="Pagination">
    <button aria-label="Previous page">‹</button>
    <span>Page 1 of 10</span>
    <button aria-label="Next page">›</button>
  </div>
</div>`,
  },
  swift: {
    filename: "DataGridView.swift",
    code: `import SwiftUI

struct DataGridView<T: Identifiable>: View {
  let columns: [GridColumn<T>]
  let rows: [T]
  @State private var sortKey: String? = nil
  @State private var sortAscending = true
  @State private var selected = Set<T.ID>()

  var body: some View {
    Table(rows, selection: $selected, sortOrder: .constant([])) {
      ForEach(columns) { col in
        TableColumn(col.header, value: \\.id) { row in
          col.content(row)
        }
      }
    }
  }
}`,
  },
};

export default function DataGridPage() {
  return (
    <div>
      <PageHeader
        title="Data Grid"
        description="A feature-rich table with column sorting, per-column filtering, row selection with an indeterminate header checkbox, custom cell rendering, and client-side pagination."
      />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Preview</h2>
        <ComponentPreview>
          <Demo />
        </ComponentPreview>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Column options</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Prop", "Type", "Description"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { prop: "key",        type: "keyof T",                        desc: "Maps the column to a row property" },
                { prop: "header",     type: "string",                         desc: "Column heading text" },
                { prop: "sortable",   type: "boolean",                        desc: "Enables click-to-sort with aria-sort" },
                { prop: "filterable", type: "boolean",                        desc: "Shows a filter input above the table" },
                { prop: "align",      type: '"left" | "center" | "right"',   desc: "Text alignment — right for numeric columns" },
                { prop: "width",      type: "string",                         desc: "Fixed column width (e.g., '200px')" },
                { prop: "render",     type: "(value, row) => ReactNode",      desc: "Custom cell renderer (badges, links, etc.)" },
              ].map((row) => (
                <tr key={row.prop} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.prop}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.type}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Keyboard ────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Keyboard interactions</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Key", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { key: "Tab",          action: "Move focus through filter inputs, column headers, checkboxes" },
                { key: "Space / Enter", action: "Toggle sort on focused column header" },
                { key: "Space",        action: "Toggle row selection on focused checkbox" },
              ].map((row) => (
                <tr key={row.key} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.key}</td>
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
            "Use client-side sorting and filtering for datasets under 500 rows; move to server-side for larger sets.",
            "Right-align numeric columns — scanning numbers is easier when they share the same decimal point column.",
            "Virtualise rows (react-virtual or TanStack Virtual) when exceeding 200 rows in the DOM.",
            "The header checkbox uses the indeterminate state (native ref) when only some rows are selected — never skip this.",
            "Avoid more than 8 visible columns — let users customise column visibility for dense data.",
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
