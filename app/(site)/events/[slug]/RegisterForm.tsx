"use client";
import { useTr, Localized } from "@/lib/i18n";
import { useActionState } from "react";
import { registerEvent } from "@/app/actions";
const fld = "w-full rounded-xl border border-hair bg-paper px-4 py-3 text-sm outline-none focus:border-sage-deep";
export default function RegisterForm({ eventId }: { eventId: string }) { const tr = useTr();
  const [r, act, pending] = useActionState(registerEvent, null);
  return <form action={act} className="grid gap-3"><h2 className="h-sec text-xl"><Localized>{"Save your seat"}</Localized></h2><input name="website" tabIndex={-1} autoComplete="off" className="hidden" /><input type="hidden" name="event_id" value={eventId} /><input name="name" placeholder={tr("Your name")} className={fld} required /><input name="email" type="email" placeholder={tr("Email")} className={fld} required /><input name="phone" placeholder={tr("Phone (optional)")} className={fld} /><input name="organization" placeholder={tr("Organization")} className={fld} /><button disabled={pending} className="btn justify-center disabled:opacity-60"><Localized>{pending ? "Saving..." : "Register"}</Localized></button>{r && <p role="status" className={r.ok ? "text-sage-deep" : "text-red-700"}><Localized>{r.message}</Localized></p>}</form>;
}
