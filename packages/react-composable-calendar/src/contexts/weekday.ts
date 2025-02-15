import { createContext, useContext } from "react";

export type WeekdayContextValue = {
  weekdayIndex: number;
};

export const WeekdayContext = createContext<WeekdayContextValue | null>(null);

export function useWeekdayContext() {
  const context = useContext(WeekdayContext);
  if (context === null) {
    throw new Error(
      "'useCalendarWeekdayContext' must be used within a 'Weekdays' component"
    );
  }
  return context;
}
