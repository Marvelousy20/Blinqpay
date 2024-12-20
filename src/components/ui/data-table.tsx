"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import * as React from "react";
import { DataTablePagination } from "./data-table-pagination";
import EmptyState from "../empty-state";
import { Button, buttonVariants } from "./button";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyState?: React.ReactNode;
  placeholder?: string;
  column_to_filter?: string;
  show_toolbar?: boolean;
  show_pagination?: boolean;
  export_modal?: React.JSX.Element;
  filter_modal?: React.JSX.Element;
  queryType?: string;
  propertyString?: string;
  dummyData?: TData[];
  noHeader?: boolean;
  emptyStateLabel?: string;
  paginationData?: PaginationTypes;
  getPageData?: (page: number) => void;
}

export type PaginationTypes = {
  pageSize: number;
  page: number;
  currentPage?: number;
  hasNext?: boolean;
  pages?: number;
  lastPage?: number | null;
  hasPrevious?: boolean;
  next?: number | null;
  prevPage?: number | null;
  total?: string;
};

// "hasNext": true,
// "pageSize": 10,
// "currentPage": 1,
// "page": 1,
// "pages": 2,
// "lastPage": 2,
// "total": 11,
// "hasPrevious": false,
// "next": 2,
// "prevPage": null

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyState,
  noHeader,
  show_pagination = true,
  paginationData,
  getPageData,
  emptyStateLabel,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  // console.log(data, "this is the data from the table!");

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="space-y-8">
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <TableRow className={`border-b-transparent ${noHeader ? "hidden" : ""}`} key={index}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead key={index}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow key={index} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={index}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {isFiltered ? <EmptyFilterState /> : emptyState ? emptyState : <EmptyState label={emptyStateLabel} />}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {paginationData && (
        // <DataTablePagination table={table} />
        <div className="table-pagination w-auto flex space-x-2 pb-4">
          <Button
            disabled={!paginationData.hasPrevious}
            onClick={() => getPageData && getPageData(paginationData.prevPage as number)}
            className="capitalize bottom-0 rounded-full"
          >
            {"<"}
          </Button>
          {[1, 2, 3, 4, 5].map((page, index) => (
            <Button
              key={index}
              onClick={() => getPageData && getPageData(page)}
              className="rounded-full"
              variant={paginationData.page === page ? "primary" : "default"}
            >
              {page}
            </Button>
          ))}

          {paginationData.page && paginationData.page > 5 && (
            <Button className="rounded-full" variant={"primary"}>
              {paginationData.page}
            </Button>
          )}

          <Button
            disabled={!paginationData.hasNext}
            onClick={() => getPageData && getPageData(paginationData.next as number)}
            className="rounded-full"
          >
            {">"}
          </Button>
          {/* {paginationData.lastPage && (
            <Button
              onClick={() =>
                getPageData && getPageData(paginationData.lastPage as number)
              }
              className="capitalize"
            >
              last page
            </Button>
          )} */}
        </div>
      )}
    </div>
  );
}

function EmptyFilterState() {
  return <div className="w-full">empty filter</div>;
}
