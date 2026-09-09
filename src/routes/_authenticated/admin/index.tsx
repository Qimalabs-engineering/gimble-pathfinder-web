import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BellOff,
  Clock,
  Inbox,
  Minus,
} from "lucide-react";

import { getOverview } from "@/lib/api/console/people.functions";
import type { DashboardOverview } from "@/integrations/gimble/types";

/**
 * Console dashboard.
 *
 * Every tile answers three questions: the number, what it is out of, and
 * whether that is good. A bare "47" tells a reader nothing; "47 of 213, up from
 * 41 yesterday" tells them everything. That is the whole design brief here.
 *
 * All of it comes from one call to /api/console/overview.
 */
export const Route = createFileRoute("/_authenticated/admin/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { session } = Route.useRouteContext();
  const fetchOverview = useServerFn(getOverview);

  const overview = useQuery({
    queryKey: ["admin", "overview"],
    queryFn: () => fetchOverview(),
  });

  const firstName = session.user.first_name?.trim();
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-primary">
            {today}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {overview.isPending ? (
              "Loading today's numbers…"
            ) : overview.data ? (
              <Headline data={overview.data} />
            ) : (
              "Could not load today's numbers."
            )}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" aria-hidden="true" />
          Last 14 days
        </span>
      </header>

      {overview.isError ? (
        <p className="mt-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Could not load the dashboard. {(overview.error as Error).message}
        </p>
      ) : overview.isPending ? (
        <LoadingSkeleton />
      ) : overview.data ? (
        <Dashboard data={overview.data} greeting={firstName} />
      ) : null}
    </div>
  );
}

function Headline({ data }: { data: DashboardOverview }) {
  const { active } = data.today;
  const { checkins_done } = data.today;

  // With no activity at all, a cheerful summary would be a lie.
  if (active === 0 && checkins_done === 0) {
    return (
      <>
        No member activity recorded today yet. {data.base.total} people have
        accounts, {data.week.dormant_30d} of them have done nothing in 30 days.
      </>
    );
  }

  return (
    <>
      <strong className="font-semibold text-foreground">
        {active} {active === 1 ? "person" : "people"}
      </strong>{" "}
      used Gimble today and{" "}
      <strong className="font-semibold text-foreground">{checkins_done}</strong>{" "}
      finished a check-in.
    </>
  );
}

function Dashboard({
  data,
  greeting,
}: {
  data: DashboardOverview;
  greeting?: string;
}) {
  const { today, week, journeys, attention, base, trend } = data;

  const checkinRate =
    today.checkins_asked > 0
      ? Math.round((today.checkins_done / today.checkins_asked) * 100)
      : 0;
  const activeRate =
    base.total > 0 ? Math.round((today.active / base.total) * 100) : 0;
  // Rounding 1-of-213 down to "0%" next to a count of 1 reads as a bug. Show
  // "<1%" for any non-zero share that rounds away.
  const enrolledRate = percentLabel(journeys.enrolled, base.total);

  return (
    <>
      {greeting ? <span className="sr-only">Signed in as {greeting}</span> : null}

      {/* ---------------- Today ---------------- */}
      <Section
        title="Today"
        description="What has happened since midnight, in each member's own timezone."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <BigStat
            label="Active today"
            value={today.active}
            of={`of ${base.total} members`}
            percent={activeRate}
            delta={today.active - today.active_yesterday}
            explanation={
              <>
                <strong className="text-foreground">{activeRate}%</strong> of
                members did something in the app today — a check-in, a journal
                entry, a journey step, a video. Yesterday it was{" "}
                {today.active_yesterday}.
              </>
            }
          />
          <BigStat
            label="Check-ins completed"
            value={today.checkins_done}
            of={`of ${today.checkins_asked} asked`}
            percent={checkinRate}
            accent
            explanation={
              <>
                <strong className="text-foreground">{checkinRate}%</strong> of
                the members whose daily reminder fired have answered it. Members
                with check-ins switched off are not counted.
              </>
            }
          />
        </div>
      </Section>

      {/* ---------------- Trend ---------------- */}
      <section className="mt-7 rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h2 className="font-serif text-lg font-semibold">
              Daily active members
            </h2>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Distinct members who did something in the app, each day for the
              last two weeks.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">14-day average</p>
            <p className="font-serif text-xl font-semibold">
              {Math.round(
                trend.reduce((sum, d) => sum + d.active, 0) /
                  Math.max(trend.length, 1)
              )}
            </p>
          </div>
        </div>
        <TrendChart trend={trend} />
      </section>

      {/* ---------------- This week ---------------- */}
      <Section
        title="This week"
        description="Whether people are coming back, not just showing up once."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <SmallStat
            label="Active this week"
            value={week.active}
            suffix={percentLabel(week.active, base.total)}
            hint="Members who used Gimble at least once in the last 7 days."
          />
          <SmallStat
            label="Come back daily"
            value={`${week.stickiness}%`}
            hint={`Of the ${week.active} active this week, ${week.stickiness}% were active on any given day. Higher means the habit is sticking.`}
          />
          <SmallStat
            label="Dormant"
            value={week.dormant_30d}
            tone={week.dormant_30d > 0 ? "warn" : "default"}
            hint="Have an account but have done nothing in 30 days. Worth a nudge."
          />
        </div>
      </Section>

      {/* ---------------- Journeys + attention ---------------- */}
      <div className="mt-7 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-baseline gap-3">
            <h2 className="font-serif text-lg font-semibold">Journeys</h2>
            <p className="text-xs text-muted-foreground">
              Who is working through a programme.
            </p>
          </div>

          <div className="mt-4 flex items-baseline gap-2.5">
            <span className="font-serif text-4xl font-semibold leading-none text-primary">
              {journeys.enrolled}
            </span>
            <span className="text-sm text-muted-foreground">
              {journeys.enrolled === 1 ? "member" : "members"} enrolled
              {enrolledRate ? ` — ${enrolledRate} of everyone` : null}
            </span>
          </div>

          {journeys.enrolled > 0 ? (
            <>
              {/* 2px gaps so the segments read as separate, not one bar. */}
              <div className="mt-4 flex h-2.5 gap-0.5">
                <Segment
                  count={journeys.in_progress}
                  total={journeys.enrolled}
                  className="rounded-l-full bg-primary"
                />
                <Segment
                  count={journeys.completed}
                  total={journeys.enrolled}
                  className="bg-primary/65"
                />
                <Segment
                  count={journeys.stalled}
                  total={journeys.enrolled}
                  className="rounded-r-full bg-primary/25"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <Key className="bg-primary" label="In progress" value={journeys.in_progress} />
                <Key className="bg-primary/65" label="Completed" value={journeys.completed} />
                <Key className="bg-primary/25" label="Stalled 14+ days" value={journeys.stalled} />
              </div>
            </>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Nobody has started a journey yet.
            </p>
          )}

          {journeys.top.length > 0 ? (
            <>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Most enrolled
              </p>
              <div className="mt-3 flex flex-col gap-2.5">
                {journeys.top.map((j) => (
                  <div key={j.name} className="flex items-center gap-3">
                    <span className="min-w-0 flex-1 truncate text-sm">
                      {j.name}
                    </span>
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-muted sm:w-44">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${Math.round(
                            (j.count / Math.max(journeys.top[0].count, 1)) * 100
                          )}%`,
                        }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs font-semibold">
                      {j.count}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-semibold">Needs a person</h2>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Things that will not resolve on their own.
          </p>

          <div className="mt-4 flex flex-col gap-2.5">
            {attention.flagged_assessments > 0 ? (
              <Alert
                tone="critical"
                icon={AlertTriangle}
                title={`${attention.flagged_assessments} assessment${attention.flagged_assessments === 1 ? "" : "s"} flagged`}
                body="PHQ-9 question 9 answered above zero in the last 7 days."
              />
            ) : null}

            {attention.unreachable_members > 0 ? (
              <Alert
                tone="warning"
                icon={BellOff}
                title={`${attention.unreachable_members} members unreachable`}
                body="Reminders are on but no live device token exists, so nothing is delivered."
              />
            ) : null}

            {attention.stalled_journeys > 0 ? (
              <Alert
                tone="warning"
                icon={Clock}
                title={`${attention.stalled_journeys} journeys stalled`}
                body="Started but untouched for 14 days or more."
              />
            ) : null}

            {attention.unread_messages > 0 ? (
              <Link to="/admin/messages" className="block">
                <Alert
                  tone="info"
                  icon={Inbox}
                  title={`${attention.unread_messages} unread message${attention.unread_messages === 1 ? "" : "s"}`}
                  body="From the contact form on the website."
                />
              </Link>
            ) : null}

            {attention.flagged_assessments === 0 &&
            attention.unreachable_members === 0 &&
            attention.stalled_journeys === 0 &&
            attention.unread_messages === 0 ? (
              <p className="rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground">
                Nothing needs attention right now.
              </p>
            ) : null}
          </div>
        </section>
      </div>

      {/* ---------------- The base ---------------- */}
      <Section
        title="Everyone"
        description="The whole member base, however long ago they joined."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SmallStat label="Total members" value={base.total} hint="Everyone with an account." />
          <SmallStat
            label="Active accounts"
            value={base.active}
            hint={`${base.total - base.active} have been switched off.`}
          />
          <SmallStat label="New this month" value={base.new_30d} hint="Joined in the last 30 days." />
          <SmallStat
            label="Reminders on"
            value={base.reminders_on}
            hint={`${base.total > 0 ? Math.round((base.reminders_on / base.total) * 100) : 0}% have the daily check-in switched on.`}
          />
        </div>
      </Section>
    </>
  );
}

/**
 * A share as a label, never a misleading rounded zero: any non-zero count that
 * rounds below 1% renders as "<1%" instead of "0%".
 */
function percentLabel(part: number, whole: number): string {
  if (whole <= 0 || part <= 0) return "";
  const pct = (part / whole) * 100;
  return pct < 1 ? "<1%" : `${Math.round(pct)}%`;
}

/* ---------------------------------------------------------------- pieces */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <div className="flex flex-wrap items-baseline gap-3">
        <h2 className="font-serif text-lg font-semibold">{title}</h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BigStat({
  label,
  value,
  of,
  percent,
  delta,
  accent,
  explanation,
}: {
  label: string;
  value: number;
  of: string;
  percent: number;
  delta?: number;
  accent?: boolean;
  explanation: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        {delta !== undefined ? <Delta value={delta} /> : null}
      </div>

      <div className="mt-3.5 flex items-baseline gap-2.5">
        <span className="font-serif text-5xl font-semibold leading-none text-primary">
          {value}
        </span>
        <span className="text-sm text-muted-foreground">{of}</span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${accent ? "bg-highlight" : "bg-primary"}`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>

      <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
        {explanation}
      </p>
    </div>
  );
}

function Delta({ value }: { value: number }) {
  if (value === 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
        <Minus className="size-3" aria-hidden="true" />
        same as yesterday
      </span>
    );
  }

  const up = value > 0;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        up ? "bg-highlight/15 text-highlight" : "bg-destructive/10 text-destructive"
      }`}
    >
      {up ? (
        <ArrowUp className="size-3" aria-hidden="true" />
      ) : (
        <ArrowDown className="size-3" aria-hidden="true" />
      )}
      {up ? "+" : ""}
      {value}
    </span>
  );
}

function SmallStat({
  label,
  value,
  suffix,
  hint,
  tone = "default",
}: {
  label: string;
  value: number | string;
  suffix?: string;
  hint: string;
  tone?: "default" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-3 flex items-baseline gap-2">
        <span
          className={`font-serif text-3xl font-semibold leading-none ${
            tone === "warn" ? "text-destructive" : "text-primary"
          }`}
        >
          {value}
        </span>
        {suffix ? (
          <span className="text-sm text-muted-foreground">{suffix}</span>
        ) : null}
      </div>
      <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
        {hint}
      </p>
    </div>
  );
}

/**
 * Single series, so one hue and no legend — the heading names it. Today is the
 * darkest step so the eye lands on it; the rest are one lighter step of the
 * same hue, never a second colour.
 */
function TrendChart({ trend }: { trend: DashboardOverview["trend"] }) {
  const peak = Math.max(...trend.map((d) => d.active), 1);
  // Round the axis up to something readable rather than to the raw peak.
  const ceiling = Math.max(Math.ceil(peak / 10) * 10, 10);

  return (
    <div className="mt-5 flex items-end gap-2">
      <div className="flex h-36 flex-col justify-between pb-6 text-[10px] text-muted-foreground">
        <span>{ceiling}</span>
        <span>{Math.round(ceiling / 2)}</span>
        <span>0</span>
      </div>
      <div className="flex h-36 flex-1 items-end gap-1.5 border-b border-l border-border pl-2 pr-1">
        {trend.map((day, i) => {
          const isToday = i === trend.length - 1;
          const height = Math.round((day.active / ceiling) * 116);
          return (
            <div
              key={day.date}
              className="group flex h-[116px] flex-1 flex-col items-center justify-end gap-1.5"
              title={`${new Date(day.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}: ${day.active} active`}
            >
              <div
                className={`w-full rounded-t ${
                  isToday ? "bg-primary" : "bg-primary/45"
                } group-hover:bg-primary`}
                style={{ height: `${Math.max(height, day.active > 0 ? 2 : 0)}px` }}
              />
              <span className="text-[10px] text-muted-foreground">
                {new Date(day.date).getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Segment({
  count,
  total,
  className,
}: {
  count: number;
  total: number;
  className: string;
}) {
  if (count === 0) return null;
  return (
    <div className={className} style={{ width: `${(count / total) * 100}%` }} />
  );
}

function Key({
  className,
  label,
  value,
}: {
  className: string;
  label: string;
  value: number;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`size-2.5 rounded-sm ${className}`} aria-hidden="true" />
      {label} <strong className="text-foreground">{value}</strong>
    </span>
  );
}

function Alert({
  tone,
  icon: Icon,
  title,
  body,
}: {
  tone: "critical" | "warning" | "info";
  icon: typeof AlertTriangle;
  title: string;
  body: string;
}) {
  const tones = {
    critical: "border-destructive/25 bg-destructive/5 text-destructive",
    warning: "border-amber-300/60 bg-amber-50 text-amber-700",
    info: "border-border bg-secondary text-primary",
  } as const;

  return (
    <div className={`flex items-start gap-3 rounded-xl border p-3.5 ${tones[tone]}`}>
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-52 animate-pulse rounded-2xl bg-muted" />
        <div className="h-52 animate-pulse rounded-2xl bg-muted" />
      </div>
      <div className="h-56 animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}
