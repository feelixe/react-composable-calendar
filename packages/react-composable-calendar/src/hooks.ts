import { useMemo } from "react";
import { useCalendarContext } from "./contexts/calendar.js";
import { useDayContext } from "./contexts/day.js";
import { useViewContext } from "./contexts/view.js";
import { Utils } from "./date-helpers.js";
import { Temporal } from "./temporal.js";

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

export function useCalendarLocale() {
  const context = useCalendarContext();
  return context.locale;
}

export function useIsInRange() {
  const mode = useMode();
  const { day } = useDayContext();
  const [value] = useCalendarValue();

  return useMemo(() => {
    if (mode === "single") {
      return false;
    }

    const rangeStart = value[0];
    const rangeEnd = value[1];
    if (!rangeStart || !rangeEnd) {
      return false;
    }

    const isAfterStart = Temporal.PlainDate.compare(day, rangeStart) >= 0;
    const isBeforeEnd = Temporal.PlainDate.compare(day, rangeEnd) <= 0;

    return isAfterStart && isBeforeEnd;
  }, [mode, value, day]);
}

export function useIsSelected() {
  const mode = useMode();
  const { day } = useDayContext();
  const [value] = useCalendarValue();

  return useMemo(() => {
    if (mode === "single") {
      if (!value[0]) {
        return false;
      }
      return Utils.isSameDay(day, value[0]);
    }
    return value.some((el) => (el ? Utils.isSameDay(day, el) : false));
  }, [value, day, mode]);
}

export function useIsToday() {
  const todaysDate = Utils.getToday();
  const { day } = useDayContext();

  return useMemo(() => {
    return Utils.isSameDay(day, todaysDate);
  }, [day, todaysDate]);
}

export function useIsNeighboringMonth() {
  const { day } = useDayContext();
  const [view] = useViewState();

  return useMemo(() => {
    return Utils.isOtherMonth(day, view);
  }, [day, view]);
}

export function useIsStartOfRange() {
  const { day } = useDayContext();
  const [value] = useCalendarValue();

  return useMemo(() => {
    if (!value[0]) {
      return false;
    }
    return Utils.isSameDay(day, value[0]);
  }, [value, day]);
}

export function useIsEndOfRange() {
  const { day } = useDayContext();
  const [value] = useCalendarValue();

  return useMemo(() => {
    if (!value[1]) {
      return false;
    }
    return Utils.isSameDay(day, value[1]);
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
