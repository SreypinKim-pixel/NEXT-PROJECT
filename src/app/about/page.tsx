

import Link from "next/link";
import { ArrowRight, Heart, ShieldCheck, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import thumbnail from "../../../public/Thumbnail.png";

export const metadata: Metadata = {
  title: "About",
  description: "this page showcase about th team journey.",
  openGraph: {
    title: 'M2' ,
    description: '',
    images: [
      {
        url: thumbnail.src,
        width: thumbnail.width,
        height: thumbnail.height,
        alt: "M2 About page thumbnail",
      },
    ]
  }
};



export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">About Nova</p>
      <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-6xl dark:text-slate-100">Good design should make everyday life feel easier.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">សួស្ដីអ្នកទាំងអស់គ្នា។ We built Nova as a friendly place to discover useful products, understand them quickly, and move through every page with confidence.</p>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {[
          { icon: Sparkles, title: "Clear by design", text: "Less noise, stronger hierarchy, and obvious next steps on every page." },
          { icon: ShieldCheck, title: "Made with care", text: "Thoughtful details and reliable patterns keep the experience predictable." },
          { icon: Heart, title: "People first", text: "Comfortable spacing, readable type, and navigation that works on every screen." },
        ].map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <span className="grid size-11 place-items-center rounded-2xl bg-amber-100 text-amber-800"><Icon className="size-5" /></span>
            <h2 className="mt-6 text-xl font-bold">{title}</h2>
            <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">{text}</p>
          </article>
        ))}
      </div>

      <div className="mt-14 flex flex-col justify-between gap-6 rounded-3xl bg-slate-950 p-8 text-white sm:flex-row sm:items-center">
        <div><p className="text-2xl font-bold">Ready to take a look?</p><p className="mt-1 text-slate-400">Our product collection is one click away.</p></div>
        <Link href="/product" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-amber-400 px-5 text-sm font-bold text-slate-950 hover:bg-amber-300">Browse products <ArrowRight className="size-4" /></Link>
      </div>
    </div>
  );
}
