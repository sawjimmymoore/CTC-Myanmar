"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface ScrollTextHighlightProps {
  text: string;
  className?: string;
  dimClass?: string;
  highlightClass?: string;
}

/**
 * Splits text into words and lights each one up in sequence as the block
 * scrolls through the viewport, dim/muted by default, brightening word by
 * word tied to scroll position. No extra animation library: reuses
 * framer-motion's scroll utilities already in this project.
 */
export default function ScrollTextHighlight({
  text,
  className = "",
  dimClass = "text-muted-foreground/30",
  highlightClass = "text-parchment-100",
}: ScrollTextHighlightProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            start={start}
            end={end}
            dimClass={dimClass}
            highlightClass={highlightClass}
          />
        );
      })}
    </p>
  );
}

function Word({
  word,
  progress,
  start,
  end,
  dimClass,
  highlightClass,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  dimClass: string;
  highlightClass: string;
}) {
  const opacity = useTransform(progress, [start, end], [0.28, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <span className={`absolute inset-0 ${dimClass}`} aria-hidden>
        {word}
      </span>
      <motion.span style={{ opacity }} className={highlightClass}>
        {word}
      </motion.span>
    </span>
  );
}
