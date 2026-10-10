/** Tiny renderer for update bodies: blank line = paragraph, "## " = heading, "- " lines = list. */
export function Body({ text }: { text: string }) {
  return <div className="grid gap-5 leading-relaxed text-navy/85">{text.split(/\n{2,}/).map((b, i) => {
    if (b.startsWith("## ")) return <h2 key={i} className="mt-4 font-display text-4xl text-navy">{b.slice(3)}</h2>;
    if (b.startsWith("- ")) return <ul key={i} className="list-disc space-y-1 pl-5">{b.split("\n").map((l, j) => <li key={j}>{l.replace(/^- /, "")}</li>)}</ul>;
    return <p key={i}>{b}</p>; })}</div>;
}
