import Image from "next/image";
import { notFound } from "next/navigation";
import type { ProductInfer } from "@/components/products/ProductCardComponent";
import ProductSizeSelector from "@/components/products/ProductSizeSelector";
import Link from "next/link";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { getProductsApiUrl } from "@/lib/api";

export default async function ProductDetailPage({
    params
}: {
    params: Promise<{slug:string}>
}) {
    const {slug} = await params;
    if (!/^[1-9]\d*$/.test(slug)) notFound();
    const response = await fetch(`${getProductsApiUrl()}/${slug}`);
    if (response.status === 404) notFound();
    if (!response.ok) throw new Error("Unable to load this product. Please try again.");
    const product: ProductInfer | null = await response.json();
    if (!product) notFound();
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
