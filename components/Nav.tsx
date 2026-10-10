"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, CalendarCheck, FileText } from "lucide-react";
import Magnetic from "./Magnetic";
import { useLang, useTr } from "@/lib/i18n";
import { useContent } from "@/lib/content-context";
export default function Nav() {
  const [o, setO] = useState(false); const { lang, setLang } = useLang(); const tr = useTr(); const { nav } = useContent();
  const L: [string, string][] = [[tr(nav.services), "/services"], [tr(nav.who), "/for/businesses"], [tr(nav.packages), "/packages"], [tr(nav.how), "/how-it-works"], [tr(nav.updates), "/updates"], [tr(nav.about), "/about"]];
  return <><nav className="fixed inset-x-0 top-0 z-40 border-b border-hair bg-paper/80 backdrop-blur-xl"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2.5">
    <Link href="/" className="flex items-center gap-2.5" onClick={() => setO(false)}><Image src="/assets/logo-mark.png" alt="CTC logo" width={44} height={43} priority /><span className="font-accent text-lg font-semibold tracking-wide">Click to Create</span></Link>
    <div className="hidden gap-6 text-sm text-soft lg:flex">{L.map(([n, h]) => <Link key={h} href={h} className="hover:text-navy">{n}</Link>)}</div>
    <div className="flex items-center gap-2"><div className="flex rounded-full border border-hair bg-white p-0.5 text-xs font-semibold">{(["en", "my"] as const).map((l) => <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-full px-3 py-1.5 ${lang === l ? "bg-navy text-white" : "text-soft"}`}>{l === "en" ? "EN" : "မြန်မာ"}</button>)}</div>
      <Magnetic><Link href="/book" className="btn hidden sm:inline-flex">{tr(nav.book)}</Link></Magnetic>
      <button aria-label="Menu" aria-expanded={o} onClick={() => setO(!o)} className="rounded-lg p-2 lg:hidden">{o ? <X size={22} /> : <Menu size={22} />}</button></div></div>
    {o && <div className="grid gap-1 border-t border-hair bg-paper px-6 py-4 lg:hidden">{L.map(([n, h]) => <Link key={h} href={h} onClick={() => setO(false)} className="py-2 text-lg">{n}</Link>)}</div>}</nav>
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-hair bg-paper/95 backdrop-blur-xl sm:hidden"><Link href="/book" className="flex items-center justify-center gap-2 py-3 text-sm font-semibold"><CalendarCheck size={16} />{tr(nav.book)}</Link><Link href="/quote" className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-sage-deep"><FileText size={16} />{tr(nav.quote)}</Link></div></>;
}
