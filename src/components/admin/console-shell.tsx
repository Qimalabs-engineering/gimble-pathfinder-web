import { Link, useNavigate, useRouter, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import {
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { adminLogout } from "@/lib/api/console/session.functions";
import type { AdminSession } from "@/integrations/gimble/types";
import { cn } from "@/lib/utils";

/**
 * Chrome for the admin console: sidebar, header and sign-out.
 *
 * Nav entries can declare the permission they need. That filtering is
 * PRESENTATION ONLY — it hides links a person cannot use rather than enforcing
 * anything. Every console endpoint independently authorizes the session on the
 * backend, so a hand-typed URL gets a 403, not data.
 */

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  /** Required permission, as [resource, action]. Omit for always-visible. */
  permission?: [string, string];
}

const NAV_SECTIONS: Array<{ heading: string; items: NavItem[] }> = [
  {
    heading: "Overview",
    items: [{ to: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    heading: "Site",
    items: [
      { to: "/admin/messages", label: "Messages", icon: Inbox },
      { to: "/admin/subscribers", label: "Subscribers", icon: Mail },
    ],
  },
];

export function hasPermission(
  session: AdminSession | undefined,
  resource: string,
  action: string
): boolean {
  const permissions = session?.permissions ?? {};
  // Mirrors Role.hasPermission on the backend so the two cannot disagree.
  if (permissions.all_data === true) return true;

  const granted = permissions[resource];
  if (granted === "all") return true;
  return Array.isArray(granted) && granted.includes(action);
}

export function ConsoleShell({
  session,
  children,
}: {
  session: AdminSession;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = useServerFn(adminLogout);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function handleSignOut() {
    await logout({});
    // Drop every cached response before leaving — otherwise the next person to
    // sign in on this browser briefly sees the previous admin's data.
    queryClient.clear();
    await router.invalidate();
    await navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
        <div className="border-b border-border px-6 py-5">
          <Link to="/admin" className="font-serif text-lg font-semibold text-primary">
            Gimble Admin
          </Link>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
          {NAV_SECTIONS.map((section) => {
            const visible = section.items.filter(
              (item) => !item.permission || hasPermission(session, ...item.permission)
            );
            if (visible.length === 0) return null;

            return (
              <div key={section.heading}>
                <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {section.heading}
                </p>
                <ul className="space-y-1">
                  {visible.map((item) => {
                    // Exact match for /admin so the dashboard is not marked
                    // active on every child route.
                    const active =
                      item.to === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.to);

                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                            active
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <item.icon className="h-4 w-4 shrink-0" />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-border px-4 py-4">
          <p className="truncate text-xs font-medium text-foreground" title={session.user.email}>
            {session.user.email}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {session.roles.map(formatRole).join(", ") || "No role"}
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-3 flex items-center gap-2 text-xs text-muted-foreground transition hover:text-destructive"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile nav: the sidebar is hidden below lg, so these links are the
            only way to move between sections on a phone. */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-border bg-card px-4 py-3 lg:hidden">
          {NAV_SECTIONS.flatMap((section) => section.items).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={handleSignOut}
            className="ml-auto whitespace-nowrap text-xs text-muted-foreground"
          >
            Sign out
          </button>
        </div>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}

function formatRole(role: string): string {
  return role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
