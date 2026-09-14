import { Skeleton } from "@/components/ui/skeleton";

export function CardGridSkeleton({ label = "Loading products…" }: { label?: string }) {
  return (
    <div role="status">
      <span className="sr-only">{label}</span>
      <div aria-hidden="true" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <Skeleton className="h-72 w-full rounded-none" />
            <div className="space-y-4 p-4">
              <Skeleton className="h-5 w-4/5" />
              <div data-slot="description-skeleton" className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-11 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" role="status">
      <span className="sr-only">Loading page…</span>
      <div aria-hidden="true" className="space-y-6">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-12 w-3/4 max-w-xl" />
        <Skeleton className="h-5 w-full max-w-lg" />
        <div className="grid gap-6 pt-4 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-64 rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
