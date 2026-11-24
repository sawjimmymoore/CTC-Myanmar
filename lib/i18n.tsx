"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { formatDate } from "./date-format";
import { LANGUAGES, isLang, type Lang } from "./locales";
import { translate, type Copy } from "./translate";
import { useRouter } from "next/navigation";
export { translateText } from "./translate";
export type { Lang } from "./locales";
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void } | null>(null);
export function LangProvider({ children, initialLang = "en" }: { children: ReactNode; initialLang?: Lang }) {
  const [lang, setL] = useState<Lang>(initialLang);
  const router = useRouter();
  useEffect(() => {
    const explicit = new URLSearchParams(window.location.search).get("lang");
    const stored = window.localStorage.getItem("ctc-lang");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isLang(explicit) && isLang(stored)) setL(stored);
  }, []);
  useEffect(() => { document.documentElement.lang = LANGUAGES.find((l) => l.code === lang)!.html; }, [lang]);
  const setLang = (next: Lang) => {
    setL(next); window.localStorage.setItem("ctc-lang", next);
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.delete("lang"); else url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    router.refresh();
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}
export function useLang() { const c = useContext(Ctx); if (!c) throw new Error("LangProvider missing"); return c; }
export function useTr() { const { lang } = useLang(); return (value: Copy | string | undefined) => translate(value, lang); }
export function Localized({ children }: { children: ReactNode }) {
  const tr = useTr();
  const visit = (node: ReactNode): ReactNode => typeof node === "string" ? tr(node) : Array.isArray(node) ? node.map(visit) : node;
  return <>{visit(children)}</>;
}
export function LocalDate({ value, options }: { value: string; options?: Intl.DateTimeFormatOptions }) {
  const { lang } = useLang(); return <>{formatDate(value, lang, options)}</>;
}
