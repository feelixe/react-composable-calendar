import type { PlainDate } from "./temporal.js";

export type Mode = "single" | "range";

export type CalendarInputName = [string | null, string | null];

export type CalendarSingleValue = PlainDate | null;

export type CalendarRangeValue = [CalendarSingleValue, CalendarSingleValue];

export type CalendarAnyValue = CalendarSingleValue | CalendarRangeValue;

export type CalendarInternalValue = CalendarRangeValue;
