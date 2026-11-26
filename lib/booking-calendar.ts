/** Generate date-only slots in Myanmar time, independent of server/browser timezone. */
export function bookingDays(now = Date.now(), count = 14): string[] {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Yangon", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(now));
  const part = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)!.value);
  const date = new Date(Date.UTC(part("year"), part("month") - 1, part("day")));
  const days: string[] = [];
  while (days.length < count) {
    date.setUTCDate(date.getUTCDate() + 1);
    if (date.getUTCDay() !== 0 && date.getUTCDay() !== 6) days.push(date.toISOString().slice(0, 10));
  }
  return days;
}
