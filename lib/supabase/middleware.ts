import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Refreshes the Supabase session on every request and gates /admin routes
 * behind a logged-in session (except /admin/login itself). Mirrors the
 * standard Supabase SSR middleware pattern. */
export async function updateSession(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
  const isNotConfiguredPath = request.nextUrl.pathname.startsWith("/admin/not-configured");

  // Supabase hasn't been set up yet (see ADMIN_SETUP.md) - send /admin
  // traffic to a plain informational page instead of crashing on missing
  // env vars. The rest of the site is completely unaffected.
  const supabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isAdminPath && !isNotConfiguredPath && !supabaseConfigured) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/not-configured";
    return NextResponse.redirect(url);
  }

  let response = NextResponse.next({ request });

  if (!isAdminPath) return response;

  // Not configured - this must be the /admin/not-configured page itself
  // (any other /admin path already redirected above). Return as-is without
  // touching Supabase at all, since there's nothing valid to connect to yet.
  if (!supabaseConfigured) return response;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Must match lib/supabase/client.ts and lib/supabase/server.ts — see
      // the comment in client.ts for why.
      cookieOptions: { name: "sb-ctc-auth-token" },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPath = request.nextUrl.pathname.startsWith("/admin/login");

  if (!isLoginPath && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  if (isLoginPath && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return response;
}
