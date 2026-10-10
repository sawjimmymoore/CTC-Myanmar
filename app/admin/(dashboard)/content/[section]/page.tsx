"use client";
import { use, useEffect, useState } from "react";
import AutoField, { type JSONValue } from "../AutoField";
export default function SectionEditor({ params }: { params: Promise<{ section: string }> }) {
  const { section } = use(params);
  const [draft, setDraft] = useState<JSONValue | null>(null); const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => { fetch("/api/content?preview=1", { cache: "no-store" }).then((r) => r.json()).then((d) => setDraft(d[section] ?? null)); }, [section]);
  async function save(publish: boolean) {
    setBusy(true); setMsg("");
    let r = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: section, draft }) });
    if (r.ok && publish) r = await fetch("/api/admin/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: section }) });
    setMsg(r.ok ? (publish ? "Published. Live within 30 seconds." : "Draft saved. Use Preview to check it.") : `Failed (${r.status}). ${await r.text()}`); setBusy(false);
  }
  if (draft === null) return <p className="text-sm text-navy/60">Loading...</p>;
  return <div className="max-w-4xl"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-semibold capitalize">{section}</h1>
    <div className="flex gap-2"><a href="/?preview=1" target="_blank" className="rounded-full border border-hair bg-white px-4 py-2 text-sm font-semibold">Preview draft</a><button disabled={busy} onClick={() => save(false)} className="rounded-full border border-hair bg-white px-4 py-2 text-sm font-semibold">Save draft</button><button disabled={busy} onClick={() => save(true)} className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white">Save and publish</button></div></div>
    {msg && <p role="status" className="mb-4 text-sm">{msg}</p>}<AutoField label={section} value={draft} onChange={setDraft} /></div>;
}
