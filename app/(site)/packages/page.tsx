import { generatePageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import PackagesClient from "./PackagesClient";
export async function generateMetadata() { return generatePageMetadata(); }
export default function Page() { return <Suspense><PackagesClient /></Suspense>; }
