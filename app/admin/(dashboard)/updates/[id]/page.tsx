import { createClient } from "@/lib/supabase/server";
import Editor from "./Editor";
export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = id === "new" ? null : (await (await createClient()).from("posts").select("*").eq("id", id).maybeSingle()).data;
  return <Editor post={post} />;
}
