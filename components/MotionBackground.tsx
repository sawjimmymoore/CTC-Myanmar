"use client";
import { useEffect, useRef } from "react";

// Three soft color blobs that idle-drift, parallax toward the cursor, and
// shift position/color as the page scrolls. Pure CSS + rAF, no external
// assets, no canvas/WebGL, respects prefers-reduced-motion.
const BLOBS = [
  { top: "8%", left: "12%", size: 520, depth: 26, colorVar: "--primary-400", opacity: 0.28 },
  { top: "55%", left: "78%", size: 620, depth: 40, colorVar: "--accent-warm", opacity: 0.16 },
  { top: "80%", left: "20%", size: 480, depth: 18, colorVar: "--primary-500", opacity: 0.22 },
];

export default function MotionBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
    };

    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let raf: number;
    const tick = () => {
      // lerp toward target mouse position for smooth trailing motion
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.06;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.06;

      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        const { depth } = BLOBS[i];
        const parallaxX = mouse.current.x * depth;
        const parallaxY = mouse.current.y * depth;
        const scrollShift = scrollProgress.current * (i % 2 === 0 ? 60 : -60);
        el.style.transform = `translate3d(${parallaxX}px, ${parallaxY + scrollShift}px, 0)`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          ref={(el) => {
            blobRefs.current[i] = el;
          }}
          className="absolute rounded-full blur-3xl animate-float-slow motion-reduce:animate-none"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            backgroundColor: `rgb(var(${b.colorVar}) / ${b.opacity})`,
            animationDelay: `${i * 1.8}s`,
            willChange: "transform",
          }}
        />
      ))}
      {/* subtle grain so the blobs don't look like flat gradients */}
      <div className="absolute inset-0 bg-grain opacity-[0.025] mix-blend-overlay" />
    </div>
  );
}
