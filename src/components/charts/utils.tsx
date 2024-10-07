import { ExpenseRecord } from "~/store/expenses";

export const EXPENSE_TYPE_BG_COLORS: Record<ExpenseRecord["type"], string> = {
  entertainment: "rgba(255, 255, 0, 0.25)",
  grocery: "rgba(0, 0, 255, 0.25)",
  medical: "rgba(139, 0, 0, 0.25)",
  other: "rgba(128, 0, 128, 0.25)",
  property: "rgba(0, 128, 128, 0.25)",
};
export const EXPENSE_TYPE_BORDER_COLORS: Record<ExpenseRecord["type"], string> =
  {
    entertainment: "rgba(255, 255, 0, 1)",
    grocery: "rgba(0, 0, 255, 1)",
    medical: "rgba(139, 0, 0, 1)",
    other: "rgba(128, 0, 128,1)",
    property: "rgba(0, 128, 128, 1)",
  };
