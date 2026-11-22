/** Keep website prose plain while preserving hyphens in names and technical terms. */
export function plainCopy(text: string): string {
  return text.replace(/\s*[—–]\s*/g, ": ").replace(/\s+-\s+/g, ": ");
}
