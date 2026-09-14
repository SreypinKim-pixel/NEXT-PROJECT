"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const sizes = ["S", "M", "L", "XL"];

export default function ProductSizeSelector({ onSizeChange }: { onSizeChange?: (size: string) => void }) {
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <fieldset className="mt-4">
      <legend className="mb-2 text-sm font-semibold">Size</legend>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            aria-pressed={selectedSize === size}
            onClick={() => {
              setSelectedSize(size);
              onSizeChange?.(size);
            }}
            className={cn(
              "h-10 flex-1 rounded-lg border text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
              selectedSize === size
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-950"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
