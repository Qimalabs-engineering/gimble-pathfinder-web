import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  DataTable,
  StatusBadge,
  TablePagination,
  type Column,
} from "@/components/admin/data-table";
import {
  exportSubscribersCsv,
  listSubscribers,
  updateSubscriber,
} from "@/lib/api/console/site.functions";
import type { Subscriber, SubscriberStatus } from "@/integrations/gimble/types";

const searchSchema = z.object({
  page: z.number().int().min(1).optional().catch(1),
  q: z.string().max(200).optional().catch(undefined),
  status: z
    .enum(["subscribed", "unsubscribed", "bounced", "complained"])
    .optional()
    .catch(undefined),
  source: z
    .enum(["newsletter", "community", "contact_form", "import"])
    .optional()
    .catch(undefined),
});

export const Route = createFileRoute("/_authenticated/admin/subscribers")({
  validateSearch: searchSchema,
  component: SubscribersPage,
});

function SubscribersPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const queryClient = useQueryClient();

  const fetchList = useServerFn(listSubscribers);
  const update = useServerFn(updateSubscriber);
  const exportCsv = useServerFn(exportSubscribersCsv);

  const page = search.page ?? 1;

  const query = useQuery({
    queryKey: ["admin", "subscribers", search],
    queryFn: () =>
      fetchList({
        data: { page, q: search.q, status: search.status, source: search.source, limit: 25 },
      }),
  });

  const mutation = useMutation({
    mutationFn: (input: { hashId: string; status: SubscriberStatus }) =>
      update({ data: input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "subscribers"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stat"] });
    },
  });

  const exportMutation = useMutation({
    mutationFn: () => exportCsv({}),
    onSuccess: ({ csv }) => {
      // The CSV arrives as text and is turned into a download here, because the
      // backend is a different origin the browser holds no session for — a
      // plain link to it would 401.
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `gimble-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    },
  });

  function setSearch(next: Partial<typeof search>) {
    navigate({ search: (prev) => ({ ...prev, ...next, page: 1 }) });
  }

  const columns: Array<Column<Subscriber>> = [
    {
      key: "email",
      header: "Email",
      render: (row) => <span className="font-medium text-foreground">{row.email}</span>,
    },
    {
      key: "source",
      header: "Source",
      render: (row) => (
        <span className="text-xs capitalize text-muted-foreground">
          {row.source.replace(/_/g, " ")}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "joined",
      header: "Joined",
      render: (row) => (
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {new Date(row.created_at).toLocaleDateString(undefined, { dateStyle: "medium" })}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (row) =>
        row.status === "subscribed" ? (
          <button
            type="button"
            disabled={mutation.isPending}
            onClick={() =>
              mutation.mutate({ hashId: row.hash_id, status: "unsubscribed" })
            }
            className="whitespace-nowrap text-xs text-muted-foreground underline hover:text-destructive disabled:opacity-50"
          >
            Unsubscribe
          </button>
        ) : null,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-primary">Subscribers</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            People who signed up for updates from the website.
          </p>
        </div>
        <button
          type="button"
          onClick={() => exportMutation.mutate()}
          disabled={exportMutation.isPending}
          className="rounded-full border border-border px-4 py-2 text-xs font-medium transition hover:bg-muted disabled:opacity-50"
        >
          {exportMutation.isPending ? "Preparing…" : "Export CSV"}
        </button>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="search"
          defaultValue={search.q ?? ""}
          placeholder="Search email…"
          onChange={(e) => {
            const value = e.target.value;
            window.clearTimeout((window as any).__subSearchTimer);
            (window as any).__subSearchTimer = window.setTimeout(
              () => setSearch({ q: value || undefined }),
              350
            );
          }}
          className="w-full max-w-xs rounded-full border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
        />
        <div className="flex flex-wrap gap-1">
          <Chip active={!search.status} onClick={() => setSearch({ status: undefined })}>
            All
          </Chip>
          {(["subscribed", "unsubscribed", "bounced"] as const).map((status) => (
            <Chip
              key={status}
              active={search.status === status}
              onClick={() => setSearch({ status })}
            >
              {status}
            </Chip>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={query.data?.data ?? []}
        rowKey={(row) => row.hash_id}
        isLoading={query.isPending}
        empty={
          search.q || search.status ? "No subscribers match these filters." : "No subscribers yet."
        }
      />

      <TablePagination
        page={page}
        totalPages={query.data?.meta.total_pages ?? 1}
        total={query.data?.meta.total ?? 0}
        onPageChange={(next) => navigate({ search: (prev) => ({ ...prev, page: next }) })}
      />
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs capitalize transition ${
        active
          ? "border-primary bg-primary/10 font-medium text-primary"
          : "border-border text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
