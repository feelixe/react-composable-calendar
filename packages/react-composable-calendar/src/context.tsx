import type dayjs from "dayjs";
import { createContext, useContext } from "react";

export type CalendarContextValue = {
  viewState: [view: dayjs.Dayjs, setView: (day: dayjs.Dayjs) => void];
  valueState: [value: dayjs.Dayjs, setValue: (day: dayjs.Dayjs) => void];
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
