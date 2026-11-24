import { generatePageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import StartClient from "./StartClient";
export async function generateMetadata() { return generatePageMetadata(); }
export default function Page() { return <Suspense><StartClient /></Suspense>; }
