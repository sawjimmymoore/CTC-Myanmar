import { notFound } from "next/navigation";
import Link from "next/link";
import { publicClient } from "@/lib/supabase/public";
import { Body } from "@/lib/render";
export const revalidate = 60;
type P = { params: Promise<{ slug: string }> };
async function get(slug: string) { const db = publicClient(); if (!db) return null; const { data } = await db.from("posts").select("*").eq("slug", slug).eq("published", true).maybeSingle(); return data; }
export async function generateMetadata({ params }: P) { const p = await get((await params).slug); return { title: p?.title ?? "Update", description: p?.excerpt }; }
export default async function Post({ params }: P) {
  const p = await get((await params).slug); if (!p) notFound();
  return <article className="mx-auto max-w-3xl px-6 pb-28 pt-36"><Link href="/updates" className="text-sm text-sage-deep-deep">Back to updates</Link><small className="mt-8 block text-sage-deep-deep">{p.category} - {new Date(p.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</small>
    <h1 className="mb-8 mt-2 font-display text-6xl leading-[.95] md:text-7xl">{p.title}</h1>{p.cover_url && /* eslint-disable-next-line @next/next/no-img-element */ <img src={p.cover_url} alt="" className="mb-10 w-full rounded-3xl" />}<Body text={p.body} /></article>;
}
