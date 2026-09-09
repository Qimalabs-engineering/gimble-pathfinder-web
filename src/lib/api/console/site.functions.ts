import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireAdminSession } from "@/integrations/gimble/auth-middleware";
import { gimbleFetch } from "@/integrations/gimble/client.server";
import type {
  ContactSubmission,
  ListResponse,
  SingleResponse,
  Subscriber,
} from "@/integrations/gimble/types";

/**
 * Console: the contact inbox and the mailing list.
 *
 * Filters travel as URL search params so they survive a refresh and a shared
 * link, which is why they are validated here and passed through rather than
 * held in component state.
 */

const listParamsSchema = z.object({
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  q: z.string().trim().max(200).optional(),
  sort: z.string().max(50).optional(),
});

const contactListSchema = listParamsSchema.extend({
  status: z.enum(["new", "read", "replied", "spam", "archived"]).optional(),
});

export const listContactSubmissions = createServerFn({ method: "GET" })
  .middleware([requireAdminSession])
  .inputValidator(contactListSchema)
  .handler(async ({ data }) => {
    return gimbleFetch<ListResponse<ContactSubmission>>("/api/console/contact-submissions", {
      query: data,
    });
  });

export const getContactSubmission = createServerFn({ method: "GET" })
  .middleware([requireAdminSession])
  .inputValidator(z.object({ hashId: z.string().min(1).max(64) }))
  .handler(async ({ data }) => {
    const response = await gimbleFetch<SingleResponse<ContactSubmission>>(
      `/api/console/contact-submissions/${encodeURIComponent(data.hashId)}`
    );
    return response.data;
  });

export const updateContactSubmission = createServerFn({ method: "POST" })
  .middleware([requireAdminSession])
  .inputValidator(
    z.object({
      hashId: z.string().min(1).max(64),
      status: z.enum(["new", "read", "replied", "spam", "archived"]).optional(),
      internal_note: z.string().max(2000).optional(),
    })
  )
  .handler(async ({ data }) => {
    const { hashId, ...body } = data;
    const response = await gimbleFetch<SingleResponse<ContactSubmission>>(
      `/api/console/contact-submissions/${encodeURIComponent(hashId)}`,
      { method: "PATCH", body }
    );
    return response.data;
  });

export const deleteContactSubmission = createServerFn({ method: "POST" })
  .middleware([requireAdminSession])
  .inputValidator(z.object({ hashId: z.string().min(1).max(64) }))
  .handler(async ({ data }) => {
    await gimbleFetch(`/api/console/contact-submissions/${encodeURIComponent(data.hashId)}`, {
      method: "DELETE",
    });
    return { ok: true as const };
  });

const subscriberListSchema = listParamsSchema.extend({
  status: z.enum(["subscribed", "unsubscribed", "bounced", "complained"]).optional(),
  source: z.enum(["newsletter", "community", "contact_form", "import"]).optional(),
});

export const listSubscribers = createServerFn({ method: "GET" })
  .middleware([requireAdminSession])
  .inputValidator(subscriberListSchema)
  .handler(async ({ data }) => {
    return gimbleFetch<ListResponse<Subscriber>>("/api/console/subscribers", { query: data });
  });

export const updateSubscriber = createServerFn({ method: "POST" })
  .middleware([requireAdminSession])
  .inputValidator(
    z.object({
      hashId: z.string().min(1).max(64),
      status: z.enum(["subscribed", "unsubscribed", "bounced", "complained"]),
    })
  )
  .handler(async ({ data }) => {
    const response = await gimbleFetch<SingleResponse<Subscriber>>(
      `/api/console/subscribers/${encodeURIComponent(data.hashId)}`,
      { method: "PATCH", body: { status: data.status } }
    );
    return response.data;
  });

/**
 * Export the mailing list as CSV text.
 *
 * Returned as a string for the browser to turn into a download, rather than
 * linking straight at the backend: the backend is a different origin that the
 * browser holds no session for, so a plain link would 401.
 */
export const exportSubscribersCsv = createServerFn({ method: "GET" })
  .middleware([requireAdminSession])
  .handler(async () => {
    const response = await gimbleFetch<Response>("/api/console/subscribers/export.csv", {
      raw: true,
    });
    return { csv: await response.text() };
  });
