"use server";
import { publicClient } from "@/lib/supabase/public";
import { lookupEventTitle, notify, store } from "@/lib/submit";
import { allowSubmission } from "@/lib/form-security";
import { validBooking } from "@/lib/request-security";
export type Result = { ok: boolean; message: string };
const s = (f: FormData, k: string) => String(f.get(k) ?? "").trim().slice(0, 4000);
const FAIL = "We could not send this right now. Please email info@ctcmyanmar.com and we will help.";
const RATE_LIMIT = "Too many requests. Please wait a few minutes and try again.";
export async function slotsFor(date: string): Promise<string[]> {
  const db = publicClient(); if (!db || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const { data } = await db.rpc("taken_slots", { d: date }); return (data as string[]) ?? [];
}
export async function sendMessage(_: Result | null, f: FormData): Promise<Result> {
  if (s(f, "website")) return { ok: true, message: "Thanks." };
  const name = s(f, "name"), email = s(f, "email"), message = s(f, "message"), subject = s(f, "subject");
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) return { ok: false, message: "Add your name, a valid email and a message." };
  if (!await allowSubmission("message")) return { ok: false, message: RATE_LIMIT };
  const saved = await store("contact_messages", { name, email, subject, message });
  const kind = subject || "Contact message";
  const mailed = await notify({ kind: `New message: ${kind}`, email, name, fields: [["Name", name], ["Email", email], ["Subject", kind], ["Message", message]], confirmSubject: "We received your message - Click to Create", confirmIntro: "Thank you for contacting Click to Create. We have your message and will get back to you soon.", confirmFields: [["Subject", kind]] });
  return saved.ok || mailed ? { ok: true, message: "Message sent. We reply within 2 working days." } : { ok: false, message: FAIL };
}
export async function bookCall(_: Result | null, f: FormData): Promise<Result> {
  if (s(f, "website")) return { ok: true, message: "Thanks." };
  const name = s(f, "name"), email = s(f, "email"), date = s(f, "date"), time = s(f, "time"), phone = s(f, "phone"), organization = s(f, "organization"), service = s(f, "service"), notes = s(f, "notes");
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !date || !time) return { ok: false, message: "Add your name, email, a date and a time." };
  if (!validBooking(date, time)) return { ok: false, message: "That date or time is unavailable. Choose a weekday slot in Myanmar time." };
  if (!await allowSubmission("booking")) return { ok: false, message: RATE_LIMIT };
  const saved = await store("bookings", { name, email, phone, organization, service, notes, date, time });
  if (saved.code === "23505") return { ok: false, message: "That time was just taken. Pick another slot." };
  const when = `${date} at ${time} (Myanmar time)`;
  const mailed = await notify({ kind: `New booking: ${date} ${time} - ${name}`, email, name, fields: [["When", when], ["Name", name], ["Email", email], ["Phone", phone], ["Organization", organization], ["Interested in", service], ["Notes", notes]], confirmSubject: `Your free scoping call request: ${date} ${time}`, confirmIntro: "Thank you for booking a free 30-minute scoping call. We have your request and will confirm the time by email.", confirmFields: [["When", when], ["Interested in", service]] });
  return saved.ok || mailed ? { ok: true, message: `Booked for ${when}. We will confirm by email.` } : { ok: false, message: FAIL };
}
export async function registerEvent(_: Result | null, f: FormData): Promise<Result> {
  if (s(f, "website")) return { ok: true, message: "Thanks." };
  const name = s(f, "name"), email = s(f, "email"), event_id = s(f, "event_id"), phone = s(f, "phone"), organization = s(f, "organization");
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !event_id) return { ok: false, message: "Add your name and a valid email." };
  if (!await allowSubmission("registration")) return { ok: false, message: RATE_LIMIT };
  if (!/^[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i.test(event_id)) return { ok: false, message: "This event is not available for registration." };
  const db = publicClient();
  const { data: event } = db ? await db.from("events").select("id,starts_at").eq("id", event_id).eq("published", true).maybeSingle() : { data: null };
  if (!event || +new Date(event.starts_at) <= Date.now()) return { ok: false, message: "This event is not available for registration." };
  const saved = await store("event_registrations", { event_id, name, email, phone, organization });
  const title = await lookupEventTitle(event_id);
  const mailed = await notify({ kind: `Event registration: ${title || "event"} - ${name}`, email, name, fields: [["Event", title], ["Name", name], ["Email", email], ["Phone", phone], ["Organization", organization]], confirmSubject: `You are registered${title ? `: ${title}` : ""}`, confirmIntro: "Thank you for registering. We will email you the details before the event.", confirmFields: [["Event", title]] });
  return saved.ok || mailed ? { ok: true, message: "You are registered. We will email you the details." } : { ok: false, message: FAIL };
}
