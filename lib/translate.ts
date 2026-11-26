import legacyMyanmar from "../content/legacy-myanmar.json";
import previousMyanmar from "../content/previous-myanmar.json";
import { MY_COPY } from "../content/myanmar";
import thai from "../content/locales/th.json";
import chinese from "../content/locales/zh.json";
import { plainCopy } from "./copy-style";
import type { Lang } from "./locales";
export type Copy = { en: string; my?: string; th?: string; zh?: string };
export const CATALOGS: Record<Lang, Record<string, string>> = { en: {}, my: MY_COPY, th: thai, zh: chinese };
/** Refresh shipped copy while preserving an owner's custom Burmese edits. */
export function isPreviousMyanmar(english: string, localized: string): boolean {
  return localized === (legacyMyanmar as Record<string, string>)[english] || localized === (previousMyanmar as Record<string, string>)[english];
}
export function translateText(text: string, lang: Lang = "my"): string {
  if (lang === "en") return plainCopy(text);
  const trimmed = text.trim(); const match = CATALOGS[lang][trimmed];
  if (match) return plainCopy(text.replace(trimmed, match));
  const browse = /^Browse all (\d+) services$/.exec(trimmed);
  if (browse) {
    if (lang === "my") return `Services ${browse[1]} ခုလုံး ကြည့်ရန်`;
    if (lang === "th") return `ดูบริการทั้งหมด ${browse[1]} รายการ`;
    return `查看全部 ${browse[1]} 项服务`;
  }
  for (const prefix of ["Packages for ", "Add-ons for ", "Your road map for "]) {
    if (trimmed.startsWith(prefix)) {
      const name = translateText(trimmed.slice(prefix.length), lang);
      if (lang === "my") return name + (prefix === "Packages for " ? " အတွက် Packages" : prefix === "Add-ons for " ? " အတွက် Add-ons" : " အတွက် Project အဆင့်ဆင့်");
      if (lang === "th") return (prefix === "Packages for " ? "แพ็กเกจสำหรับ" : prefix === "Add-ons for " ? "บริการเสริมสำหรับ" : "ขั้นตอนสำหรับ") + name;
      return name + (prefix === "Packages for " ? "服务套餐" : prefix === "Add-ons for " ? "增值服务" : "项目流程");
    }
  }
  for (const separator of [" + ", ", "]) {
    const items = trimmed.split(separator);
    if (items.length > 1 && items.every((item) => CATALOGS[lang][item])) return items.map((item) => translateText(item, lang)).join(separator === ", " && lang === "zh" ? "、" : separator);
  }
  const booking = /^Booked for (.+) at (.+) \(Myanmar time\)\. We will confirm by email\.$/.exec(trimmed);
  if (booking) {
    const when = `${booking[1]} ${booking[2]}`;
    if (lang === "my") return `${when} (မြန်မာစံတော်ချိန်) အတွက် တောင်းဆိုချက် လက်ခံရရှိပါပြီ။ Email ဖြင့် အချိန်အတည်ပြုပေးပါမယ်။`;
    if (lang === "th") return `ได้รับคำขอนัดหมาย ${when} (เวลาเมียนมา) แล้ว เราจะยืนยันเวลาทางอีเมล`;
    return `已收到您预约 ${when}（缅甸时间）的申请，我们将通过电子邮件确认时间。`;
  }
  return plainCopy(text);
}
export function translate(value: Copy | string | undefined, lang: Lang): string {
  if (!value) return "";
  if (typeof value === "string") return translateText(value, lang);
  const localized = value[lang];
  if (lang !== "en" && localized && !(lang === "my" && isPreviousMyanmar(value.en, localized))) return plainCopy(localized);
  return translateText(value.en, lang);
}
