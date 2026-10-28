/** Email through the Resend HTTP API (works on Vercel and Cloudflare). No RESEND_API_KEY = emails are skipped, forms still save. */
export const TEAM_EMAIL = () => process.env.NOTIFY_EMAIL || "info@ctcmyanmar.com";
export const confirmationsOn = () => process.env.SEND_CONFIRMATIONS !== "false";
export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
export type Mail = { to: string; subject: string; html: string; text: string; replyTo?: string };
export async function sendMail(m: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY; if (!key) return false;
  try {
    const r = await fetch(`${process.env.RESEND_API_URL || "https://api.resend.com"}/emails`, { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.MAIL_FROM || "Click to Create <noreply@ctcmyanmar.com>", to: [m.to], subject: m.subject, html: m.html, text: m.text, reply_to: m.replyTo }) });
    if (!r.ok) { console.error("[mail] send failed", r.status, (await r.text()).slice(0, 300)); return false; }
    return true;
  } catch (e) { console.error("[mail] error", e); return false; }
}
const shell = (title: string, body: string) => `<div style="font-family:Arial,Helvetica,sans-serif;background:#f6f7f5;padding:24px"><div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e1e5e0"><div style="background:#162a4a;color:#fff;padding:18px 24px;font-size:18px;font-weight:bold">Click to Create</div><div style="padding:24px;color:#162a4a;font-size:15px;line-height:1.6"><h2 style="margin:0 0 12px;font-size:18px">${esc(title)}</h2>${body}</div><div style="padding:14px 24px;background:#f6f7f5;color:#5b6878;font-size:12px">Click to Create (CTC) - info@ctcmyanmar.com - ctcmyanmar.com</div></div></div>`;
export const rows = (r: [string, string][]) => `<table style="width:100%;border-collapse:collapse">${r.filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:6px 10px 6px 0;color:#5b6878;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0">${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>`;
/** Notification to the CTC team. Reply goes straight to the person who submitted. */
export function teamMail(kind: string, fields: [string, string][], replyTo: string): Mail {
  const text = `${kind}\n\n${fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n")}`;
  return { to: TEAM_EMAIL(), subject: `[CTC website] ${kind}`, replyTo, text, html: shell(kind, rows(fields)) };
}
/** Confirmation to the person who submitted. */
export function confirmMail(to: string, name: string, subject: string, intro: string, fields: [string, string][]): Mail {
  const text = `Hello ${name},\n\n${intro}\n\n${fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nWe reply within 2 working days.\nကျေးဇူးတင်ပါသည်။ ၂ ရက်အတွင်း ပြန်လည်ဆက်သွယ်ပါမည်။\n\nClick to Create\ninfo@ctcmyanmar.com`;
  return { to, subject, text, html: shell(subject, `<p>Hello ${esc(name)},</p><p>${esc(intro)}</p>${rows(fields)}<p style="margin-top:16px">We reply within 2 working days.<br>ကျေးဇူးတင်ပါသည်။ ၂ ရက်အတွင်း ပြန်လည်ဆက်သွယ်ပါမည်။</p><p>Click to Create<br><a href="mailto:info@ctcmyanmar.com">info@ctcmyanmar.com</a></p>`) };
}
