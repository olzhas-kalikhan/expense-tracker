import { Row, RowData } from "@tanstack/react-table";
import { isBefore } from "date-fns";

export const dateSortingFn = <TData extends RowData>(
  rowA: Row<TData>,
  rowB: Row<TData>,
  columnId: string,
): number => {
  if (
    isBefore(rowA.getValue(columnId) as Date, rowB.getValue(columnId) as Date)
  ) {
    return -1;
  }
  if (
    isBefore(rowB.getValue(columnId) as Date, rowA.getValue(columnId) as Date)
  ) {
    return 1;
  }
  return 0;
};
