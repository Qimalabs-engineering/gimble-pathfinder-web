import { createFileRoute, Outlet } from "@tanstack/react-router";

import { ConsoleShell } from "@/components/admin/console-shell";

/**
 * Console layout. The parent `_authenticated` route has already resolved the
 * session in beforeLoad, so it is available here without a second fetch.
 */
export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Gimble Foundation" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { session } = Route.useRouteContext();

  return (
    <ConsoleShell session={session}>
      <Outlet />
    </ConsoleShell>
  );
}
