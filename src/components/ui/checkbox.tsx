"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({ className, indeterminate, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      {...props}
      indeterminate={indeterminate}
      className={cn("inline-flex size-4 shrink-0 items-center justify-center rounded border border-slate-400 bg-white text-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 data-disabled:opacity-50", className)}
    >
      <CheckboxPrimitive.Indicator>
        {indeterminate ? <Minus className="size-3" /> : <Check className="size-3" />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
