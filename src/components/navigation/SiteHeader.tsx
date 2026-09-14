"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, Sparkles, UserRound, X } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shopDialog = useRef<HTMLDialogElement>(null);

  function openShopDialog() {
    setOpen(false);
    shopDialog.current?.showModal();
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-xl bg-slate-950 text-white shadow-sm transition-transform group-hover:-rotate-3">
            <Sparkles className="size-4" />
          </span>
          <span className="text-base font-bold tracking-tight text-slate-950 dark:text-slate-100">NOVA</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-slate-950 text-white dark:bg-amber-400 dark:text-slate-950"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/dashboard/user" className="grid size-10 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white" aria-label="Open profile">
            <UserRound className="size-4" />
          </Link>
          <button type="button" onClick={openShopDialog} aria-haspopup="dialog" className="flex h-10 items-center gap-2 rounded-full bg-amber-400 px-4 text-sm font-bold text-slate-950 transition hover:bg-amber-300">
            <ShoppingBag className="size-4" /> Shop now
          </button>
        </div>

        <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-slate-200 text-slate-700 md:hidden dark:border-slate-700 dark:text-slate-300"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-900" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-semibold",
                  isActive(link.href) ? "bg-slate-950 text-white dark:bg-amber-400 dark:text-slate-950" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                )}
              >
                {link.label}
              </Link>
            ))}
            <button type="button" onClick={openShopDialog} aria-haspopup="dialog" className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-amber-300">
              <ShoppingBag className="size-4" /> Shop now
            </button>
          </div>
        </nav>
      )}
      <dialog ref={shopDialog} aria-labelledby="shop-auth-title" aria-describedby="shop-auth-description" className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-slate-950 shadow-xl backdrop:bg-black/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
        <div className="flex items-center justify-between gap-4">
          <h2 id="shop-auth-title" className="text-xl font-bold">Log in or register to shop</h2>
          <button type="button" onClick={() => shopDialog.current?.close()} aria-label="Close" className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="size-5" />
          </button>
        </div>
        <p id="shop-auth-description" className="mt-3 text-sm text-slate-600 dark:text-slate-400">Already have an account? Log in to continue, or register to get started.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/login" onClick={() => shopDialog.current?.close()} className="flex-1 rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-slate-800">Log in</Link>
          <Link href="/register" onClick={() => shopDialog.current?.close()} className="flex-1 rounded-full bg-amber-400 px-5 py-3 text-center text-sm font-bold text-slate-950 hover:bg-amber-300">Register</Link>
        </div>
      </dialog>
    </header>
  );
}
