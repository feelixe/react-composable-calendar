import type {
  CalendarAnyValue,
  CalendarInternalValue,
  CalendarRangeValue,
  CalendarSingleValue,
  Mode,
} from "./types.js";

export function normalizeValue(value: CalendarAnyValue): CalendarInternalValue {
  if (Array.isArray(value)) {
    return value;
  }
  return [value, null];
}
