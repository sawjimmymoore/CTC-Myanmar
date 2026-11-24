import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
      { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "") + "; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co; media-src 'self' blob: https:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'" },
    ] }, { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  images: {
    // Supabase Storage public URLs (uploaded gallery photos) - the project
    // ref varies per Supabase project, so this wildcards the subdomain.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Some ISPs (including in Myanmar) block or badly throttle *.supabase.co
  // directly, which breaks the browser-side calls the admin login form and
  // gallery uploader make (server-to-server calls, e.g. /api/content, are
  // unaffected since those never leave Vercel's network). These rewrites
  // let the browser talk to our own domain instead — same-origin requests
  // that this server then forwards to Supabase — so admin access no longer
  // depends on a visitor's ISP being able to reach supabase.co at all.
  // See lib/supabase/client.ts, which points the browser client here.
  async rewrites() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) return [];

    return [
      { source: "/supabase-proxy/auth/v1/:path*", destination: `${supabaseUrl}/auth/v1/:path*` },
      { source: "/supabase-proxy/rest/v1/:path*", destination: `${supabaseUrl}/rest/v1/:path*` },
      {
        source: "/supabase-proxy/storage/v1/:path*",
        destination: `${supabaseUrl}/storage/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
