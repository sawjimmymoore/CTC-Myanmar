import type { Metadata } from "next";
import { headers } from "next/headers";
import { LANGUAGES, isLang, languageHref } from "./locales";
import { translateText } from "./translate";
import { hero, services } from "../content/site-content";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ctc-myanmar.vercel.app";
const TITLES: Record<string, string> = { "/": "Click to Create (CTC).", "/services": "Services", "/packages": "Packages", "/how-it-works": "How it works", "/start": "Start your project brief", "/book": "Book a scoping call.", "/quote": "Request a quote.", "/contact": "Contact", "/about": "About CTC", "/events": "Events", "/updates": "Updates", "/privacy": "Privacy policy", "/terms": "Terms of use" };
export async function requestLanguage() {
  const value = (await headers()).get("x-site-lang"); return isLang(value) ? value : "en";
}
export async function generatePageMetadata(override?: { title?: string; description?: string }): Promise<Metadata> {
  const h = await headers(); const lang = await requestLanguage();
  const pathname = h.get("x-site-path") || "/";
  const service = services.find((s) => pathname === `/services/${s.slug}`);
  const title = translateText(override?.title || service?.name.en || TITLES[pathname] || "Click to Create (CTC).", lang);
  const description = translateText(override?.description || service?.blurb.en || hero.sub.en, lang);
  const canonical = new URL(languageHref(pathname, lang), SITE_URL).toString();
  const languages = Object.fromEntries(LANGUAGES.map((l) => [l.html, new URL(languageHref(pathname, l.code), SITE_URL).toString()]));
  const privatePage = /^\/(admin|api|supabase-proxy)(\/|$)/.test(pathname);
  return { metadataBase: new URL(SITE_URL), title: { absolute: pathname === "/" ? "Click to Create (CTC)" : `${title}, CTC` }, description, alternates: { canonical, languages: { ...languages, "x-default": new URL(pathname, SITE_URL).toString() } }, openGraph: { title, description, url: canonical, siteName: "Click to Create", locale: { en: "en_GB", my: "my_MM", th: "th_TH", zh: "zh_CN" }[lang], type: "website" }, twitter: { card: "summary_large_image", title, description }, robots: privatePage ? { index: false, follow: false } : { index: true, follow: true } };
}
