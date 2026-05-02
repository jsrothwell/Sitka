import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export type TableDensity = "default" | "compact" | "comfortable";

// Table root
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  density?: TableDensity;
  bordered?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ striped, density = "default", bordered, className, children, ...props }, ref) => (
    <div className="w-full overflow-x-auto rounded-xl border border-[rgb(var(--border))]">
      <table
        ref={ref}
        data-striped={striped || undefined}
        data-density={density}
        data-bordered={bordered || undefined}
        className={cn("w-full text-[13px] border-collapse", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);
Table.displayName = "Table";

// TableHeader
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

// TableBody
export const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("divide-y divide-[rgb(var(--border-subtle))]", className)} {...props} />
));
TableBody.displayName = "TableBody";

// TableRow
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected, className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "transition-colors duration-100",
        "hover:bg-[rgb(var(--surface))]",
        selected && "bg-[rgb(var(--accent-subtle))]",
        // Striped — applied via parent data-striped
        "[table[data-striped]_&:nth-child(even)]:bg-[rgb(var(--surface))]",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

// TableHead (th)
export type SortDirection = "asc" | "desc" | false;

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ sortable, sortDirection, onSort, className, children, ...props }, ref) => (
    <th
      ref={ref}
      onClick={sortable ? onSort : undefined}
      className={cn(
        "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]",
        // Density overrides
        "[table[data-density=compact]_&]:py-2",
        "[table[data-density=comfortable]_&]:py-4",
        sortable && "cursor-pointer hover:text-[rgb(var(--text-primary))] select-none",
        // Bordered
        "[table[data-bordered]_&]:border-r [table[data-bordered]_&]:border-[rgb(var(--border))] [table[data-bordered]_&]:last:border-0",
        className
      )}
      aria-sort={
        sortDirection === "asc" ? "ascending" : sortDirection === "desc" ? "descending" : sortable ? "none" : undefined
      }
      {...props}
    >
      {sortable ? (
        <span className="inline-flex items-center gap-1.5">
          {children}
          <span className="flex flex-col gap-[1px] opacity-40" aria-hidden="true">
            <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor" className={cn(sortDirection === "asc" && "opacity-100 text-[rgb(var(--accent))]")}>
              <path d="M4 0L8 5H0L4 0Z" />
            </svg>
            <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor" className={cn(sortDirection === "desc" && "opacity-100 text-[rgb(var(--accent))]")}>
              <path d="M4 5L0 0H8L4 5Z" />
            </svg>
          </span>
        </span>
      ) : (
        children
      )}
    </th>
  )
);
TableHead.displayName = "TableHead";

// TableCell (td)
export const TableCell = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "px-4 py-3 text-[rgb(var(--text-primary))] align-middle",
        "[table[data-density=compact]_&]:py-1.5",
        "[table[data-density=comfortable]_&]:py-5",
        "[table[data-bordered]_&]:border-r [table[data-bordered]_&]:border-[rgb(var(--border))] [table[data-bordered]_&]:last:border-0",
        className
      )}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

// TableCaption
export const TableCaption = forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn("mt-3 text-[12px] text-[rgb(var(--text-tertiary))] text-left px-1", className)}
      {...props}
    />
  )
);
TableCaption.displayName = "TableCaption";

// TableFooter
export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))]", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";
