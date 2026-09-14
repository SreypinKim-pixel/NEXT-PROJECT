"use client";

import { useEffect, useState } from "react";
import { getProductsApiUrl } from "@/lib/api";
import { CardGridSkeleton } from "@/components/loading-skeletons";
import EcommerceProductCard, { type ProductInfer } from "./ProductCardComponent";

export default function ProductCardListComponent() {
  const [products, setProducts] = useState<ProductInfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch(getProductsApiUrl(), {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Unable to load products. Please refresh to try again.");
        const data: ProductInfer[] = await response.json();
        if (!controller.signal.aborted) setProducts(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error instanceof Error ? error.message : "Unable to load products.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void fetchProducts();
    return () => controller.abort();
  }, []);

  if (loading) return <div className="mt-10"><CardGridSkeleton /></div>;
  if (error) return <p className="mt-10 text-red-600" role="alert">{error}</p>;
  if (products.length === 0) return <p className="mt-10">No products available.</p>;

  return (
    <div className="mt-10">
      <p className="text-sm text-slate-600">{products.length} {products.length === 1 ? "product" : "products"}</p>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <EcommerceProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
