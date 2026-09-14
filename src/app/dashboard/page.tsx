import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Package, UserRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashBoardPage() {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">Dashboard</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">Welcome back.</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Your most useful destinations are right here.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/product" className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"><Package className="size-6 text-amber-600 dark:text-amber-400" /><h2 className="mt-8 text-xl font-bold">Browse products</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">Explore the latest collection.</p><ArrowRight className="mt-5 size-5 transition-transform group-hover:translate-x-1" /></Link>
        <Link href="/dashboard/user" className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"><UserRound className="size-6 text-amber-600 dark:text-amber-400" /><h2 className="mt-8 text-xl font-bold">Your profile</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">View and manage your details.</p><ArrowRight className="mt-5 size-5 transition-transform group-hover:translate-x-1" /></Link>
      </div>
    </div>
  )
}
