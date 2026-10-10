"use client";
import { useActionState } from "react";
import { Head } from "@/components/Site";
import { sendMessage } from "@/app/actions";
import { EMAIL } from "@/lib/data";
const fld = "w-full rounded-xl border border-hair bg-white px-4 py-3 text-sm outline-none focus:border-sage-deep";
export default function Contact() {
  const [r, act, pending] = useActionState(sendMessage, null);
  return <><Head tag="Contact" title="Tell us what you need." sub={`Or email ${EMAIL}. Phone number coming soon.`} />
    <form action={act} className="mx-auto grid max-w-2xl gap-4 px-6 pb-28"><input name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <input name="name" placeholder="Your name" className={fld} required /><input name="email" type="email" placeholder="Email" className={fld} required /><input name="subject" placeholder="Subject" className={fld} />
      <textarea name="message" rows={6} placeholder="How can we help?" className={fld} required />
      <button disabled={pending} className="rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white disabled:opacity-60">{pending ? "Sending..." : "Send message"}</button>
      {r && <p role="status" className={r.ok ? "text-sage-deep-deep" : "text-red-700"}>{r.message}</p>}</form></>;
}
