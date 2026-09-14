import { CardGridSkeleton } from "@/components/loading-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="mb-10 space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-3/4 max-w-xl" />
        <Skeleton className="h-5 w-full max-w-lg" />
      </div>
      <CardGridSkeleton />
    </div>
  );
}
