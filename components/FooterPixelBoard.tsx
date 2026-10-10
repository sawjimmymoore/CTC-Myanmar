"use client";
import { useState, useCallback } from "react";

const COLS = 14;
const ROWS = 7;

/**
 * A small interactive pixel board for the footer, click or drag across
 * cells to light them up in the olive accent, click a lit cell to clear
 * it. This is a from-scratch stand-in for OriginKit's "Footer 02" (which
 * bundles a Tetris-piece component we couldn't fetch, their API wasn't
 * reachable from this sandbox), same spirit: a genuinely interactive,
 * playful element in the footer rather than a static decoration.
 */
export default function FooterPixelBoard() {
  const [lit, setLit] = useState<Set<number>>(() => {
    // A tiny pre-lit "hello" wave so the board isn't blank on first paint
    const seed = [16, 17, 18, 30, 44, 45, 59, 60, 61, 73];
    return new Set(seed);
  });
  const [dragging, setDragging] = useState(false);

  const toggle = useCallback((i: number, forceOn?: boolean) => {
    setLit((prev) => {
      const next = new Set(prev);
      if (forceOn) next.add(i);
      else if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }, []);

  return (
    <div
      className="select-none"
      onMouseLeave={() => setDragging(false)}
      onMouseUp={() => setDragging(false)}
    >
      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: COLS * ROWS }).map((_, i) => {
          const isLit = lit.has(i);
          return (
            <button
              key={i}
              aria-label="pixel"
              onMouseDown={() => {
                setDragging(true);
                toggle(i);
              }}
              onMouseEnter={() => {
                if (dragging) toggle(i, true);
              }}
              onTouchStart={() => toggle(i)}
              className={`aspect-square rounded-[2px] transition-colors duration-150 ${
                isLit ? "bg-[var(--accent-warm)]" : "bg-primary-500/10 hover:bg-primary-500/25"
              }`}
            />
          );
        })}
      </div>
      <p className="mt-3 text-[10.5px] text-header-muted">Click or drag to draw</p>
    </div>
  );
}
