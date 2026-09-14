


"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ProductSizeSelector from "./ProductSizeSelector";



const getDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  const day = date.getDate();
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
  const suffix = ["th", "st", "nd", "rd"][
    day % 10 > 3 ? 0 : (day % 100 - day % 10 !== 10 ? day % 10 : 0)
  ];
  return `${day}${suffix} ${month}`;
};

// productInterface
export interface ProductInfer{
    id: number;
    image: string;
    title: string;
    description: string;
    price: number;
}

export default function EcommerceProductCard({ product }: { product: ProductInfer }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [inBag, setInBag] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [cartError, setCartError] = useState<string | null>(null);
  const purchaseDialog = useRef<HTMLDialogElement>(null);

  function addToCart() {
    try {
      const items = JSON.parse(localStorage.getItem("product-cart") ?? "[]");
      if (!Array.isArray(items)) throw new Error("Invalid cart");
      items.push({ product, size: selectedSize, quantity: 1 });
      localStorage.setItem("product-cart", JSON.stringify(items));
      setInBag(true);
      setCartError(null);
    } catch {
      setCartError("Unable to save your cart. Please try again.");
    }
  }

  return (
    <div className="w-full">
      <Card className="w-full max-w-sm rounded-3xl overflow-hidden p-0 gap-0 border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group/card">

        {/* ── Image zone ── */}
        <div className="relative overflow-hidden h-72 bg-gradient-to-b from-slate-50 to-slate-100">
          <Link href={`/product/${product.id}`} className="absolute inset-0" aria-label={`View ${product.title}`}>
          <Image
            src={product.image}
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            className="object-contain drop-shadow-2xl p-8 transition-transform duration-500 ease-out group-hover/card:scale-105"
            alt={product.title}
          />
          </Link>

          {/* Wishlist — always visible top-right */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            title="Wishlist"
            className={cn(
              "absolute top-3 right-3 h-8 w-8 rounded-full border shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95",
              isWishlisted
                ? "bg-rose-50 border-rose-200 dark:bg-rose-950 dark:border-rose-800"
                : "bg-background"
            )}
          >
            <Heart
              className={cn(
                "w-3.5 h-3.5 transition-colors",
                isWishlisted ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
              )}
            />
          </button>
        </div>

        {/* Info zone */}
        <CardContent className="px-4 pt-4 pb-4 space-y-1.5">
          {/* Brand + name */}
          <div className="min-w-0">
            <h3 className="text-base font-bold text-foreground truncate">
              <Link href={`/product/${product.id}`} className="hover:underline">{product.title}</Link>
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {product.description}
            </p>
          </div>

          {/* Price & Discount */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-foreground font-bold text-base">${product.price.toFixed(2)}</span>
          </div>


          {/* Delivery */}
          <div className="text-xs text-muted-foreground font-medium">
            Delivery by <span suppressHydrationWarning className="text-foreground font-bold">{getDeliveryDate()}</span>
          </div>

          <ProductSizeSelector onSizeChange={(size) => { setSelectedSize(size); setInBag(false); }} />
        </CardContent>

        <CardFooter className="px-4 pb-6 gap-2 bg-transparent border-t-0">
          <button
            type="button"
            onClick={addToCart}
            className="flex h-12 min-w-0 flex-1 items-center justify-center gap-1 rounded-xl border border-slate-300 px-2 text-xs font-semibold transition hover:bg-slate-100"
          >
            <ShoppingBag className="size-4 shrink-0" />
            {inBag ? "Added to cart" : "Add to cart"}
          </button>
          <button
            type="button"
            onClick={() => purchaseDialog.current?.showModal()}
            className="flex h-12 min-w-0 flex-1 items-center justify-center rounded-xl bg-slate-950 px-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Buy now
          </button>
        </CardFooter>
        {cartError && <p role="alert" className="px-4 pb-4 text-sm text-red-600">{cartError}</p>}
        <dialog ref={purchaseDialog} className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-slate-950 shadow-xl backdrop:bg-black/50" aria-labelledby={`purchase-${product.id}`}>
          <h2 id={`purchase-${product.id}`} className="text-xl font-bold">Buy now</h2>
          <p className="mt-4 font-semibold">{product.title}</p>
          <p className="mt-2 text-sm">Size: {selectedSize}</p>
          <p className="mt-3 text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-sm text-slate-600">Checkout is not connected yet. You can save this item to your cart.</p>
          <div className="mt-6 flex gap-2">
            <button type="button" onClick={addToCart} className="flex-1 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white">{inBag ? "Added to cart" : "Add to cart"}</button>
            <button type="button" onClick={() => purchaseDialog.current?.close()} className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold">Close</button>
          </div>
          {cartError && <p role="alert" className="mt-3 text-sm text-red-600">{cartError}</p>}
        </dialog>

      </Card>
    </div>
  );
}
