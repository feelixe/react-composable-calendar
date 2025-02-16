import { createContext, useContext } from "react";
import type {
  CalendarInputName,
  CalendarInternalValue,
  Mode,
} from "../types.js";

export type CalendarContextValue = {
  valueState: [
    value: CalendarInternalValue,
    setValue: (value: CalendarInternalValue) => void,
  ];
  mode: Mode;
  inputName: CalendarInputName;
  timezone: string | null;
  locale: string | null;
};

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (context === null) {
    throw new Error(
      "'useCalendarContext' must be used within a 'CalendarProvider'",
    );
  }
  return context;
}
