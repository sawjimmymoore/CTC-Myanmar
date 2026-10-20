"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Ic } from "./Icons";
import { useTr } from "@/lib/i18n";
import { useContent } from "@/lib/content-context";

/** Animated dot-matrix backdrop: a slow wave, brighter near the cursor. */
export function DotMatrix({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext("2d"); if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; let w = 0, h = 0, raf = 0; const m = { x: -999, y: -999 }; const G = 28;
    const size = () => { const r = c.getBoundingClientRect(); const d = Math.min(window.devicePixelRatio || 1, 2); w = r.width; h = r.height; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (let x = G / 2; x < w; x += G) for (let y = G / 2; y < h; y += G) {
        const wave = Math.sin(x * .012 + t * .0008) + Math.cos(y * .014 - t * .0006); const dx = x - m.x, dy = y - m.y; const near = Math.max(0, 1 - Math.hypot(dx, dy) / 160);
        const a = .12 + (wave + 2) * .06 + near * .7; const r = 1 + (wave + 2) * .28 + near * 2.2;
        ctx.fillStyle = near > .05 ? `rgba(200,230,195,${Math.min(a, 1)})` : `rgba(255,255,255,${a})`; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    const mv = (e: MouseEvent) => { const r = c.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; };
    size(); raf = requestAnimationFrame(draw); window.addEventListener("resize", size); window.addEventListener("mousemove", mv);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); window.removeEventListener("mousemove", mv); };
  }, []);
  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 size-full ${className}`} />;
}
/** Hero category cards (glass) on the blue gradient. */
export function HeroCards() {
  const tr = useTr(); const { services } = useContent();
  return <div className="grid grid-cols-2 gap-3">{services.map((s, i) => <motion.div key={s.slug} initial={{ opacity: 0, y: 30, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .5 + i * .09, duration: .6, ease: [.16, 1, .3, 1] }}>
    <Link href={`/services/${s.slug}`} className="group block rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/20" style={{ animation: `float 7s ease-in-out ${i * .7}s infinite` }}>
      <span className="grid size-11 place-items-center rounded-xl text-white transition-transform group-hover:scale-110 group-hover:-rotate-6" style={{ background: s.color }}><Ic name={s.icon} size={22} /></span>
      <b className="mt-3 block text-[15px] leading-tight">{tr(s.name)}</b><span className="mt-1 flex items-center gap-1 text-xs text-white/70">{s.offerings.length} services <ArrowRight size={12} className="transition group-hover:translate-x-1" /></span></Link></motion.div>)}</div>;
}
/** Mini journey line under the hero text. */
export function HeroJourney() {
  const S = ["Choose", "Brief", "Quote", "Build", "Launch"];
  return <div className="mt-9 flex max-w-md items-center">{S.map((x, i) => <div key={x} className="flex flex-1 items-center last:flex-none"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * .15 }} className="grid size-7 place-items-center rounded-full border border-white/50 bg-white/10 text-[11px] font-semibold">{i + 1}</motion.div>{i < S.length - 1 && <div className="relative mx-1 h-px flex-1 bg-white/25"><motion.i className="absolute inset-y-0 left-0 bg-white" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 1.1 + i * .15, duration: .5 }} /></div>}</div>)}
    <span className="ml-3 hidden text-xs text-white/70 sm:block">Your road map</span></div>;
}
