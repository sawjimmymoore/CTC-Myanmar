"use server";
import { publicClient } from "@/lib/supabase/public";
export type Result = { ok: boolean; message: string };
const s = (f: FormData, k: string) => String(f.get(k) ?? "").trim().slice(0, 2000);
export async function slotsFor(date: string): Promise<string[]> {
  const db = publicClient(); if (!db || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const { data } = await db.rpc("taken_slots", { d: date }); return (data as string[]) ?? [];
}
export async function sendMessage(_: Result | null, f: FormData): Promise<Result> {
  if (s(f, "website")) return { ok: true, message: "Thanks." };
  const name = s(f, "name"), email = s(f, "email"), message = s(f, "message");
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) return { ok: false, message: "Add your name, a valid email and a message." };
  const db = publicClient(); if (!db) return { ok: false, message: "The form is not connected yet. Email us directly." };
  const { error } = await db.from("contact_messages").insert({ name, email, subject: s(f, "subject"), message });
  return error ? { ok: false, message: "Could not send. Please email us directly." } : { ok: true, message: "Message sent. We reply within 2 working days." };
}
export async function bookCall(_: Result | null, f: FormData): Promise<Result> {
  if (s(f, "website")) return { ok: true, message: "Thanks." };
  const name = s(f, "name"), email = s(f, "email"), date = s(f, "date"), time = s(f, "time");
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !date || !time) return { ok: false, message: "Add your name, email, a date and a time." };
  const db = publicClient(); if (!db) return { ok: false, message: "Booking is not connected yet. Email us directly." };
  const { error } = await db.from("bookings").insert({ name, email, phone: s(f, "phone"), organization: s(f, "organization"), service: s(f, "service"), notes: s(f, "notes"), date, time });
  if (error) return { ok: false, message: error.code === "23505" ? "That time was just taken. Pick another slot." : "Could not book. Please email us directly." };
  return { ok: true, message: `Booked for ${date} at ${time} (Myanmar time). We will confirm by email.` };
}
