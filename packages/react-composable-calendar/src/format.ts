import type { CalendarSingleValue } from "./types.js";
import type { Dayjs } from "./extended-dayjs.js";

export type GetWeekdayNameFn = (dayNumber: number) => string;
export type FormatDateFn = (value: CalendarSingleValue) => string | null;
export type FormatRequiredDateFn = (value: Dayjs) => string;

export const defaultFormatMonth: FormatRequiredDateFn = (date) => {
  return date.format("MMMM YYYY");
};

export const defaultFormatValue: FormatDateFn = (value) => {
  if (!value) {
    return null;
  }
  return value.format("YYYY-MM-DD");
};
