import { NextResponse, type NextRequest } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import * as defaults from "@/content/site-content";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** PUT { key, draft } - saves edits for one content section without
 * publishing them yet. */
export async function PUT(request: NextRequest) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { key, draft } = await request.json();
  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });

  const admin = createAdminClient();
  const { data: row } = await admin.from("content_blocks").select("key").eq("key", key).maybeSingle();
  const { error } = row
    ? await admin.from("content_blocks").update({ draft, updated_by: user.id }).eq("key", key)
    : await admin.from("content_blocks").insert({ key, draft, published: (defaults as Record<string, unknown>)[key] ?? draft, updated_by: user.id });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

/** POST { key } - publishes the current draft for one section (copies
 * draft -> published). Pass { key: "*" } to publish every section at once. */
export async function POST(request: NextRequest) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { key } = await request.json();
  const admin = createAdminClient();

  if (key === "*") {
    const { data, error: readError } = await admin.from("content_blocks").select("key, draft");
    if (readError) return NextResponse.json({ error: readError.message }, { status: 500 });

    for (const row of data ?? []) {
      const { error } = await admin
        .from("content_blocks")
        .update({ published: row.draft, updated_by: user.id })
        .eq("key", row.key);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, published: (data ?? []).length });
  }

  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });

  const { data: row, error: readError } = await admin
    .from("content_blocks")
    .select("draft")
    .eq("key", key)
    .single();
  if (readError) return NextResponse.json({ error: readError.message }, { status: 500 });

  const { error } = await admin
    .from("content_blocks")
    .update({ published: row.draft, updated_by: user.id })
    .eq("key", key);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
