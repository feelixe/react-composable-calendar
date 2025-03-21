import { useMemo } from "react";
import { useCalendarContext } from "./contexts/calendar.js";
import { useDayContext } from "./contexts/day.js";
import { useViewContext } from "./contexts/view.js";
import { getToday } from "./helpers.js";

export function useViewState() {
  const viewContext = useViewContext();
  return viewContext.viewState;
}

export function useCalendarView() {
  const context = useViewContext();
  return context;
}
export function useCalendarValue() {
  const context = useCalendarContext();
  return context.valueState;
}

export function useMode() {
  const context = useCalendarContext();
  return context.mode;
}

export function useCalendarTimezone() {
  const context = useCalendarContext();
  return context.timezone;
}

export function useCalendarLocale() {
  const context = useCalendarContext();
  return context.locale;
}

export type UseIsInRangeParams = {
  inclusive?: boolean;
};

export function useIsInRange(args?: UseIsInRangeParams) {
  const { inclusive = true } = args ?? {};

  const mode = useMode();
  const { day } = useDayContext();
  const [value] = useCalendarValue();

  return useMemo(() => {
    if (mode === "single") {
      return false;
    }
    const isAfterStart = inclusive
      ? day.isAfter(value[0], "day") || day.isSame(value[0], "day")
      : day.isAfter(value[0], "day");

    const isBeforeEnd = inclusive
      ? day.isBefore(value[1], "day") || day.isSame(value[1], "day")
      : day.isBefore(value[1], "day");

    return isAfterStart && isBeforeEnd;
  }, [mode, value, day, inclusive]);
}

export function useIsSelected() {
  const mode = useMode();
  const { day } = useDayContext();
  const [value] = useCalendarValue();

  return useMemo(() => {
    if (mode === "single") {
      return value[0]?.isSame(day, "day") ?? false;
    }
    return value.some((d) => d?.isSame(day, "day") ?? false);
  }, [value, day, mode]);
}

export function useTodaysDate() {
  const timezone = useCalendarTimezone();

  return useMemo(() => {
    return getToday(timezone);
  }, [timezone]);
}

export function useIsToday() {
  const todaysDate = useTodaysDate();
  const { day } = useDayContext();

  return useMemo(() => {
    return day.isSame(todaysDate, "day");
  }, [day, todaysDate]);
}

export function useIsNeighboringMonth() {
  const { day } = useDayContext();
  const [view] = useViewState();

  return useMemo(() => {
    return !day.isSame(view, "month");
  }, [day, view]);
}

export function useIsStartOfRange() {
  const { day } = useDayContext();
  const [value] = useCalendarValue();

  return useMemo(() => {
    return value[0]?.isSame(day, "day");
  }, [value, day]);
}

export function useIsEndOfRange() {
  const { day } = useDayContext();
  const [value] = useCalendarValue();

  return useMemo(() => {
    return value[1]?.isSame(day, "day");
  }, [value, day]);
}

export function useHasValue() {
  const mode = useMode();
  const [value] = useCalendarValue();

  return useMemo(() => {
    return mode === "single"
      ? value[0] !== null
      : value[0] !== null && value[1] !== null;
  }, [mode, value]);
}

export function useInputName() {
  const context = useCalendarContext();
  return context.inputName;
}
