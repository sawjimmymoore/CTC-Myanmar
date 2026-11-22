"use client";
import { useTr, Localized } from "@/lib/i18n";
import { useActionState } from "react";
import { Head, ContactLines } from "@/components/Site";
import { sendMessage } from "@/app/actions";
import { EMAIL } from "@/lib/data";
const fld = "w-full rounded-xl border border-hair bg-white px-4 py-3 text-sm outline-none focus:border-sage-deep";
export default function Contact() { const tr = useTr();
  const [r, act, pending] = useActionState(sendMessage, null);
  return <><Head tag="Contact" title={tr("Tell us what you need.")} sub={tr("Email info@ctcmyanmar.com directly. We reply within 2 working days.")} />
    <div className="mx-auto max-w-2xl px-6 pt-10 text-sm"><b><Localized>{EMAIL}</Localized></b><ContactLines dark /></div><form action={act} className="mx-auto grid max-w-2xl gap-4 px-6 pb-28 pt-6"><input name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <input name="name" placeholder={tr("Your name")} className={fld} required /><input name="email" type="email" placeholder={tr("Email")} className={fld} required /><input name="subject" placeholder={tr("Subject")} className={fld} />
      <textarea name="message" rows={6} placeholder={tr("How can we help?")} className={fld} required />
      <button disabled={pending} className="rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white disabled:opacity-60"><Localized>{pending ? "Sending..." : "Send message"}</Localized></button>
      {r && <p role="status" className={r.ok ? "text-sage-deep" : "text-red-700"}><Localized>{r.message}</Localized></p>}</form></>;
}
