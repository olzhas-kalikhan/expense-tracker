import { createFileRoute } from "@tanstack/react-router";
import ExpenseForm from "~/components/expense-form";

export const Route = createFileRoute("/expenses/new/")({
  component: () => <ExpenseForm />,
  context: () => ({ getTitle: () => "New" }),
});
