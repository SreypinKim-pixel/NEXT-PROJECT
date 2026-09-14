"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, Sparkles, UserRound, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-xl bg-slate-950 text-white shadow-sm transition-transform group-hover:-rotate-3">
            <Sparkles className="size-4" />
          </span>
          <span className="text-base font-bold tracking-tight text-slate-950">NOVA</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/dashboard/user" className="grid size-10 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950" aria-label="Open profile">
            <UserRound className="size-4" />
          </Link>
          <Link href="/product" className="flex h-10 items-center gap-2 rounded-full bg-amber-400 px-4 text-sm font-bold text-slate-950 transition hover:bg-amber-300">
            <ShoppingBag className="size-4" /> Shop now
          </Link>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-slate-200 text-slate-700 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-semibold",
                  isActive(link.href) ? "bg-slate-950 text-white" : "text-slate-700 hover:bg-slate-100",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
