import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { gimbleFetch } from "@/integrations/gimble/client.server";

/**
 * Public website forms.
 *
 * These post to the Gimble backend's unauthenticated /api/public endpoints,
 * which replaced the Supabase anon-insert path. The backend owns validation,
 * rate limiting and honeypot handling; the schemas here exist to give the
 * visitor an immediate, specific error instead of a round trip.
 *
 * `subscribeEmail`'s signature is unchanged from the Supabase version because
 * site-footer.tsx and community.tsx both call it.
 */

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  subject: z.string().trim().min(1).max(100),
  message: z.string().trim().min(1, "Message is required").max(2000),
  // Honeypot. Rendered hidden, so a real visitor never fills it.
  website: z.string().max(255).optional().or(z.literal("")),
});

const subscribeSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  source: z.enum(["newsletter", "community"]),
  website: z.string().max(255).optional().or(z.literal("")),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    try {
      await gimbleFetch("/api/public/contact", {
        method: "POST",
        authenticated: false,
        body: {
          name: data.name,
          email: data.email,
          organization: data.organization || null,
          subject: data.subject,
          message: data.message,
          website: data.website || "",
        },
      });
    } catch (error) {
      // The backend's message may name an internal endpoint, so it is logged
      // rather than shown.
      console.error("[contact] submit failed", error);
      throw new Error("We couldn't send your message. Please try again.");
    }

    return { ok: true as const };
  });

export const subscribeEmail = createServerFn({ method: "POST" })
  .inputValidator(subscribeSchema)
  .handler(async ({ data }) => {
    try {
      // Already-subscribed is a success on the backend, so there is no
      // duplicate case to special-case here (the old code had to check for
      // Postgres error 23505).
      await gimbleFetch("/api/public/subscribe", {
        method: "POST",
        authenticated: false,
        body: {
          email: data.email,
          source: data.source,
          website: data.website || "",
        },
      });
    } catch (error) {
      console.error("[subscribe] failed", error);
      throw new Error("We couldn't sign you up. Please try again.");
    }

    return { ok: true as const };
  });
