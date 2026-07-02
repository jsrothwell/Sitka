import type { Metadata } from "next";
import { PageHeader } from "@/site/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/site/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { SortableTableDemo } from "@/site/docs/TableDemo";
import { TableMobileDemo } from "@/site/docs/ComponentMobileDemos";

export const metadata: Metadata = { title: "Table" };

const PROPS = [
  { name: "striped",   type: "boolean",                            default: "false",      description: "Applies alternating row background on even rows." },
  { name: "density",   type: '"default" | "compact" | "comfortable"', default: '"default"', description: "Controls vertical cell padding." },
  { name: "bordered",  type: "boolean",                            default: "false",      description: "Adds vertical dividers between columns." },
];

const HEAD_PROPS = [
  { name: "sortable",       type: "boolean",          description: "Renders sort chevrons and makes the header clickable." },
  { name: "sortDirection",  type: '"asc" | "desc" | false', description: "Current sort direction. false = unsorted but sortable." },
  { name: "onSort",         type: "() => void",       description: "Called when the header is clicked." },
];

const CODE = {
  react: {
    filename: "Table.tsx",
    code: `import {
  Table, TableHeader, TableBody, TableFooter,
  TableRow, TableHead, TableCell
} from "@/components/ui/Table";

// Basic
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Jamieson Rothwell</TableCell>
      <TableCell>Active</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Striped + compact
<Table striped density="compact">…</Table>

// Sortable column header
<TableHead
  sortable
  sortDirection={sortKey === "name" ? sortDir : false}
  onSort={() => handleSort("name")}
>
  Name
</TableHead>`,
  },
  html: {
    filename: "table.html",
    code: `<div class="table-wrap">
  <table class="table">
    <thead class="table-head">
      <tr>
        <th class="th">Name</th>
        <th class="th th-sortable" aria-sort="ascending">
          Status
          <span class="sort-icons" aria-hidden="true">▲▼</span>
        </th>
        <th class="th">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr class="tr">
        <td class="td">Jamieson Rothwell</td>
        <td class="td">Active</td>
        <td class="td">Admin</td>
      </tr>
      <tr class="tr tr-striped">
        <td class="td">Sam Park</td>
        <td class="td">Away</td>
        <td class="td">Developer</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  .table-wrap {
    width: 100%;
    overflow-x: auto;
    border-radius: 12px;
    border: 1px solid rgb(var(--border));
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  .table-head {
    background: rgb(var(--surface-raised));
    border-bottom: 1px solid rgb(var(--border));
  }

  .th {
    padding: 12px 16px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgb(var(--text-tertiary));
  }

  .th-sortable { cursor: pointer; user-select: none; }
  .th-sortable:hover { color: rgb(var(--text-primary)); }

  .tr {
    border-bottom: 1px solid rgb(var(--border-subtle));
    transition: background 100ms;
  }
  .tr:hover { background: rgb(var(--surface)); }
  .tr-striped { background: rgb(var(--surface)); }

  .td {
    padding: 12px 16px;
    color: rgb(var(--text-primary));
  }
</style>`,
  },
  swift: {
    filename: "SitkaTable.swift",
    code: `import SwiftUI

struct SitkaTableColumn<RowValue: Identifiable> {
    let title: String
    let keyPath: KeyPath<RowValue, String>
}

struct SitkaTable<RowValue: Identifiable>: View {
    let columns: [SitkaTableColumn<RowValue>]
    let rows: [RowValue]
    var striped: Bool = false

    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack {
                ForEach(columns.indices, id: \\.self) { i in
                    Text(columns[i].title)
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundColor(Color(UIColor.tertiaryLabel))
                        .textCase(.uppercase)
                        .tracking(0.5)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .background(Color(UIColor.secondarySystemBackground))

            Divider()

            // Body
            ForEach(Array(rows.enumerated()), id: \\.element.id) { idx, row in
                HStack {
                    ForEach(columns.indices, id: \\.self) { i in
                        Text(row[keyPath: columns[i].keyPath])
                            .font(.system(size: 13))
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
                .background(
                    striped && idx % 2 == 1
                        ? Color(UIColor.secondarySystemBackground)
                        : Color.clear
                )

                if idx < rows.count - 1 { Divider().opacity(0.5) }
            }
        }
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .stroke(Color(UIColor.separator), lineWidth: 1)
        )
    }
}`,
  },
  macos: {
    filename: "SitkaTable+macOS.swift",
    code: `import SwiftUI

// On macOS 13+, use the native SwiftUI Table view — it provides
// sortable columns, multi-selection, and proper VoiceOver support for free.

struct Member: Identifiable {
    let id = UUID()
    var name: String
    var role: String
    var status: String
    var joined: String
}

struct MemberTable: View {
    @State private var members = [
        Member(name: "Jamieson Rothwell", role: "Admin",    status: "Active",   joined: "Jan 2023"),
        Member(name: "Sam Park",          role: "Editor",   status: "Active",   joined: "Mar 2023"),
        Member(name: "Lena Müller",       role: "Viewer",   status: "Inactive", joined: "Jul 2023"),
        Member(name: "Dev Bot",           role: "API User", status: "Active",   joined: "Sep 2023"),
    ]
    @State private var sortOrder = [KeyPathComparator(\\Member.name)]
    @State private var selection: Set<Member.ID> = []

    var body: some View {
        Table(members, selection: $selection, sortOrder: $sortOrder) {
            TableColumn("Name", value: \\.name) { member in
                Text(member.name).fontWeight(.medium)
            }
            TableColumn("Role",   value: \\.role)
            TableColumn("Status", value: \\.status) { member in
                Text(member.status)
                    .foregroundColor(member.status == "Active" ? .green : .secondary)
            }
            TableColumn("Joined", value: \\.joined)
        }
        .onChange(of: sortOrder) { _, newOrder in
            members.sort(using: newOrder)
        }
    }
}

// For simpler read-only tables without sorting, a List + custom row works well:
struct SitkaReadOnlyTable<RowValue: Identifiable>: View {
    struct Column {
        let title: String
        let keyPath: KeyPath<RowValue, String>
    }

    let columns: [Column]
    let rows: [RowValue]
    var striped: Bool = false

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                ForEach(columns.indices, id: \\.self) { i in
                    Text(columns[i].title)
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundColor(Color(.tertiaryLabelColor))
                        .textCase(.uppercase)
                        .tracking(0.5)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(Color(NSColor.controlBackgroundColor))

            Divider()

            ForEach(Array(rows.enumerated()), id: \\.element.id) { idx, row in
                HStack {
                    ForEach(columns.indices, id: \\.self) { i in
                        Text(row[keyPath: columns[i].keyPath])
                            .font(.system(size: 13))
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(
                    striped && idx % 2 == 1
                        ? Color(NSColor.alternatingContentBackgroundColors.last ?? .clear)
                        : Color.clear
                )

                if idx < rows.count - 1 { Divider().opacity(0.4) }
            }
        }
        .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 8, style: .continuous)
                .stroke(Color(NSColor.separatorColor), lineWidth: 1)
        )
    }
}

#Preview {
    MemberTable()
        .frame(width: 600, height: 200)
        .padding()
}`,
  },
};

export default function TablePage() {
  return (
    <div>
      <PageHeader
        title="Table"
        description="Structured data display with sortable column headers, striped rows, three density settings, and optional column borders. Composed from semantic sub-components."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <SortableTableDemo />
        </ComponentPreview>
      </section>

      {/* Density */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Density</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Three density modes adjust vertical padding without changing font size.{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">compact</code> is
          ideal for data-dense dashboards;{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">comfortable</code>{" "}
          gives breathing room for editorial content.
        </p>
        <div className="space-y-4">
          {(["compact", "default", "comfortable"] as const).map((d) => (
            <div key={d}>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-2">{d}</p>
              <Table density={d}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Jamieson Rothwell", role: "Admin", status: "Active" },
                    { name: "Sam Park", role: "Developer", status: "Away" },
                  ].map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell className="text-[rgb(var(--text-secondary))]">{row.role}</TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </section>

      {/* Striped */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Striped</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          The <code className="font-mono text-[13px] text-[rgb(var(--accent))]">striped</code> prop
          alternates row backgrounds using a CSS child-selector applied via a{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">data-striped</code>{" "}
          attribute on the table root.
        </p>
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHead>Pipeline</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { pipeline: "Production deploy", branch: "main",    status: "success" as const, dur: "2m 14s" },
              { pipeline: "PR preview",        branch: "feat/nav", status: "warning" as const, dur: "1m 42s" },
              { pipeline: "Lint + typecheck",  branch: "main",    status: "success" as const, dur: "0m 38s" },
              { pipeline: "E2E tests",         branch: "main",    status: "danger"  as const, dur: "8m 03s" },
            ].map((row) => (
              <TableRow key={row.pipeline}>
                <TableCell className="font-medium">{row.pipeline}</TableCell>
                <TableCell><code className="font-mono text-[12px] text-[rgb(var(--text-secondary))]">{row.branch}</code></TableCell>
                <TableCell>
                  <Badge variant={row.status} dot>
                    {row.status === "success" ? "Passing" : row.status === "warning" ? "Running" : "Failed"}
                  </Badge>
                </TableCell>
                <TableCell className="text-[rgb(var(--text-tertiary))] font-mono text-[12px]">{row.dur}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Bordered */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Bordered columns</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Add <code className="font-mono text-[13px] text-[rgb(var(--accent))]">bordered</code> to
          draw vertical dividers between columns — useful for comparison tables or spreadsheet-style layouts.
        </p>
        <Table bordered>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>Starter</TableHead>
              <TableHead>Pro</TableHead>
              <TableHead>Enterprise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["Projects",        "3",        "Unlimited", "Unlimited"],
              ["Storage",         "1 GB",     "50 GB",     "Custom"],
              ["Team members",    "1",        "10",        "Unlimited"],
              ["SSO",             "—",        "—",         "✓"],
              ["Priority support","—",        "✓",         "✓"],
            ].map(([feature, ...cols]) => (
              <TableRow key={feature}>
                <TableCell className="font-medium">{feature}</TableCell>
                {cols.map((v, i) => (
                  <TableCell key={i} className={v === "—" ? "text-[rgb(var(--text-tertiary))]" : "text-[rgb(var(--text-primary))]"}>
                    {v}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-medium text-[rgb(var(--text-secondary))]">Price</TableCell>
              <TableCell className="font-semibold">Free</TableCell>
              <TableCell className="font-semibold">$12/mo</TableCell>
              <TableCell className="font-semibold">Custom</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Table is a pure server component. Variants are driven by{" "}
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">data-*</code> attributes on the
          root <code className="font-mono text-[13px] text-[rgb(var(--accent))]">&lt;table&gt;</code>{" "}
          so that Tailwind CSS child selectors (
          <code className="font-mono text-[13px] text-[rgb(var(--accent))]">[table[data-striped]_&:nth-child(even)]</code>
          ) apply without passing props through every sub-component.
        </p>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Table props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">TableHead props</h2>
        <PropsTable props={HEAD_PROPS} />
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Component", "Element", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Table",        "<table>",   "Root. Accepts striped, density, bordered"],
                ["TableHeader",  "<thead>",   "Column header section"],
                ["TableBody",    "<tbody>",   "Row container with row dividers"],
                ["TableFooter",  "<tfoot>",   "Optional summary/totals row"],
                ["TableRow",     "<tr>",      "Row. Accepts selected for highlighted state"],
                ["TableHead",    "<th>",      "Column header cell. Accepts sortable, sortDirection, onSort"],
                ["TableCell",    "<td>",      "Data cell"],
                ["TableCaption", "<caption>", "Optional accessible description of the table"],
              ].map(([comp, el, notes], i) => (
                <tr key={comp} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--accent))]">{comp}</code></td>
                  <td className="px-4 py-3"><code className="font-mono text-[11px] text-[rgb(var(--text-secondary))]">{el}</code></td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Mobile</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">
          Data tables are one of the hardest components to use on mobile. The two main strategies are horizontal scrolling and a card-stack layout — choose based on the data density.
        </p>
        <ComponentPreview className="mb-6">
          <TableMobileDemo />
        </ComponentPreview>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Scenario", "Guidance"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { scenario: "Horizontal scroll", guidance: "Wrap the table in overflow-x: auto. Add a subtle horizontal scroll indicator (fade gradient on the right edge) to hint there is more content off-screen." },
                { scenario: "Sticky first column", guidance: "When scrolling horizontally, make the first column sticky (position: sticky; left: 0; z-index: 1; background: ...) so the row label stays visible." },
                { scenario: "Card-stack layout", guidance: "For fewer than 6 columns, transform rows into cards on mobile. Each card shows the column header as a label above the cell value. Hide the <thead> in this mode." },
                { scenario: "Column priority", guidance: "On narrow screens, hide lower-priority columns with hidden md:table-cell. Show the most important 2–3 columns by default." },
                { scenario: "Row tap targets", guidance: "Make full rows tappable on mobile by adding an onClick and visual hover/active state. Cell-level tapping is too small to be reliable on touch." },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.scenario}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.guidance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Use <TableCaption> to describe the table for screen readers — it is the first thing announced when focus enters the table.",
            "Sortable TableHead sets aria-sort=\"ascending\" / \"descending\" / \"none\" so screen readers announce the current sort state.",
            "Column headers (<th>) have implicit scope=\"col\" — assistive technology uses this to associate cells with headers.",
            "Row headers can be created by passing scope=\"row\" to a TableCell — useful for the first column of comparison tables.",
            "Never use a table for layout. Use CSS grid or flexbox instead.",
            "Horizontal overflow is handled by the wrapping div — avoid fixed-width columns that would clip content on small screens.",
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
