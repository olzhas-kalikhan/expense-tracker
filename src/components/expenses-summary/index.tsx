import { expenseSelectors } from "~/selectors";
import { useAppSelector } from "~/store";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function ExpensesSummary() {
  const groupedByTypeRecords = useAppSelector(
    expenseSelectors.groupedByTypeRecords,
  );
  const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const total = Object.values(groupedByTypeRecords).reduce(
    (total, group) => total + group.total,
    0,
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(groupedByTypeRecords).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell className="capitalize">{key}</TableCell>
            <TableCell>{intl.format(value.total)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead>Total</TableHead>
          <TableCell>{intl.format(total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
