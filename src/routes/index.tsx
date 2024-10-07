import { createFileRoute } from "@tanstack/react-router";
import { ExpensesBarChart, ExpensesPieChart } from "~/components/charts";

export const Route = createFileRoute("/")({
  component: Index,
  context: () => ({ getTitle: undefined }),
});

function Index() {
  return (
    <div className="flex gap-6">
      <div className="flex w-[400px] flex-col flex-wrap gap-2 border p-4">
        <span className="rounded border p-2 text-sm">All Time</span>
        <ExpensesPieChart />
      </div>
      <div className="flex w-[800px] flex-col gap-2 border p-4">
        <ExpensesBarChart />
      </div>
    </div>
  );
}
