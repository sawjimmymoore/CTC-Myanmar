"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
export default function RowSelect({ table, id, field, value, options }: { table: string; id: string; field: string; value: string; options: string[] }) {
  const r = useRouter();
  return <select defaultValue={value} className="rounded-lg border border-line bg-white px-2 py-1 text-sm" onChange={async (e) => { await createClient().from(table).update({ [field]: e.target.value }).eq("id", id); r.refresh(); }}>{options.map((o) => <option key={o}>{o}</option>)}</select>;
}
