import { Suspense } from "react";
import PackagesClient from "./PackagesClient";
export const metadata = { title: "Packages", description: "Website, business system, AI workflow, marketing, video and care packages with add-ons. Request a fixed written quotation." };
export default function Page() { return <Suspense><PackagesClient /></Suspense>; }
