import { LocalDate, Localized } from "@/lib/i18n";
import Link from "next/link";
import { Head } from "@/components/Site";
import { publicClient } from "@/lib/supabase/public";
export const revalidate = 60;
export const metadata = { title: "Updates" };
export default async function Updates() {
  const db = publicClient();
  const { data } = db ? await db.from("posts").select("slug,title,category,excerpt,cover_url,published_at").eq("published", true).order("published_at", { ascending: false }) : { data: [] };
  return <><Head tag="Updates" title="News, launches and guides." sub="What CTC is building, learning and shipping." />
    <div className="mx-auto grid max-w-6xl gap-5 px-6 pb-28 md:grid-cols-3">{(data ?? []).length === 0 && <p className="text-soft"><Localized>{"No updates yet. Check back soon."}</Localized></p>}
      {(data ?? []).map((p) => <Link key={p.slug} href={`/updates/${p.slug}`} className="overflow-hidden rounded-3xl border border-hair transition hover:bg-white">{p.cover_url && /* eslint-disable-next-line @next/next/no-img-element */ <img src={p.cover_url} alt="" className="aspect-video w-full object-cover" />}<div className="p-6"><small className="text-sage-deep-deep"><Localized>{p.category}</Localized><Localized>{" - "}</Localized><LocalDate value={p.published_at} options={{ day: "numeric", month: "short", year: "numeric" }} /></small><h2 className="mt-2 text-xl font-semibold"><Localized>{p.title}</Localized></h2><p className="mt-2 text-sm text-soft"><Localized>{p.excerpt}</Localized></p></div></Link>)}</div></>;
}
