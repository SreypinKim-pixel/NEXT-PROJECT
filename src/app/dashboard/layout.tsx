import Link from "next/link";
import { LayoutDashboard, UserRound } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[220px_1fr] lg:px-8">
      <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-3 shadow-sm md:sticky md:top-24">
        <p className="px-3 pb-3 pt-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
        <nav className="grid grid-cols-2 gap-1 md:grid-cols-1">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"><LayoutDashboard className="size-4" /> Overview</Link>
          <Link href="/dashboard/user" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"><UserRound className="size-4" /> Profile</Link>
        </nav>
      </aside>
      <div>{children}</div>
    </section>
  );
}
