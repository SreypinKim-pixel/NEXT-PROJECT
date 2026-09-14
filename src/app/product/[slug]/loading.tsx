import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div role="status" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <span className="sr-only">Loading product details…</span>
      <div aria-hidden="true">
        <Skeleton className="h-11 w-44 rounded-full" />
        <div className="mt-8 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white lg:grid-cols-2 dark:border-slate-700 dark:bg-slate-900">
          <Skeleton className="min-h-[420px] rounded-none" />
          <div className="space-y-7 p-8 sm:p-12">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-9 w-28" />
            <div className="flex gap-3">
              {Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="size-11" />)}
            </div>
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
