import { generatePageMetadata } from "@/lib/seo";
import { ServicesView } from "@/components/Views";
export async function generateMetadata() { return generatePageMetadata(); }
export default function P() { return <ServicesView />; }
