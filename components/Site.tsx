"use client";
import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";
import { EMAIL } from "@/content/site-content";
import { useTr } from "@/lib/i18n";
import { useContent } from "@/lib/content-context";
export function Words({ text, base = 0 }: { text: string; base?: number }) {
  return <>{text.split(" ").map((w, i) => <span key={i + w}><span className="wd"><i style={{ "--n": i + base } as React.CSSProperties}>{w}</i></span>{" "}</span>)}</>;
}
export function Footer() {
  const tr = useTr(); const { footer, services, audiences, nav } = useContent();
  const C = (t: string, items: [string, string][]) => <div className="grid content-start gap-2.5"><b className="eyebrow !text-sage">{t}</b>{items.map(([n, h]) => <Link key={h + n} href={h} className="text-white/75 hover:text-white">{n}</Link>)}</div>;
  return <footer className="bg-[#0b1b36] pb-20 pt-16 text-sm text-white sm:pb-10"><div className="mx-auto grid max-w-[1240px] gap-10 px-6 lg:grid-cols-[1.1fr_1fr_2fr]">
    <div><div className="inline-block rounded-2xl bg-white p-3"><Image src="/assets/logo-full.png" alt="Click to Create" width={110} height={121} /></div><p className="mt-5 max-w-xs text-white/70">{tr(footer.blurb)}</p><a href={`mailto:${EMAIL}`} className="mt-4 block font-medium">{EMAIL}</a><span className="text-white/60">{tr(footer.phone)}</span>
      <div className="mt-6 grid gap-2 text-xs text-white/70"><b className="eyebrow !text-sage">Our commitments</b>{["You own your data", "Secure by design", "One point of contact"].map((x) => <span key={x} className="flex items-center gap-2"><i className="size-1.5 rounded-full bg-sage" />{x}</span>)}</div></div>
    <div className="mesh rounded-2xl p-7"><p className="eyebrow !text-white/80">The bottom line</p><p className="mt-3 text-xl font-semibold leading-snug">One accountable team for your website, software and content.</p><Link href="/book" className="btn btn-light mt-6">{tr(nav.book)}</Link></div>
    <div className="grid gap-8 sm:grid-cols-3">
      {C(tr(nav.services), services.filter((s) => s.group === "core").map((s) => [tr(s.name), `/services/${s.slug}`]))}
      {C(tr(nav.who), audiences.map((a) => [tr(a.name), `/for/${a.slug}`]))}
      {C("CTC", [[tr(nav.how), "/how-it-works"], [tr(nav.packages), "/packages"], [tr(nav.updates), "/updates"], [tr(nav.about), "/about"], ["Contact", "/contact"], ["Privacy", "/privacy"], ["Terms", "/terms"]])}</div></div>
    <div className="mx-auto mt-12 flex max-w-[1240px] flex-wrap justify-between gap-3 border-t border-white/10 px-6 pt-6 text-xs text-white/50"><span>{tr(footer.copy)}</span><Link href="/admin">Admin</Link></div></footer>;
}
export function Page({ children }: { children: React.ReactNode }) { return <><Nav /><main>{children}</main><Footer /></>; }
export function Head({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return <header className="mesh pb-20 pt-40"><div className="mx-auto max-w-[1240px] px-6"><p className="eyebrow !text-white/80">{tag}</p><h1 className="h-sec mt-4 max-w-4xl text-5xl md:text-7xl">{title}</h1>{sub && <p className="mt-6 max-w-xl text-lg text-white/80">{sub}</p>}</div></header>;
}
