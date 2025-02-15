import type { CalendarAnyValue, CalendarInternalValue } from "./types.js";

export function normalizeValue(value: CalendarAnyValue): CalendarInternalValue {
  if (Array.isArray(value)) {
    return value;
  }
  return [value, null];
}
