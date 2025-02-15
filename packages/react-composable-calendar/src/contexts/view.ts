import { createContext, useContext } from "react";

export type ViewContextValue = {
  viewOffset: number;
};

export const ViewContext = createContext<ViewContextValue>({
  viewOffset: 0,
});

export function useViewContext() {
  return useContext(ViewContext);
}
