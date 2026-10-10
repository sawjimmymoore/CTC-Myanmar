import Link from "next/link";
import { Head } from "@/components/Site";
import { CtaBand } from "@/components/Blocks";
import { publicClient } from "@/lib/supabase/public";
export const revalidate = 60;
export const metadata = { title: "Events", description: "Workshops, webinars and launches from CTC." };
type E = { slug: string; title: string; kind: string; starts_at: string; location: string | null; online: boolean; description: string };
const Card = ({ e, past }: { e: E; past?: boolean }) => <Link href={`/events/${e.slug}`} className={`card-glow flex gap-5 rounded-3xl border border-hair bg-white p-6 ${past ? "opacity-70" : ""}`}><div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-navy text-center text-white"><span className="font-display text-3xl leading-none">{new Date(e.starts_at).getDate()}</span><span className="-mt-3 text-[10px] uppercase">{new Date(e.starts_at).toLocaleString("en", { month: "short" })}</span></div><div><small className="eyebrow">{e.kind}{e.online ? " - Online" : e.location ? ` - ${e.location}` : ""}</small><h3 className="h-sec mt-1 text-xl">{e.title}</h3><p className="mt-1 line-clamp-2 text-sm text-soft">{e.description}</p></div></Link>;
export default async function Events() {
  const db = publicClient(); const { data } = db ? await db.from("events").select("slug,title,kind,starts_at,location,online,description").eq("published", true).order("starts_at") : { data: [] };
  const now = Date.now(); const all = (data ?? []) as E[]; const up = all.filter((e) => +new Date(e.starts_at) >= now); const past = all.filter((e) => +new Date(e.starts_at) < now).reverse();
  return <><Head tag="Events" title="Workshops, webinars and launches." sub="Learn how to run your website, systems and content, and meet the CTC team." />
    <section className="bg-paper px-6 py-20"><div className="mx-auto max-w-[1180px]"><h2 className="h-sec mb-6 text-3xl">Upcoming</h2><div className="grid gap-4 md:grid-cols-2">{up.length === 0 && <div className="rounded-3xl border border-dashed border-navy/25 p-8 text-soft md:col-span-2">No events scheduled right now. <Link href="/contact" className="font-semibold text-sage-deep underline">Tell us what you would like to learn</Link> and we will plan it.</div>}{up.map((e) => <Card key={e.slug} e={e} />)}</div>
      {past.length > 0 && <><h2 className="h-sec mb-6 mt-16 text-3xl">Past events</h2><div className="grid gap-4 md:grid-cols-2">{past.map((e) => <Card key={e.slug} e={e} past />)}</div></>}</div></section><CtaBand title="Want a workshop for your team?" /></>;
}
