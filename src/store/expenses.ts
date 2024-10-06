import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

export const EXPENSE_TYPES = [
  "property",
  "grocery",
  "medical",
  "entertainment",
  "other",
] as const;
type ExpenseType = (typeof EXPENSE_TYPES)[number];

export type ExpenseRecord = {
  id: string;
  type: ExpenseType;
  amount: number;
  date: string;
  createdAt: string;
  notes: string;
};

const generateExpenses = (count: number): ExpenseRecord[] => {
  return Array.from({ length: count }).map<ExpenseRecord>(() => {
    return {
      id: crypto.randomUUID(),
      type: faker.helpers.arrayElement(EXPENSE_TYPES),
      amount: faker.helpers.rangeToNumber({ min: 10, max: 10000 }),
      createdAt: faker.date
        .between({
          from: "2022-01-01T00:00:00.000Z",
          to: new Date(),
        })
        .toISOString(),
      date: faker.date
        .between({
          from: "2022-01-01T00:00:00.000Z",
          to: new Date(),
        })
        .toISOString(),
      notes: faker.lorem.words(3),
    };
  });
};

export interface expensesState {
  records: ExpenseRecord[];
}

const initialState: expensesState = {
  records: generateExpenses(1000),
};

export const expensesSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addExpense: (
      state,
      action: PayloadAction<Omit<ExpenseRecord, "createdAt">>,
    ) => {
      state.records.push({
        ...action.payload,
        createdAt: new Date().toISOString(),
      });
    },
    removeExpense: (state, action: PayloadAction<ExpenseRecord["id"]>) => {
      state.records = state.records.filter(
        (record) => record.id !== action.payload,
      );
    },
    updateExpense: (
      state,
      action: PayloadAction<Omit<ExpenseRecord, "createdAt">>,
    ) => {
      const index = state.records.findIndex(
        (record) => record.id === action.payload.id,
      );
      state.records[index] = { ...state.records[index], ...action.payload };
    },
  },
});
// Action creators are generated for each case reducer function
export const expensesActions = expensesSlice.actions;

export default expensesSlice.reducer;
