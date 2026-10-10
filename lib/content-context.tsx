"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as defaults from "@/content/site-content";
export const SECTION_KEYS = ["nav", "hero", "problem", "steps", "audiences", "services", "siteTypes", "platforms", "packages", "why", "about", "faq", "cta", "footer"] as const;
export type SiteContent = Pick<typeof defaults, (typeof SECTION_KEYS)[number]>;
const base = () => Object.fromEntries(SECTION_KEYS.map((k) => [k, (defaults as Record<string, unknown>)[k]])) as unknown as SiteContent;
const Ctx = createContext<{ content: SiteContent; isPreview: boolean } | null>(null);
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(base); const [isPreview, setP] = useState(false);
  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("preview") === "1";
    const load = () => fetch(`/api/content${preview ? "?preview=1" : ""}`, { cache: "no-store" }).then((r) => r.json()).then((d) => setContent((p) => ({ ...p, ...Object.fromEntries(Object.entries(d).filter(([k, v]) => (SECTION_KEYS as readonly string[]).includes(k) && v)) }))).catch(() => {});
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setP(preview); load(); if (preview) { const i = setInterval(load, 2500); return () => clearInterval(i); }
  }, []);
  return <Ctx.Provider value={{ content, isPreview }}>{children}</Ctx.Provider>;
}
export function useContent() { const c = useContext(Ctx); if (!c) throw new Error("ContentProvider missing"); return c.content; }
