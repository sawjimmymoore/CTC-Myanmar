import { createClient } from "@/lib/supabase/server";
export default async function Regs() {
  const { data } = await (await createClient()).from("event_registrations").select("*, events(title)").order("created_at", { ascending: false });
  return <><h1 className="mb-6 text-2xl font-semibold">Event registrations</h1><div className="grid gap-3">{(data ?? []).map((r) => <div key={r.id} className="rounded-2xl border border-line bg-white p-5 text-sm"><b>{r.name}</b> <span className="text-navy/60">for {(r.events as { title: string } | null)?.title}</span><p className="text-navy/60"><a className="underline" href={`mailto:${r.email}`}>{r.email}</a>{r.phone ? ` - ${r.phone}` : ""}{r.organization ? ` - ${r.organization}` : ""}</p></div>)}{!data?.length && <p className="text-sm text-navy/60">No registrations yet.</p>}</div></>;
}
