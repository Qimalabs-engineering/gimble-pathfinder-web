import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden");
}

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as never);

    const [messages, subscribers] = await Promise.all([
      context.supabase
        .from("contact_submissions")
        .select("id, name, email, organization, subject, message, created_at")
        .order("created_at", { ascending: false })
        .limit(200),
      context.supabase
        .from("subscribers")
        .select("id, email, source, created_at")
        .order("created_at", { ascending: false })
        .limit(500),
    ]);

    if (messages.error) throw new Error(messages.error.message);
    if (subscribers.error) throw new Error(subscribers.error.message);

    return {
      messages: messages.data ?? [],
      subscribers: subscribers.data ?? [],
    };
  });
