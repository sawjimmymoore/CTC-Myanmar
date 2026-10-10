import { HomeView } from "@/components/Views";
import { publicClient } from "@/lib/supabase/public";
export const revalidate = 60;
export default async function Home() {
  const db = publicClient();
  const { data } = db ? await db.from("posts").select("slug,title,category,excerpt").eq("published", true).order("published_at", { ascending: false }).limit(3) : { data: null };
  return <HomeView posts={data ?? []} />;
}
