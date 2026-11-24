import type { Lang } from "@/lib/locales";
export default function CountryFlag({ country }: { country: Lang }) {
  const star = "0,-9 2.6,-2.8 8.6,-2.8 4,1.1 5.3,7.3 0,3.6 -5.3,7.3 -4,1.1 -8.6,-2.8 -2.6,-2.8";
  return <svg aria-hidden="true" viewBox="0 0 36 24" className="h-4 w-6 shrink-0 overflow-hidden rounded-sm ring-1 ring-black/10">
    {country === "en" ? <><path fill="#012169" d="M0 0h36v24H0z" /><path stroke="white" strokeWidth="5" d="m0 0 36 24M36 0 0 24" /><path stroke="#c8102e" strokeWidth="2" d="m0 0 36 24M36 0 0 24" /><path stroke="white" strokeWidth="8" d="M18 0v24M0 12h36" /><path stroke="#c8102e" strokeWidth="5" d="M18 0v24M0 12h36" /></>
      : country === "my" ? <><path fill="#fecb00" d="M0 0h36v8H0z" /><path fill="#34b233" d="M0 8h36v8H0z" /><path fill="#ea2839" d="M0 16h36v8H0z" /><polygon points={star} transform="translate(18 12)" fill="white" /></>
      : country === "th" ? <><path fill="#a51931" d="M0 0h36v24H0z" /><path fill="#f4f5f8" d="M0 4h36v16H0z" /><path fill="#2d2a4a" d="M0 8h36v8H0z" /></>
      : <><path fill="#de2910" d="M0 0h36v24H0z" /><g fill="#ffde00"><polygon points={star} transform="translate(7 7) scale(.42)" />{[[13,3],[16,6],[16,10],[13,13]].map(([x,y]) => <polygon key={y} points={star} transform={`translate(${x} ${y}) scale(.14)`} />)}</g></>}
  </svg>;
}
