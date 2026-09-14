import { createSortedRowModel, rowSortingFeature, sortFn_basic, sortFn_text, createPaginatedRowModel, rowPaginationFeature, tableFeatures } from "@tanstack/react-table";
import { rowSelectionFeature, columnVisibilityFeature, columnFilteringFeature, createFilteredRowModel, filterFn_includesString } from "@tanstack/react-table";

export const features = tableFeatures({
  rowSelectionFeature,
  columnVisibilityFeature,
  columnFilteringFeature,
  filterFns: { includesString: filterFn_includesString },
  filteredRowModel: createFilteredRowModel(),
  rowSortingFeature,
  sortFns: { basic: sortFn_basic, text: sortFn_text },
  sortedRowModel: createSortedRowModel(),
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
});
export type DataTableFeatures = typeof features;
