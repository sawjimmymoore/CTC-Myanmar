"use client";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import Magnetic from "./Magnetic";
import TiltCard from "./TiltCard";
import RevealText from "./RevealText";
import { EMAIL } from "@/content/site-content";
import { useTr } from "@/lib/i18n";
import { useContent } from "@/lib/content-context";
export const H2 = ({ text, className = "" }: { text: string; className?: string }) => <RevealText as="div" text={text} className={`h-sec text-4xl md:text-6xl ${className}`} />;
export const Tag = ({ children }: { children: React.ReactNode }) => <p className="eyebrow mb-4">{children}</p>;
export function CtaBand({ title, sub }: { title?: string; sub?: string }) {
  const tr = useTr(); const { cta, hero, nav } = useContent();
  return <section className="mesh px-6 py-28 text-center"><div className="mx-auto max-w-4xl"><h2 className="h-sec text-5xl sm:text-7xl">{title ?? "Pick, customize, deliver. It's that easy."}</h2><p className="mx-auto mt-5 max-w-xl text-lg text-white/80">{sub ?? tr(cta.sub)}</p>
    <div className="mt-9 flex flex-wrap items-center justify-center gap-4"><Magnetic><Link href="/book" className="btn btn-light">{tr(hero.primary)} <ArrowRight size={16} /></Link></Magnetic><Link href="/quote" className="btn border border-white/40 bg-transparent text-white hover:bg-white/10">{tr(nav.quote)}</Link></div><a href={`mailto:${EMAIL}`} className="mt-6 inline-block text-sm text-white/80 underline">{EMAIL}</a></div></section>;
}
export function ServiceRows({ group = "core" }: { group?: "core" | "care" }) {
  const tr = useTr(); const { services } = useContent();
  return <div className="border-t border-hair">{services.filter((s) => s.group === group).map((s) => <Link key={s.slug} href={`/services/${s.slug}`} className="group grid items-baseline gap-3 border-b border-hair py-7 transition-all hover:pl-4 md:grid-cols-[130px_1fr_1.2fr_30px]"><small className="eyebrow">{s.tag}</small><span className="font-display text-4xl md:text-6xl">{tr(s.name)}</span><p className="text-sm text-soft">{tr(s.blurb)}</p><ArrowRight className="hidden text-sage-deep opacity-0 transition group-hover:opacity-100 md:block" /></Link>)}</div>;
}
export function Cell({ v }: { v: string }) { return v === "yes" ? <Check size={18} className="mx-auto text-sage-deep" aria-label="Included" /> : v === "no" ? <Minus size={16} className="mx-auto text-navy/25" aria-label="Not included" /> : <span>{v}</span>; }
export function PackageFamily({ id }: { id: string }) {
  const tr = useTr(); const { packages } = useContent(); const f = packages.families.find((x) => x.id === id); if (!f) return null;
  return <div id={f.id} className="scroll-mt-24"><h2 className="font-display text-5xl md:text-6xl">{tr(f.name)}</h2><p className="mt-2 max-w-2xl text-soft">{tr(f.intro)}</p>
    <div className={`mt-8 grid gap-5 md:grid-cols-2 ${f.tiers.length > 3 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>{f.tiers.map((p, i) => <TiltCard key={i} className={`relative flex h-full flex-col rounded-3xl border p-7 ${p.popular ? "border-navy bg-navy text-white" : "border-hair bg-white"}`}>
      {p.popular && <span className="eyebrow absolute -top-3 left-6 rounded-full bg-sage px-3 py-1 !text-navy">Most chosen</span>}
      <div className="font-display text-4xl">{tr(p.name)}</div><p className={`mt-1 min-h-12 text-sm ${p.popular ? "text-white/70" : "text-soft"}`}>{tr(p.fit)}</p>
      <ul className="mt-5 grid flex-1 content-start gap-2.5 text-sm">{p.points.map((x, j) => <li key={j} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-sage" />{tr(x)}</li>)}</ul>
      <Link href={`/quote?plan=${encodeURIComponent(p.name.en)}`} className={`btn mt-7 justify-center ${p.popular ? "btn-light" : ""}`}>Request this package</Link></TiltCard>)}</div>
    {f.matrix && <div className="mt-8 overflow-x-auto rounded-3xl border border-hair bg-white"><table className="w-full min-w-[640px] text-left text-sm"><thead><tr className="border-b border-hair"><th className="p-4 font-accent tracking-wide">Compare</th>{f.matrix.cols.map((c) => <th key={c} className="p-4 text-center font-accent tracking-wide">{c}</th>)}</tr></thead><tbody>{f.matrix.rows.map((r) => <tr key={r[0]} className="border-b border-hair last:border-0"><td className="p-4 font-medium">{r[0]}</td>{r.slice(1).map((v, i) => <td key={i} className="p-4 text-center text-soft"><Cell v={v} /></td>)}</tr>)}</tbody></table></div>}</div>;
}
