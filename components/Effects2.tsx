"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, animate, useInView, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useTr } from "@/lib/i18n";
import { useContent } from "@/lib/content-context";

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null); const inV = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => { if (!inV || !ref.current) return; const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix; } }); return () => c.stop(); }, [inV, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}
export const TILE_LABELS = ["QuickBooks", "", "Zoho Books", "", "Odoo", "", "Websites", "Video", "", "Marketing", "", "AI Workflow", "", "Lead Tracker", "Custom Tools", "", "Training", ""];
export function HeroTiles() {
  return <div aria-hidden className="pointer-events-auto absolute bottom-0 right-0 hidden w-[min(52vw,640px)] grid-cols-6 lg:grid">{TILE_LABELS.concat(TILE_LABELS).slice(0, 18).map((t, i) => <div key={i} className="tile" style={{ opacity: t ? 1 : 0.55 }}>{t}</div>)}</div>;
}
/* ---- Pinned, scroll-driven stepper (Delve "Welcome to the experience") ---- */
const Chip = ({ children, active }: { children: React.ReactNode; active?: boolean }) => <span className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${active ? "border-white bg-white text-navy" : "border-white/40 text-white"}`}>{children}</span>;
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`rounded-2xl bg-white p-4 text-navy shadow-xl ${className}`}>{children}</div>;
function V1() { const L = ["QuickBooks", "Zoho Books", "Odoo", "Custom", "Websites", "Video", "Marketing", "AI", "Training", "Care", "SEO", "Ads"]; return <div className="grid h-full grid-cols-3 gap-3 p-4 sm:grid-cols-4">{L.map((l, i) => <motion.div key={l} initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * .04 }} className={`grid aspect-square place-items-center rounded-full border-2 text-center text-[11px] font-semibold ${i === 2 ? "border-white bg-white text-navy" : "border-white/50 text-white"}`}>{l}</motion.div>)}</div>; }
function V2() { const R = ["Goals and audience", "Data to import", "Approval limits (LOA)", "Timeline and training"]; return <div className="grid h-full content-center gap-3 p-6"><Card><b className="text-sm">Scope sheet</b><div className="mt-3 grid gap-2">{R.map((r, i) => <motion.div key={r} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .1 + i * .12 }} className="flex items-center gap-2 text-sm"><span className="grid size-5 place-items-center rounded-full bg-sage text-white"><Check size={12} /></span>{r}</motion.div>)}</div></Card><Card><div className="flex justify-between text-xs"><b>Fixed quotation</b><span>Agreed</span></div><div className="mt-2 h-2 rounded-full bg-paper"><motion.div className="h-2 rounded-full bg-navy" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.2 }} /></div></Card></div>; }
function V3() { const N = ["Request", "Manager", "Finance", "Approved"]; return <div className="grid h-full content-center gap-4 p-6"><div className="flex items-center justify-between gap-1">{N.map((n, i) => <div key={n} className="flex flex-1 items-center"><motion.div initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * .2 }} className={`grid size-16 shrink-0 place-items-center rounded-2xl text-[11px] font-semibold ${i === 3 ? "bg-white text-navy" : "border border-white/50 text-white"}`}>{n}</motion.div>{i < 3 && <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .2 + i * .2 }} className="mx-1 h-px flex-1 origin-left bg-white/60" />}</div>)}</div><Card><div className="flex items-center justify-between text-sm"><b>Security checks</b><span className="rounded-full bg-sage-soft px-2 py-0.5 text-xs text-sage-deep">Passed</span></div><p className="mt-1 text-xs text-soft">Roles, approval limits and backups verified.</p></Card></div>; }
function V4() { return <div className="grid h-full content-center gap-3 p-6"><div className="flex flex-wrap gap-2"><Chip active>Staff</Chip><Chip>Approvers</Chip><Chip>Admins</Chip></div><Card><b className="text-sm">User guide and Q and A</b><p className="mt-1 text-xs text-soft">Short guide per role, plus a live walkthrough with your team.</p></Card><Card className="flex items-center justify-between"><b className="text-sm">Go-live</b><span className="flex items-center gap-2 text-xs text-sage-deep"><i className="size-2 animate-pulse rounded-full bg-sage" />Live</span></Card></div>; }
const VIS = [V1, V2, V3, V4];
export function PinnedSteps({ title }: { title?: string }) {
  const tr = useTr(); const { steps } = useContent(); const ref = useRef<HTMLDivElement>(null); const [i, setI] = useState(0); const n = steps.items.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.min(n - 1, Math.max(0, Math.floor(v * n)))));
  const V = VIS[i % VIS.length]; const s = steps.items[i];
  return <section ref={ref} style={{ height: `${n * 85}vh` }} className="relative bg-white"><div className="sticky top-0 flex h-screen flex-col justify-center px-4 pt-16 sm:px-6">
    <h2 className="h-sec mx-auto mb-6 max-w-3xl text-center text-2xl text-navy sm:text-4xl">{title ?? tr(steps.title)}</h2>
    <div className="mx-auto grid w-full max-w-[1100px] overflow-hidden rounded-3xl border border-hair bg-paper md:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col justify-between p-6 sm:p-10"><AnimatePresence mode="wait"><motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .35 }}>
        <span className="eyebrow rounded border border-sage-deep/40 px-2 py-1">0{i + 1} / 0{n}</span><h3 className="h-sec mt-6 text-2xl sm:text-3xl">{tr(s.t)}</h3><p className="mt-4 max-w-sm text-soft">{tr(s.d)}</p></motion.div></AnimatePresence>
        <div className="mt-8 flex items-center gap-2">{steps.items.map((_, k) => <i key={k} className={`h-1.5 rounded-full transition-all ${k === i ? "w-10 bg-navy" : "w-4 bg-navy/20"}`} />)}<Link href="/how-it-works" className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-sage-deep">Full process <ArrowRight size={14} /></Link></div></div>
      <div className="panel-grad relative min-h-[300px] md:min-h-[420px]"><AnimatePresence mode="wait"><motion.div key={i} className="absolute inset-0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: .4 }}><V /></motion.div></AnimatePresence></div></div></div></section>;
}
/* ---- Bento tiles ---- */
export function Bento() {
  const tr = useTr(); const { services } = useContent(); const L = services.filter((s) => ["websites", "business-systems", "marketing", "video-production", "ai-workflow", "lead-tracker", "learning-platforms"].includes(s.slug));
  const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-4", "md:col-span-4", "md:col-span-4", "md:col-span-6", "md:col-span-6"]; const skin = ["bg-navy text-white", "panel-grad text-white", "bg-sage-soft", "bg-white border border-hair", "bg-white border border-hair", "bg-sage-soft", "bg-navy text-white"];
  return <div className="grid gap-4 md:grid-cols-12">{L.map((s, i) => <motion.div key={s.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .6, delay: (i % 3) * .08 }} className={spans[i]}>
    <Link href={`/services/${s.slug}`} className={`group relative flex min-h-[270px] flex-col justify-between overflow-hidden rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 ${skin[i]}`}>
      <span className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
      <div><span className="eyebrow !text-current opacity-70">{s.tag}</span><h3 className="h-sec mt-3 text-3xl sm:text-4xl">{tr(s.name)}</h3></div>
      <div className="flex items-end justify-between gap-4"><p className="max-w-xs text-sm opacity-80">{tr(s.blurb)}</p><span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-navy transition-transform group-hover:rotate-45"><ArrowUpRight size={18} /></span></div></Link></motion.div>)}</div>;
}
/* ---- Hover-expanding service rows (with sliding "Book a call" band) ---- */
export function HoverRows({ group = "core" }: { group?: "core" | "care" }) {
  const tr = useTr(); const { services } = useContent(); const list = services.filter((s) => s.group === group); const [a, setA] = useState<string | null>(list[0]?.slug ?? null);
  return <div className="border-t border-navy/15">{list.map((s, i) => { const on = a === s.slug; return <div key={s.slug} onMouseEnter={() => setA(s.slug)} onClick={() => setA(s.slug)} className="border-b border-navy/15">
    <div className="grid cursor-pointer items-center gap-4 py-6 md:grid-cols-[60px_1fr_1.1fr_40px]"><span className="eyebrow">0{i + 1}</span><h3 className={`h-sec text-2xl transition-colors sm:text-4xl ${on ? "text-navy" : "text-navy/45"}`}>{tr(s.name)}</h3><p className="text-sm text-soft">{tr(s.blurb)}</p><ArrowRight className={`hidden transition md:block ${on ? "translate-x-1 text-sage-deep" : "opacity-0"}`} /></div>
    <AnimatePresence initial={false}>{on && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .4, ease: [.16, 1, .3, 1] }} className="overflow-hidden"><div className="grid gap-6 pb-6 md:grid-cols-[60px_1fr_1.1fr_40px]"><span /><ul className="grid gap-2 text-sm">{s.includes.slice(0, 4).map((x, k) => <li key={k} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-sage-deep" />{tr(x)}</li>)}</ul>
      <Link href={`/book`} className="mesh group flex min-h-24 items-center justify-between rounded-2xl px-6 py-5 text-xl font-semibold">Book a call<ArrowRight className="transition group-hover:translate-x-1" /></Link><Link href={`/services/${s.slug}`} aria-label="View service" className="hidden items-center md:flex"><ArrowUpRight /></Link></div></motion.div>}</AnimatePresence></div>; })}</div>;
}
/* ---- Sticky stacking cards (scroll deck) ---- */
export function StackCards() {
  const tr = useTr(); const { packages } = useContent();
  return <div className="grid gap-0">{packages.families.map((f, i) => <div key={f.id} className="sticky" style={{ top: 88 + i * 22 }}><motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .6 }} className={`mb-10 grid gap-6 rounded-3xl p-7 shadow-[0_-10px_40px_-20px_rgba(22,42,74,.4)] sm:p-10 md:grid-cols-[1fr_1.4fr] ${["bg-white border border-hair", "bg-sage-soft", "bg-white border border-hair", "bg-navy text-white"][i % 4]}`}>
    <div><span className="eyebrow !text-current opacity-70">0{i + 1}</span><h3 className="h-sec mt-3 text-3xl">{tr(f.name)}</h3><p className="mt-3 text-sm opacity-75">{tr(f.intro)}</p><Link href={`/packages#${f.id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline">Compare tiers <ArrowRight size={14} /></Link></div>
    <div className="grid gap-3 sm:grid-cols-2">{f.tiers.map((t, k) => <div key={k} className="rounded-2xl border border-current/15 p-4"><b className="text-sm">{tr(t.name)}</b><p className="mt-1 text-xs opacity-70">{tr(t.fit)}</p></div>)}</div></motion.div></div>)}</div>;
}
