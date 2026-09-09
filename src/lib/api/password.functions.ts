import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { gimbleFetch } from "@/integrations/gimble/client.server";

/**
 * Password reset, for members and admins alike.
 *
 * Reset emails now link to https://www.gimblefoundation.org/reset-password,
 * so this site serves the page and proxies to the backend's existing public
 * endpoints. Previously the link went to a usegimble.io universal link that
 * only resolved if the mobile app was installed.
 */

/**
 * Ask for a reset email.
 *
 * ALWAYS reports success, even for an address with no account — the backend
 * does the same. Anything else turns this into an oracle for which email
 * addresses are registered.
 */
export const requestPasswordReset = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().trim().email().max(255) }))
  .handler(async ({ data }) => {
    try {
      await gimbleFetch("/api/password_reset", {
        method: "POST",
        authenticated: false,
        body: { email: data.email },
      });
    } catch (error) {
      console.error("[password-reset] request failed", error);
    }

    return { ok: true as const };
  });

/**
 * Check a token before showing the new-password form, so an expired link says
 * so instead of failing after the visitor has typed a password twice.
 */
export const verifyResetToken = createServerFn({ method: "GET" })
  .inputValidator(z.object({ token: z.string().min(1).max(512) }))
  .handler(async ({ data }) => {
    try {
      const response = await gimbleFetch<{
        token_status_key?: number;
        user_email?: string;
        expires_at?: string;
      }>("/api/password_reset", {
        authenticated: false,
        query: { token: data.token },
      });

      // The backend uses 2 for "valid" and 1 for "invalid or expired".
      return {
        valid: response?.token_status_key === 2,
        email: response?.user_email ?? null,
      };
    } catch (error) {
      console.error("[password-reset] verify failed", error);
      return { valid: false, email: null };
    }
  });

export const completePasswordReset = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string().min(1).max(512),
      // Mirrors the backend's minimum so the visitor hears about it before a
      // round trip.
      new_password: z.string().min(8, "Use at least 8 characters").max(200),
    })
  )
  .handler(async ({ data }) => {
    try {
      await gimbleFetch("/api/password_change", {
        method: "PUT",
        authenticated: false,
        body: { token: data.token, new_password: data.new_password },
      });
    } catch (error) {
      console.error("[password-reset] complete failed", error);
      throw new Error(
        "That reset link is no longer valid. Please request a new one."
      );
    }

    return { ok: true as const };
  });
