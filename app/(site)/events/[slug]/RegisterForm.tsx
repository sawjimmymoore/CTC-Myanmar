"use client";
import { useActionState } from "react";
import { registerEvent } from "@/app/actions";
const fld = "w-full rounded-xl border border-hair bg-paper px-4 py-3 text-sm outline-none focus:border-sage-deep";
export default function RegisterForm({ eventId }: { eventId: string }) {
  const [r, act, pending] = useActionState(registerEvent, null);
  return <form action={act} className="grid gap-3"><h2 className="h-sec text-xl">Save your seat</h2><input name="website" tabIndex={-1} autoComplete="off" className="hidden" /><input type="hidden" name="event_id" value={eventId} /><input name="name" placeholder="Your name" className={fld} required /><input name="email" type="email" placeholder="Email" className={fld} required /><input name="phone" placeholder="Phone (optional)" className={fld} /><input name="organization" placeholder="Organization" className={fld} /><button disabled={pending} className="btn justify-center disabled:opacity-60">{pending ? "Saving..." : "Register"}</button>{r && <p role="status" className={r.ok ? "text-sage-deep" : "text-red-700"}>{r.message}</p>}</form>;
}
