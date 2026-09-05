import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  subject: z.string().trim().min(1).max(100),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const subscribeSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  source: z.enum(["newsletter", "community"]),
});

// Public publishable client: RLS allows anyone to INSERT into
// contact_submissions / subscribers, but not read or delete them.
function getPublicClient() {
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ??
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
    process.env["VITE_SUPABASE_ANON_KEY"];
  if (!url || !key) {
    throw new Error("Backend connection is not configured.");
  }
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    const supabase = getPublicClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      organization: data.organization || null,
      subject: data.subject,
      message: data.message,
    });
    if (error) {
      console.error("[contact] insert failed", error.message);
      throw new Error("We couldn't send your message. Please try again.");
    }
    return { ok: true as const };
  });

export const subscribeEmail = createServerFn({ method: "POST" })
  .inputValidator(subscribeSchema)
  .handler(async ({ data }) => {
    const supabase = getPublicClient();
    const { error } = await supabase
      .from("subscribers")
      .insert({ email: data.email, source: data.source });
    // 23505 = already subscribed; treat as success
    if (error && error.code !== "23505") {
      console.error("[subscribe] insert failed", error.message);
      throw new Error("We couldn't sign you up. Please try again.");
    }
    return { ok: true as const };
  });
