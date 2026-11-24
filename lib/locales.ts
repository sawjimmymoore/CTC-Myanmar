export const LANGUAGES = [
  { code: "en", flag: "🇬🇧", country: "United Kingdom", language: "English", html: "en", locale: "en-GB" },
  { code: "my", flag: "🇲🇲", country: "မြန်မာ", language: "မြန်မာ", html: "my", locale: "my-MM" },
  { code: "th", flag: "🇹🇭", country: "ประเทศไทย", language: "ไทย", html: "th", locale: "th-TH" },
  { code: "zh", flag: "🇨🇳", country: "中国", language: "简体中文", html: "zh-Hans", locale: "zh-CN" },
] as const;
export type Lang = (typeof LANGUAGES)[number]["code"];
export const isLang = (value: unknown): value is Lang => LANGUAGES.some((l) => l.code === value);
export function languageHref(href: string, lang: Lang): string {
  if (!href.startsWith("/") || href.startsWith("//") || /^\/(admin|api|supabase-proxy)(\/|$)/.test(href)) return href;
  const url = new URL(href, "https://ctc.invalid");
  if (lang === "en") url.searchParams.delete("lang"); else url.searchParams.set("lang", lang);
  return url.pathname + url.search + url.hash;
}
