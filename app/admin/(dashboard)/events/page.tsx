import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
export default async function List() {
  const { data } = await (await createClient()).from("events").select("id,title,kind,starts_at,published").order("starts_at", { ascending: false });
  return <><div className="mb-6 flex items-center justify-between"><h1 className="text-2xl font-semibold">Events</h1><Link href="/admin/events/new" className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white">New event</Link></div>
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">{(data ?? []).map((p) => <Link key={p.id} href={`/admin/events/${p.id}`} className="flex items-center justify-between px-5 py-4 hover:bg-paper"><span><b className="text-sm">{p.title}</b><small className="block text-navy/55">{p.kind} - {new Date(p.starts_at).toLocaleString("en-GB")}</small></span><span className={`rounded-full px-3 py-1 text-xs ${p.published ? "bg-sage/30" : "bg-navy/10"}`}>{p.published ? "Published" : "Draft"}</span></Link>)}{!data?.length && <p className="p-5 text-sm text-navy/60">No events yet.</p>}</div></>;
}
