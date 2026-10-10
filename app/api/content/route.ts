import { NextResponse, type NextRequest } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import * as defaults from "@/content/site-content";
import { SECTION_KEYS } from "@/lib/content-context";
export async function GET(request: NextRequest) {
  const wantsPreview = request.nextUrl.searchParams.get("preview") === "1"; let allowPreview = false;
  if (wantsPreview) { const { data: { user } } = await (await createClient()).auth.getUser(); allowPreview = !!user; }
  const out: Record<string, unknown> = {};
  try {
    const { data, error } = await createAdminClient().from("content_blocks").select("key, draft, published");
    if (error) throw error;
    for (const r of data ?? []) out[r.key] = allowPreview ? r.draft : r.published;
  } catch { /* Supabase not configured: fall back to bundled defaults below */ }
  for (const k of SECTION_KEYS) if (out[k] == null) out[k] = (defaults as Record<string, unknown>)[k];
  return NextResponse.json(out, { headers: { "Cache-Control": allowPreview ? "no-store" : "public, max-age=30" } });
}
