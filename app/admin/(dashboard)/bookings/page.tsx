import { createClient } from "@/lib/supabase/server";
import RowSelect from "@/components/RowSelect";
export default async function Bookings() {
  const { data } = await (await createClient()).from("bookings").select("*").order("date").order("time");
  return <><h1 className="mb-6 text-2xl font-semibold">Bookings</h1><div className="grid gap-3">{(data ?? []).map((b) => <div key={b.id} className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-line bg-white p-5">
    <div><b>{b.date} at {b.time}</b><p className="text-sm">{b.name}{b.organization ? `, ${b.organization}` : ""}</p><p className="text-sm text-ink/60"><a href={`mailto:${b.email}`} className="underline">{b.email}</a>{b.phone ? ` - ${b.phone}` : ""}</p>{b.service && <p className="mt-1 text-sm">Interest: {b.service}</p>}{b.notes && <p className="mt-1 text-sm text-ink/70">{b.notes}</p>}</div>
    <RowSelect table="bookings" id={b.id} field="status" value={b.status} options={["new", "confirmed", "done", "cancelled"]} /></div>)}{!data?.length && <p className="text-sm text-ink/60">No bookings yet.</p>}</div></>;
}
