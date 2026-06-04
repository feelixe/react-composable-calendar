import type { CalendarSingleValue } from "./types.js";

export type GetWeekdayNameFn = (
  dayNumber: number,
  locale: string | null
) => string;

export type FormatDateFn = (value: CalendarSingleValue) => string | null;

export const defaultFormatValue: FormatDateFn = (value) => {
  if (!value) {
    return null;
  }
  return value.toString();
};
