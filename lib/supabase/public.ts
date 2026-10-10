import { createClient } from "@supabase/supabase-js";
/** Anonymous server-side client for public reads/inserts (RLS limits it). Null when Supabase is not configured. */
export function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}
