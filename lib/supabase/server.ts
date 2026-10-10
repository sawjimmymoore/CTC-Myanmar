import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/** Server-side Supabase client (Server Components, Route Handlers, Server
 * Actions) bound to the request's cookies, so it reads the same session
 * the browser client set at login. Uses the anon key + RLS - this client
 * only ever does what a logged-in admin is allowed to do. */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Must match lib/supabase/client.ts and lib/supabase/middleware.ts —
      // see the comment in client.ts for why.
      cookieOptions: { name: "sb-ctc-auth-token" },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component render - middleware refreshes
            // the session instead, so this is safe to ignore.
          }
        },
      },
    }
  );
}

/** Admin-privileged client for trusted server-only routes: reads/writes
 * content_blocks regardless of RLS. Never import this into client code -
 * the service role key must never reach the browser bundle. */
export function createAdminClient() {
  return createSupabaseAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
