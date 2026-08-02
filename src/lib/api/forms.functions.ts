import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
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
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("subscribers")
      .upsert({ email: data.email, source: data.source }, { onConflict: "email,source" });
    if (error) {
      console.error("[subscribe] insert failed", error.message);
      throw new Error("We couldn't sign you up. Please try again.");
    }
    return { ok: true as const };
  });
