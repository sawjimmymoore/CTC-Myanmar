import legacyMyanmar from "../content/legacy-myanmar.json";
import { MY_COPY } from "../content/myanmar";
import thai from "../content/locales/th.json";
import chinese from "../content/locales/zh.json";
import { plainCopy } from "./copy-style";
import type { Lang } from "./locales";
export type Copy = { en: string; my?: string; th?: string; zh?: string };
export const CATALOGS: Record<Lang, Record<string, string>> = { en: {}, my: MY_COPY, th: thai, zh: chinese };
export function translateText(text: string, lang: Lang = "my"): string {
  if (lang === "en") return plainCopy(text);
  const trimmed = text.trim(); const match = CATALOGS[lang][trimmed];
  if (match) return plainCopy(text.replace(trimmed, match));
  for (const prefix of ["Packages for ", "Add-ons for "]) {
    if (trimmed.startsWith(prefix)) {
      const name = translateText(trimmed.slice(prefix.length), lang);
      if (lang === "my") return name + (prefix === "Packages for " ? " အတွက် ပက်ကေ့ချ်များ" : " အတွက် ထပ်ဆောင်းဝန်ဆောင်မှုများ");
      if (lang === "th") return (prefix === "Packages for " ? "แพ็กเกจสำหรับ" : "บริการเสริมสำหรับ") + name;
      return name + (prefix === "Packages for " ? "服务套餐" : "增值服务");
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
  if (lang !== "en" && localized && !(lang === "my" && localized === (legacyMyanmar as Record<string, string>)[value.en])) return plainCopy(localized);
  return translateText(value.en, lang);
}
