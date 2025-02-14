import type dayjs from "dayjs";
import { createContext, useContext } from "react";
import type { CalendarInternalValue, Mode } from "./types.js";

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
      "useCalendarContext must be used within a CalendarProvider"
    );
  }
  return context;
}

export function useCalendarView() {
  const context = useCalendarContext();
  return context.viewState;
}

export function useCalendarValue() {
  const context = useCalendarContext();
  return context.valueState;
}

export function useCalendarMode() {
  const context = useCalendarContext();
  return context.mode;
}
