import type { Dayjs } from "../extended-dayjs.js";
import { createContext, useContext } from "react";

export type ViewContextValue = {
  viewState: [view: Dayjs, setView: (day: Dayjs) => void];
};

export const ViewContext = createContext<ViewContextValue | null>(null);

export function useViewContext() {
  const context = useContext(ViewContext);
  if (context === null) {
    throw new Error("'useViewContext' must be used within a 'View' component");
  }
  return context;
}
