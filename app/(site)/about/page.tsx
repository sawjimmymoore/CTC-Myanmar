import { generatePageMetadata } from "@/lib/seo";
import { AboutView } from "@/components/Views";
export async function generateMetadata() { return generatePageMetadata(); }
export default function P() { return <AboutView />; }
