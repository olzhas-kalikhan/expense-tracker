import { Bar } from "react-chartjs-2";
import { MONTH_NAMES } from "~/lib/utils";
import { expenseSelectors } from "~/selectors";
import { useAppSelector } from "~/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useMemo, useState } from "react";
import { getYear } from "date-fns";
import { ExpenseRecord } from "~/store/expenses";
import { EXPENSE_TYPE_BORDER_COLORS } from "./utils";

const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
};

const getYearsFrom = (start: number) => {
  const output: string[] = [];
  for (let i = start; i <= 2024; i++) {
    output.push(i.toString());
  }
  return output;
};

export default function ExpensesBarChart() {
  const [year, setYear] = useState(getYear(new Date()).toString());
  const groupedByMonthRecords = useAppSelector((state) =>
    expenseSelectors.groupedByMonthAndTypeRecords(state, parseInt(year)),
  );

  const data = {
    labels: MONTH_NAMES,
    datasets: Object.entries(groupedByMonthRecords).map(([key, value]) => ({
      label: key,
      data: value.map(({ total }) => total),
      backgroundColor: EXPENSE_TYPE_BORDER_COLORS[key as ExpenseRecord["type"]],
    })),
  };

  const years = useMemo(() => getYearsFrom(2020), []);

  return (
    <>
      <Select defaultValue={year} onValueChange={setYear}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => {
            return (
              <SelectItem value={year} className="capitalize">
                {year}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Bar options={options} data={data} />
    </>
  );
}
