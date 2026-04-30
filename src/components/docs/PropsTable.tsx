import { cn } from "@/lib/cn";

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: PropRow[];
  className?: string;
}

export function PropsTable({ props, className }: PropsTableProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-[rgb(var(--border))]", className)}>
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]">
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-semibold text-[rgb(var(--text-tertiary))] text-[11px] uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((row, i) => (
            <tr
              key={row.name}
              className={cn(
                "border-b border-[rgb(var(--border-subtle))] last:border-0",
                i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"
              )}
            >
              <td className="px-4 py-3">
                <code className="text-[rgb(var(--accent))] font-mono text-[12px]">
                  {row.name}
                  {row.required && (
                    <span className="text-red-400 ml-0.5">*</span>
                  )}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="text-[rgb(var(--text-secondary))] font-mono text-[11px] bg-[rgb(var(--surface-raised))] px-1.5 py-0.5 rounded">
                  {row.type}
                </code>
              </td>
              <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">
                {row.default ? (
                  <code className="font-mono text-[11px]">{row.default}</code>
                ) : (
                  <span className="opacity-40">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-[rgb(var(--text-secondary))] leading-relaxed">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
