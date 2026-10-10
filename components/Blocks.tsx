"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Minus } from "lucide-react";
import Magnetic from "./Magnetic";
import TiltCard from "./TiltCard";
import RevealText from "./RevealText";
import { EMAIL } from "@/content/site-content";
import { useTr } from "@/lib/i18n";
import { useContent } from "@/lib/content-context";
export const H2 = ({ text, className = "" }: { text: string; className?: string }) => <RevealText as="div" text={text} className={`h-sec text-3xl md:text-5xl ${className}`} />;
export const Tag = ({ children }: { children: React.ReactNode }) => <p className="eyebrow mb-4">{children}</p>;
export function CtaBand({ title, sub }: { title?: string; sub?: string }) {
  const tr = useTr(); const { cta, hero, nav } = useContent();
  return <section className="mesh px-6 py-28 text-center"><div className="mx-auto max-w-4xl"><h2 className="h-sec text-4xl sm:text-6xl">{title ?? tr(cta.title)}</h2><p className="mx-auto mt-5 max-w-xl text-lg text-white/80">{sub ?? tr(cta.sub)}</p>
    <div className="mt-9 flex flex-wrap items-center justify-center gap-4"><Magnetic><Link href="/book" className="btn btn-light">{tr(hero.primary)} <ArrowRight size={16} /></Link></Magnetic><Link href="/packages#builder" className="btn border border-white/40 bg-transparent text-white hover:bg-white/10">Build your package</Link></div><a href={`mailto:${EMAIL}`} className="mt-6 inline-block text-sm text-white/80 underline">{EMAIL}</a></div></section>;
}
export function ServiceRows({ group = "core" }: { group?: "core" | "care" }) {
  const tr = useTr(); const { services } = useContent();
  return <div className="border-t border-hair">{services.filter((s) => s.group === group).map((s) => <Link key={s.slug} href={`/services/${s.slug}`} className="group grid items-baseline gap-3 border-b border-hair py-7 transition-all hover:pl-4 md:grid-cols-[130px_1fr_1.2fr_30px]"><small className="eyebrow">{s.tag}</small><span className="font-display text-4xl md:text-6xl">{tr(s.name)}</span><p className="text-sm text-soft">{tr(s.blurb)}</p><ArrowRight className="hidden text-sage-deep opacity-0 transition group-hover:opacity-100 md:block" /></Link>)}</div>;
}
export function Cell({ v }: { v: string }) { return v === "yes" ? <Check size={18} className="mx-auto text-sage-deep" aria-label="Included" /> : v === "no" ? <Minus size={16} className="mx-auto text-navy/25" aria-label="Not included" /> : <span>{v}</span>; }
export function PackageBuilder() {
  const tr = useTr(); const { packages } = useContent(); const [fam, setFam] = useState(packages.families[0].id); const [sel, setSel] = useState<string[]>([]);
  const f = packages.families.find((x) => x.id === fam) ?? packages.families[0]; const tog = (n: string) => setSel((x) => x.includes(n) ? x.filter((y) => y !== n) : [...x, n]);
  return <div id="builder" className="scroll-mt-24"><div className="flex flex-wrap gap-2">{packages.families.map((x) => <button key={x.id} onClick={() => setFam(x.id)} aria-pressed={fam === x.id} className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${fam === x.id ? "border-navy bg-navy text-white" : "border-hair bg-white hover:border-navy"}`}>{tr(x.name)}</button>)}</div>
    <p className="mt-5 max-w-2xl text-soft">{tr(f.intro)}</p>
    <div className={`mt-8 grid gap-5 md:grid-cols-2 ${f.tiers.length > 3 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>{f.tiers.map((p, i) => { const n = p.name.en; const on = sel.includes(n); return <TiltCard key={fam + i} className={`relative flex h-full flex-col rounded-3xl border p-6 ${on ? "border-navy bg-navy text-white" : "border-hair bg-white"}`}>
      {p.popular && <span className="eyebrow absolute -top-3 left-5 rounded-full bg-sage px-3 py-1 !text-navy">Most chosen</span>}
      <div className="h-sec text-2xl">{tr(p.name)}</div><p className={`mt-1 min-h-12 text-sm ${on ? "text-white/70" : "text-soft"}`}>{tr(p.fit)}</p>
      <ul className="mt-4 grid flex-1 content-start gap-2 text-sm">{p.points.map((x, j) => <li key={j} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-sage" />{tr(x)}</li>)}</ul>
      <button onClick={() => tog(n)} className={`btn mt-6 justify-center ${on ? "btn-light" : ""}`}>{on ? "Added to my package" : "Add to my package"}</button></TiltCard>; })}</div>
    {f.matrix && <div className="mt-8 overflow-x-auto rounded-3xl border border-hair bg-white"><table className="w-full min-w-[640px] text-left text-sm"><thead><tr className="border-b border-hair"><th className="p-4 font-semibold">Compare</th>{f.matrix.cols.map((c) => <th key={c} className="p-4 text-center font-semibold">{c}</th>)}</tr></thead><tbody>{f.matrix.rows.map((r) => <tr key={r[0]} className="border-b border-hair last:border-0"><td className="p-4 font-medium">{r[0]}</td>{r.slice(1).map((v, i) => <td key={i} className="p-4 text-center text-soft"><Cell v={v} /></td>)}</tr>)}</tbody></table></div>}
    <AnimatePresence>{sel.length > 0 && <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} className="sticky bottom-20 z-30 mt-10 sm:bottom-6"><div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 rounded-2xl bg-navy p-4 pl-6 text-white shadow-2xl"><div><p className="eyebrow !text-sage">Your package</p><p className="mt-1 text-sm">{sel.join(" + ")}</p></div><div className="flex gap-2"><button onClick={() => setSel([])} className="px-3 text-sm text-white/70 underline">Clear</button><Link href={`/quote?items=${encodeURIComponent(sel.join(","))}`} className="btn btn-light">Request my quote <ArrowRight size={15} /></Link></div></div></motion.div>}</AnimatePresence></div>;
}
