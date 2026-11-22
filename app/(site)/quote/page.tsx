"use client";
import { useTr, Localized } from "@/lib/i18n";
import { Suspense, useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Head } from "@/components/Site";
import { sendMessage } from "@/app/actions";
import { useContent } from "@/lib/content-context";
const fld = "w-full rounded-xl border border-hair bg-white px-4 py-3 text-sm outline-none focus:border-sage-deep";
function Form() { const tr = useTr();
  const q = useSearchParams(); const { services: SERVICES, packages } = useContent(); const [r, act, pending] = useActionState(sendMessage, null);
  const [sel, setSel] = useState<string[]>([q.get("service") ? SERVICES.find((s) => s.slug === q.get("service"))?.name.en ?? "" : "", q.get("plan") ?? "", ...(q.get("items") ?? "").split(",")].filter(Boolean));
  const [org, setOrg] = useState(""); const [notes, setNotes] = useState("");
  const opts = [...SERVICES.map((s) => s.name.en), ...packages.families.flatMap((f) => f.tiers.map((t) => t.name.en))];
  const tog = (o: string) => setSel((s) => s.includes(o) ? s.filter((x) => x !== o) : [...s, o]);
  return <form action={act} className="mx-auto grid max-w-3xl gap-5 px-6 pb-28"><input name="website" tabIndex={-1} autoComplete="off" className="hidden" /><input type="hidden" name="subject" value="Quote request" />
    <input type="hidden" name="message" value={`Interested in: ${sel.join(", ") || "not sure yet"}\nOrganization: ${org}\n\n${notes}`} />
    <fieldset><legend className="mb-3 text-sm font-semibold"><Localized>{"What do you need? (pick any)"}</Localized></legend><div className="flex flex-wrap gap-2">{opts.map((o) => <button type="button" key={o} aria-pressed={sel.includes(o)} onClick={() => tog(o)} className={`rounded-full border px-4 py-2 text-sm ${sel.includes(o) ? "border-navy bg-navy text-white" : "border-hair"}`}><Localized>{o}</Localized></button>)}</div></fieldset>
    <div className="grid gap-4 sm:grid-cols-2"><input name="name" placeholder={tr("Your name")} className={fld} required /><input name="email" type="email" placeholder={tr("Email")} className={fld} required /></div>
    <input placeholder={tr("Organization")} value={org} onChange={(e) => setOrg(e.target.value)} className={fld} /><textarea rows={5} placeholder={tr("Tell us your goals and timeline")} value={notes} onChange={(e) => setNotes(e.target.value)} className={fld} />
    <button disabled={pending} className="rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white disabled:opacity-60"><Localized>{pending ? "Sending..." : "Request my quote"}</Localized></button>{r && <p role="status" className={r.ok ? "text-sage-deep" : "text-red-700"}><Localized>{r.message}</Localized></p>}</form>;
}
export default function Quote() { const tr = useTr();  return <><Head tag="Quote" title={tr("Request a quote.")} sub="Tell us what you need. We reply with next steps and a scoping call time." /><Suspense><Form /></Suspense></>; }
