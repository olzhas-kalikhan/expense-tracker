import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import { type RootState } from ".";

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

const createExpenseThunk = createAsyncThunk(
  "expenses/records/create",
  async (expenseRecord: Omit<ExpenseRecord, "createdAt" | "id">) => {
    return Promise.resolve<ExpenseRecord>({
      ...expenseRecord,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    });
  },
);

const updateExpenseThunk = createAsyncThunk(
  "expenses/records/update",
  async (expenseRecord: Omit<ExpenseRecord, "createdAt">, { getState }) => {
    const state = getState() as RootState;
    const existingRecord = state.expenses.records.find(
      (record) => record.id === expenseRecord.id,
    );
    if (!existingRecord) throw new Error("Record does not exist");

    return Promise.resolve<ExpenseRecord>({
      ...existingRecord,
      ...expenseRecord,
    });
  },
);

const deleteExpenseThunk = createAsyncThunk(
  "expenses/records/delete",
  async (expenseRecordId: ExpenseRecord["id"]) => {
    return Promise.resolve<ExpenseRecord["id"]>(expenseRecordId);
  },
);
// for demo purposes
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createExpenseThunk.fulfilled, (state, action) => {
      state.records.push(action.payload);
    });
    builder.addCase(updateExpenseThunk.fulfilled, (state, action) => {
      const index = state.records.findIndex(
        (record) => record.id === action.payload.id,
      );
      state.records[index] = action.payload;
    });
    builder.addCase(deleteExpenseThunk.fulfilled, (state, action) => {
      state.records = state.records.filter(
        (record) => record.id !== action.payload,
      );
    });
  },
});
// Action creators are generated for each case reducer function
export const expensesActions = {
  ...expensesSlice.actions,
  createExpense: createExpenseThunk,
  updateExpense: updateExpenseThunk,
  deleteExpense: deleteExpenseThunk,
};

export default expensesSlice.reducer;
