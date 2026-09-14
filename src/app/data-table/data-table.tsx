"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Menu } from "@base-ui/react/menu";
import { Check, ChevronDown } from "lucide-react";
import { useTable, type SortingState, type ColumnFiltersState, type ColumnVisibilityState, type RowSelectionState, type PaginationState } from "@tanstack/react-table";
import { columns, type Product } from "./columns";
import { features } from "./data-table-features";

export function DataTable({ data }: { data: Product[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const table = useTable({
    features,
    columns,
    data,
    state: { sorting, columnFilters, columnVisibility, rowSelection, pagination },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getRowId: (row) => String(row.id),
  });

  return (
    <div>
    <div className="flex items-center gap-3 py-4">
      <Input
        aria-label="Filter products by title"
        placeholder="Filter products by title..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) => {
          table.getColumn("title")?.setFilterValue(event.target.value);
          table.setPageIndex(0);
        }}
        className="max-w-sm"
      />
      <Menu.Root>
        <Menu.Trigger render={<Button variant="outline" className="ml-auto" />}>
          Columns <ChevronDown className="size-4" />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner align="end" sideOffset={4} className="z-50">
            <Menu.Popup className="min-w-44 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md">
              {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
                <Menu.CheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  disabled={column.getIsVisible() && table.getVisibleLeafColumns().length === 1}
                  onCheckedChange={(value) => column.toggleVisibility(value)}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm capitalize outline-none data-highlighted:bg-accent data-disabled:opacity-50"
                >
                  <span className="size-4"><Menu.CheckboxItemIndicator><Check className="size-4" /></Menu.CheckboxItemIndicator></span>
                  {column.id === "id" ? "ID" : column.id}
                </Menu.CheckboxItem>
              ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
    <div className="overflow-x-auto rounded-xl border-2 border-slate-400 bg-white shadow-sm dark:bg-slate-900">
      <table className="w-full text-left text-sm font-medium text-slate-950 dark:text-slate-100">
        <caption className="sr-only">Products with IDs, images, titles, prices, categories, and ratings</caption>
        <thead className="bg-slate-900 text-white">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th key={header.id} scope="col" aria-sort={header.column.getIsSorted() === "asc" ? "ascending" : header.column.getIsSorted() === "desc" ? "descending" : undefined} className="px-4 py-3 font-bold">
                  {header.isPlaceholder ? null : header.column.getCanSort() && typeof header.column.columnDef.header !== "function" ? (
                    <button type="button" onClick={header.column.getToggleSortingHandler()} className="inline-flex items-center gap-2 rounded hover:text-slate-300 focus-visible:outline-2 focus-visible:outline-offset-4">
                      <table.FlexRender header={header} />
                      <span aria-hidden="true">{header.column.getIsSorted() === "asc" ? "↑" : header.column.getIsSorted() === "desc" ? "↓" : "↕"}</span>
                    </button>
                  ) : <table.FlexRender header={header} />}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-300 odd:bg-white even:bg-slate-100 hover:bg-slate-200 dark:border-slate-600">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="max-w-md break-words px-4 py-3">
                    <table.FlexRender cell={cell} />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr><td colSpan={table.getVisibleLeafColumns().length} className="px-4 py-10 text-center text-slate-700 dark:text-slate-300">No products found.</td></tr>
          )}
          
        </tbody>
      </table>
    </div>
    <div className="flex items-center justify-end gap-2 py-4">
      <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        Previous
      </Button>
      <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        Next
      </Button>
    </div>
    </div>
  );
}
