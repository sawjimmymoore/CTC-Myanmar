"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { getLenis } from "@/lib/useSmoothScroll";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1 });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className={`fixed bottom-6 right-5 md:bottom-8 md:right-8 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 text-on-primary shadow-lg transition-all duration-300 hover:bg-primary-500 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp size={18} />
    </button>
  );
}
