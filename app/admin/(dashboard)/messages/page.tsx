import { createClient } from "@/lib/supabase/server";
import RowSelect from "@/components/RowSelect";
export default async function Messages() {
  const { data } = await (await createClient()).from("contact_messages").select("*").order("created_at", { ascending: false });
  return <><h1 className="mb-6 text-2xl font-semibold">Messages</h1><div className="grid gap-3">{(data ?? []).map((m) => <div key={m.id} className="flex flex-wrap justify-between gap-4 rounded-2xl border border-line bg-white p-5">
    <div className="max-w-2xl"><b>{m.subject || "No subject"}</b><p className="text-sm text-ink/60">{m.name} - <a href={`mailto:${m.email}`} className="underline">{m.email}</a> - {new Date(m.created_at).toLocaleString("en-GB")}</p><p className="mt-2 whitespace-pre-wrap text-sm">{m.message}</p></div>
    <RowSelect table="contact_messages" id={m.id} field="read" value={String(m.read)} options={["false", "true"]} /></div>)}{!data?.length && <p className="text-sm text-ink/60">No messages yet.</p>}</div></>;
}
