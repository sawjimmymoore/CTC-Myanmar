"use client";
import { useRef, type CSSProperties, type ReactNode } from "react";

// Wraps any card in a subtle 3D tilt that follows the cursor. Pointer-based
// (works with mouse only, touch devices get no tilt, which is correct
// since there's no hover state to react to).
export default function TiltCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = (-py * 8).toFixed(2);
    const rotateY = (px * 8).toFixed(2);
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      className={`transition-transform duration-200 ease-out motion-reduce:!transform-none [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  );
}
