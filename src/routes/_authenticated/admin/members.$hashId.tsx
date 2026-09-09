import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  Flame,
  Sparkles,
  Target,
} from "lucide-react";

import { StatusBadge } from "@/components/admin/data-table";
import { getMember } from "@/lib/api/console/people.functions";
import type { EngagementSummary, TimelineEntry } from "@/integrations/gimble/types";

/**
 * One member's record.
 *
 * The timeline is metadata only — that a journal entry exists and when, never a
 * word of what it says. Reading actual journal text is a separate, separately
 * permissioned action, because a page staff open routinely should not casually
 * display what someone wrote about their mental health.
 */
export const Route = createFileRoute("/_authenticated/admin/members/$hashId")({
  component: MemberDetailPage,
});

function MemberDetailPage() {
  const { hashId } = Route.useParams();
  const fetchMember = useServerFn(getMember);

  const query = useQuery({
    queryKey: ["admin", "member", hashId],
    queryFn: () => fetchMember({ data: { hashId } }),
  });

  if (query.isPending) {
    return <p className="text-sm text-muted-foreground">Loading member…</p>;
  }

  if (query.isError || !query.data) {
    return (
      <div className="mx-auto max-w-3xl">
        <BackLink />
        <p className="mt-6 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          That member could not be loaded.
        </p>
      </div>
    );
  }

  const { member, engagement, timeline } = query.data;
  const name = [member.first_name, member.last_name].filter(Boolean).join(" ") || "Unnamed member";

  return (
    <div className="mx-auto max-w-5xl">
      <BackLink />

      <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-primary">{name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{member.email ?? "No email on file"}</p>
        </div>
        <StatusBadge status={member.is_active ? "active" : "inactive"} />
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={ClipboardList} label="Assessments" value={engagement.assessments} />
        <Stat icon={BookOpen} label="Journal entries" value={engagement.journals} />
        <Stat icon={Sparkles} label="Points earned" value={engagement.points_total} />
        <Stat
          icon={Flame}
          label="Current streak"
          value={engagement.current_streak}
          hint={engagement.longest_streak ? `Best ${engagement.longest_streak}` : undefined}
        />
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <Panel title="Profile">
            <Field label="Registered" value={formatDate(member.created_at)} />
            <Field
              label="Last active"
              value={member.last_activity_at ? formatDate(member.last_activity_at) : "Never"}
            />
            <Field label="Timezone" value={member.timezone ?? "Not reported"} />
            <Field label="Phone" value={member.phone_number ?? "—"} />
            <Field label="Invitation" value={member.invitation_status ?? "—"} />
            <Field label="Coach" value={member.wellness_coach_slug ?? "None selected"} />
          </Panel>

          <Panel title="Notifications">
            <Field
              label="Daily check-in"
              value={
                member.morning_checkin_enabled
                  ? `On${member.morning_checkin_time ? ` at ${String(member.morning_checkin_time).slice(0, 5)}` : ""}`
                  : "Off"
              }
            />
            <Field
              label="Journey session"
              value={
                member.journey_session_enabled
                  ? `On${member.journey_session_time ? ` at ${String(member.journey_session_time).slice(0, 5)}` : ""}`
                  : "Off"
              }
            />
            <Field label="Push" value={member.push_notifications === false ? "Off" : "On"} />
            <Field label="Email" value={member.email_notifications === false ? "Off" : "On"} />
          </Panel>

          <Panel title="Latest scores">
            <Field label="PHQ-9" value={scoreLabel(engagement.latest_phq9, "phq9")} />
            <Field label="GAD-7" value={scoreLabel(engagement.latest_gad7, "gad7")} />
            <Field
              label="Last assessment"
              value={
                engagement.last_assessment_at ? formatDate(engagement.last_assessment_at) : "Never"
              }
            />
          </Panel>

          <Panel title="Other activity">
            <Field label="Habits" value={String(engagement.habits)} />
            <Field label="Goals" value={String(engagement.goals)} />
            <Field label="Check-ins logged" value={String(engagement.check_ins)} />
            <Field
              label="Homework"
              value={`${engagement.homework_completed} of ${engagement.homework_assigned} completed`}
            />
          </Panel>
        </div>

        <Panel title="Recent activity">
          {timeline.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nothing recorded for this member yet.
            </p>
          ) : (
            <ol className="space-y-3">
              {timeline.map((entry, i) => (
                <TimelineRow key={`${entry.kind}-${entry.at}-${i}`} entry={entry} />
              ))}
            </ol>
          )}
        </Panel>
      </div>
    </div>
  );
}

function TimelineRow({ entry }: { entry: TimelineEntry }) {
  const tone: Record<TimelineEntry["kind"], string> = {
    assessment: "bg-primary",
    journal: "bg-secondary",
    check_in: "bg-primary/60",
    homework: "bg-secondary/60",
    points: "bg-muted-foreground/40",
    goal: "bg-primary/40",
  };

  return (
    <li className="flex items-start gap-3">
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${tone[entry.kind]}`} />
      <div className="min-w-0 flex-1">
        <p className="text-sm capitalize text-foreground">
          {entry.label}
          {entry.value && (
            <span className="ml-2 text-xs text-muted-foreground">{entry.value}</span>
          )}
        </p>
        <p className="text-xs text-muted-foreground">{entry.at ? formatDate(entry.at) : "—"}</p>
      </div>
    </li>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Target;
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-[0.12em]">{label}</span>
      </div>
      <p className="mt-3 font-serif text-3xl font-semibold text-primary">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-serif text-lg font-semibold text-primary">{title}</h2>
      <div className="mt-4 space-y-2">{children}</div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/50 pb-2 last:border-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-right text-sm text-foreground">{value}</dd>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/admin/members"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
    >
      <ArrowLeft className="h-4 w-4" />
      All members
    </Link>
  );
}

/**
 * Show a score with its clinical severity band, because a bare "14" means
 * nothing to a reader who does not have the cut-offs memorised.
 * PHQ-9 and GAD-7 use different bands.
 */
function scoreLabel(score: number | null, kind: "phq9" | "gad7"): string {
  if (score == null) return "Not taken";

  const bands =
    kind === "phq9"
      ? [
          [4, "Minimal"],
          [9, "Mild"],
          [14, "Moderate"],
          [19, "Moderately severe"],
        ]
      : [
          [4, "Minimal"],
          [9, "Mild"],
          [14, "Moderate"],
        ];

  const band = bands.find(([max]) => score <= (max as number));
  return `${score} · ${band ? band[1] : "Severe"}`;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
