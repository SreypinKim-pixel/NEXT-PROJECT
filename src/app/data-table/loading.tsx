import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div role="status" className="mx-auto max-w-7xl px-4 py-10">
      <span className="sr-only">Loading products…</span>
      <div aria-hidden="true">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="mb-6 mt-2 h-5 w-48" />
        <div className="flex items-center justify-between gap-3 py-4">
          <Skeleton className="h-8 w-full max-w-sm" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="overflow-x-auto rounded-xl border-2 border-slate-400">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-[32px_48px_64px_2fr_1fr_1fr_64px_32px] items-center gap-4 bg-slate-900 px-4 py-3">
              {Array.from({ length: 8 }, (_, index) => (
                <Skeleton key={index} className="h-5 w-full bg-slate-600" />
              ))}
            </div>
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className="grid grid-cols-[32px_48px_64px_2fr_1fr_1fr_64px_32px] items-center gap-4 border-t border-slate-300 px-4 py-3 dark:border-slate-600">
                <Skeleton className="size-4" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="size-12" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="size-6" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 py-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
}
