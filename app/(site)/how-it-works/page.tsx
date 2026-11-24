import { generatePageMetadata } from "@/lib/seo";
import { HowView } from "@/components/Views";
export async function generateMetadata() { return generatePageMetadata(); }
export default function P() { return <HowView />; }
