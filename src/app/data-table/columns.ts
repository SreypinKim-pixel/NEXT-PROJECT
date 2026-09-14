"use client";

import { createElement } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import type { DataTableFeatures } from "./data-table-features";
import { RowActions } from "./row-actions";

export type Product = {
  id: number;
  images: string;
  title: string;
  price: number;
  category: string;
  rate: number;
};

const columnHelper = createColumnHelper<DataTableFeatures, Product>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => createElement(Checkbox, {
      checked: table.getIsAllPageRowsSelected(),
      indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
      onCheckedChange: (value) => table.toggleAllPageRowsSelected(value),
      disabled: table.getRowModel().rows.length === 0,
      "aria-label": "Select all products on this page",
    }),
    cell: ({ row }) => createElement(Checkbox, {
      checked: row.getIsSelected(),
      onCheckedChange: (value) => row.toggleSelected(value),
      "aria-label": `Select ${row.original.title}`,
    }),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("id", { header: "ID" }),
  columnHelper.accessor("images", {
    header: "Images",
    enableSorting: false,
    cell: (info) => createElement(Image, {
      src: info.getValue(),
      alt: info.row.original.title,
      width: 64,
      height: 64,
      className: "h-16 w-16 max-w-none rounded-md bg-white object-contain p-1",
    }),
  }),
  columnHelper.accessor("title", {
    filterFn: "includesString",
    header: ({ column }) => createElement(
      Button,
      {
        variant: "ghost",
        className: "font-bold text-white hover:bg-slate-700 hover:text-white",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      },
      "Title",
      createElement(ArrowUpDown, { className: "ml-2 h-4 w-4", "aria-hidden": true })
    ),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => 
      createElement(
        "span",
        { className: "text-red-500 font-medium"},
        `$${info.getValue().toFixed(2)}`,
        ),
  }),
  columnHelper.accessor("category", { header: "Category" }),
  columnHelper.accessor("rate", { 
    header: "Rate",
  cell:(info) =>
  createElement(
    "span",
    {className: "text-green-500 font-bold" },
    info.getValue()
  ) }),
  
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => createElement(RowActions, { product: row.original }),
  }),
]);
