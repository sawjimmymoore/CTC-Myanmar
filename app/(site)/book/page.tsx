"use client";
import { useLang, useTr, Localized } from "@/lib/i18n";
import { formatDate } from "@/lib/date-format";
import { useActionState, useEffect, useMemo, useState } from "react";
import { Head } from "@/components/Site";
import { bookCall, slotsFor } from "@/app/actions";
import { TIMES } from "@/lib/data";
import { useContent } from "@/lib/content-context";
const fld = "w-full rounded-xl border border-hair bg-white px-4 py-3 text-sm outline-none focus:border-sage-deep";
export default function Book() { const tr = useTr(); const { lang } = useLang();
  const [r, act, pending] = useActionState(bookCall, null); const { services } = useContent();
  const [date, setDate] = useState(""); const [time, setTime] = useState(""); const [taken, setTaken] = useState<string[]>([]);
  const days = useMemo(() => { const out: string[] = []; const d = new Date(); while (out.length < 14) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) out.push(d.toISOString().slice(0, 10)); } return out; }, []);
  useEffect(() => { if (date) slotsFor(date).then(setTaken); }, [date, r]);
  return <><Head tag="Book" title={tr("Book a scoping call.")} sub="30 minutes. We confirm approval limits, data to import and your goals. Times are Myanmar time, Monday to Friday." />
    <form action={act} className="mx-auto grid max-w-3xl gap-6 px-6 pb-28"><input name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <input type="hidden" name="date" value={date} /><input type="hidden" name="time" value={time} />
      <fieldset><legend className="mb-3 text-sm font-semibold"><Localized>{"1. Pick a day"}</Localized></legend><div className="flex flex-wrap gap-2">{days.map((d) => <button type="button" key={d} onClick={() => { setDate(d); setTime(""); }} aria-pressed={date === d} className={`rounded-xl border px-4 py-2.5 text-sm ${date === d ? "border-navy bg-navy text-white" : "border-hair"}`}><Localized>{formatDate(d + "T00:00:00+06:30", lang, { weekday: "short", day: "numeric", month: "short" })}</Localized></button>)}</div></fieldset>
      {date && <fieldset><legend className="mb-3 text-sm font-semibold"><Localized>{"2. Pick a time"}</Localized></legend><div className="flex flex-wrap gap-2">{TIMES.map((t) => <button type="button" key={t} disabled={taken.includes(t)} onClick={() => setTime(t)} aria-pressed={time === t} className={`rounded-xl border px-4 py-2.5 text-sm disabled:line-through disabled:opacity-30 ${time === t ? "border-navy bg-navy text-white" : "border-hair"}`}><Localized>{t}</Localized></button>)}</div></fieldset>}
      <div className="grid gap-4 sm:grid-cols-2"><input name="name" placeholder={tr("Your name")} className={fld} required /><input name="email" type="email" placeholder={tr("Email")} className={fld} required /><input name="phone" placeholder={tr("Phone (optional)")} className={fld} /><input name="organization" placeholder={tr("Organization")} className={fld} /></div>
      <select name="service" className={fld} defaultValue=""><option value="" disabled><Localized>{"What do you need?"}</Localized></option>{services.map((s) => <option key={s.slug} value={s.name.en} className="text-black"><Localized>{s.name.en}</Localized></option>)}</select>
      <textarea name="notes" rows={4} placeholder={tr("Anything we should know?")} className={fld} />
      <button disabled={pending || !date || !time} className="rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white disabled:opacity-50"><Localized>{pending ? "Booking..." : "Confirm booking"}</Localized></button>
      {r && <p role="status" className={r.ok ? "text-sage-deep" : "text-red-700"}><Localized>{r.message}</Localized></p>}</form></>;
}
