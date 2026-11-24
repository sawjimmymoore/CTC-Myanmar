"use client";
import { usePathname } from "next/navigation";
import useSmoothScroll from "@/lib/useSmoothScroll";
import { LangProvider } from "@/lib/i18n";
import type { Lang } from "@/lib/locales";
import { ContentProvider } from "@/lib/content-context";
import CursorGlow from "./CursorGlow";
import CookieConsent from "./CookieConsent";
import BackToTop from "./BackToTop";
export default function Shell({ children, initialLang }: { children: React.ReactNode; initialLang?: Lang }) {
  useSmoothScroll(); const admin = usePathname().startsWith("/admin");
  return <LangProvider initialLang={initialLang}><ContentProvider>{children}{!admin && <><CursorGlow /><CookieConsent /><BackToTop /></>}</ContentProvider></LangProvider>;
}
