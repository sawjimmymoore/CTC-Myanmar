import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
export default async function Dash() {
  const s = await createClient();
  const c = async (t: string, f?: [string, unknown]) => { let q = s.from(t).select("*", { count: "exact", head: true }); if (f) q = q.eq(f[0], f[1] as never); return (await q).count ?? 0; };
  const [np, nb, nm, pub] = await Promise.all([c("posts"), c("bookings", ["status", "new"]), c("contact_messages", ["read", false]), c("posts", ["published", true])]);
  const cards = [["New bookings", nb, "/admin/bookings"], ["Unread messages", nm, "/admin/messages"], ["Published updates", pub, "/admin/updates"], ["All updates", np, "/admin/updates"]] as const;
  return <><h1 className="mb-6 text-2xl font-semibold">Dashboard</h1><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([n, v, h]) => <Link key={n} href={h} className="rounded-2xl border border-line bg-white p-5"><p className="text-sm text-ink/60">{n}</p><b className="text-4xl">{v}</b></Link>)}</div>
    <Link href="/admin/updates/new" className="mt-8 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white">Write an update</Link></>;
}
