import { createFileRoute, Link } from "@tanstack/react-router";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import { useAppDispatch, useAppSelector } from "~/store";
import { ExpenseRecord, expensesActions } from "~/store/expenses";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { z } from "zod";
import { HeaderCell } from "~/components/data-table/header-cell";
import { dateSortingFn } from "~/components/data-table/utils";
import { expenseSelectors } from "~/selectors";

const expensesSearchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  pageSize: fallback(z.number(), 50).default(50),
  sort: fallback(
    z.array(z.object({ id: z.string(), desc: z.boolean() })),
    [],
  ).default([]),
});

export const Route = createFileRoute("/expenses/")({
  component: RouteComponent,
  context() {
    return { getTitle: undefined };
  },
  validateSearch: zodSearchValidator(expensesSearchSchema),
});

const DeleteExpenseButton = ({ id }: { id: ExpenseRecord["id"] }) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      size="icon"
      variant="destructive"
      onClick={async () => {
        await dispatch(expensesActions.deleteExpense(id));
      }}
    >
      <Trash2 />
    </Button>
  );
};

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
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
    sortingFn: dateSortingFn,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
    sortingFn: dateSortingFn,
  },

  {
    id: "actions",
    header: "Edit | Delete",
    cell: ({ row }) => (
      <div className="flex gap-3">
        <Button size="icon" variant="secondary" asChild>
          <Link
            to="/expenses/$expenseId"
            params={{ expenseId: row.id }}
            search={(p) => p}
          >
            <Pencil />
          </Link>
        </Button>
        <DeleteExpenseButton id={row.id} />
      </div>
    ),
  },
];

export function RouteComponent() {
  const expenseRecords = useAppSelector(expenseSelectors.records);
  const { page, pageSize, sort } = Route.useSearch();
  const table = useReactTable({
    data: expenseRecords,
    columns,
    getRowId: (row) => row.id,
    state: {
      pagination: { pageSize: pageSize, pageIndex: page - 1 },
      sorting: sort,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex h-[80vh] flex-col">
      <div className="flex justify-end gap-4 py-2">
        <Button asChild>
          <Link to="/expenses/new" search={(prev) => prev}>
            Add New Expense
          </Link>
        </Button>
        <Button size="icon" variant="secondary">
          {/* Placeholder for extra options*/}
          <MoreVertical />
        </Button>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : <HeaderCell {...header} />}
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
