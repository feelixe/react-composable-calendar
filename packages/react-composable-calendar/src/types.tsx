import type dayjs from "dayjs";

export type Mode = "single" | "range";

export type CalendarSingleValue = dayjs.Dayjs | null;
export type CalendarRangeValue = [CalendarSingleValue, CalendarSingleValue];
export type CalendarAnyValue = CalendarSingleValue | CalendarRangeValue;
export type CalendarInternalValue = CalendarRangeValue;

export type GetWeekdayNameFn = (dayNumber: number) => string;
export type FormatDateFn = (value: CalendarSingleValue) => string;
