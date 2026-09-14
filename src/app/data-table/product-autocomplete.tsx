"use client";

import { Component, Suspense, type ReactNode } from "react";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";

type Product = { id: string; name: string };

async function fetcher(url: string): Promise<Product[]> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

class ProductSearchError extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p role="alert">Failed to fetch products. Please try another search.</p>;
    }
    return this.props.children;
  }
}

export function ProductAutocomplete({ query }: { query: string }) {
  if (!query) return null;

  return (
    <ProductSearchError key={query}>
      <Suspense fallback={
        <div role="status" className="max-w-md space-y-2 rounded-lg border p-3">
          <span className="sr-only">Loading products...</span>
          <div aria-hidden="true" className="space-y-2">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-5 w-3/5" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </div>
      }>
        <ProductResults query={query} />
      </Suspense>
    </ProductSearchError>
  );
}

function ProductResults({ query }: { query: string }) {
  const { data } = useSWR(
    `/api/products?query=${encodeURIComponent(query)}`,
    fetcher,
    { suspense: true },
  );

  if (data.length === 0) return <p role="status">No products found.</p>;

  return (
    <ul className="max-w-md space-y-2 rounded-lg border p-3">
      {data.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
