"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import legacyMyanmar from "@/content/legacy-myanmar.json";
import { myanmar, MY_COPY } from "@/content/myanmar";
import { formatDate } from "./date-format";
import { plainCopy } from "./copy-style";
export type Lang = "en" | "my";
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void } | null>(null);
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setL] = useState<Lang>("en");
  useEffect(() => { const s = window.localStorage.getItem("ctc-lang"); // eslint-disable-next-line react-hooks/set-state-in-effect
    if (s === "en" || s === "my") setL(s); }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { setL(l); window.localStorage.setItem("ctc-lang", l); };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}
export function useLang() { const c = useContext(Ctx); if (!c) throw new Error("LangProvider missing"); return c; }
/** Returns a function that picks the current language, falling back to English when Burmese is empty. */
export function useTr() { const { lang } = useLang(); return (p: { en: string; my?: string } | string | undefined) => plainCopy(!p ? "" : typeof p === "string" ? lang === "my" ? translateText(p) : p : lang === "my" ? (!p.my || p.my === (legacyMyanmar as Record<string, string>)[p.en]) ? translateText(p.en) : p.my : p.en); }

/** Stable English identifiers stay in URLs, selections and form values; only display text changes. */
export function translateText(text: string): string {
  const trimmed = text.trim();
  if (MY_COPY[trimmed]) return text.replace(trimmed, myanmar(trimmed));
  for (const [prefix, suffix] of [["Packages for ", " အတွက် ပက်ကေ့ချ်များ"], ["Add-ons for ", " အတွက် ထပ်ဆောင်းဝန်ဆောင်မှုများ"]]) {
    if (trimmed.startsWith(prefix)) return translateText(trimmed.slice(prefix.length)) + suffix;
  }
  if (trimmed.includes(" + ")) return trimmed.split(" + ").map(translateText).join(" + ");
  if (trimmed.endsWith(" and more")) return trimmed.slice(0, -9).split(", ").map(translateText).join("၊ ") + " နှင့် အခြားဝန်ဆောင်မှုများ";
  const booking = /^Booked for (.+) at (.+) \(Myanmar time\)\. We will confirm by email\.$/.exec(trimmed);
  if (booking) return `${booking[1]}၊ ${booking[2]} (မြန်မာစံတော်ချိန်) အတွက် တောင်းဆိုချက် လက်ခံရရှိပါပြီ။ Email ဖြင့် အချိန်အတည်ပြုပေးပါမယ်။`;
  return text;
}

/** No extra DOM element: also usable from server-rendered public pages. */
export function Localized({ children }: { children: ReactNode }) {
  const tr = useTr();
  const visit = (node: ReactNode): ReactNode => typeof node === "string" ? tr(node) : Array.isArray(node) ? node.map(visit) : node;
  return <>{visit(children)}</>;
}

export function LocalDate({ value, options }: { value: string; options?: Intl.DateTimeFormatOptions }) {
  const { lang } = useLang();
  return <>{formatDate(value, lang, options)}</>;
}
