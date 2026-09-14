"use client";

import { useState, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { ProductAutocomplete } from "./product-autocomplete";

export default function DataTableLayout({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");

  return (
    <>
      <section className="mx-auto max-w-7xl space-y-3 px-4 pt-10" aria-label="Product search">
        <label htmlFor="product-query" className="text-sm font-medium">Search products</label>
        <Input
          id="product-query"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter a product name..."
          className="mt-2 max-w-md"
        />
        <ProductAutocomplete query={query.trim()} />
      </section>
      {children}
    </>
  );
}
