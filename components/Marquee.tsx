"use client";
// A continuously scrolling horizontal ticker, the "marquee strip" pattern
// (skills, taglines, status) seen across motion-driven agency sites.
export default function Marquee({
  items,
  speed = 28,
  className = "",
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const loop = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex w-max motion-reduce:!animate-none"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center flex-shrink-0">
            {loop.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center flex-shrink-0">
                <span className="px-6 text-[13px] md:text-[14px] font-medium uppercase tracking-[0.15em] text-parchment-100/70 whitespace-nowrap">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500/50 flex-shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
