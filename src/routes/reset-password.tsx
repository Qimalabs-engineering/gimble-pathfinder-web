import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";

import {
  completePasswordReset,
  requestPasswordReset,
  verifyResetToken,
} from "@/lib/api/password.functions";
import { Section, SectionHeading } from "@/components/section";

/**
 * Password reset landing page.
 *
 * This is where every reset email now points. It serves two audiences from one
 * route: arriving WITH a token (from the email) shows the new-password form;
 * arriving without one shows the "send me a link" form, which is what someone
 * gets if they navigate here directly or their link has expired.
 */
const searchSchema = z.object({
  token: z.string().max(512).optional().catch(undefined),
  expiresAt: z.string().max(64).optional().catch(undefined),
});

export const Route = createFileRoute("/reset-password")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Reset your password — Gimble" },
      { name: "description", content: "Set a new password for your Gimble account." },
      // A reset URL carries a single-use credential; it must never be indexed.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPasswordPage,
});

const inputClass =
  "mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none";
const buttonClass =
  "rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60";

function ResetPasswordPage() {
  const { token } = Route.useSearch();

  return (
    <Section className="!pt-24">
      <div className="mx-auto max-w-md">
        {token ? <SetNewPassword token={token} /> : <RequestLink />}
      </div>
    </Section>
  );
}

function SetNewPassword({ token }: { token: string }) {
  const verify = useServerFn(verifyResetToken);
  const complete = useServerFn(completePasswordReset);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  // Checked before the form is shown so an expired link says so immediately,
  // rather than after the visitor has typed a password twice.
  const { data: status, isPending } = useQuery({
    queryKey: ["reset-token", token],
    queryFn: () => verify({ data: { token } }),
    retry: false,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Those passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }

    setBusy(true);
    try {
      await complete({ data: { token, new_password: password } });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  if (isPending) {
    return <p className="text-sm text-muted-foreground">Checking your link…</p>;
  }

  if (!status?.valid) {
    return (
      <>
        <SectionHeading
          as="h1"
          eyebrow="Password reset"
          title="This link has expired"
          description="Reset links are valid for one hour and can only be used once. Request a new one below."
        />
        <div className="mt-8">
          <RequestLink hideHeading />
        </div>
      </>
    );
  }

  if (done) {
    return (
      <>
        <SectionHeading
          as="h1"
          eyebrow="Password reset"
          title="Password updated"
          description="You can now sign in with your new password."
        />
        <p className="mt-6 text-sm text-muted-foreground">
          Using the Gimble app? Open it and sign in as usual.
        </p>
      </>
    );
  }

  return (
    <>
      <SectionHeading
        as="h1"
        eyebrow="Password reset"
        title="Choose a new password"
        description={status.email ? `For ${status.email}` : undefined}
      />
      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-5 rounded-3xl border border-border bg-card p-6 sm:p-8"
      >
        <div>
          <label htmlFor="new-password" className="text-sm font-medium text-primary">
            New password
          </label>
          <input
            id="new-password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
          <p className="mt-2 text-xs text-muted-foreground">At least 8 characters.</p>
        </div>
        <div>
          <label htmlFor="confirm-password" className="text-sm font-medium text-primary">
            Confirm password
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={inputClass}
          />
        </div>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        <button type="submit" disabled={busy} className={buttonClass}>
          {busy ? "Saving…" : "Set new password"}
        </button>
      </form>
    </>
  );
}

function RequestLink({ hideHeading = false }: { hideHeading?: boolean }) {
  const request = useServerFn(requestPasswordReset);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    await request({ data: { email: email.trim() } });
    // Confirmed regardless of whether the address has an account — saying
    // otherwise would reveal who has one.
    setSent(true);
    setBusy(false);
  }

  if (sent) {
    return (
      <p className="rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
        If there's an account for that address, a reset link is on its way. It
        expires in one hour.
      </p>
    );
  }

  return (
    <>
      {!hideHeading && (
        <SectionHeading
          as="h1"
          eyebrow="Password reset"
          title="Reset your password"
          description="Enter your email and we'll send you a link."
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-5 rounded-3xl border border-border bg-card p-6 sm:p-8"
      >
        <div>
          <label htmlFor="reset-email" className="text-sm font-medium text-primary">
            Email
          </label>
          <input
            id="reset-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <button type="submit" disabled={busy} className={buttonClass}>
          {busy ? "Sending…" : "Send reset link"}
        </button>
      </form>
    </>
  );
}
