"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
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
export function useTr() { const { lang } = useLang(); return (p: { en: string; my?: string } | string | undefined) => !p ? "" : typeof p === "string" ? p : lang === "my" && p.my ? p.my : p.en; }
