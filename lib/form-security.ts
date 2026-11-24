import "server-only";
import { headers } from "next/headers";
import { createHash } from "node:crypto";
import { consumeRateLimit } from "./request-security";
export async function allowSubmission(kind: string): Promise<boolean> {
  const h = await headers();
  const ip = (h.get("x-vercel-forwarded-for") || h.get("x-real-ip") || h.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  return consumeRateLimit(createHash("sha256").update(`${kind}:${ip}`).digest("hex"));
}
