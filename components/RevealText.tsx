"use client";
import { motion } from "framer-motion";

// Splits text into words, each masked in its own overflow-hidden box, and
// animates them up into place with a stagger as the block scrolls into
// view, the "staggered text reveal" pattern used across motion-heavy
// agency sites. Use for section headings/subheadings.
export default function RevealText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.035,
}: {
  text: string;
  as?: "span" | "p" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pb-[0.15em] -mb-[0.15em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
