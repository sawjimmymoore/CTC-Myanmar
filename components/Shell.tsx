"use client";
import { usePathname } from "next/navigation";
import useSmoothScroll from "@/lib/useSmoothScroll";
import { LangProvider } from "@/lib/i18n";
import { ContentProvider } from "@/lib/content-context";
import CursorGlow from "./CursorGlow";
import CookieConsent from "./CookieConsent";
import BackToTop from "./BackToTop";
export default function Shell({ children }: { children: React.ReactNode }) {
  useSmoothScroll(); const admin = usePathname().startsWith("/admin");
  return <LangProvider><ContentProvider>{children}{!admin && <><CursorGlow /><CookieConsent /><BackToTop /></>}</ContentProvider></LangProvider>;
}
