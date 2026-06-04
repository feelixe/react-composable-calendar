import { createContext, useContext } from "react";

export type DayContextValue = {
  day: Temporal.PlainDate;
};

export const DayContext = createContext<DayContextValue | null>(null);

export function useDayContext() {
  const context = useContext(DayContext);
  if (context === null) {
    throw new Error("'useDayContext' must be used within a 'Days' component");
  }
  return context;
}
