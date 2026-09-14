import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, LayoutDashboard, PackageCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div>
      <section className="overflow-hidden border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-amber-800">
              <Sparkles className="size-3.5" /> New collection
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-slate-100">
              Everyday goods,
              <span className="block text-slate-400">made remarkable.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              Explore useful, well-designed essentials without the clutter. Finding what you need should feel effortless.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/product" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-bold text-white transition hover:bg-slate-800">
                Explore products <ArrowRight className="size-4" />
              </Link>
              <Link href="/about" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800">
                Our story
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
              {["Fast browsing", "Clear details", "Simple checkout"].map((item) => (
                <span key={item} className="flex items-center gap-1.5"><Check className="size-4 text-emerald-600" />{item}</span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/60 sm:p-8 dark:shadow-black/30">
            <div className="absolute right-6 top-6 size-24 rounded-full bg-amber-400 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-300">Quick access</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">All systems ready</span>
              </div>
              <div className="my-14 grid gap-3">
                <Link href="/product" className="group flex items-center justify-between rounded-2xl bg-white p-5 text-slate-950 transition hover:-translate-y-1 dark:bg-slate-900 dark:text-slate-100">
                  <span className="flex items-center gap-3 font-bold"><PackageCheck className="size-5" /> Browse products</span>
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/dashboard" className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
                  <span className="flex items-center gap-3 font-bold"><LayoutDashboard className="size-5" /> Open dashboard</span>
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <p className="text-sm leading-6 text-slate-400">សួស្ដីប្រជាជនកម្ពុជា — welcome to your new, simpler storefront.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
