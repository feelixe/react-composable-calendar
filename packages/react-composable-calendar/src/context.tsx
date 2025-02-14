import type dayjs from "dayjs";
import { createContext, useContext } from "react";
import type { CalendarInternalValue, Mode } from "./types.js";

export type CalendarDayContextValue = {
  day: dayjs.Dayjs;
};

export const CalendarDayContext = createContext<CalendarDayContextValue | null>(
  null
);

export function useCalendarDayContext() {
  const context = useContext(CalendarDayContext);
  if (context === null) {
    throw new Error(
      "'DayLabel' and 'Day' must be used within a 'Days' component"
    );
  }
  return context;
}

export type CalendarContextValue = {
  viewState: [view: dayjs.Dayjs, setView: (day: dayjs.Dayjs) => void];
  valueState: [
    value: CalendarInternalValue,
    setValue: (value: CalendarInternalValue) => void,
  ];
  mode: Mode;
};

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (context === null) {
    throw new Error(
      "'useCalendarContext' must be used within a 'CalendarProvider'"
    );
  }
  return context;
}
