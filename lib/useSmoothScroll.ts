"use client";
import { useEffect } from "react";
import Lenis from "lenis";

// Site-wide smooth/inertial scrolling, the "heavy, buttery" scroll feel
// used across motionsites.ai-style sites, instead of the browser's default
// instant scroll. Disabled automatically for prefers-reduced-motion.

// Shared instance so other components (route-change scroll reset, a
// "back to top" button, etc.) can drive the same scroll state instead of
// fighting it with a raw window.scrollTo, Lenis owns scroll position and
// will otherwise snap back to its own internal target a frame later.
let sharedLenis: Lenis | null = null;

export function getLenis() {
  return sharedLenis;
}

export default function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    sharedLenis = lenis;

    let raf: number;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      sharedLenis = null;
    };
  }, []);
}
