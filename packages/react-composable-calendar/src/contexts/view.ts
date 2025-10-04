import { createContext, useContext } from "react";
import type { PlainDate } from "../temporal.js";

export type IsDateSelectableFn = (date: PlainDate) => boolean;

export type ViewContextValue = {
  viewState: [view: PlainDate, setView: (day: PlainDate) => void];
  isDateSelectableFn?: IsDateSelectableFn;
};

export const ViewContext = createContext<ViewContextValue | null>(null);

export function useViewContext() {
  const context = useContext(ViewContext);
  if (context === null) {
    throw new Error("'useViewContext' must be used within a 'View' component");
  }
  return context;
}
