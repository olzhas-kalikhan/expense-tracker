import { createFileRoute, Link } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "~/components/data-table/pagination";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { expenseSelectors, useAppSelector } from "~/store";
import { ExpenseRecord } from "~/store/expenses";
import { Pencil, Trash2 } from "lucide-react";
import { z } from "zod";

const expensesSearchSchema = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(50),
});

export const Route = createFileRoute("/expenses/")({
  component: RouteComponent,
  context() {
    return { getTitle: undefined };
  },
  validateSearch: zodSearchValidator(expensesSearchSchema),
});

const columns: ColumnDef<ExpenseRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ getValue }) => (
      <span className="capitalize">{getValue() as string}</span>
    ),
  },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "notes", header: "Notes" },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },

  {
    id: "actions",
    header: "Edit | Delete",
    cell: ({ row }) => (
      <div className="flex gap-3">
        <Button size="icon" variant="secondary" asChild>
          <Link to="/expenses/$expenseId" params={{ expenseId: row.id }}>
            <Pencil />
          </Link>
        </Button>
        <Button size="icon" variant="destructive">
          <Trash2 />
        </Button>
      </div>
    ),
  },
];

export function RouteComponent() {
  const expenseRecords = useAppSelector(expenseSelectors.records);
  const { page, pageSize } = Route.useSearch();
  const table = useReactTable({
    data: expenseRecords,
    columns,
    getRowId: (row) => row.id,
    state: { pagination: { pageSize: pageSize, pageIndex: page - 1 } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex h-[80vh] flex-col">
      <Button className="self-end">New Record</Button>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
