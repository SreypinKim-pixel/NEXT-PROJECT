import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">404</span>
      <h1 className="mt-5 text-4xl font-black tracking-tight">We couldn&apos;t find that product.</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">It may have moved, sold out, or never existed.</p>
      <Link href="/product" className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800"><ArrowLeft className="size-4" /> Back to products</Link>
    </div>
  );
}
