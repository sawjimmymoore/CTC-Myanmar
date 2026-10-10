import { WhoView } from "@/components/Views";
import { audiences } from "@/content/site-content";
type P = { params: Promise<{ who: string }> };
export const generateStaticParams = () => audiences.map((a) => ({ who: a.slug }));
export async function generateMetadata({ params }: P) { const { who } = await params; const a = audiences.find((x) => x.slug === who); return { title: a ? `For ${a.name.en}` : "Who we help", description: a?.line.en }; }
export default async function Page({ params }: P) { return <WhoView who={(await params).who} />; }
