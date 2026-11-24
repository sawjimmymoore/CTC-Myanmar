import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isLang } from "@/lib/locales";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const response = await updateSession(request);
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }
  const requestHeaders = new Headers(request.headers);
  const language = request.nextUrl.searchParams.get("lang");
  requestHeaders.set("x-site-lang", isLang(language) ? language : "en");
  requestHeaders.set("x-site-path", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|woff2)$).*)"],
};
