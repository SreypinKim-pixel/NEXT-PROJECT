"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark")}
      className="grid size-10 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      <Moon aria-hidden="true" className="size-4 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-4 dark:block" />
      <span className="sr-only dark:hidden">Switch to dark mode</span>
      <span className="sr-only hidden dark:inline">Switch to light mode</span>
    </button>
  );
}
