import { ServiceView } from "@/components/Views";
import { services } from "@/content/site-content";
type P = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));
export async function generateMetadata({ params }: P) { const { slug } = await params; const s = services.find((x) => x.slug === slug); return { title: s?.name.en, description: s?.blurb.en }; }
export default async function Page({ params }: P) { return <ServiceView slug={(await params).slug} />; }
