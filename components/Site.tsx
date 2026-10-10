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
  const C = (t: string, items: [string, string][]) => <div className="grid content-start gap-2"><b className="font-accent tracking-wide text-white">{t}</b>{items.map(([n, h]) => <Link key={h + n} href={h} className="hover:text-white">{n}</Link>)}</div>;
  return <footer className="dark-sec pb-20 pt-16 text-sm sm:pb-10"><div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-5">
    <div className="soft md:col-span-2"><div className="inline-block rounded-2xl bg-white p-3"><Image src="/assets/logo-full.png" alt="Click to Create" width={120} height={132} /></div><p className="mt-4 max-w-xs">{tr(footer.blurb)}</p><a href={`mailto:${EMAIL}`} className="mt-4 block text-white">{EMAIL}</a><span>{tr(footer.phone)}</span></div>
    <div className="soft grid content-start gap-10 md:col-span-3 md:grid-cols-3">
      {C(tr(nav.services), services.filter((s) => s.group === "core").slice(0, 6).map((s) => [tr(s.name), `/services/${s.slug}`]))}
      {C(tr(nav.who), audiences.map((a) => [tr(a.name), `/for/${a.slug}`]))}
      {C("CTC", [[tr(nav.how), "/how-it-works"], [tr(nav.packages), "/packages"], [tr(nav.updates), "/updates"], [tr(nav.about), "/about"], ["Contact", "/contact"], ["Privacy", "/privacy"], ["Terms", "/terms"]])}</div></div>
    <div className="soft mx-auto mt-12 flex max-w-6xl justify-between px-6 text-xs"><span>{tr(footer.copy)}</span><Link href="/admin">Admin</Link></div></footer>;
}
export function Page({ children }: { children: React.ReactNode }) { return <><Nav /><main>{children}</main><Footer /></>; }
export function Head({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return <header className="relative overflow-hidden"><div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(55% 80% at 85% 0%,rgba(143,176,138,.35),transparent 70%)" }} /><div className="relative mx-auto max-w-6xl px-6 pb-14 pt-36"><p className="eyebrow mb-4">{tag}</p><h1 className="max-w-4xl font-display text-6xl leading-[.92] md:text-8xl">{title}</h1>{sub && <p className="mt-6 max-w-xl text-soft">{sub}</p>}</div></header>;
}
