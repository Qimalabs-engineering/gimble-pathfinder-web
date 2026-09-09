import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  DataTable,
  StatusBadge,
  TablePagination,
  type Column,
} from "@/components/admin/data-table";
import { listMembers } from "@/lib/api/console/people.functions";
import type { MemberSummary } from "@/integrations/gimble/types";

/**
 * App members.
 *
 * Every view of this page writes an audit row on the backend naming who looked
 * and with what filters. That is deliberate: these are identifiable records of
 * people using a mental health app, and the log is what makes staff access to
 * them accountable rather than merely possible.
 */
const searchSchema = z.object({
  page: z.number().int().min(1).optional().catch(1),
  q: z.string().max(200).optional().catch(undefined),
});

export const Route = createFileRoute("/_authenticated/admin/members")({
  validateSearch: searchSchema,
  component: MembersPage,
});

function MembersPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const fetchMembers = useServerFn(listMembers);

  const page = search.page ?? 1;

  const query = useQuery({
    queryKey: ["admin", "members", search],
    queryFn: () => fetchMembers({ data: { page, q: search.q, limit: 25 } }),
  });

  const columns: Array<Column<MemberSummary>> = [
    {
      key: "name",
      header: "Member",
      render: (row) => (
        <div className="min-w-[160px]">
          <p className="font-medium text-foreground">
            {[row.first_name, row.last_name].filter(Boolean).join(" ") || "—"}
          </p>
          <p className="text-xs text-muted-foreground">{row.email ?? "No email"}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.is_active ? "active" : "inactive"} />,
    },
    {
      key: "reminders",
      header: "Reminders",
      render: (row) => (
        <span className="text-xs text-muted-foreground">
          {row.push_notifications === false
            ? "Push off"
            : row.morning_checkin_enabled
              ? "Daily check-in on"
              : "Check-in off"}
        </span>
      ),
    },
    {
      key: "timezone",
      header: "Timezone",
      render: (row) => (
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {row.timezone ?? "Not reported"}
        </span>
      ),
    },
    {
      key: "activity",
      header: "Last active",
      render: (row) => (
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {row.last_activity_at
            ? new Date(row.last_activity_at).toLocaleDateString(undefined, {
                dateStyle: "medium",
              })
            : "Never"}
        </span>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6">
        <h1 className="font-serif text-3xl font-semibold text-primary">Members</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          People using the Gimble app. Access to these records is logged.
        </p>
      </header>

      <input
        type="search"
        defaultValue={search.q ?? ""}
        placeholder="Search name or email…"
        onChange={(e) => {
          const value = e.target.value;
          window.clearTimeout((window as any).__memberSearchTimer);
          (window as any).__memberSearchTimer = window.setTimeout(
            () =>
              navigate({
                search: (prev) => ({ ...prev, q: value || undefined, page: 1 }),
              }),
            350
          );
        }}
        className="mb-4 w-full max-w-xs rounded-full border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
      />

      <DataTable
        columns={columns}
        rows={query.data?.data ?? []}
        rowKey={(row) => row.hash_id}
        isLoading={query.isPending}
        empty={search.q ? "No members match that search." : "No members yet."}
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
