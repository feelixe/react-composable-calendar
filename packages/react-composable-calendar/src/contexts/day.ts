import { createContext, useContext } from "react";
import type { Dayjs } from "../extended-dayjs.js";

export type DayContextValue = {
  day: Dayjs;
};

export const DayContext = createContext<DayContextValue | null>(null);

export function useDayContext() {
  const context = useContext(DayContext);
  if (context === null) {
    throw new Error("'useDayContext' must be used within a 'Days' component");
  }
  return context;
}
