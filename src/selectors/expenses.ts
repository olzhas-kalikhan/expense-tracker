import {
  endOfYear,
  getMonth,
  isAfter,
  isBefore,
  isEqual,
  startOfYear,
} from "date-fns";
import { type RootState, createAppSelector } from "~/store";
import { EXPENSE_TYPES, ExpenseRecord } from "~/store/expenses";

export const records = (state: RootState) => state.expenses.records;
export const recordsIdSelector = createAppSelector(
  [records, (_, id: string) => id],
  (expenses, id) => {
    return expenses.find((record) => record.id === id);
  },
);

const groupByTypes = (expenseRecords: ExpenseRecord[]) =>
  expenseRecords.reduce(
    (output, record) => {
      if (!output[record.type]) output[record.type] = { total: 0, records: [] };
      output[record.type].records.push(record);
      output[record.type].total += record.amount;

      return output;
    },
    {} as Record<
      ExpenseRecord["type"],
      { total: number; records: ExpenseRecord[] }
    >,
  );

export const groupedByTypeRecords = createAppSelector(records, groupByTypes);

export const recordsByYear = createAppSelector(
  [records, (_, year: number) => year],
  (records, year) => {
    const start = startOfYear(new Date(year, 0, 1));
    const end = endOfYear(start);
    return records.filter(
      (record) =>
        isEqual(record.date, start) ||
        isEqual(record.date, end) ||
        (isAfter(record.date, start) && isBefore(record.date, end)),
    );
  },
);

const getRecordsByMonthsArray = () =>
  Array.from({ length: 12 }, () => ({
    records: [] as ExpenseRecord[],
    total: 0,
  }));

const getRecordsByMonthByTypeMap = () =>
  EXPENSE_TYPES.reduce(
    (output, type) => {
      output[type] = getRecordsByMonthsArray();
      return output;
    },
    {} as Record<
      ExpenseRecord["type"],
      ReturnType<typeof getRecordsByMonthsArray>
    >,
  );

// records in selected year grouped by type. Inside of each group they're grouped by month
// TODO: reuse groupByTypes fn
export const groupedByMonthAndTypeRecords = createAppSelector(
  [(state, year: number) => recordsByYear(state, year)],
  (records) => {
    const recordsByMonthByTypeMap = getRecordsByMonthByTypeMap();
    let tmpMonth: number;

    return records.reduce((output, record) => {
      tmpMonth = getMonth(record.date);
      output[record.type][tmpMonth].records.push(record);
      output[record.type][tmpMonth].total += record.amount;

      return output;
    }, recordsByMonthByTypeMap);
  },
);

export const minMaxRecordDate = createAppSelector([records], (records) => {
  if (records.length === 0) return { min: null, max: null };
  let min = records[0].date;
  let max = records[0].date;

  records.forEach((record) => {
    if (isAfter(min, record.date)) {
      min = record.date;
    }
    if (isBefore(max, record.date)) {
      max = record.date;
    }
  });
  return { min, max };
});
