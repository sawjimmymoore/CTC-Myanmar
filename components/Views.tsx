"use client";
import Link from "next/link";
import { ArrowRight, Check, X, ShieldCheck, Layers, UserCheck, Database } from "lucide-react";
import { Words, Head } from "./Site";
import Marquee from "./Marquee";
import Magnetic from "./Magnetic";
import TiltCard from "./TiltCard";
import MotionBackground from "./MotionBackground";
import ScrollTextHighlight from "./effects/ScrollTextHighlight";
import FaqAccordion from "./FaqAccordion";
import { H2, Tag, CtaBand, ServiceRows, PackageFamily } from "./Blocks";
import { useTr } from "@/lib/i18n";
import { useContent } from "@/lib/content-context";
type Post = { slug: string; title: string; category: string; excerpt: string };
const icons = [UserCheck, ShieldCheck, Layers, Database];
const Steps = () => { const tr = useTr(); const { steps } = useContent(); return <div className="mt-12 grid gap-6 md:grid-cols-4">{steps.items.map((s, i) => <div key={i} className="border-t border-current/20 pt-5"><b className="font-display text-6xl font-normal text-sage">{i + 1}</b><h3 className="mt-2 font-semibold">{tr(s.t)}</h3><p className="soft mt-1 text-sm opacity-80">{tr(s.d)}</p></div>)}</div>; };
const Faq = () => { const tr = useTr(); const { faq } = useContent(); return <FaqAccordion items={faq.map((f) => ({ q: tr(f.q), a: tr(f.a) }))} />; };

export function HomeView({ posts }: { posts: Post[] }) {
  const tr = useTr(); const c = useContent(); const { hero } = c;
  return <>
    <section className="relative flex min-h-svh items-end overflow-hidden px-6 pb-24 pt-32 sm:pb-16" style={{ background: "radial-gradient(55% 55% at 82% 28%,rgba(143,176,138,.45),transparent 70%),radial-gradient(45% 45% at 8% 90%,rgba(143,176,138,.22),transparent 70%),#f6f7f5" }}>
      <div className="pointer-events-none absolute inset-0 opacity-40"><MotionBackground /></div>
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_260px] lg:items-end"><div>
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-hair bg-white/70 px-4 py-1.5 text-xs text-soft"><i className="size-2 rounded-full bg-sage" />{tr(hero.badge)}</p>
        <h1 className="font-display text-[clamp(56px,11.5vw,170px)] leading-[.92]"><Words text={tr(hero.line1)} /><br /><Words text={tr(hero.line2)} base={4} /></h1>
        <p className="my-6 max-w-lg text-soft">{tr(hero.sub)}</p>
        <div className="flex flex-wrap gap-3"><Magnetic><Link href="/book" className="btn">{tr(hero.primary)} <ArrowRight size={16} /></Link></Magnetic><Link href="/services" className="btn btn-ghost">{tr(hero.secondary)}</Link></div>
        <p className="mt-5 text-xs text-soft">{tr(hero.note)}</p></div>
        <div className="hidden gap-3 lg:grid">{hero.stats.map((s, i) => <div key={i} className="rounded-2xl border border-hair bg-white/80 p-5 backdrop-blur"><b className="font-display text-5xl font-normal">{tr(s.n)}</b><p className="text-xs text-soft">{tr(s.label)}</p></div>)}</div></div></section>
    <Marquee items={hero.marquee} className="border-y border-hair bg-white py-4" />
    <section className="px-6 py-28"><div className="mx-auto max-w-4xl"><Tag>{tr(c.problem.tag)}</Tag><ScrollTextHighlight className="font-display text-5xl leading-[1] md:text-7xl" text={tr(c.problem.text)} /></div>
      <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">{c.problem.cards.map((x, i) => <TiltCard key={i} className="rounded-3xl border border-hair bg-white p-7"><h3 className="font-accent text-xl tracking-wide">{tr(x.t)}</h3><p className="mt-2 text-sm text-soft">{tr(x.d)}</p></TiltCard>)}</div></section>
    <section className="dark-sec px-6 py-28"><div className="mx-auto max-w-6xl"><Tag>{tr(c.steps.tag)}</Tag><H2 text={tr(c.steps.title)} /><Steps /></div></section>
    <section className="px-6 py-28"><div className="mx-auto max-w-6xl"><Tag>Built for every stage</Tag><H2 text="Made for the way you work." />
      <div className="mt-12 grid gap-5 md:grid-cols-2">{c.audiences.map((a) => <Link key={a.slug} href={`/for/${a.slug}`}><TiltCard className="h-full rounded-3xl border border-hair bg-white p-8"><h3 className="font-display text-4xl">{tr(a.name)}</h3><p className="mt-2 text-soft">{tr(a.line)}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sage-deep">See how we help <ArrowRight size={15} /></span></TiltCard></Link>)}</div></div></section>
    <section className="bg-white px-6 py-28"><div className="mx-auto max-w-6xl"><Tag>{tr(c.nav.services)}</Tag><H2 text="Everything your brand needs, built to be used." className="mb-12" /><ServiceRows /></div></section>
    <section className="bg-sage-soft px-6 py-28"><div className="mx-auto max-w-6xl"><Tag>Why CTC</Tag><H2 text="Responsibility, not just delivery." />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{c.why.map((w, i) => { const I = icons[i % 4]; return <div key={i} className="rounded-3xl bg-white p-6"><I className="text-sage-deep" /><h3 className="mt-4 font-semibold">{tr(w.t)}</h3><p className="mt-2 text-sm text-soft">{tr(w.d)}</p></div>; })}</div></div></section>
    <section className="px-6 py-28"><div className="mx-auto max-w-6xl"><Tag>{tr(c.nav.packages)}</Tag><H2 text={tr(c.packages.title)} className="mb-12" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{c.packages.families.map((f) => <Link key={f.id} href={`/packages#${f.id}`}><TiltCard className="h-full rounded-3xl border border-hair bg-white p-7"><h3 className="font-display text-4xl">{tr(f.name)}</h3><p className="mt-2 text-sm text-soft">{tr(f.intro)}</p><p className="mt-4 text-xs font-semibold text-sage-deep">{f.tiers.map((t) => t.name.en).join(" / ")}</p></TiltCard></Link>)}</div></div></section>
    {posts.length > 0 && <section className="bg-white px-6 py-24"><div className="mx-auto max-w-6xl"><div className="mb-10 flex items-end justify-between"><H2 text="Latest updates" /><Link href="/updates" className="text-sm font-semibold text-sage-deep">All updates</Link></div><div className="grid gap-5 md:grid-cols-3">{posts.map((p) => <Link key={p.slug} href={`/updates/${p.slug}`} className="rounded-3xl border border-hair p-6 transition hover:bg-paper"><small className="eyebrow">{p.category}</small><h3 className="mt-2 text-xl font-semibold">{p.title}</h3><p className="mt-2 text-sm text-soft">{p.excerpt}</p></Link>)}</div></div></section>}
    <section className="px-6 py-28"><div className="mx-auto max-w-3xl"><H2 text="Questions we hear first." className="mb-10" /><Faq /></div></section>
    <CtaBand /></>;
}
export function ServicesView() { const tr = useTr(); const { nav } = useContent();
  return <><Head tag={tr(nav.services)} title="What CTC builds, runs and looks after." sub="Pick one service or combine them. Every project has one point of contact." /><div className="mx-auto max-w-6xl px-6 pb-20"><ServiceRows /><div className="mt-24"><H2 text="Ongoing care and growth." className="mb-10" /><ServiceRows group="care" /></div></div><CtaBand title="Not sure what you need?" sub="Tell us your goal. We recommend the shortest path." /></>; }
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
  return <><Head tag={tr(steps.tag)} title="From first call to go-live, in four steps." sub="You always know what happens next." /><div className="mx-auto max-w-4xl px-6 pb-24">{steps.items.map((s, i) => <div key={i} className="grid gap-4 border-t border-hair py-10 md:grid-cols-[120px_1fr]"><b className="font-display text-7xl font-normal text-sage">{i + 1}</b><div><h2 className="text-2xl font-semibold">{tr(s.t)}</h2><p className="mt-2 text-soft">{tr(s.d)}</p></div></div>)}
    <h2 className="mb-6 mt-16 font-display text-5xl">What you can expect</h2><ul className="grid gap-3 sm:grid-cols-2">{more.map((m) => <li key={m} className="rounded-2xl border border-hair bg-white p-4 text-sm">{m}</li>)}</ul></div><CtaBand /></>; }
export function WebsitesView() { const tr = useTr(); const { siteTypes } = useContent();
  return <><Head tag="Websites" title="Ten kinds of website. One accountable builder." sub="Tell us what you need to achieve. We choose the structure that gets you there." /><div className="mx-auto grid max-w-6xl gap-4 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">{siteTypes.map((s, i) => <TiltCard key={i} className="rounded-3xl border border-hair bg-white p-7"><h2 className="font-display text-3xl">{tr(s.name)}</h2><p className="mt-2 text-sm text-soft">{tr(s.desc)}</p></TiltCard>)}</div><div className="px-6 pb-24 text-center"><Link href="/services/websites" className="font-semibold text-sage-deep underline">See what is included in every website</Link></div><CtaBand title="Plan your site" /></>; }
export function AboutView() { const tr = useTr(); const { about: a } = useContent();
  const blocks = [a.forWhom, a.problem, a.why];
  return <><Head tag="About" title={tr(a.title)} sub={tr(a.sub)} /><div className="mx-auto max-w-6xl px-6 pb-24"><div className="grid gap-5 md:grid-cols-3">{blocks.map((x, i) => <div key={i} className="rounded-3xl border border-hair bg-white p-7"><h2 className="font-display text-4xl">{tr(x.h)}</h2><p className="mt-3 text-soft">{tr(x.p)}</p></div>)}</div></div>
    <section className="dark-sec px-6 py-24"><div className="mx-auto max-w-5xl"><Tag>Position</Tag><p className="font-display text-5xl leading-[1] md:text-7xl">{tr(a.position)}</p></div></section>
    <div className="mx-auto max-w-6xl px-6 py-24"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{a.values.map((v, i) => <div key={i} className="rounded-3xl bg-sage-soft p-6"><h3 className="font-display text-4xl">{tr(v.t)}</h3><p className="mt-2 text-sm text-soft">{tr(v.d)}</p></div>)}</div>
      <div className="mt-20 grid gap-10 md:grid-cols-2"><div><Tag>{tr(a.offer.h)}</Tag><ul className="grid gap-3">{a.offer.items.map((x, i) => <li key={i} className="flex gap-3 border-b border-hair pb-3"><Check className="mt-0.5 shrink-0 text-sage-deep" size={18} />{tr(x)}</li>)}</ul></div><div><Tag>{tr(a.style.h)}</Tag><p className="text-lg text-soft">{tr(a.style.p)}</p></div></div></div><CtaBand title="Work with us" /></>; }
