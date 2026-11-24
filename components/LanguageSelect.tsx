"use client";
import { useEffect, useId, useRef } from "react";
import { useLang, useTr } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/locales";
import CountryFlag from "./CountryFlag";
export default function LanguageSelect({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLang(); const tr = useTr(); const ref = useRef<HTMLDetailsElement>(null); const id = useId();
  const current = LANGUAGES.find((l) => l.code === lang)!;
  useEffect(() => { const close = (event: PointerEvent) => { if (ref.current && !ref.current.contains(event.target as Node)) ref.current.open = false; }; document.addEventListener("pointerdown", close); return () => document.removeEventListener("pointerdown", close); }, []);
  return <details ref={ref} className="relative shrink-0" onKeyDown={(event) => { if (event.key === "Escape" && ref.current) { ref.current.open = false; ref.current.querySelector("summary")?.focus(); } }}>
    <summary aria-label={tr("Choose language")} aria-controls={id} className={`flex cursor-pointer list-none items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold [&::-webkit-details-marker]:hidden ${light ? "border-white/40 bg-navy/30 text-white" : "border-hair bg-white text-navy"}`}><CountryFlag country={lang} /><span>{current.country}</span><span aria-hidden="true">▾</span></summary>
    <div id={id} className="absolute right-0 top-full z-[60] mt-2 grid min-w-60 gap-1 rounded-2xl border border-hair bg-white p-2 text-navy shadow-xl">
      {LANGUAGES.map((language) => <button key={language.code} type="button" lang={language.html} aria-pressed={lang === language.code} onClick={() => { setLang(language.code); if (ref.current) { ref.current.open = false; ref.current.querySelector("summary")?.focus(); } }} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm hover:bg-paper ${lang === language.code ? "bg-sage-soft font-semibold" : ""}`}><CountryFlag country={language.code} /><span>{language.country}<span className="ml-1 text-xs text-soft">({language.language})</span></span></button>)}
    </div>
  </details>;
}
