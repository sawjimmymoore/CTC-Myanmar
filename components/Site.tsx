"use client";
import { Localized } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";
import { EMAIL } from "@/content/site-content";
import { useTr } from "@/lib/i18n";
import { useContent } from "@/lib/content-context";
export function Words({ text, base = 0 }: { text: string; base?: number }) {
  return <>{text.split(" ").map((w, i) => <span key={i + w}><span className="wd"><i style={{ "--n": i + base } as React.CSSProperties}><Localized>{w}</Localized></i></span><Localized>{" "}</Localized></span>)}</>;
}
export function ContactLines({ dark = false }: { dark?: boolean }) {
  const { contact, footer } = useContent(); const tr = useTr();
  if (!contact.phone && !contact.viber && !contact.telegram) return <span className={dark ? "text-soft" : "text-white/60"}><Localized>{tr(footer.phone)}</Localized></span>;
  return <div className={`mt-1 flex flex-wrap gap-3 font-semibold ${dark ? "text-navy" : "text-white/80"}`}>{contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, "")}`}><Localized>{"Call "}</Localized><Localized>{contact.phone}</Localized></a>}{contact.viber && <a href={`viber://chat?number=${contact.viber.replace(/[^0-9]/g, "")}`}><Localized>{"Viber"}</Localized></a>}{contact.telegram && <a href={`https://t.me/${contact.telegram.replace("@", "")}`}><Localized>{"Telegram"}</Localized></a>}</div>;
}
export function Footer() {
  const tr = useTr(); const { footer, services, nav } = useContent();
  const C = (t: string, items: [string, string][]) => <div className="grid content-start gap-2.5"><b className="eyebrow !text-sage"><Localized>{t}</Localized></b>{items.map(([n, h]) => <Link key={h + n} href={h} className="text-white/75 hover:text-white"><Localized>{n}</Localized></Link>)}</div>;
  return <footer className="bg-[#0b1b36] pb-20 pt-16 text-sm text-white sm:pb-10"><div className="mx-auto grid max-w-[1240px] gap-10 px-6 lg:grid-cols-[1.1fr_1fr_2fr]">
    <div><div className="inline-block rounded-2xl bg-white p-3"><Image src="/assets/logo-full.png" alt="Click to Create" width={110} height={121} /></div><p className="mt-5 max-w-xs text-white/70"><Localized>{tr(footer.blurb)}</Localized></p><a href={`mailto:${EMAIL}`} className="mt-4 block font-medium"><Localized>{EMAIL}</Localized></a><ContactLines />
      <div className="mt-6 grid gap-2 text-xs text-white/70"><b className="eyebrow !text-sage"><Localized>{"Our commitments"}</Localized></b>{["You own your data", "Secure by design", "One point of contact"].map((x) => <span key={x} className="flex items-center gap-2"><i className="size-1.5 rounded-full bg-sage" /><Localized>{x}</Localized></span>)}</div></div>
    <div className="mesh rounded-2xl p-7"><p className="eyebrow !text-white/80"><Localized>{"Why CTC"}</Localized></p><p className="mt-3 text-xl font-semibold leading-snug"><Localized>{"One accountable team for your website, software and content."}</Localized></p><Link href="/book" className="btn btn-light mt-6"><Localized>{tr(nav.book)}</Localized></Link></div>
    <div className="grid gap-8 sm:grid-cols-3">
      <Localized>{C(tr(nav.services), services.map((s) => [tr(s.name), `/services/${s.slug}`]))}</Localized>
      <Localized>{C("Start here", [["Your project brief", "/start"], ["Build a package", "/packages#builder"], [tr(nav.how), "/how-it-works"], [tr(nav.updates), "/updates"], ["Events", "/events"]])}</Localized>
      <Localized>{C("CTC", [[tr(nav.how), "/how-it-works"], [tr(nav.packages), "/packages"], [tr(nav.updates), "/updates"], [tr(nav.about), "/about"], ["Contact", "/contact"], ["Privacy", "/privacy"], ["Terms", "/terms"]])}</Localized></div></div>
    <div className="mx-auto mt-12 flex max-w-[1240px] flex-wrap justify-between gap-3 border-t border-white/10 px-6 pt-6 text-xs text-white/50"><span><Localized>{tr(footer.copy)}</Localized></span><Link href="/admin"><Localized>{"Admin"}</Localized></Link></div></footer>;
}
export function Page({ children }: { children: React.ReactNode }) { return <><Nav /><main><Localized>{children}</Localized></main><Footer /></>; }
export function Head({ tag, title, sub }: { tag: string; title: string; sub?: React.ReactNode }) {
  const tr = useTr(); return <header className="mesh pb-20 pt-40"><div className="mx-auto max-w-[1240px] px-6"><p className="eyebrow !text-white/80"><Localized>{tr(tag)}</Localized></p><h1 className="h-sec mt-4 max-w-4xl text-4xl md:text-6xl"><Localized>{tr(title)}</Localized></h1>{sub && <p className="mt-6 max-w-xl text-lg text-white/80"><Localized>{typeof sub === "string" ? tr(sub) : sub}</Localized></p>}</div></header>;
}
