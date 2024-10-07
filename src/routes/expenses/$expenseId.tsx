import { createFileRoute } from "@tanstack/react-router";
import ExpenseForm from "~/components/expense-form";
import { expenseSelectors } from "~/selectors";
import { useAppSelector } from "~/store";

export const Route = createFileRoute("/expenses/$expenseId")({
  component: RouteComponent,
  context: ({ params }) => ({ getTitle: () => params.expenseId }),
});

function RouteComponent() {
  const { expenseId } = Route.useParams();
  const expenseRecord = useAppSelector((state) =>
    expenseSelectors.recordsIdSelector(state, expenseId),
  );

  if (!expenseRecord) {
    throw new Error("Record is not found");
  }

  return <ExpenseForm expenseRecord={expenseRecord} />;
}
