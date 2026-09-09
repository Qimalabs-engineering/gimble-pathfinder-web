import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  AdminUnauthorizedError,
  clearAdminSession,
  gimbleFetch,
  gimbleLogin,
} from "@/integrations/gimble/client.server";
import type { AdminSession, SingleResponse } from "@/integrations/gimble/types";

const credentialsSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(200),
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator(credentialsSchema)
  .handler(async ({ data }) => {
    // Sets the httpOnly session cookie on this domain as a side effect.
    return gimbleLogin(data.email, data.password);
  });

/**
 * Who is signed in, and what may they do.
 *
 * Returns null rather than throwing when there is no valid session, so the
 * route guard can redirect instead of rendering an error boundary. An admin
 * session lasts 8 idle hours, so hitting this expired is routine, not
 * exceptional.
 */
export const getAdminSession = createServerFn({ method: "GET" }).handler(
  async (): Promise<AdminSession | null> => {
    try {
      const response = await gimbleFetch<SingleResponse<AdminSession>>("/api/console/me");
      return response.data;
    } catch (error) {
      if (error instanceof AdminUnauthorizedError) return null;
      throw error;
    }
  }
);

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  try {
    // Destroys the session in the backend's Redis store, so the cookie cannot
    // be replayed even if it were captured.
    await gimbleFetch("/api/console/logout", { method: "POST" });
  } catch {
    // Already invalid on the backend — clearing our cookie is still correct.
  }

  clearAdminSession();
  return { ok: true as const };
});
