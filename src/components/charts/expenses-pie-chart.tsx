import { Pie } from "react-chartjs-2";
import { useAppSelector } from "~/store";
import { EXPENSE_TYPES } from "~/store/expenses";
import { expenseSelectors } from "~/selectors";
import { EXPENSE_TYPE_BG_COLORS, EXPENSE_TYPE_BORDER_COLORS } from "./utils";

export default function ExpensesPieChart() {
  const groupedRecords = useAppSelector(
    expenseSelectors.groupedByTypeRecords,
  );

  const arrayToSort = Object.values(groupedRecords);
  const sortedByTypes = arrayToSort.sort(
    (a, b) => arrayToSort.indexOf(a) - arrayToSort.indexOf(b),
  );

  const data = {
    labels: EXPENSE_TYPES as unknown as string[],
    datasets: [
      {
        label: "Amounts by Types",
        data: sortedByTypes.map(({ total }) => total),
        backgroundColor: Object.values(EXPENSE_TYPE_BG_COLORS),
        borderColor:Object.values(EXPENSE_TYPE_BORDER_COLORS),
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}
