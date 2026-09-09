import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";

import { adminLogin } from "@/lib/api/console/session.functions";
import { Section, SectionHeading } from "@/components/section";

/**
 * Admin sign-in.
 *
 * Kept at /auth rather than moving under /admin: this path is already in
 * robots.txt's Disallow list and the sitemap's excluded prefixes, and a login
 * page nested inside a guarded layout has to be carefully excluded from its own
 * guard.
 *
 * `next` carries the page the visitor was trying to reach when their session
 * expired, so an 8-hour timeout does not also lose their place.
 */
const searchSchema = z.object({
  next: z.string().startsWith("/").max(300).optional().catch(undefined),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Admin sign in — Gimble Foundation" },
      {
        name: "description",
        content: "Sign in to the Gimble Foundation admin dashboard.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const { next } = Route.useSearch();
  const login = useServerFn(adminLogin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      await login({ data: { email: email.trim(), password } });
      // The session lives in an httpOnly cookie the client cannot read, so the
      // router has to re-run beforeLoad to pick it up.
      await router.invalidate();
      await navigate({ to: next ?? "/admin", replace: true });
    } catch (err) {
      // Never distinguish a wrong password from a non-admin account: doing so
      // tells an attacker which addresses are worth attacking.
      setError(
        err instanceof Error && err.message.includes("couldn't reach")
          ? "Can't reach the server. Please try again."
          : "Incorrect email or password."
      );
      setBusy(false);
    }
  }

  return (
    <Section className="!pt-24">
      <div className="mx-auto max-w-md">
        <SectionHeading
          as="h1"
          eyebrow="Admin"
          title="Sign in"
          description="Access the Gimble Foundation admin console."
        />
        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-5 rounded-3xl border border-border bg-card p-6 sm:p-8"
        >
          <div>
            <label htmlFor="admin-email" className="text-sm font-medium text-primary">
              Email
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-sm font-medium text-primary">
              Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
          <p className="text-xs text-muted-foreground">
            Forgot your password?{" "}
            <a href="/reset-password" className="underline hover:text-primary">
              Reset it here
            </a>
            .
          </p>
        </form>
      </div>
    </Section>
  );
}
