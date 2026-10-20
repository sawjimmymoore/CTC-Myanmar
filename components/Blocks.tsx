"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Minus } from "lucide-react";
import Magnetic from "./Magnetic";
import TiltCard from "./TiltCard";
import { Ic } from "./Icons";
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
export function Cell({ v }: { v: string }) { return v === "yes" ? <Check size={18} className="mx-auto text-sage-deep" aria-label="Included" /> : v === "no" ? <Minus size={16} className="mx-auto text-navy/25" aria-label="Not included" /> : <span>{v}</span>; }
export function PackageBuilder({ initial }: { initial?: string }) {
  const tr = useTr(); const { packages, services } = useContent(); const [fam, setFam] = useState(packages.families.find((x) => x.id === initial)?.id ?? packages.families[0].id); const [sel, setSel] = useState<string[]>([]);
  const f = packages.families.find((x) => x.id === fam) ?? packages.families[0]; const svc = services.find((x) => x.slug === f.id); const color = svc?.color ?? "#162a4a"; const tog = (n: string) => setSel((x) => x.includes(n) ? x.filter((y) => y !== n) : [...x, n]);
  return <div id="builder" className="scroll-mt-24"><div className="flex flex-wrap gap-2">{packages.families.map((x) => { const sv = services.find((y) => y.slug === x.id); const on = fam === x.id; return <button key={x.id} onClick={() => setFam(x.id)} aria-pressed={on} className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${on ? "text-white" : "border-hair bg-white hover:border-navy"}`} style={on ? { background: sv?.color, borderColor: sv?.color } : undefined}>{sv && <Ic name={sv.icon} size={16} />}{tr(x.name)}</button>; })}</div>
    <p className="mt-5 max-w-2xl text-soft">{tr(f.intro)}</p>
    <div className={`mt-8 grid gap-5 md:grid-cols-2 ${f.tiers.length > 3 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>{f.tiers.map((p, i) => { const n = p.name.en; const on = sel.includes(n); return <TiltCard key={fam + i} className={`relative flex h-full flex-col rounded-3xl border-2 p-6 transition-colors ${on ? "text-white" : "border-hair bg-white"}`}><span className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl" style={{ background: color }} />
      {on && <span className="absolute inset-0 -z-10 rounded-3xl" style={{ background: color }} />}
      {p.popular && <span className="eyebrow absolute -top-3 left-5 rounded-full bg-navy px-3 py-1 !text-white">Most chosen</span>}
      <div className="h-sec mt-2 text-2xl">{tr(p.name)}</div><p className={`mt-1 min-h-12 text-sm ${on ? "text-white/80" : "text-soft"}`}>{tr(p.fit)}</p>
      <ul className="mt-4 grid flex-1 content-start gap-2 text-sm">{p.points.map((x, j) => <li key={j} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0" style={on ? undefined : { color }} />{tr(x)}</li>)}</ul>
      <button onClick={() => tog(n)} className={`btn mt-6 justify-center ${on ? "btn-light" : ""}`} style={on ? undefined : { background: color }}>{on ? "Added to my package" : "Add to my package"}</button></TiltCard>; })}</div>
    <div className="mt-10 rounded-3xl border border-hair bg-white p-6"><h3 className="h-sec text-xl">Add-ons for {tr(f.name).toLowerCase()}</h3><p className="mt-1 text-sm text-soft">Mix and match. You can change these later.</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{f.addons.map((a) => { const n = a.n.en; const on = sel.includes(n); return <button key={n} onClick={() => tog(n)} aria-pressed={on} className={`rounded-2xl border p-4 text-left transition ${on ? "text-white" : "border-hair hover:border-navy"}`} style={on ? { background: color, borderColor: color } : undefined}><span className="flex items-center justify-between text-sm font-semibold">{tr(a.n)}<span className={`grid size-5 place-items-center rounded-full border text-[11px] ${on ? "border-white bg-white" : "border-hair"}`} style={on ? { color } : undefined}>{on ? <Check size={12} /> : "+"}</span></span><span className={`mt-1 block text-xs ${on ? "text-white/80" : "text-soft"}`}>{tr(a.d)}</span></button>; })}</div></div>
    {f.matrix && <div className="mt-8 overflow-x-auto rounded-3xl border border-hair bg-white"><table className="w-full min-w-[640px] text-left text-sm"><thead><tr className="border-b border-hair"><th className="p-4 font-semibold">Compare</th>{f.matrix.cols.map((c) => <th key={c} className="p-4 text-center font-semibold">{c}</th>)}</tr></thead><tbody>{f.matrix.rows.map((r) => <tr key={r[0]} className="border-b border-hair last:border-0"><td className="p-4 font-medium">{r[0]}</td>{r.slice(1).map((v, i) => <td key={i} className="p-4 text-center text-soft"><Cell v={v} /></td>)}</tr>)}</tbody></table></div>}
    <AnimatePresence>{sel.length > 0 && <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} className="sticky bottom-20 z-30 mt-10 sm:bottom-6"><div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 rounded-2xl bg-navy p-4 pl-6 text-white shadow-2xl"><div><p className="eyebrow !text-sage">Your package ({sel.length})</p><p className="mt-1 text-sm">{sel.join(" + ")}</p></div><div className="flex flex-wrap items-center gap-2"><button onClick={() => setSel([])} className="px-3 text-sm text-white/70 underline">Clear</button><Link href={`/start?cat=${f.id}`} className="btn border border-white/30 bg-transparent text-white hover:bg-white/10">Add a brief</Link><Link href={`/quote?items=${encodeURIComponent(sel.join(","))}`} className="btn btn-light">Request my quote <ArrowRight size={15} /></Link></div></div></motion.div>}</AnimatePresence></div>;
}
