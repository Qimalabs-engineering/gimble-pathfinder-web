import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";

import {
  DataTable,
  StatusBadge,
  TablePagination,
  type Column,
} from "@/components/admin/data-table";
import {
  listContactSubmissions,
  updateContactSubmission,
} from "@/lib/api/console/site.functions";
import type { ContactStatus, ContactSubmission } from "@/integrations/gimble/types";

/**
 * The contact inbox.
 *
 * Filters live in the URL rather than component state, so a filtered view can
 * be bookmarked or shared, and the browser back button steps through filter
 * changes the way a reader expects.
 */
const STATUSES: ContactStatus[] = ["new", "read", "replied", "spam", "archived"];

const searchSchema = z.object({
  page: z.number().int().min(1).optional().catch(1),
  q: z.string().max(200).optional().catch(undefined),
  status: z.enum(["new", "read", "replied", "spam", "archived"]).optional().catch(undefined),
});

export const Route = createFileRoute("/_authenticated/admin/messages")({
  validateSearch: searchSchema,
  component: MessagesPage,
});

function MessagesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const queryClient = useQueryClient();

  const fetchList = useServerFn(listContactSubmissions);
  const update = useServerFn(updateContactSubmission);

  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  const page = search.page ?? 1;

  const query = useQuery({
    queryKey: ["admin", "messages", search],
    queryFn: () =>
      fetchList({ data: { page, q: search.q, status: search.status, limit: 25 } }),
  });

  const mutation = useMutation({
    mutationFn: (input: { hashId: string; status: ContactStatus }) =>
      update({ data: input }),
    onSuccess: (updated) => {
      // Refetch rather than patching the cache: `handled_by` and `handled_at`
      // are set server-side and are not in the request.
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stat"] });
      setSelected(updated);
    },
  });

  function setSearch(next: Partial<typeof search>) {
    // Any filter change returns to page 1 — staying on page 4 of a new,
    // shorter result set shows an empty table.
    navigate({ search: (prev) => ({ ...prev, ...next, page: 1 }) });
  }

  const columns: Array<Column<ContactSubmission>> = [
    {
      key: "from",
      header: "From",
      render: (row) => (
        <div className="min-w-[160px]">
          <p className="font-medium text-foreground">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (row) => (
        <div className="max-w-md">
          <p className="font-medium text-foreground">{row.subject}</p>
          <p className="line-clamp-1 text-xs text-muted-foreground">{row.message}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "received",
      header: "Received",
      render: (row) => (
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {formatDate(row.created_at)}
        </span>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6">
        <h1 className="font-serif text-3xl font-semibold text-primary">Messages</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enquiries from the contact form on gimblefoundation.org.
        </p>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="search"
          defaultValue={search.q ?? ""}
          placeholder="Search name, email, subject…"
          onChange={(e) => {
            const value = e.target.value;
            // Debounced so typing does not fire a request per keystroke.
            window.clearTimeout((window as any).__msgSearchTimer);
            (window as any).__msgSearchTimer = window.setTimeout(
              () => setSearch({ q: value || undefined }),
              350
            );
          }}
          className="w-full max-w-xs rounded-full border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
        />
        <div className="flex flex-wrap gap-1">
          <FilterChip
            active={!search.status}
            onClick={() => setSearch({ status: undefined })}
          >
            All
          </FilterChip>
          {STATUSES.map((status) => (
            <FilterChip
              key={status}
              active={search.status === status}
              onClick={() => setSearch({ status })}
            >
              {status}
            </FilterChip>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={query.data?.data ?? []}
        rowKey={(row) => row.hash_id}
        isLoading={query.isPending}
        onRowClick={setSelected}
        empty={
          search.q || search.status
            ? "No messages match these filters."
            : "No messages yet."
        }
      />

      <TablePagination
        page={page}
        totalPages={query.data?.meta.total_pages ?? 1}
        total={query.data?.meta.total ?? 0}
        onPageChange={(next) => navigate({ search: (prev) => ({ ...prev, page: next }) })}
      />

      {selected && (
        <MessageDetail
          message={selected}
          onClose={() => setSelected(null)}
          onStatusChange={(status) =>
            mutation.mutate({ hashId: selected.hash_id, status })
          }
          isSaving={mutation.isPending}
        />
      )}
    </div>
  );
}

function MessageDetail({
  message,
  onClose,
  onStatusChange,
  isSaving,
}: {
  message: ContactSubmission;
  onClose: () => void;
  onStatusChange: (status: ContactStatus) => void;
  isSaving: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="h-full w-full max-w-lg overflow-y-auto bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Message from ${message.name}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              {message.subject}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {message.name} · {message.email}
            </p>
            {message.organization && (
              <p className="text-sm text-muted-foreground">{message.organization}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border px-3 py-1 text-xs hover:bg-muted"
          >
            Close
          </button>
        </div>

        <p className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
          {message.message}
        </p>

        <div className="mt-8 border-t border-border pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Status
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {STATUSES.map((status) => (
              <FilterChip
                key={status}
                active={message.status === status}
                onClick={() => onStatusChange(status)}
                disabled={isSaving}
              >
                {status}
              </FilterChip>
            ))}
          </div>

          <dl className="mt-6 space-y-1 text-xs text-muted-foreground">
            <div className="flex gap-2">
              <dt>Received</dt>
              <dd className="text-foreground">{formatDate(message.created_at)}</dd>
            </div>
            {message.handled_by && (
              <div className="flex gap-2">
                <dt>Handled by</dt>
                <dd className="text-foreground">{message.handled_by.email}</dd>
              </div>
            )}
          </dl>

          <a
            href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Reply by email
          </a>
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  disabled,
  children,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border px-3 py-1.5 text-xs capitalize transition disabled:opacity-50 ${
        active
          ? "border-primary bg-primary/10 font-medium text-primary"
          : "border-border text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
