import { useMemo } from "react";
import { useCalendarContext, useCalendarDayContext } from "./context.js";
import dayjs from "dayjs";

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

export type UseIsInRangeParams = {
  inclusive?: boolean;
};

export function useIsInRange(args?: UseIsInRangeParams) {
  const { inclusive = true } = args ?? {};

  const mode = useCalendarMode();
  const { day } = useCalendarDayContext();
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
  const { day } = useCalendarDayContext();
  const [value] = useCalendarValue();

  return useMemo(() => {
    return value.some((d) => d?.isSame(day, "day") ?? false);
  }, [value, day]);
}

export function useIsToday() {
  const { day } = useCalendarDayContext();

  return useMemo(() => {
    return day.isSame(dayjs(), "day");
  }, [day]);
}

export function useIsNeighbouringMonth() {
  const { day } = useCalendarDayContext();
  const [view] = useCalendarView();

  return useMemo(() => {
    return !day.isSame(view, "month");
  }, [day, view]);
}

export function useIsStartOfRange() {
  const { day } = useCalendarDayContext();
  const [value] = useCalendarValue();

  return useMemo(() => {
    return value[0]?.isSame(day, "day");
  }, [value, day]);
}

export function useIsEndOfRange() {
  const { day } = useCalendarDayContext();
  const [value] = useCalendarValue();

  return useMemo(() => {
    return value[1]?.isSame(day, "day");
  }, [value, day]);
}
