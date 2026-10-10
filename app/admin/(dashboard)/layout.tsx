import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LayoutDashboard, Newspaper, CalendarCheck, Inbox, ExternalLink, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./SignOutButton";
const SECTIONS = ["hero", "services", "audiences", "platforms", "packages", "steps", "problem", "why", "about", "faq", "cta", "footer", "siteTypes", "nav"];
const L = [["/admin", "Dashboard", LayoutDashboard], ["/admin/updates", "Updates", Newspaper], ["/admin/bookings", "Bookings", CalendarCheck], ["/admin/messages", "Messages", Inbox]] as const;
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return <div className="flex min-h-screen bg-paper text-navy"><aside className="flex w-60 shrink-0 flex-col border-r border-line bg-white">
    <div className="flex items-center gap-2.5 border-b border-line px-5 py-5"><Image src="/assets/logo-mark.png" alt="CTC" width={30} height={30} className="rounded-lg" /><b className="text-sm">CTC Admin</b></div>
    <nav className="flex-1 space-y-1 p-3">{L.map(([h, n, I]) => <Link key={h} href={h} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-navy/75 hover:bg-paper"><I size={16} />{n}</Link>)}
      <p className="mt-4 px-3 text-xs font-semibold text-navy/40">Site content</p>{SECTIONS.map((k) => <Link key={k} href={`/admin/content/${k}`} className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm capitalize text-navy/75 hover:bg-paper"><FileText size={14} />{k}</Link>)}<a href="/" target="_blank" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-navy/60 hover:bg-paper"><ExternalLink size={16} />View site</a></nav>
    <div className="border-t border-line p-4 text-xs text-navy/60"><p className="mb-2 truncate">{user.email}</p><SignOutButton /></div></aside>
    <main className="min-w-0 flex-1 p-8">{children}</main></div>;
}
