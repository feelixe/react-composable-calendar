import type { CalendarAnyValue, CalendarInternalValue } from "./types.js";

export function normalizeValue(value: CalendarAnyValue): CalendarInternalValue {
  if (Array.isArray(value)) {
    return value;
  }
  return [value, null];
}

export function sortValue(value: CalendarInternalValue): CalendarInternalValue {
  if (!value[0] || !value[1]) {
    return value;
  }
  return value.sort((a, b) => a!.diff(b, "day"));
}
