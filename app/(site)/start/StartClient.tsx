"use client";
import { useSearchParams } from "next/navigation";
import { StartView } from "@/components/Views";
export default function StartClient() { return <StartView cat={useSearchParams().get("cat") ?? undefined} />; }
