"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Check } from "lucide-react";
import { Ic } from "./Icons";
import { useTr } from "@/lib/i18n";
import { useContent } from "@/lib/content-context";
import type { Service } from "@/content/site-content";

/** Pinned, scroll-driven road map: a winding road draws itself as you scroll, stage by stage. */
export function JourneyRoad({ title }: { title?: string }) {
  const tr = useTr(); const { roadmap } = useContent(); const n = roadmap.stages.length; const ref = useRef<HTMLDivElement>(null); const path = useRef<SVGPathElement>(null);
  const [i, setI] = useState(0); const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.min(n - 1, Math.max(0, Math.floor(v * n)))));
  useEffect(() => { const p = path.current; if (!p) return; const L = p.getTotalLength(); setPts(Array.from({ length: n }, (_, k) => { const q = p.getPointAtLength(L * (k / (n - 1))); return { x: q.x, y: q.y }; })); }, [n]);
  const jump = (k: number) => { const el = ref.current; if (!el) return; window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + ((k + .5) / n) * (el.offsetHeight - window.innerHeight), behavior: "smooth" }); };
  const s = roadmap.stages[i];
  return <section ref={ref} style={{ height: `${n * 62}vh` }} className="relative bg-white"><div className="sticky top-0 flex h-screen flex-col justify-center px-4 pt-14 sm:px-6">
    <div className="mx-auto mb-4 max-w-3xl text-center"><p className="eyebrow">{tr(roadmap.tag)}</p><h2 className="h-sec mt-2 text-2xl text-navy sm:text-4xl">{title ?? tr(roadmap.title)}</h2></div>
    <div className="relative mx-auto aspect-[1000/230] w-full max-w-[1080px]"><svg viewBox="0 0 1000 230" className="absolute inset-0 size-full" fill="none"><path ref={path} d="M 50 170 C 170 30, 280 30, 380 130 S 590 230, 690 120 S 870 10, 950 80" stroke="#dfe3dc" strokeWidth="10" strokeLinecap="round" strokeDasharray="2 16" /><motion.path d="M 50 170 C 170 30, 280 30, 380 130 S 590 230, 690 120 S 870 10, 950 80" stroke="#162a4a" strokeWidth="6" strokeLinecap="round" style={{ pathLength: scrollYProgress }} /></svg>
      {pts.map((p, k) => <button key={k} onClick={() => jump(k)} aria-label={tr(roadmap.stages[k].t)} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x / 10}%`, top: `${(p.y / 230) * 100}%` }}>
        <motion.span animate={{ scale: k === i ? 1.25 : 1 }} className={`grid size-9 place-items-center rounded-full border-2 sm:size-12 ${k < i ? "border-navy bg-navy text-white" : k === i ? "border-sage-deep bg-sage-deep text-white shadow-lg" : "border-navy/20 bg-white text-navy/50"}`}>{k < i ? <Check size={16} /> : <Ic name={roadmap.stages[k].icon} size={18} />}</motion.span>
        <span className={`absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold sm:block ${k === i ? "text-navy" : "text-navy/40"}`}>{tr(roadmap.stages[k].t)}</span></button>)}</div>
    <div className="mx-auto mt-6 w-full max-w-[1000px] rounded-3xl border border-hair bg-paper p-5 sm:p-8"><AnimatePresence mode="wait"><motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .3 }}>
      <div className="flex items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-navy text-white"><Ic name={s.icon} size={22} /></span><div><p className="eyebrow">Stage {i + 1} of {n}</p><h3 className="h-sec text-xl sm:text-2xl">{tr(s.t)}: {tr(s.d)}</h3></div></div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">{([["You", s.you], ["CTC does", s.we], ["You get", s.out]] as const).map(([h, v]) => <div key={h} className="rounded-2xl bg-white p-4"><p className="eyebrow">{h}</p><p className="mt-1 text-sm">{tr(v)}</p></div>)}</div></motion.div></AnimatePresence></div></div></section>;
}
/** "You are here" strip for the conversion path: Explore > Choose > Brief > Book. */
export function JourneyBar({ at }: { at: 0 | 1 | 2 | 3 }) {
  const S: [string, string][] = [["Explore services", "/services"], ["Choose a package", "/packages#builder"], ["Send your brief", "/start"], ["Book a free call", "/book"]];
  return <div className="border-b border-hair bg-white"><div className="mx-auto flex max-w-[1180px] items-center gap-2 overflow-x-auto px-6 py-3 text-xs sm:text-sm"><span className="eyebrow mr-2 hidden shrink-0 sm:block">Your journey</span>{S.map(([n, h], k) => <div key={n} className="flex shrink-0 items-center gap-2"><Link href={h} className={`flex items-center gap-2 rounded-full px-3 py-1.5 font-semibold transition ${k === at ? "bg-navy text-white" : k < at ? "text-sage-deep" : "text-soft hover:text-navy"}`}><span className={`grid size-5 place-items-center rounded-full text-[10px] ${k === at ? "bg-white text-navy" : k < at ? "bg-sage-deep text-white" : "border border-hair"}`}>{k < at ? <Check size={11} /> : k + 1}</span>{n}</Link>{k < 3 && <i className="h-px w-6 bg-hair sm:w-10" />}</div>)}</div></div>;
}
/** Category-specific mini road map. */
export function CategoryRoad({ svc }: { svc: Service }) {
  const tr = useTr();
  return <div className="relative grid gap-6 md:grid-cols-5"><div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-navy/10 md:block"><motion.i className="absolute inset-y-0 left-0" style={{ background: svc.color }} initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeOut" }} /></div>
    {svc.journey.map((j, k) => <motion.div key={k} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: k * .12 }} className="relative"><span className="relative z-10 grid size-12 place-items-center rounded-full font-display text-xl text-white" style={{ background: svc.color }}>{k + 1}</span><h4 className="mt-3 text-sm font-semibold">{tr(j.t)}</h4><p className="mt-1 text-xs text-soft">{tr(j.d)}</p></motion.div>)}</div>;
}
