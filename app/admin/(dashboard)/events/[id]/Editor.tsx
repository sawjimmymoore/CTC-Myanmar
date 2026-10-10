"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
type Ev = { id?: string; slug: string; title: string; kind: string; starts_at: string; location: string | null; online: boolean; description: string; cover_url: string | null; register_url: string | null; published: boolean } | null;
const f = "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm";
const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const toLocal = (d: string) => d ? new Date(new Date(d).getTime() - new Date(d).getTimezoneOffset() * 60000).toISOString().slice(0, 16) : "";
export default function Editor({ ev }: { ev: Ev }) {
  const r = useRouter(); const [p, setP] = useState(ev ?? { slug: "", title: "", kind: "Workshop", starts_at: "", location: "", online: false, description: "", cover_url: null, register_url: "", published: false });
  const [msg, setMsg] = useState(""); const set = (k: string, v: unknown) => setP((o) => ({ ...o, [k]: v }));
  async function save(published: boolean) {
    if (!p.title || !p.starts_at) return setMsg("Add a title and a start time.");
    const row = { ...p, published, slug: p.slug || slugify(p.title), starts_at: new Date(p.starts_at).toISOString(), register_url: p.register_url || null };
    const db = createClient(); const { error } = ev?.id ? await db.from("events").update(row).eq("id", ev.id) : await db.from("events").insert(row);
    if (error) return setMsg(error.message); r.push("/admin/events"); r.refresh();
  }
  async function del() { if (!ev?.id || !confirm("Delete this event?")) return; await createClient().from("events").delete().eq("id", ev.id); r.push("/admin/events"); r.refresh(); }
  return <div className="max-w-3xl space-y-4"><h1 className="text-2xl font-semibold">{ev?.id ? "Edit event" : "New event"}</h1>
    <input className={f} placeholder="Title" value={p.title} onChange={(e) => set("title", e.target.value)} />
    <div className="grid gap-4 sm:grid-cols-3"><input className={f} placeholder="Type (Workshop, Webinar...)" value={p.kind} onChange={(e) => set("kind", e.target.value)} /><input type="datetime-local" className={f} value={toLocal(p.starts_at)} onChange={(e) => set("starts_at", e.target.value)} /><input className={f} placeholder="Slug (auto)" value={p.slug} onChange={(e) => set("slug", slugify(e.target.value))} /></div>
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.online} onChange={(e) => set("online", e.target.checked)} />Online event</label>
    {!p.online && <input className={f} placeholder="Location" value={p.location ?? ""} onChange={(e) => set("location", e.target.value)} />}
    <input className={f} placeholder="External registration link (optional, replaces the built-in form)" value={p.register_url ?? ""} onChange={(e) => set("register_url", e.target.value)} />
    <textarea className={`${f} font-mono`} rows={12} placeholder={"Describe the event.\n\nBlank line = new paragraph.\n## Heading\n- list item"} value={p.description} onChange={(e) => set("description", e.target.value)} />
    <div className="flex flex-wrap gap-3"><button onClick={() => save(true)} className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white">Publish</button><button onClick={() => save(false)} className="rounded-full border border-line bg-white px-6 py-2.5 text-sm font-semibold">Save draft</button>{ev?.id && <button onClick={del} className="px-4 text-sm text-red-600">Delete</button>}</div>{msg && <p role="status" className="text-sm">{msg}</p>}</div>;
}
