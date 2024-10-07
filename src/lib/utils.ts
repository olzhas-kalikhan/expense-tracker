import { clsx, type ClassValue } from "clsx";
import { addMonths, formatDate, startOfYear } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const getMonthNames = () => {
  let tmpDate = startOfYear(new Date());

  const names: string[] = [];
  for (let i = 0; i < 12; i++) {
    names.push(formatDate(tmpDate, "LLLL"));
    tmpDate = addMonths(tmpDate, 1);
  }
  return names;
};
export const MONTH_NAMES = getMonthNames();
