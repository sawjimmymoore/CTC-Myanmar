"use client";

import { createBrowserClient } from "@supabase/ssr";

/** Browser-side Supabase client - used by the admin login form and any
 * client component that needs the current session directly. */
export function createClient() {
  // Routed through our own domain (see next.config.ts rewrites) rather than
  // the real Supabase URL directly — some ISPs (including in Myanmar) block
  // or badly throttle *.supabase.co, which otherwise breaks admin login and
  // uploads with a plain "Failed to fetch" and no further detail.
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/supabase-proxy`
      : process.env.NEXT_PUBLIC_SUPABASE_URL!;

  return createBrowserClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    // Must match lib/supabase/server.ts and lib/supabase/middleware.ts.
    // Without this, each client falls back to a cookie name derived from
    // its own URL's hostname — our own domain here vs the real Supabase
    // project ref on the server side — so the server would never see the
    // session this client just set, and login would silently bounce back
    // to /admin/login every time even when signInWithPassword succeeds.
    cookieOptions: { name: "sb-ctc-auth-token" },
  });
}
