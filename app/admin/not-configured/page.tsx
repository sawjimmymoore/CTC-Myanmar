import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function AdminNotConfiguredPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-2 px-5">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-paper p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-forest">
          <AlertTriangle size={20} />
        </div>
        <h1 className="mt-4 font-display text-xl font-semibold text-ink">
          Admin panel isn&rsquo;t connected yet
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          The admin dashboard needs a Supabase project connected before it can be used - this is a
          one-time, ~10 minute setup. Follow the steps in{" "}
          <code className="rounded bg-cream-2 px-1.5 py-0.5 text-xs">README.md</code> in the
          project folder:
        </p>
        <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-ink/75">
          <li>Create a free project at supabase.com</li>
          <li>
            Copy <code className="rounded bg-cream-2 px-1 py-0.5 text-xs">.env.local.example</code> to{" "}
            <code className="rounded bg-cream-2 px-1 py-0.5 text-xs">.env.local</code> and paste in your
            project&rsquo;s 3 API keys
          </li>
          <li>
            Run <code className="rounded bg-cream-2 px-1 py-0.5 text-xs">supabase/schema.sql</code> in the
            Supabase SQL editor
          </li>
          <li>
            Run <code className="rounded bg-cream-2 px-1 py-0.5 text-xs">npm run seed</code>
          </li>
          <li>Add your login under Authentication → Users in Supabase</li>
        </ol>
        <p className="mt-4 text-xs text-ink/45">
          The public site works normally in the meantime - this only affects <code>/admin</code>.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink/70 transition-colors hover:border-forest hover:text-forest"
        >
          Back to site
        </Link>
      </div>
    </div>
  );
}
