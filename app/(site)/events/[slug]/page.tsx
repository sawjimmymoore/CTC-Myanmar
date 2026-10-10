import { notFound } from "next/navigation";
import Link from "next/link";
import { Head } from "@/components/Site";
import { publicClient } from "@/lib/supabase/public";
import { Body } from "@/lib/render";
import RegisterForm from "./RegisterForm";
export const revalidate = 60;
type P = { params: Promise<{ slug: string }> };
async function get(slug: string) { const db = publicClient(); if (!db) return null; const { data } = await db.from("events").select("*").eq("slug", slug).eq("published", true).maybeSingle(); return data; }
export async function generateMetadata({ params }: P) { const e = await get((await params).slug); return { title: e?.title ?? "Event", description: e?.description?.slice(0, 150) }; }
export default async function Event({ params }: P) {
  const e = await get((await params).slug); if (!e) notFound(); const past = +new Date(e.starts_at) < Date.now();
  const when = new Date(e.starts_at).toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" });
  return <><Head tag={e.kind} title={e.title} sub={`${when} - ${e.online ? "Online" : e.location ?? ""}`} /><div className="bg-paper px-6 py-16"><div className="mx-auto grid max-w-[1000px] gap-10 md:grid-cols-[1.4fr_1fr]"><div><Link href="/events" className="text-sm font-semibold text-sage-deep">Back to events</Link>{e.cover_url && /* eslint-disable-next-line @next/next/no-img-element */ <img src={e.cover_url} alt="" className="my-6 w-full rounded-3xl" />}<div className="mt-6"><Body text={e.description} /></div></div>
    <aside className="h-fit rounded-3xl border border-hair bg-white p-6">{past ? <p className="text-soft">This event has ended. <Link href="/events" className="font-semibold text-sage-deep underline">See upcoming events</Link>.</p> : e.register_url ? <a href={e.register_url} className="btn w-full justify-center">Register</a> : <RegisterForm eventId={e.id} />}</aside></div></div></>;
}
