import { useCalendarContext } from "./context.js";

export function useCalendarView() {
  const context = useCalendarContext();
  return context.viewState;
}

export function useCalendarValue() {
  const context = useCalendarContext();
  return context.valueState;
}

export function useCalendarMode() {
  const context = useCalendarContext();
  return context.mode;
}
