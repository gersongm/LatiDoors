"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table";
import React from "react";
import { Search } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  titleFor: string;
  filtro: string;
  total?:{
    titulo:string;
    cantidad:number | string;
  }
}

export function ShowDataTable<TData, TValue>({
  columns,
  data,
  titleFor,
  filtro,
  total,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting,
    },
  });

  return (
    <div className=" shadow-md rounded-lg">
      <div className="flex items-center py-4 ps-2 mb-2 relative max-w-sm">
        <Input
          className="max-w rounded-lg"
          placeholder={`Filtrar por ${titleFor}...`}
          value={(table.getColumn(filtro)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filtro)?.setFilterValue(event.target.value)
          }
           />
          <Search
          strokeWidth={1}
          className="right-1 absolute items-baseline  text-muted-foreground w-6 h-6"
        />
        
      </div>

      <div className="rounded-lg border shadow-md">
        <Table>
          <TableHeader className="bg-slate-200 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
{total && 
      <TableFooter>
      <TableRow>
        <TableCell className="text-right text-xl " colSpan={5}>{total.titulo}:</TableCell>
        <TableCell className="text-right text-xl">{total.cantidad}</TableCell>
      </TableRow>
    </TableFooter>}
        </Table>
      </div>
{/* //paginacion de la tabla */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
