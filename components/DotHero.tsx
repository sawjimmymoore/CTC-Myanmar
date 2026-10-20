"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Ic } from "./Icons";
import { useTr } from "@/lib/i18n";
import { useContent } from "@/lib/content-context";

/** Animated dot-matrix backdrop: a slow wave, brighter near the cursor. */
export function DotMatrix({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext("2d"); if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; let w = 0, h = 0, raf = 0; const m = { x: -999, y: -999 }; const G = 15;
    const size = () => { const r = c.getBoundingClientRect(); const d = Math.min(window.devicePixelRatio || 1, 2); w = r.width; h = r.height; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (let x = G / 2; x < w; x += G) for (let y = G / 2; y < h; y += G) {
        const wave = Math.sin(x * .012 + t * .0008) + Math.cos(y * .014 - t * .0006); const dx = x - m.x, dy = y - m.y; const near = Math.max(0, 1 - Math.hypot(dx, dy) / 160);
        const a = .1 + (wave + 2) * .05 + near * .65; const r = .4 + (wave + 2) * .1 + near * .95;
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
/** Hero block grid (like before): square tiles at the bottom right; six of them carry a category icon and link to it. */
export function HeroTiles() {
  const tr = useTr(); const { services } = useContent(); const slots = [1, 4, 7, 9, 12, 15]; const map = new Map(slots.map((k, i) => [k, services[i]]));
  const tile = (k: number) => { const sv = map.get(k); return sv ? <Link key={k} href={`/services/${sv.slug}`} aria-label={tr(sv.name)} className="tile"><span className="flex flex-col items-center gap-1.5"><Ic name={sv.icon} size={22} />{sv.tag}</span></Link> : <div key={k} aria-hidden className="tile" style={{ opacity: .5 }} />; };
  return <div className="relative z-10 mx-auto mt-8 grid w-full max-w-[1180px] grid-cols-6 lg:absolute lg:bottom-0 lg:right-0 lg:mx-0 lg:mt-0 lg:w-[min(48vw,600px)] lg:max-w-none">{Array.from({ length: 18 }, (_, k) => tile(k))}</div>;
}
/** Mini journey line under the hero text. */
export function HeroJourney() {
  const S = ["Choose", "Brief", "Quote", "Build", "Launch"];
  return <div className="mt-9 flex max-w-md items-center">{S.map((x, i) => <div key={x} className="flex flex-1 items-center last:flex-none"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * .15 }} className="grid size-7 place-items-center rounded-full border border-white/50 bg-white/10 text-[11px] font-semibold">{i + 1}</motion.div>{i < S.length - 1 && <div className="relative mx-1 h-px flex-1 bg-white/25"><motion.i className="absolute inset-y-0 left-0 bg-white" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 1.1 + i * .15, duration: .5 }} /></div>}</div>)}
    <span className="ml-3 hidden text-xs text-white/70 sm:block">Your road map</span></div>;
}
