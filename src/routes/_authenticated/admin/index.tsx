import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Inbox, Mail } from "lucide-react";

import {
  listContactSubmissions,
  listSubscribers,
} from "@/lib/api/console/site.functions";

/**
 * Console dashboard.
 *
 * Counts come from the list endpoints' `meta.total` with `limit: 1` — a real
 * /overview endpoint that aggregates in one query is planned, but this needs no
 * new backend surface and the numbers are already correct.
 */
export const Route = createFileRoute("/_authenticated/admin/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { session } = Route.useRouteContext();
  const fetchMessages = useServerFn(listContactSubmissions);
  const fetchSubscribers = useServerFn(listSubscribers);

  const unread = useQuery({
    queryKey: ["admin", "stat", "unread-messages"],
    queryFn: () => fetchMessages({ data: { status: "new", limit: 1 } }),
  });

  const subscribers = useQuery({
    queryKey: ["admin", "stat", "subscribers"],
    queryFn: () => fetchSubscribers({ data: { status: "subscribed", limit: 1 } }),
  });

  return (
    <div className="mx-auto max-w-5xl">
      <header>
        <h1 className="font-serif text-3xl font-semibold text-primary">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Signed in as {session.user.email}
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <StatCard
          to="/admin/messages"
          icon={Inbox}
          label="Unread messages"
          value={unread.data?.meta.total}
          isLoading={unread.isPending}
        />
        <StatCard
          to="/admin/subscribers"
          icon={Mail}
          label="Active subscribers"
          value={subscribers.data?.meta.total}
          isLoading={subscribers.isPending}
        />
      </div>
    </div>
  );
}

function StatCard({
  to,
  icon: Icon,
  label,
  value,
  isLoading,
}: {
  to: string;
  icon: typeof Inbox;
  label: string;
  value: number | undefined;
  isLoading: boolean;
}) {
  return (
    <Link
      to={to}
      className="rounded-3xl border border-border bg-card p-6 transition hover:border-primary/40"
    >
      <div className="flex items-center gap-3 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-[0.14em]">{label}</span>
      </div>
      <p className="mt-4 font-serif text-4xl font-semibold text-primary">
        {isLoading ? <span className="text-muted-foreground">—</span> : (value ?? 0)}
      </p>
    </Link>
  );
}
