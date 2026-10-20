"use client";
import { useSearchParams } from "next/navigation";
import { PackagesView } from "@/components/Views";
export default function PackagesClient() { return <PackagesView cat={useSearchParams().get("cat") ?? undefined} />; }
