"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X, ChevronsRight } from "lucide-react";
import { Words, Head } from "./Site";
import Marquee from "./Marquee";
import Magnetic from "./Magnetic";
import TiltCard from "./TiltCard";
import { PinnedSteps, Bento, HoverRows, StackCards, CountUp, HeroTiles } from "./Effects2";
import ScrollTextHighlight from "./effects/ScrollTextHighlight";
import FaqAccordion from "./FaqAccordion";
import { H2, Tag, CtaBand, PackageFamily } from "./Blocks";
import { useTr } from "@/lib/i18n";
import { useContent } from "@/lib/content-context";
type Post = { slug: string; title: string; category: string; excerpt: string };
const Steps = () => { const tr = useTr(); const { steps } = useContent(); return <div className="mt-12 grid gap-6 md:grid-cols-4">{steps.items.map((s, i) => <div key={i} className="border-t border-current/20 pt-5"><b className="font-display text-6xl font-normal text-sage">{i + 1}</b><h3 className="mt-2 font-semibold">{tr(s.t)}</h3><p className="soft mt-1 text-sm opacity-80">{tr(s.d)}</p></div>)}</div>; };
const Faq = () => { const tr = useTr(); const { faq } = useContent(); return <FaqAccordion items={faq.map((f) => ({ q: tr(f.q), a: tr(f.a) }))} />; };

const TOOLS = ["QuickBooks", "Zoho Books", "Odoo", "Next.js", "Supabase", "Meta Ads", "Google Ads", "TikTok Ads", "Google Workspace", "Microsoft 365", "Telegram"];
export function HomeView({ posts }: { posts: Post[] }) {
  const tr = useTr(); const c = useContent(); const { hero } = c; const [aud, setAud] = useState(0); const A = c.audiences[aud];
  return <>
    <section className="mesh relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-14 pt-36"><HeroTiles />
      <div className="relative mx-auto w-full max-w-[1240px]"><p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs backdrop-blur"><i className="size-2 rounded-full bg-sage" />{tr(hero.badge)}</p>
        <h1 className="font-display text-[clamp(52px,9.4vw,158px)] leading-[.92]"><Words text={tr(hero.line1)} /><br /><Words text={tr(hero.line2)} base={4} /></h1>
        <p className="mt-6 max-w-xl text-lg text-white/85">{tr(hero.sub)}</p>
        <div className="mt-8 flex flex-wrap gap-3"><Magnetic><Link href="/book" className="btn btn-light">{tr(hero.primary)} <ChevronsRight size={16} /></Link></Magnetic><Link href="/services" className="btn border border-white/40 bg-transparent text-white hover:bg-white/10">{tr(hero.secondary)}</Link></div>
        <p className="mt-14 text-sm text-white/80">{tr(hero.note)}</p></div></section>
    <div className="border-b border-hair bg-white py-5"><p className="eyebrow mb-3 text-center">Tools and platforms we work with</p><Marquee items={TOOLS} className="py-1" /></div>
    <section className="bg-white px-6 py-28"><div className="mx-auto max-w-4xl"><Tag>{tr(c.problem.tag)}</Tag><ScrollTextHighlight className="h-sec text-4xl leading-[1.08] md:text-6xl" text={tr(c.problem.text)} /></div></section>
    <PinnedSteps />
    <section className="bg-paper px-6 py-28"><div className="mx-auto max-w-[1240px]"><div className="mx-auto max-w-3xl text-center"><Tag>Why teams choose CTC</Tag><H2 text="Clients move faster when one team takes responsibility." /></div>
      <div className="mt-14 grid gap-5 md:grid-cols-4">{[[5, "", "Service lines under one team"], [1, "", "Point of contact, scoping to go-live"], [100, "%", "Your data stays yours"], [13, "", "Services you can add as you grow"]].map(([n, sfx, l]) => <div key={String(l)} className="rounded-3xl border border-hair bg-white p-7"><b className="font-display text-7xl font-normal"><CountUp to={n as number} suffix={sfx as string} /></b><p className="mt-2 text-sm text-soft">{l}</p></div>)}</div></div></section>
    <section className="bg-white px-6 py-28"><div className="mx-auto max-w-[1240px]"><div className="mb-12 max-w-3xl"><Tag>{tr(c.nav.services)}</Tag><H2 text="Everything under one roof, built to be used." /></div><Bento /></div></section>
    <section className="bg-paper px-6 py-28"><div className="mx-auto max-w-[1240px]"><div className="mx-auto max-w-3xl text-center"><Tag>Built for every stage</Tag><H2 text="Whatever your organization looks like, we fit." /></div>
      <div className="mt-12 flex flex-wrap justify-center gap-2">{c.audiences.map((a, i) => <button key={a.slug} onClick={() => setAud(i)} aria-pressed={aud === i} className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${aud === i ? "border-navy bg-navy text-white" : "border-hair bg-white"}`}>{tr(a.name)}</button>)}</div>
      <AnimatePresence mode="wait"><motion.div key={aud} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .35 }} className="mx-auto mt-8 grid max-w-5xl gap-8 rounded-3xl border border-hair bg-white p-8 md:grid-cols-2 md:p-12">
        <div><h3 className="h-sec text-4xl">{tr(A.name)}</h3><p className="mt-3 text-soft">{tr(A.line)}</p><Link href={`/for/${A.slug}`} className="btn mt-7">See how we help <ArrowRight size={15} /></Link></div>
        <ul className="grid gap-3">{A.pains.map((p, i) => <li key={i} className="flex gap-3 rounded-2xl bg-paper p-4 text-sm"><X size={16} className="mt-0.5 shrink-0 text-red-600" />{tr(p)}</li>)}</ul></motion.div></AnimatePresence></div></section>
    <section className="bg-white px-6 py-28"><div className="mx-auto max-w-[1240px]"><Tag>What we do</Tag><H2 text="Hover to explore. Click to book." className="mb-12" /><HoverRows /></div></section>
    <section className="bg-paper px-6 pb-12 pt-28"><div className="mx-auto max-w-[1100px]"><div className="mb-14 max-w-3xl"><Tag>{tr(c.nav.packages)}</Tag><H2 text={tr(c.packages.title)} /></div><StackCards /></div></section>
    {posts.length > 0 && <section className="bg-white px-6 py-24"><div className="mx-auto max-w-[1240px]"><div className="mb-10 flex items-end justify-between"><H2 text="Latest updates" /><Link href="/updates" className="text-sm font-semibold text-sage-deep">All updates</Link></div><div className="grid gap-5 md:grid-cols-3">{posts.map((p) => <Link key={p.slug} href={`/updates/${p.slug}`} className="card-glow rounded-3xl border border-hair p-6"><small className="eyebrow">{p.category}</small><h3 className="mt-2 text-xl font-semibold">{p.title}</h3><p className="mt-2 text-sm text-soft">{p.excerpt}</p></Link>)}</div></div></section>}
    <section className="bg-paper px-6 py-28"><div className="mx-auto max-w-3xl"><H2 text="Questions we hear first." className="mb-10" /><Faq /></div></section>
    <CtaBand /></>;
}
export function ServicesView() { const tr = useTr(); const { nav } = useContent();
  return <><Head tag={tr(nav.services)} title="What CTC builds, runs and looks after." sub="Pick one service or combine them. Every project has one point of contact." /><div className="bg-white px-6 py-20"><div className="mx-auto max-w-[1240px]"><HoverRows /><div className="mt-24"><H2 text="Ongoing care and growth." className="mb-10" /><HoverRows group="care" /></div></div></div><CtaBand title="Not sure what you need?" sub="Tell us your goal. We recommend the shortest path." /></>; }
export function ServiceView({ slug }: { slug: string }) {
  const tr = useTr(); const { services, platforms, steps, nav } = useContent(); const s = services.find((x) => x.slug === slug); if (!s) return <Head tag="Not found" title="Service not found" />;
  return <><Head tag={s.tag} title={tr(s.headline)} sub={tr(s.blurb)} />
    <div className="mx-auto max-w-6xl px-6 pb-24"><div className="flex flex-wrap gap-3"><Link href="/book" className="btn">{tr(nav.book)}</Link><Link href={`/quote?service=${s.slug}`} className="btn btn-ghost">{tr(nav.quote)}</Link></div>
      <div className="mt-16 grid gap-10 md:grid-cols-2"><div><Tag>What is included</Tag><ul className="grid gap-4">{s.includes.map((i, k) => <li key={k} className="flex gap-3 border-b border-hair pb-4"><Check className="mt-0.5 shrink-0 text-sage-deep" size={18} />{tr(i)}</li>)}</ul></div>
        <div><Tag>What you get</Tag><div className="grid gap-4">{s.outcomes.map((o, k) => <TiltCard key={k} className="rounded-3xl border border-hair bg-white p-6 text-lg">{tr(o)}</TiltCard>)}</div></div></div>
      {s.slug === "business-systems" && <div className="mt-24"><H2 text={tr(platforms.title)} /><p className="mt-4 max-w-2xl text-soft">{tr(platforms.intro)}</p><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{platforms.items.map((p, k) => <TiltCard key={k} className="rounded-3xl border border-hair bg-white p-6"><h3 className="font-display text-4xl">{tr(p.name)}</h3><dl className="mt-3 grid gap-3 text-sm"><div><dt className="eyebrow">Best for</dt><dd>{tr(p.best)}</dd></div><div><dt className="eyebrow">Strengths</dt><dd>{tr(p.strengths)}</dd></div><div><dt className="eyebrow">Consider</dt><dd className="text-soft">{tr(p.consider)}</dd></div></dl></TiltCard>)}</div><Link href="/packages#systems" className="mt-8 inline-flex items-center gap-2 font-semibold text-sage-deep">See business system packages <ArrowRight size={16} /></Link></div>}
      <div className="mt-24"><H2 text={tr(steps.title)} /><div className="text-navy"><Steps /></div></div>
      <div className="mt-24"><Tag>Works well with</Tag><div className="grid gap-4 md:grid-cols-3">{services.filter((x) => x.slug !== s.slug).slice(0, 3).map((m) => <Link key={m.slug} href={`/services/${m.slug}`} className="rounded-3xl border border-hair bg-white p-6 hover:bg-paper"><small className="eyebrow">{m.tag}</small><h3 className="font-display text-3xl">{tr(m.name)}</h3><p className="mt-1 text-sm text-soft">{tr(m.blurb)}</p></Link>)}</div></div></div><CtaBand /></>;
}
export function WhoView({ who }: { who: string }) {
  const tr = useTr(); const { audiences, services } = useContent(); const a = audiences.find((x) => x.slug === who); if (!a) return <Head tag="Not found" title="Page not found" />;
  return <><Head tag="Who we help" title={tr(a.name)} sub={tr(a.line)} /><div className="mx-auto max-w-6xl px-6 pb-24"><div className="mb-14 flex flex-wrap gap-2">{audiences.map((x) => <Link key={x.slug} href={`/for/${x.slug}`} className={`rounded-full border px-4 py-2 text-sm ${x.slug === a.slug ? "border-navy bg-navy text-white" : "border-hair bg-white"}`}>{tr(x.name)}</Link>)}</div>
    <Tag>Problems we solve</Tag><div className="grid gap-4 md:grid-cols-3">{a.pains.map((p, i) => <div key={i} className="flex gap-3 rounded-3xl border border-hair bg-white p-6"><X className="mt-0.5 shrink-0 text-red-600" size={18} />{tr(p)}</div>)}</div>
    <div className="mt-16"><Tag>What we recommend</Tag><div className="grid gap-5 md:grid-cols-3">{a.picks.map((p) => services.find((x) => x.slug === p)).filter(Boolean).map((s) => <Link key={s!.slug} href={`/services/${s!.slug}`}><TiltCard className="h-full rounded-3xl border border-hair bg-white p-7"><small className="eyebrow">{s!.tag}</small><h3 className="font-display text-4xl">{tr(s!.name)}</h3><p className="mt-2 text-sm text-soft">{tr(s!.blurb)}</p></TiltCard></Link>)}</div></div></div><CtaBand title="Let us scope it" /></>;
}
export function PackagesView() { const tr = useTr(); const { packages } = useContent();
  return <><Head tag="Packages" title={tr(packages.title)} sub={tr(packages.intro)} /><div className="mx-auto max-w-6xl px-6 pb-8"><div className="flex flex-wrap gap-2">{packages.families.map((f) => <a key={f.id} href={`#${f.id}`} className="rounded-full border border-hair bg-white px-4 py-2 text-sm font-semibold">{tr(f.name)}</a>)}</div></div>
    <div className="mx-auto grid max-w-6xl gap-24 px-6 py-16">{packages.families.map((f) => <PackageFamily key={f.id} id={f.id} />)}</div>
    <div className="mx-auto max-w-3xl px-6 pb-24"><H2 text="Questions" className="mb-8" /><Faq /></div><CtaBand title="Get your quotation" /></>; }
export function HowView() { const tr = useTr(); const { steps } = useContent(); const more = ["Discovery notes shared in writing", "Approval limits and roles mapped before building", "Data imported and cleaned with you", "Training per role: staff, approvers, admins", "Short user guide and Q and A at handover", "Go-live support while your team starts"];
  return <><Head tag={tr(steps.tag)} title="From first call to go-live, in four steps." sub="You always know what happens next." /><PinnedSteps title="Four steps. No surprises." /><div className="mx-auto max-w-4xl px-6 py-24">
    <h2 className="mb-6 mt-16 font-display text-5xl">What you can expect</h2><ul className="grid gap-3 sm:grid-cols-2">{more.map((m) => <li key={m} className="rounded-2xl border border-hair bg-white p-4 text-sm">{m}</li>)}</ul></div><CtaBand /></>; }
export function WebsitesView() { const tr = useTr(); const { siteTypes } = useContent();
  return <><Head tag="Websites" title="Ten kinds of website. One accountable builder." sub="Tell us what you need to achieve. We choose the structure that gets you there." /><div className="mx-auto grid max-w-6xl gap-4 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">{siteTypes.map((s, i) => <TiltCard key={i} className="rounded-3xl border border-hair bg-white p-7"><h2 className="font-display text-3xl">{tr(s.name)}</h2><p className="mt-2 text-sm text-soft">{tr(s.desc)}</p></TiltCard>)}</div><div className="px-6 pb-24 text-center"><Link href="/services/websites" className="font-semibold text-sage-deep underline">See what is included in every website</Link></div><CtaBand title="Plan your site" /></>; }
export function AboutView() { const tr = useTr(); const { about: a } = useContent();
  const blocks = [a.forWhom, a.problem, a.why];
  return <><Head tag="About" title={tr(a.title)} sub={tr(a.sub)} /><div className="mx-auto max-w-6xl px-6 pb-24"><div className="grid gap-5 md:grid-cols-3">{blocks.map((x, i) => <div key={i} className="rounded-3xl border border-hair bg-white p-7"><h2 className="font-display text-4xl">{tr(x.h)}</h2><p className="mt-3 text-soft">{tr(x.p)}</p></div>)}</div></div>
    <section className="dark-sec px-6 py-24"><div className="mx-auto max-w-5xl"><Tag>Position</Tag><p className="font-display text-5xl leading-[1] md:text-7xl">{tr(a.position)}</p></div></section>
    <div className="mx-auto max-w-6xl px-6 py-24"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{a.values.map((v, i) => <div key={i} className="rounded-3xl bg-sage-soft p-6"><h3 className="font-display text-4xl">{tr(v.t)}</h3><p className="mt-2 text-sm text-soft">{tr(v.d)}</p></div>)}</div>
      <div className="mt-20 grid gap-10 md:grid-cols-2"><div><Tag>{tr(a.offer.h)}</Tag><ul className="grid gap-3">{a.offer.items.map((x, i) => <li key={i} className="flex gap-3 border-b border-hair pb-3"><Check className="mt-0.5 shrink-0 text-sage-deep" size={18} />{tr(x)}</li>)}</ul></div><div><Tag>{tr(a.style.h)}</Tag><p className="text-lg text-soft">{tr(a.style.p)}</p></div></div></div><CtaBand title="Work with us" /></>; }
