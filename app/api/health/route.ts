import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
/** Setup check: open /api/health to see what is configured. Shows yes/no only, never secret values. */
export async function GET() {
  const env = { NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY: !!process.env.RESEND_API_KEY, MAIL_FROM: !!process.env.MAIL_FROM, NOTIFY_EMAIL: process.env.NOTIFY_EMAIL || "info@ctcmyanmar.com (default)", SEND_CONFIRMATIONS: process.env.SEND_CONFIRMATIONS !== "false" };
  const tables: Record<string, string> = {};
  if (env.NEXT_PUBLIC_SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
    const c = createAdminClient();
    for (const t of ["bookings", "contact_messages", "event_registrations", "events", "posts", "content_blocks"]) { const { error } = await c.from(t).select("*", { count: "exact", head: true }); tables[t] = error ? `MISSING OR BLOCKED (${error.code}: ${error.message.slice(0, 80)})` : "ok"; }
  } else tables.note = "Add SUPABASE_SERVICE_ROLE_KEY to check the tables.";
  const ready = env.NEXT_PUBLIC_SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY && Object.values(tables).every((v) => v === "ok");
  return NextResponse.json({ forms_save_to_admin: !!ready, emails_enabled: env.RESEND_API_KEY, env, tables });
}
