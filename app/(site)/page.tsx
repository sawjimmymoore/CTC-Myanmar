import { HomeView } from "@/components/Views";
import { publicClient } from "@/lib/supabase/public";
export const revalidate = 60;
export default async function Home() {
  const db = publicClient();
  const [p, e] = db ? await Promise.all([db.from("posts").select("slug,title,category,excerpt").eq("published", true).order("published_at", { ascending: false }).limit(3), db.from("events").select("slug,title,kind,starts_at,location,online").eq("published", true).gte("starts_at", new Date().toISOString()).order("starts_at").limit(3)]) : [{ data: null }, { data: null }];
  return <HomeView posts={p.data ?? []} events={e.data ?? []} />;
}
