import type { Metadata } from "next";
import ProductCardListComponent from "@/components/products/ProductCardListComponent";

export const metadata: Metadata = {
  title: "M2-Product",
  description: "this page is review by a platform selling products.",
};

export default function ProductPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">The collection</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Products worth keeping.</h1>
          <p className="mt-3 max-w-xl text-slate-600">A small selection of well-made essentials, presented with everything you need to choose quickly.</p>
        </div>
      </div>
      <ProductCardListComponent />
    </div>
  );
}
