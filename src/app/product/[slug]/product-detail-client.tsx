"use client";

import useSWR from "swr";
import Loading from "./loading";
import ProductNotFound from "../not-found";
import Image from "next/image";
import type { ProductInfer } from "@/components/products/ProductCardComponent";
import ProductSizeSelector from "@/components/products/ProductSizeSelector";
import Link from "next/link";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { getProductsApiUrl } from "@/lib/api";


async function fetchProduct(url: string): Promise<ProductInfer | null> {
  const response = await fetch(url);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Unable to load this product. Please try again.");
  const text = await response.text();
  if (!text.trim()) return null;
  const product: unknown = JSON.parse(text);
  if (product === null) return null;
  if (
    typeof product !== "object" ||
    !("id" in product) || typeof product.id !== "number" ||
    !("title" in product) || typeof product.title !== "string" ||
    !("image" in product) || typeof product.image !== "string" ||
    !("description" in product) || typeof product.description !== "string" ||
    !("price" in product) || typeof product.price !== "number"
  ) throw new Error("The product service returned invalid data.");
  return product as ProductInfer;
}

export default function ProductDetailClient({ slug }: { slug: string }) {
  const { data: product, error, isLoading, mutate } = useSWR(
    `${getProductsApiUrl()}/${slug}`,
    fetchProduct,
    { shouldRetryOnError: false }
  );

  if (isLoading) return <Loading />;
  if (error) return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <p role="alert" className="text-red-600">Unable to load this product. Please try again.</p>
      <button onClick={() => void mutate()} className="mt-4 rounded-full bg-slate-950 px-5 py-3 font-semibold text-white">Try again</button>
      <Link href="/product" className="ml-4 underline">Back to products</Link>
    </div>
  );
  if (!product) return <ProductNotFound />;
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/product" className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950"><ArrowLeft className="size-4" /> Back to products</Link>
      <div className="mt-8 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
        <div className="flex min-h-[420px] items-center justify-center bg-slate-100 p-10">
          <Image src={product.image} alt={product.title} width={500} height={500} className="max-h-96 w-full object-contain" />
        </div>
        <div className="p-8 sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Product</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight capitalize">{product.title}</h1>
          <p className="mt-7 text-3xl font-black">${product.price.toFixed(2)}</p>
          <ProductSizeSelector key={product.id} />
          <h2 className="mt-7 text-lg font-bold">Description</h2>
          <p className="mt-2 text-lg leading-8 text-slate-600">{product.description}</p>
          <div className="mt-7 space-y-3 text-sm text-slate-600">
            {["Free delivery in 3–5 days", "30-day returns", "Secure checkout"].map((item) => <p key={item} className="flex items-center gap-2"><Check className="size-4 text-emerald-600" />{item}</p>)}
          </div>
          <button className="mt-9 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 font-bold text-white transition hover:bg-slate-800"><ShoppingBag className="size-4" /> Add to bag</button>
        </div>
      </div>
    </div>
  );
}
