import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getAdminSession } from "@/lib/api/console/session.functions";

/**
 * Guard for everything under /admin.
 *
 * The session is an httpOnly cookie, so the client cannot inspect it — the only
 * way to know whether it is still valid is to ask the backend, which is what
 * getAdminSession does. It returns null rather than throwing on an expired
 * session, so an ordinary 8-hour timeout becomes a redirect to sign-in instead
 * of an error boundary.
 *
 * `ssr: false` is kept from the previous Supabase version. With a cookie the
 * session IS readable during SSR now, but rendering the console on the server
 * would add a backend round trip to every navigation, and an internal tool has
 * no SEO or first-paint requirement to justify that.
 *
 * The result is only a redirect decision — the backend re-authorizes every
 * request, so a forged client-side session buys nothing.
 */
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const session = await getAdminSession();

    if (!session) {
      throw redirect({
        to: "/auth",
        search: { next: location.href },
        replace: true,
      });
    }

    return { session };
  },
  component: () => <Outlet />,
});
