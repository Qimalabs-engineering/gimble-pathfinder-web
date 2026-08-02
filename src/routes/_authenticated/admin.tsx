import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, Mail, Users } from "lucide-react";

import { getAdminOverview } from "@/lib/api/admin.functions";
import { supabase } from "@/integrations/supabase/client";
import { Section, SectionHeading } from "@/components/section";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Gimble Foundation" },
      { name: "description", content: "Internal dashboard for Gimble Foundation submissions." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
  errorComponent: ({ error }) => (
    <Section className="!pt-24">
      <p role="alert" className="text-destructive">
        {error.message === "Forbidden"
          ? "This account doesn't have admin access."
          : error.message}
      </p>
    </Section>
  ),
});

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchOverview = useServerFn(getAdminOverview);

  const { data, isPending, error } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: () => fetchOverview(),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <Section className="!pt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          as="h1"
          eyebrow="Admin"
          title="Submissions dashboard"
          description="Messages and subscribers collected from the Gimble Foundation website."
        />
        <button
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>

      {isPending && <p className="mt-10 text-foreground/60">Loading submissions…</p>}
      {error && (
        <p role="alert" className="mt-10 text-destructive">
          {error.message === "Forbidden"
            ? "This account doesn't have admin access."
            : "Couldn't load submissions. Please refresh."}
        </p>
      )}

      {data && (
        <div className="mt-10 space-y-14">
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard icon={Mail} label="Contact messages" value={data.messages.length} />
            <StatCard icon={Users} label="Subscribers" value={data.subscribers.length} />
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-primary">Contact messages</h2>
            {data.messages.length === 0 ? (
              <p className="mt-3 text-foreground/60">No messages yet.</p>
            ) : (
              <ul className="mt-6 space-y-4">
                {data.messages.map((m: any) => (
                  <li key={m.id} className="rounded-3xl border border-border bg-card p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-semibold text-primary">
                        {m.name}{" "}
                        <span className="font-normal text-foreground/60">&lt;{m.email}&gt;</span>
                      </p>
                      <p className="text-xs text-foreground/50">{formatDate(m.created_at)}</p>
                    </div>
                    <p className="mt-1 text-sm text-foreground/70">
                      {m.subject}
                      {m.organization ? ` · ${m.organization}` : ""}
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
                      {m.message}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-primary">Subscribers</h2>
            {data.subscribers.length === 0 ? (
              <p className="mt-3 text-foreground/60">No subscribers yet.</p>
            ) : (
              <div className="mt-6 overflow-x-auto rounded-3xl border border-border bg-card">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border text-xs uppercase tracking-wide text-foreground/60">
                    <tr>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Source</th>
                      <th className="px-6 py-4">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.subscribers.map((s: any) => (
                      <tr key={s.id} className="border-b border-border/60 last:border-0">
                        <td className="px-6 py-4 text-foreground/80">{s.email}</td>
                        <td className="px-6 py-4 text-foreground/60">{s.source}</td>
                        <td className="px-6 py-4 text-foreground/60">{formatDate(s.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary/30 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 font-display text-3xl font-semibold text-primary">{value}</p>
      <p className="text-sm text-foreground/60">{label}</p>
    </div>
  );
}
