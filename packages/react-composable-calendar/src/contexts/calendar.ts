import { createContext, useContext } from "react";
import type {
  CalendarInputName,
  CalendarInternalValue,
  Mode,
} from "../types.js";
import type { Atom } from "../atom.js";

export type CalendarContextValue = {
  mode: Mode;
  inputName: CalendarInputName;
  locale: string | null;
  weekOffset: number;
};

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (context === null) {
    throw new Error(
      "'useCalendarContext' must be used within a 'CalendarProvider'"
    );
  }
  return context;
}

export const ValueAtomContext = createContext<
  Atom<CalendarInternalValue> | undefined
>(undefined);

export function useValueAtomContext() {
  const contextValue = useContext(ValueAtomContext);
  if (contextValue === undefined) {
    throw new Error(
      "'useValueAtomContext' must be used within a 'ValueAtomContext'"
    );
  }
  return contextValue;
}
