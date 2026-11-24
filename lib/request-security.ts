export function sameOrigin(origin: string | null, requestUrl: string, requestHost?: string | null): boolean {
  if (!origin) return false;
  try { const target = new URL(requestUrl); if (requestHost) target.host = requestHost; return new URL(origin).origin === target.origin; } catch { return false; }
}
export function validBooking(date: string, time: string, now = Date.now()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !["10:00", "11:30", "14:00", "15:30"].includes(time)) return false;
  const when = new Date(`${date}T${time}:00+06:30`);
  const day = new Date(`${date}T12:00:00Z`).getUTCDay();
  return Number.isFinite(+when) && when.toISOString().slice(0, 10) === date && day !== 0 && day !== 6 && +when > now && +when < now + 60 * 86400000;
}
const buckets = new Map<string, { count: number; reset: number }>();
/** Best-effort instance-local abuse control. A durable edge limit is still recommended. */
export function consumeRateLimit(key: string, now = Date.now()): boolean {
  const previous = buckets.get(key);
  if (previous && previous.reset > now) { if (previous.count >= 5) return false; previous.count++; return true; }
  if (buckets.size >= 10000) { for (const [id, bucket] of buckets) if (bucket.reset <= now) buckets.delete(id); if (buckets.size >= 10000) return false; }
  buckets.set(key, { count: 1, reset: now + 600000 }); return true;
}
