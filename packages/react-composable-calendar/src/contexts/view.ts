import { createContext, useContext } from "react";

export type IsDateSelectableFn = (date: Temporal.PlainDate) => boolean;

export type ViewContextValue = {
  viewState: [view: Temporal.PlainDate, setView: (day: Temporal.PlainDate) => void];
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
