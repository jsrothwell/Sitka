"use client";

import { useState } from "react";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { Pagination } from "@/components/ui/Pagination";

const PROPS = [
  {
    name: "page",
    type: "number",
    required: true,
    description: "The currently active page (1-based).",
  },
  {
    name: "totalPages",
    type: "number",
    required: true,
    description: "Total number of pages.",
  },
  {
    name: "onPageChange",
    type: "(page: number) => void",
    required: true,
    description: "Called with the new page number when the user navigates.",
  },
  {
    name: "siblings",
    type: "number",
    default: "1",
    description: "Number of page buttons to show on each side of the current page. Increasing this reduces ellipsis usage.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional classes on the nav element.",
  },
];

const CODE = {
  react: {
    filename: "Pagination.tsx",
    code: `import { Pagination } from "@/components/ui/Pagination";
import { useState } from "react";

function ResultsList() {
  const [page, setPage] = useState(1);
  const TOTAL_PAGES = 12;

  return (
    <div>
      {/* ...results for page {page}... */}
      <Pagination
        page={page}
        totalPages={TOTAL_PAGES}
        onPageChange={setPage}
      />
    </div>
  );
}

// More siblings — fewer ellipses on wide screens
<Pagination page={5} totalPages={20} onPageChange={setPage} siblings={2} />`,
  },
  html: {
    filename: "pagination.html",
    code: `<nav aria-label="Pagination">
  <button aria-label="Go to previous page" disabled>‹</button>

  <button aria-label="Go to page 1">1</button>
  <button aria-label="Go to page 2" aria-current="page" class="active">2</button>
  <button aria-label="Go to page 3">3</button>
  <span aria-hidden="true">…</span>
  <button aria-label="Go to page 10">10</button>

  <button aria-label="Go to next page">›</button>
</nav>`,
  },
  swift: {
    filename: "PaginationView.swift",
    code: `import SwiftUI

struct PaginationView: View {
  @State private var page = 1
  let totalPages = 12

  var body: some View {
    HStack(spacing: 4) {
      Button { page = max(1, page - 1) } label: {
        Image(systemName: "chevron.left")
      }
      .disabled(page == 1)

      ForEach(visiblePages, id: \\.self) { p in
        if p == -1 {
          Text("…").foregroundStyle(.tertiary)
        } else {
          Button("\\(p)") { page = p }
            .foregroundStyle(p == page ? .white : .primary)
            .background(p == page ? Color.accentColor : .clear)
            .clipShape(RoundedRectangle(cornerRadius: 8))
        }
      }

      Button { page = min(totalPages, page + 1) } label: {
        Image(systemName: "chevron.right")
      }
      .disabled(page == totalPages)
    }
    .buttonStyle(.plain)
  }

  var visiblePages: [Int] {
    // Implement ellipsis logic here
    Array(1...totalPages)
  }
}`,
  },
};

function Demo() {
  const [page, setPage] = useState(5);
  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination page={page} totalPages={12} onPageChange={setPage} />
      <p className="text-[12px] text-[rgb(var(--text-tertiary))]">Page {page} of 12</p>
    </div>
  );
}

export default function PaginationPage() {
  return (
    <div>
      <PageHeader
        title="Pagination"
        description="Page navigation with an ellipsis algorithm that keeps the control compact regardless of page count. Always controlled — the consumer manages the current page."
      />

      {/* Preview */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Preview
        </h2>
        <ComponentPreview>
          <Demo />
        </ComponentPreview>
      </section>

      {/* Ellipsis algorithm */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Ellipsis algorithm
        </h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-4">
          The pagination always shows the first and last pages. Middle pages are shown based on the <code className="font-mono text-[11px] text-[rgb(var(--accent))]">siblings</code> prop. Ellipses appear when there are more than two pages between the visible range and the edges.
        </p>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Current page", "Total pages", "Siblings", "Rendered buttons"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { page: "1", total: "12", siblings: "1", result: "1 2 3 … 12" },
                { page: "5", total: "12", siblings: "1", result: "1 … 4 5 6 … 12" },
                { page: "11", total: "12", siblings: "1", result: "1 … 10 11 12" },
                { page: "5", total: "12", siblings: "2", result: "1 … 3 4 5 6 7 … 12" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.page}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.total}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.siblings}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Implementation
        </h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Props
        </h2>
        <PropsTable props={PROPS} />
      </section>

      {/* ARIA roles */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          ARIA roles
        </h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Element", "Role", "Key attributes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { el: "Container", role: "navigation", attrs: "aria-label='Pagination'" },
                { el: "Current page", role: "button (implicit)", attrs: "aria-current='page', aria-label='Page N'" },
                { el: "Page button", role: "button (implicit)", attrs: "aria-label='Go to page N'" },
                { el: "Prev / Next", role: "button (implicit)", attrs: "aria-label='Go to previous/next page', disabled at boundary" },
                { el: "Ellipsis", role: "(decorative)", attrs: "aria-hidden='true'" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.el}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))]">{row.role}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--text-secondary))]">{row.attrs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Keyboard */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Keyboard
        </h2>
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
                { key: "Tab", action: "Move focus forward between Prev, page buttons, and Next" },
                { key: "Shift+Tab", action: "Move focus backward through the pagination buttons" },
                { key: "Enter / Space", action: "Navigate to the focused page or Prev/Next button's target" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[rgb(var(--accent))] whitespace-nowrap">{row.key}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">
          Accessibility
        </h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            'The container uses <nav aria-label="Pagination"> — it appears as a landmark for quick keyboard navigation.',
            "Each page button has an aria-label describing its action (\"Go to page 3\") rather than just the number.",
            "The active page uses aria-current=\"page\" — screen readers announce \"current\" for the selected page.",
            "Previous and next buttons use descriptive aria-label values and are disabled (with disabled attribute) when at the boundary.",
            "Ellipsis spans are aria-hidden — they are decorative and screen readers skip them.",
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
