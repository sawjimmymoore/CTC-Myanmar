"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#081426] px-5">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d2545] p-8 text-cream shadow-xl">
        <div className="flex items-center gap-2.5">
          <Image src="/assets/logo-mark.png" alt="CTC" width={32} height={32} className="rounded-full" />
          <span className="font-display text-base font-semibold">CTC Admin</span>
        </div>
        <h1 className="mt-6 text-lg font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-cream/50">Manage site content, programs, and photos.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-cream/60">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-gold-soft"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-cream/60">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-gold-soft"
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-maroon-900 transition-colors hover:bg-gold-soft disabled:opacity-60"
          >
            <LogIn size={15} />
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-cream/35">
          Accounts are created by the site owner in Supabase - see ADMIN_SETUP.md.
        </p>
      </div>
    </div>
  );
}
