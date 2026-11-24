import type { MetadataRoute } from "next";
import { LANGUAGES, languageHref } from "@/lib/locales";
import { SITE_URL } from "@/lib/seo";
import { services } from "@/content/site-content";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services", ...services.map((s) => `/services/${s.slug}`), "/packages", "/how-it-works", "/start", "/book", "/quote", "/contact", "/about", "/events", "/updates", "/privacy", "/terms"];
  return paths.flatMap((path) => LANGUAGES.map((lang) => ({ url: new URL(languageHref(path, lang.code), SITE_URL).toString(), alternates: { languages: Object.fromEntries(LANGUAGES.map((l) => [l.html, new URL(languageHref(path, l.code), SITE_URL).toString()])) }, changeFrequency: "monthly" as const, priority: path === "/" ? 1 : path.startsWith("/services") ? .8 : .6 })));
}
