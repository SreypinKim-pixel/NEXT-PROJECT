import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";

export default function AuthPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <Link href="/" className="mb-8 inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-950 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
        <ArrowLeft className="size-4" /> Back to home
      </Link>
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
        <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white sm:p-12 lg:sticky lg:top-24">
          <div aria-hidden="true" className="absolute -right-12 -top-12 size-48 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
              <Sparkles className="size-3.5" /> The everyday collection
            </span>
            <h2 className="mt-8 max-w-md text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">Everyday goods.<span className="block text-slate-400">A little more you.</span></h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-slate-300">Your next everyday favorite is waiting. Join us and explore useful, well-made essentials.</p>
            <div className="mt-10 hidden border-t border-white/15 pt-6 sm:block lg:mt-20">
              <p className="flex items-center justify-between text-sm font-semibold">Simple products. Thoughtful design.<ArrowUpRight className="size-5 text-amber-400" /></p>
            </div>
          </div>
        </section>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
