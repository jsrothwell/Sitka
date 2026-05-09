"use client";

import { useState, useMemo, useCallback } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";

export type ColumnAlign = "left" | "center" | "right";

export interface DataGridColumn<T> {
  key: keyof T & string;
  header: string;
  width?: string;
  align?: ColumnAlign;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataGridProps<T extends { id: string | number }> {
  columns: DataGridColumn<T>[];
  rows: T[];
  pageSize?: number;
  selectable?: boolean;
  className?: string;
  onSelectionChange?: (selectedIds: Set<string | number>) => void;
}

type SortDir = "asc" | "desc" | null;

function SortIcon({ dir }: { dir: SortDir }) {
  if (dir === "asc") return <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />;
  if (dir === "desc") return <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />;
  return <ChevronsUpDown className="h-3.5 w-3.5 opacity-30" aria-hidden="true" />;
}

export function DataGrid<T extends { id: string | number }>({
  columns,
  rows,
  pageSize = 10,
  selectable = false,
  className,
  onSelectionChange,
}: DataGridProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  const filterableCols = columns.filter((c) => c.filterable);

  const processed = useMemo(() => {
    let data = [...rows];

    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue;
      data = data.filter((row) =>
        String((row as Record<string, unknown>)[key] ?? "")
          .toLowerCase()
          .includes(value.toLowerCase()),
      );
    }

    if (sortKey && sortDir) {
      data.sort((a, b) => {
        const av = (a as Record<string, unknown>)[sortKey] ?? "";
        const bv = (b as Record<string, unknown>)[sortKey] ?? "";
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return data;
  }, [rows, filters, sortKey, sortDir]);

  const totalPages = Math.ceil(processed.length / pageSize);
  const pageRows = processed.slice(page * pageSize, (page + 1) * pageSize);

  function toggleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortKey(null);
      setSortDir(null);
    }
    setPage(0);
  }

  const toggleRow = useCallback(
    (id: string | number) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id); else next.add(id);
        onSelectionChange?.(next);
        return next;
      });
    },
    [onSelectionChange],
  );

  const allPageSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));
  const somePageSelected = pageRows.some((r) => selected.has(r.id));

  function toggleAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        pageRows.forEach((r) => next.delete(r.id));
      } else {
        pageRows.forEach((r) => next.add(r.id));
      }
      onSelectionChange?.(next);
      return next;
    });
  }

  const alignClass: Record<ColumnAlign, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {filterableCols.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filterableCols.map((col) => (
            <div key={col.key} className="relative flex items-center">
              <Search className="absolute left-2.5 h-3.5 w-3.5 text-[rgb(var(--text-tertiary))]" aria-hidden="true" />
              <input
                type="search"
                aria-label={`Filter by ${col.header}`}
                placeholder={`Filter ${col.header}…`}
                value={filters[col.key] ?? ""}
                onChange={(e) => {
                  setFilters((f) => ({ ...f, [col.key]: e.target.value }));
                  setPage(0);
                }}
                className="h-8 pl-8 pr-8 text-[13px] rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-tertiary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
              />
              {filters[col.key] && (
                <button
                  aria-label="Clear filter"
                  onClick={() => setFilters((f) => ({ ...f, [col.key]: "" }))}
                  className="absolute right-2 text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]" role="grid" aria-rowcount={processed.length}>
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {selectable && (
                  <th className="w-10 px-3 py-3">
                    <input
                      type="checkbox"
                      aria-label="Select all on this page"
                      checked={allPageSelected}
                      ref={(el) => { if (el) el.indeterminate = somePageSelected && !allPageSelected; }}
                      onChange={toggleAll}
                      className="accent-[rgb(var(--accent))]"
                    />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",
                      alignClass[col.align ?? "left"],
                      col.sortable && "cursor-pointer hover:text-[rgb(var(--text-primary))] select-none",
                    )}
                    style={col.width ? { width: col.width } : undefined}
                    aria-sort={
                      col.sortable && sortKey === col.key
                        ? sortDir === "asc" ? "ascending" : "descending"
                        : undefined
                    }
                    onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.header}
                      {col.sortable && (
                        <SortIcon dir={sortKey === col.key ? sortDir : null} />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="px-4 py-10 text-center text-[rgb(var(--text-tertiary))]"
                  >
                    No results
                  </td>
                </tr>
              ) : (
                pageRows.map((row) => (
                  <tr
                    key={row.id}
                    aria-selected={selectable ? selected.has(row.id) : undefined}
                    className={cn(
                      "border-b border-[rgb(var(--border-subtle))] last:border-0 transition-colors",
                      selected.has(row.id)
                        ? "bg-[rgb(var(--accent)/0.06)]"
                        : "bg-[rgb(var(--surface))] hover:bg-[rgb(var(--surface-raised))]",
                    )}
                  >
                    {selectable && (
                      <td className="w-10 px-3 py-3">
                        <input
                          type="checkbox"
                          aria-label={`Select row ${row.id}`}
                          checked={selected.has(row.id)}
                          onChange={() => toggleRow(row.id)}
                          className="accent-[rgb(var(--accent))]"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-4 py-3 text-[rgb(var(--text-primary))]",
                          alignClass[col.align ?? "left"],
                        )}
                      >
                        {col.render
                          ? col.render(row[col.key], row)
                          : String(row[col.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-[13px] text-[rgb(var(--text-secondary))]">
          <span>
            {processed.length} result{processed.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-2.5 py-1 rounded border border-[rgb(var(--border))] disabled:opacity-40 hover:bg-[rgb(var(--surface-raised))] transition-colors"
              aria-label="Previous page"
            >
              ‹
            </button>
            <span className="px-2">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-2.5 py-1 rounded border border-[rgb(var(--border))] disabled:opacity-40 hover:bg-[rgb(var(--surface-raised))] transition-colors"
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
