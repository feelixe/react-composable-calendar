import { useMemo } from "react";
import { useCalendarContext } from "./contexts/calendar.js";
import dayjs from "dayjs";
import { useDayContext } from "./contexts/day.js";
import { useViewContext } from "./contexts/view.js";

export function useCalendarView() {
  const context = useCalendarContext();
  const viewContext = useViewContext();

  const [view, setView] = context.viewState;
  const viewWithOffset = view.add(viewContext.viewOffset, "month");

  return [viewWithOffset, setView] as const;
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
  const { day } = useDayContext();
  const [value] = useCalendarValue();

  return useMemo(() => {
    return value.some((d) => d?.isSame(day, "day") ?? false);
  }, [value, day]);
}

export function useIsToday() {
  const { day } = useDayContext();

  return useMemo(() => {
    return day.isSame(dayjs(), "day");
  }, [day]);
}

export function useIsNeighboringMonth() {
  const { day } = useDayContext();
  const [view] = useCalendarView();

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
