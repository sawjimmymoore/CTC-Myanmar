"use client";
import { useEffect, useRef } from "react";

// A soft radial glow that trails the cursor, plus a small dot that scales
// up when hovering any link/button, the reactive cursor pattern used
// across motion-driven agency sites. Desktop only, respects
// prefers-reduced-motion.
export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) return;

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };
    const handleLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };
    const handleOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, [role='button'], input, textarea, select");
      if (dotRef.current) {
        dotRef.current.dataset.hover = interactive ? "true" : "false";
        dotRef.current.style.width = interactive ? "44px" : "10px";
        dotRef.current.style.height = interactive ? "44px" : "10px";
        dotRef.current.style.backgroundColor = interactive
          ? "rgb(var(--primary-400) / 0.16)"
          : "rgb(var(--primary-500) / 0.9)";
        dotRef.current.style.borderWidth = interactive ? "1.5px" : "0px";
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    let raf: number;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (dotRef.current) {
        const size = dotRef.current.dataset.hover === "true" ? 22 : 5;
        dotRef.current.style.transform = `translate3d(${target.current.x - size}px, ${target.current.y - size}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[999] rounded-full opacity-0 transition-[width,height,background-color,border-width] duration-200 ease-out pointer-events-none hidden md:block border-primary-400"
      style={{
        width: 10,
        height: 10,
        backgroundColor: "rgb(var(--primary-500) / 0.9)",
        willChange: "transform",
      }}
      aria-hidden
    />
  );
}
