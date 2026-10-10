import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
export default async function List() {
  const { data } = await (await createClient()).from("posts").select("id,title,category,published,published_at").order("published_at", { ascending: false });
  return <><div className="mb-6 flex items-center justify-between"><h1 className="text-2xl font-semibold">Updates</h1><Link href="/admin/updates/new" className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white">New update</Link></div>
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">{(data ?? []).map((p) => <Link key={p.id} href={`/admin/updates/${p.id}`} className="flex items-center justify-between px-5 py-4 hover:bg-paper"><span><b className="text-sm">{p.title}</b><small className="block text-ink/55">{p.category}</small></span><span className={`rounded-full px-3 py-1 text-xs ${p.published ? "bg-sage/30" : "bg-gold/20"}`}>{p.published ? "Published" : "Draft"}</span></Link>)}{!data?.length && <p className="p-5 text-sm text-ink/60">Nothing yet. Write your first update.</p>}</div></>;
}
