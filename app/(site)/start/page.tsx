import { Suspense } from "react";
import StartClient from "./StartClient";
export const metadata = { title: "Start your project brief", description: "Tell us about your project. Pick a category and answer a few suggested questions." };
export default function Page() { return <Suspense><StartClient /></Suspense>; }
