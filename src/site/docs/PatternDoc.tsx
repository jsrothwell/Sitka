import type { ReactNode } from "react";

/**
 * Shared section primitives for pattern pages, matching the markup the
 * hand-written pattern pages (e.g. journey-timeline) already use, so new
 * pages stay visually identical without copying ~100 lines of table markup.
 */

export function PreviewSection({ children, title = "Preview" }: { children: ReactNode; title?: string }) {
  return (
    <section className="mb-12">
      <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
        {title}
      </h2>
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] p-6">
        {children}
      </div>
    </section>
  );
}

export function DocSection({ title, intro, children }: { title: string; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">{title}</h2>
      {intro && <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5">{intro}</p>}
      {children}
    </section>
  );
}

export function DocTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="rounded-xl border border-[rgb(var(--border))] overflow-x-auto" tabIndex={0} role="region" aria-label="Table (scrolls sideways)">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[rgb(var(--border-subtle))] last:border-0 bg-[rgb(var(--surface))]">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={
                    j === 0
                      ? "px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap align-top"
                      : "px-4 py-3 text-[rgb(var(--text-secondary))] align-top"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export interface UsageItem {
  heading: string;
  body: string;
  good: boolean;
}

export function UsageGrid({ items }: { items: UsageItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map(({ heading, body, good }) => (
        <div
          key={heading}
          className={`rounded-xl border p-4 ${
            good
              ? "border-[rgb(var(--border))]"
              : "border-[rgb(var(--status-danger))]/30 bg-[rgb(var(--status-danger))]/5"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={good ? "text-[rgb(var(--status-success-text))]" : "text-[rgb(var(--status-danger-text))]"}>
              {good ? "✓" : "✗"}
            </span>
            <p className="text-[13px] font-semibold text-[rgb(var(--text-primary))]">{heading}</p>
          </div>
          <p className="text-[13px] text-[rgb(var(--text-secondary))]">{body}</p>
        </div>
      ))}
    </div>
  );
}

export function ArrowList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-[rgb(var(--accent-text))] mt-0.5 shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** "Source: App · File" provenance line, so every generalized pattern cites the production code it came from. */
export function SourceNote({ sources }: { sources: { app: string; file: string }[] }) {
  return (
    <p className="mb-10 -mt-4 text-[12px] text-[rgb(var(--text-tertiary))]">
      Generalized from{" "}
      {sources.map((s, i) => (
        <span key={s.file}>
          {i > 0 && (i === sources.length - 1 ? " and " : ", ")}
          {s.app} <code className="text-[11px]">{s.file}</code>
        </span>
      ))}
      .
    </p>
  );
}
