"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
type Post = { id?: string; slug: string; title: string; category: string; excerpt: string; body: string; cover_url: string | null; published: boolean } | null;
const f = "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm";
const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export default function Editor({ post }: { post: Post }) {
  const r = useRouter(); const [p, setP] = useState(post ?? { slug: "", title: "", category: "Update", excerpt: "", body: "", cover_url: null, published: false });
  const [msg, setMsg] = useState(""); const set = (k: string, v: unknown) => setP((o) => ({ ...o, [k]: v }));
  async function save(published: boolean) {
    const db = createClient(); const row = { ...p, published, slug: p.slug || slugify(p.title), updated_at: new Date().toISOString() };
    if (!row.title) return setMsg("Add a title first.");
    const { error } = post?.id ? await db.from("posts").update(row).eq("id", post.id) : await db.from("posts").insert(row);
    if (error) return setMsg(error.message); setMsg(published ? "Published." : "Saved as draft."); r.push("/admin/updates"); r.refresh();
  }
  async function upload(file: File) {
    const db = createClient(); const path = `${Date.now()}-${file.name.replace(/[^\w.]/g, "_")}`;
    const { error } = await db.storage.from("media").upload(path, file); if (error) return setMsg(error.message);
    set("cover_url", db.storage.from("media").getPublicUrl(path).data.publicUrl);
  }
  async function del() { if (!post?.id || !confirm("Delete this update?")) return; await createClient().from("posts").delete().eq("id", post.id); r.push("/admin/updates"); r.refresh(); }
  return <div className="max-w-3xl space-y-4"><h1 className="text-2xl font-semibold">{post?.id ? "Edit update" : "New update"}</h1>
    <input className={f} placeholder="Title" value={p.title} onChange={(e) => set("title", e.target.value)} />
    <div className="grid gap-4 sm:grid-cols-2"><input className={f} placeholder="Slug (auto from title)" value={p.slug} onChange={(e) => set("slug", slugify(e.target.value))} /><input className={f} placeholder="Category" value={p.category} onChange={(e) => set("category", e.target.value)} /></div>
    <textarea className={f} rows={2} placeholder="Short summary" value={p.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
    <textarea className={`${f} font-mono`} rows={16} placeholder={"Write the update.\n\nBlank line = new paragraph.\n## Heading\n- list item"} value={p.body} onChange={(e) => set("body", e.target.value)} />
    <div className="flex items-center gap-4"><input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />{p.cover_url && /* eslint-disable-next-line @next/next/no-img-element */ <img src={p.cover_url} alt="" className="h-14 rounded-lg" />}</div>
    <div className="flex flex-wrap gap-3"><button onClick={() => save(true)} className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white">Publish</button><button onClick={() => save(false)} className="rounded-full border border-line bg-white px-6 py-2.5 text-sm font-semibold">Save draft</button>{post?.id && <button onClick={del} className="px-4 text-sm text-red-600">Delete</button>}</div>
    {msg && <p role="status" className="text-sm">{msg}</p>}</div>;
}
