import type { Lang } from "./i18n";

// Some browsers omit the Myanmar ICU locale; format parts explicitly so dates
// never silently fall back to English while the rest of the page is Burmese.
const months = ["ဇန်နဝါရီ", "ဖေဖော်ဝါရီ", "မတ်", "ဧပြီ", "မေ", "ဇွန်", "ဇူလိုင်", "ဩဂုတ်", "စက်တင်ဘာ", "အောက်တိုဘာ", "နိုဝင်ဘာ", "ဒီဇင်ဘာ"];
const weekdays = ["တနင်္ဂနွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး", "ကြာသပတေး", "သောကြာ", "စနေ"];
const mmDigits = (value: string) => value.replace(/\d/g, (digit) => "၀၁၂၃၄၅၆၇၈၉"[Number(digit)]);

export function formatDate(value: string, lang: Lang, options: Intl.DateTimeFormatOptions = {}) {
  const date = new Date(value);
  const config = { timeZone: "Asia/Yangon", ...options };
  const formatter = new Intl.DateTimeFormat("en-GB", config);
  if (lang === "en") return formatter.format(date);
  const calendar = new Intl.DateTimeFormat("en-US", { timeZone: config.timeZone, month: "numeric", weekday: "long" });
  const parts = calendar.formatToParts(date);
  const month = Number(parts.find((p) => p.type === "month")?.value) - 1;
  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(parts.find((p) => p.type === "weekday")?.value ?? "");
  return formatter.formatToParts(date).map((p) => p.type === "month" && /[a-z]/i.test(p.value) ? months[month] : p.type === "weekday" ? weekdays[day] : p.type === "dayPeriod" ? p.value.toLowerCase() === "am" ? "မနက်" : "ညနေ" : mmDigits(p.value)).join("");
}
