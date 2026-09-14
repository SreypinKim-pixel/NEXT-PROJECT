"use client";

import { useState } from "react";
import { Menu } from "@base-ui/react/menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "./columns";

export function RowActions({ product }: { product: Product }) {
  const [message, setMessage] = useState("");

  async function copyId() {
    try {
      await navigator.clipboard.writeText(String(product.id));
      setMessage("Product ID copied.");
    } catch {
      setMessage("Could not copy the product ID. Please try again.");
    }
  }

  return (
    <div>
      <Menu.Root>
        <Menu.Trigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
          <span className="sr-only">Open actions for {product.title}</span>
          <MoreHorizontal className="h-4 w-4" />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner align="end" sideOffset={4} className="z-50">
            <Menu.Popup className="min-w-48 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md">
              <Menu.Group>
                <Menu.GroupLabel className="px-2 py-1.5 text-sm font-semibold">Actions</Menu.GroupLabel>
                <Menu.Item onClick={copyId} className="cursor-pointer rounded px-2 py-1.5 text-sm outline-none data-highlighted:bg-accent">
                  Copy product ID
                </Menu.Item>
              </Menu.Group>
              <Menu.Separator className="my-1 h-px bg-border" />
              <Menu.LinkItem href={`/product/${product.id}`} closeOnClick className="block rounded px-2 py-1.5 text-sm outline-none data-highlighted:bg-accent">
                View product details
              </Menu.LinkItem>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
      <p role="status" className="text-xs text-muted-foreground">{message}</p>
    </div>
  );
}
