import type { CalendarSingleValue } from "./types.js";
import type { PlainDate } from "./temporal.js";

export type GetWeekdayNameFn = (
  dayNumber: number,
  locale: string | null
) => string;

export type FormatDateFn = (value: CalendarSingleValue) => string | null;

export type FormatRequiredDateFn = (
  value: PlainDate,
  locale: string | null
) => string;

export const defaultFormatMonth: FormatRequiredDateFn = (date, locale) => {
  return date.toLocaleString(locale ?? undefined, {
    year: "numeric",
    month: "long",
  });
};

export const defaultFormatValue: FormatDateFn = (value) => {
  if (!value) {
    return null;
  }
  return value.toString();
};
