import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The console's one table.
 *
 * Columns are a plain array rather than a table library: sorting, filtering and
 * pagination all happen on the server, so there is no client-side table engine
 * to justify the dependency.
 */

export interface Column<T> {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Array<Column<T>>;
  rows: T[];
  rowKey: (row: T) => string;
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
  empty?: ReactNode;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  isLoading = false,
  onRowClick,
  empty = "Nothing here yet.",
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="space-y-2 rounded-2xl border border-border bg-card p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center text-sm text-muted-foreground">
        {empty}
      </div>
    );
  }

  return (
    // Wide tables scroll inside this container so the page body never scrolls
    // sideways on a phone.
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                "border-b border-border/60 last:border-0",
                onRowClick && "cursor-pointer transition hover:bg-muted/50"
              )}
            >
              {columns.map((column) => (
                <td key={column.key} className={cn("px-4 py-3 align-top", column.className)}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Server-driven pagination controls. */
export function TablePagination({
  page,
  totalPages,
  total,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  if (total === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-muted-foreground">
        Page {page} of {Math.max(totalPages, 1)} · {total} total
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-full border border-border px-4 py-1.5 text-xs transition hover:bg-muted disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-full border border-border px-4 py-1.5 text-xs transition hover:bg-muted disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

/** Small coloured label for a status column. */
export function StatusBadge({ status }: { status: string }) {
  const tone =
    {
      new: "bg-secondary/15 text-secondary-foreground border-secondary/30",
      read: "bg-muted text-muted-foreground border-border",
      replied: "bg-primary/10 text-primary border-primary/25",
      archived: "bg-muted text-muted-foreground border-border",
      spam: "bg-destructive/10 text-destructive border-destructive/25",
      subscribed: "bg-primary/10 text-primary border-primary/25",
      unsubscribed: "bg-muted text-muted-foreground border-border",
      bounced: "bg-destructive/10 text-destructive border-destructive/25",
      complained: "bg-destructive/10 text-destructive border-destructive/25",
    }[status] ?? "bg-muted text-muted-foreground border-border";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        tone
      )}
    >
      {status}
    </span>
  );
}
