import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { DataTable, StatusBadge, type Column } from "@/components/admin/data-table";
import { hasPermission } from "@/components/admin/console-shell";
import {
  deactivateAdmin,
  grantRole,
  inviteAdmin,
  listAdmins,
  listRoles,
  revokeRole,
} from "@/lib/api/console/people.functions";
import type { AdminUser } from "@/integrations/gimble/types";

/**
 * Admin accounts and their roles.
 *
 * The backend is the authority on every rule enforced here — only a super admin
 * may create or revoke another super admin, nobody may deactivate themselves,
 * and the last super admin cannot be demoted. The UI mirrors those rules so the
 * buttons match reality, but a hand-crafted request still fails.
 */
export const Route = createFileRoute("/_authenticated/admin/admins")({
  component: AdminsPage,
});

// Roles that grant console access. org_admin/facilitator/member exist in the
// same table but belong to the app's own hierarchy, not to staff.
const CONSOLE_ROLES = ["super_admin", "gimble_admin"] as const;

function AdminsPage() {
  const { session } = Route.useRouteContext();
  const queryClient = useQueryClient();

  const fetchAdmins = useServerFn(listAdmins);
  const fetchRoles = useServerFn(listRoles);
  const invite = useServerFn(inviteAdmin);
  const grant = useServerFn(grantRole);
  const revoke = useServerFn(revokeRole);
  const deactivate = useServerFn(deactivateAdmin);

  const [showInvite, setShowInvite] = useState(false);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isSuperAdmin = session.roles.includes("super_admin");
  const canManage = isSuperAdmin || hasPermission(session, "users", "update");

  const admins = useQuery({
    queryKey: ["admin", "admins"],
    queryFn: () => fetchAdmins({ data: { limit: 100 } }),
  });

  const roles = useQuery({
    queryKey: ["admin", "roles"],
    queryFn: () => fetchRoles({}),
  });

  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["admin", "admins"] });
  }

  const inviteMutation = useMutation({
    mutationFn: (input: { email: string; role: "super_admin" | "gimble_admin" }) =>
      invite({ data: input }),
    onSuccess: (created) => {
      setInviteUrl(created.invite_url);
      setShowInvite(false);
      setError(null);
      refresh();
    },
    onError: (err: Error) => setError(err.message),
  });

  const roleMutation = useMutation({
    mutationFn: ({
      hashId,
      role,
      action,
    }: {
      hashId: string;
      role: string;
      action: "grant" | "revoke";
    }) =>
      action === "grant"
        ? grant({ data: { hashId, role } })
        : revoke({ data: { hashId, role } }),
    onSuccess: () => {
      setError(null);
      refresh();
    },
    onError: (err: Error) => setError(err.message),
  });

  const deactivateMutation = useMutation({
    mutationFn: (hashId: string) => deactivate({ data: { hashId } }),
    onSuccess: () => {
      setError(null);
      refresh();
    },
    onError: (err: Error) => setError(err.message),
  });

  const columns: Array<Column<AdminUser>> = [
    {
      key: "email",
      header: "Admin",
      render: (row) => (
        <div>
          <p className="font-medium text-foreground">{row.email}</p>
          <p className="text-xs text-muted-foreground">
            {row.last_login_at
              ? `Last signed in ${new Date(row.last_login_at).toLocaleDateString()}`
              : "Never signed in"}
          </p>
        </div>
      ),
    },
    {
      key: "roles",
      header: "Roles",
      render: (row) => {
        const held = row.roles.map((r) => r.name);
        return (
          <div className="flex flex-wrap gap-1">
            {CONSOLE_ROLES.map((role) => {
              const active = held.includes(role);
              // Only a super admin can move the super_admin role in either
              // direction — the backend enforces this too.
              const locked = role === "super_admin" && !isSuperAdmin;

              return (
                <button
                  key={role}
                  type="button"
                  disabled={!canManage || locked || roleMutation.isPending}
                  onClick={() =>
                    roleMutation.mutate({
                      hashId: row.hash_id,
                      role,
                      action: active ? "revoke" : "grant",
                    })
                  }
                  title={
                    locked
                      ? "Only a super admin can change this role"
                      : active
                        ? `Remove ${formatRole(role)}`
                        : `Grant ${formatRole(role)}`
                  }
                  className={`rounded-full border px-2.5 py-1 text-xs transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    active
                      ? "border-primary bg-primary/10 font-medium text-primary"
                      : "border-dashed border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {formatRole(role)}
                </button>
              );
            })}
            {/* An admin row with no role is a legacy/seeded account that
                requireConsole will reject. Worth saying plainly on its own
                line — next to the toggles it reads as a contradiction. */}
            {held.length === 0 && (
              <p className="mt-1 w-full text-xs text-muted-foreground">
                No role assigned — cannot sign in to the console.
              </p>
            )}
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.is_active ? "active" : "inactive"} />,
    },
    {
      key: "actions",
      header: "",
      render: (row) =>
        canManage && row.is_active && row.email !== session.user.email ? (
          <button
            type="button"
            disabled={deactivateMutation.isPending}
            onClick={() => {
              if (confirm(`Deactivate ${row.email}? They will lose access immediately.`)) {
                deactivateMutation.mutate(row.hash_id);
              }
            }}
            className="whitespace-nowrap text-xs text-muted-foreground underline hover:text-destructive disabled:opacity-50"
          >
            Deactivate
          </button>
        ) : null,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-primary">Admins</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Who can sign in to this console, and what they can do.
          </p>
        </div>
        {canManage && (
          <button
            type="button"
            onClick={() => {
              setShowInvite((v) => !v);
              setInviteUrl(null);
            }}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            {showInvite ? "Cancel" : "Invite admin"}
          </button>
        )}
      </header>

      {error && (
        <p role="alert" className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {showInvite && (
        <InviteForm
          isSuperAdmin={isSuperAdmin}
          isPending={inviteMutation.isPending}
          onSubmit={(input) => inviteMutation.mutate(input)}
        />
      )}

      {inviteUrl && (
        <div className="mb-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
          <p className="text-sm font-medium text-primary">Invitation sent</p>
          <p className="mt-1 text-xs text-muted-foreground">
            They'll get an email with this link. It expires in 7 days and can only be used
            once — share it directly only if the email doesn't arrive.
          </p>
          <code className="mt-3 block overflow-x-auto rounded-lg bg-background px-3 py-2 text-xs">
            {inviteUrl}
          </code>
        </div>
      )}

      <DataTable
        columns={columns}
        rows={admins.data?.data ?? []}
        rowKey={(row) => row.hash_id}
        isLoading={admins.isPending}
        empty="No admin accounts yet."
      />

      <RoleReference roles={roles.data} />
    </div>
  );
}

function InviteForm({
  isSuperAdmin,
  isPending,
  onSubmit,
}: {
  isSuperAdmin: boolean;
  isPending: boolean;
  onSubmit: (input: { email: string; role: "super_admin" | "gimble_admin" }) => void;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"super_admin" | "gimble_admin">("gimble_admin");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ email: email.trim(), role });
      }}
      className="mb-6 grid gap-4 rounded-3xl border border-border bg-card p-6 sm:grid-cols-[1fr_auto_auto] sm:items-end"
    >
      <div>
        <label htmlFor="invite-email" className="text-sm font-medium text-primary">
          Email address
        </label>
        <input
          id="invite-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@gimblefoundation.org"
          className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="invite-role" className="text-sm font-medium text-primary">
          Role
        </label>
        <select
          id="invite-role"
          value={role}
          onChange={(e) => setRole(e.target.value as typeof role)}
          className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
        >
          <option value="gimble_admin">Gimble Admin</option>
          {/* Offered only to a super admin, because only they can grant it. */}
          {isSuperAdmin && <option value="super_admin">Super Admin</option>}
        </select>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send invite"}
      </button>
      <p className="text-xs text-muted-foreground sm:col-span-3">
        They set their own password from the emailed link, so no temporary password is
        ever created or shared.
      </p>
    </form>
  );
}

function RoleReference({ roles }: { roles: Array<{ name: string; display_name: string; description: string | null; permissions: Record<string, unknown> }> | undefined }) {
  if (!roles?.length) return null;

  const consoleRoles = roles.filter((r) => CONSOLE_ROLES.includes(r.name as never));

  return (
    <section className="mt-10">
      <h2 className="font-serif text-xl font-semibold text-primary">What the roles mean</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {consoleRoles.map((role) => (
          <div key={role.name} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-medium text-foreground">{role.display_name}</p>
            {role.description && (
              <p className="mt-1 text-sm text-muted-foreground">{role.description}</p>
            )}
            <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
              {role.permissions.all_data === true ? (
                <li>Full access to everything.</li>
              ) : (
                Object.entries(role.permissions).map(([resource, actions]) => (
                  <li key={resource}>
                    <span className="capitalize text-foreground">
                      {resource.replace(/_/g, " ")}
                    </span>
                    : {Array.isArray(actions) ? actions.join(", ") : String(actions)}
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function formatRole(role: string): string {
  return role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
