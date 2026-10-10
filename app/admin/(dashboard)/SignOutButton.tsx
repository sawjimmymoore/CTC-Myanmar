"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-ink/60 transition-colors hover:bg-cream-2 hover:text-ink"
    >
      <LogOut size={16} />
      Sign out
    </button>
  );
}
