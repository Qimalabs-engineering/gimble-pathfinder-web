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
import { getMemberStats, listMembers } from "@/lib/api/console/people.functions";
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
  is_active: z.boolean().optional().catch(undefined),
});

export const Route = createFileRoute("/_authenticated/admin/members/")({
  validateSearch: searchSchema,
  component: MembersPage,
});

function MembersPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const fetchMembers = useServerFn(listMembers);
  const fetchStats = useServerFn(getMemberStats);

  const page = search.page ?? 1;

  const query = useQuery({
    queryKey: ["admin", "members", search],
    queryFn: () =>
      fetchMembers({ data: { page, q: search.q, is_active: search.is_active, limit: 25 } }),
  });

  // Headline counts are independent of the current filter — they describe the
  // whole member base, which is what someone opening this page wants first.
  const stats = useQuery({
    queryKey: ["admin", "member-stats"],
    queryFn: () => fetchStats({}),
  });

  function setSearch(next: Partial<typeof search>) {
    navigate({ search: (prev) => ({ ...prev, ...next, page: 1 }) });
  }

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
      key: "registered",
      header: "Registered",
      render: (row) => (
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {new Date(row.created_at).toLocaleDateString(undefined, { dateStyle: "medium" })}
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

      <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Total members" value={stats.data?.total} loading={stats.isPending} />
        <StatTile label="Active" value={stats.data?.active} loading={stats.isPending} />
        <StatTile
          label="New (30 days)"
          value={stats.data?.new_30d}
          loading={stats.isPending}
        />
        <StatTile
          label="Check-in on"
          value={stats.data?.checkin_enabled}
          loading={stats.isPending}
        />
      </section>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="search"
          defaultValue={search.q ?? ""}
          placeholder="Search name or email…"
        onChange={(e) => {
          const value = e.target.value;
            window.clearTimeout((window as any).__memberSearchTimer);
            (window as any).__memberSearchTimer = window.setTimeout(
              () => setSearch({ q: value || undefined }),
              350
            );
          }}
          className="w-full max-w-xs rounded-full border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
        />
        <div className="flex flex-wrap gap-1">
          <Chip
            active={search.is_active === undefined}
            onClick={() => setSearch({ is_active: undefined })}
          >
            All
          </Chip>
          <Chip active={search.is_active === true} onClick={() => setSearch({ is_active: true })}>
            Active
          </Chip>
          <Chip
            active={search.is_active === false}
            onClick={() => setSearch({ is_active: false })}
          >
            Inactive
          </Chip>
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={query.data?.data ?? []}
        rowKey={(row) => row.hash_id}
        isLoading={query.isPending}
        onRowClick={(row) =>
          navigate({ to: "/admin/members/$hashId", params: { hashId: row.hash_id } })
        }
        empty={
          search.q || search.is_active !== undefined
            ? "No members match these filters."
            : "No members yet."
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

function StatTile({
  label,
  value,
  loading,
}: {
  label: string;
  value: number | undefined;
  loading: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-serif text-2xl font-semibold text-primary">
        {loading ? <span className="text-muted-foreground">—</span> : (value ?? 0)}
      </p>
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
      className={`rounded-full border px-3 py-1.5 text-xs transition ${
        active
          ? "border-primary bg-primary/10 font-medium text-primary"
          : "border-border text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
