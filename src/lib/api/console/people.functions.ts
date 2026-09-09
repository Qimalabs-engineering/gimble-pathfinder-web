import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireAdminSession } from "@/integrations/gimble/auth-middleware";
import { gimbleFetch } from "@/integrations/gimble/client.server";
import type {
  AdminUser,
  ConsoleRole,
  ListResponse,
  MemberSummary,
  SingleResponse,
} from "@/integrations/gimble/types";

/** Console: admins, roles and app members. */

const listParamsSchema = z.object({
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  q: z.string().trim().max(200).optional(),
  sort: z.string().max(50).optional(),
});

export const listAdmins = createServerFn({ method: "GET" })
  .middleware([requireAdminSession])
  .inputValidator(listParamsSchema)
  .handler(async ({ data }) => {
    return gimbleFetch<ListResponse<AdminUser>>("/api/console/admins", { query: data });
  });

export const listRoles = createServerFn({ method: "GET" })
  .middleware([requireAdminSession])
  .handler(async () => {
    const response = await gimbleFetch<ListResponse<ConsoleRole>>("/api/console/roles");
    return response.data;
  });

/**
 * Invite an admin.
 *
 * Returns the invite URL as well as sending it, so the inviter can pass it on
 * directly if the email does not arrive. It is a single-use credential — show
 * it once, never log it.
 */
export const inviteAdmin = createServerFn({ method: "POST" })
  .middleware([requireAdminSession])
  .inputValidator(
    z.object({
      email: z.string().trim().email().max(255),
      role: z.enum(["super_admin", "gimble_admin"]).default("gimble_admin"),
    })
  )
  .handler(async ({ data }) => {
    const response = await gimbleFetch<
      SingleResponse<AdminUser & { role: string; invite_url: string }>
    >("/api/console/admins", { method: "POST", body: data });
    return response.data;
  });

export const deactivateAdmin = createServerFn({ method: "POST" })
  .middleware([requireAdminSession])
  .inputValidator(z.object({ hashId: z.string().min(1).max(64) }))
  .handler(async ({ data }) => {
    await gimbleFetch(`/api/console/admins/${encodeURIComponent(data.hashId)}`, {
      method: "DELETE",
    });
    return { ok: true as const };
  });

export const grantRole = createServerFn({ method: "POST" })
  .middleware([requireAdminSession])
  .inputValidator(
    z.object({ hashId: z.string().min(1).max(64), role: z.string().min(1).max(100) })
  )
  .handler(async ({ data }) => {
    const response = await gimbleFetch<SingleResponse<AdminUser>>(
      `/api/console/users/${encodeURIComponent(data.hashId)}/roles`,
      { method: "POST", body: { role: data.role } }
    );
    return response.data;
  });

export const revokeRole = createServerFn({ method: "POST" })
  .middleware([requireAdminSession])
  .inputValidator(
    z.object({ hashId: z.string().min(1).max(64), role: z.string().min(1).max(100) })
  )
  .handler(async ({ data }) => {
    const response = await gimbleFetch<SingleResponse<AdminUser>>(
      `/api/console/users/${encodeURIComponent(data.hashId)}/roles/${encodeURIComponent(data.role)}`,
      { method: "DELETE" }
    );
    return response.data;
  });

export const listMembers = createServerFn({ method: "GET" })
  .middleware([requireAdminSession])
  .inputValidator(listParamsSchema.extend({ is_active: z.boolean().optional() }))
  .handler(async ({ data }) => {
    return gimbleFetch<ListResponse<MemberSummary>>("/api/console/members", { query: data });
  });
