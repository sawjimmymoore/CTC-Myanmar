import { createAdminClient } from "@/lib/supabase/server";
import { publicClient } from "@/lib/supabase/public";
import { confirmMail, confirmationsOn, sendMail, teamMail } from "@/lib/mail";
/** Server-side client: service role if available (bypasses RLS), otherwise the anon client. */
function db() { if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) { try { return createAdminClient(); } catch { /* fall through */ } } return publicClient(); }
export async function store(table: string, row: Record<string, unknown>): Promise<{ ok: boolean; code?: string }> {
  const c = db(); if (!c) return { ok: false, code: "NO_DB" };
  const { error } = await c.from(table).insert(row);
  if (error) { console.error(`[db] insert into ${table} failed:`, error.code, error.message); return { ok: false, code: error.code || "ERR" }; }
  return { ok: true };
}
export async function lookupEventTitle(id: string): Promise<string> { const c = db(); if (!c) return ""; const { data } = await c.from("events").select("title").eq("id", id).maybeSingle(); return data?.title ?? ""; }
/** Saves nothing itself. Sends the team notification and, when enabled, the confirmation. Returns whether the team email went out. */
export async function notify(o: { kind: string; fields: [string, string][]; email: string; name: string; confirmSubject: string; confirmIntro: string; confirmFields?: [string, string][] }): Promise<boolean> {
  const team = await sendMail(teamMail(o.kind, o.fields, o.email));
  if (confirmationsOn()) await sendMail(confirmMail(o.email, o.name, o.confirmSubject, o.confirmIntro, o.confirmFields ?? o.fields.filter(([k]) => !["Email", "Phone"].includes(k))));
  return team;
}
