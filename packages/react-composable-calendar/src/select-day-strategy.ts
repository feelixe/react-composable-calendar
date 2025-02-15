import type dayjs from "dayjs";
import type { CalendarInternalValue } from "./types.js";

export type SelectDayStrategyParams = {
  currentValue: CalendarInternalValue;
  clickedDate: dayjs.Dayjs;
  mode: "single" | "range";
};

export type SelectDayStrategy = (
  args: SelectDayStrategyParams
) => CalendarInternalValue;

export const closestStrategy: SelectDayStrategy = (args) => {
  const { currentValue, clickedDate, mode } = args;

  if (mode === "single") {
    return [clickedDate, null];
  }
  if (!currentValue[0]) {
    return [clickedDate, currentValue[1]];
  }
  if (!currentValue[1]) {
    return [currentValue[0], clickedDate];
  }
  if (currentValue[0].isSame(clickedDate, "day")) {
    return [null, currentValue[1]];
  }
  if (currentValue[1].isSame(clickedDate, "day")) {
    return [currentValue[0], null];
  }
  const distanceToStart = clickedDate.diff(currentValue[0], "day");
  const distanceToEnd = clickedDate.diff(currentValue[1], "day");
  const isStartClosest = Math.abs(distanceToStart) < Math.abs(distanceToEnd);
  if (isStartClosest) {
    return [clickedDate, currentValue[1]];
  }
  return [currentValue[0], clickedDate];
};

export const selectStartDateStrategy: SelectDayStrategy = (args) => {
  const { currentValue, clickedDate } = args;
  const [, endDate] = currentValue;

  if (endDate && clickedDate.isAfter(endDate, "day")) {
    return [clickedDate, clickedDate];
  }
  return [clickedDate, endDate];
};

export const selectEndDateStrategy: SelectDayStrategy = (args) => {
  const { currentValue, clickedDate } = args;
  const [startDate] = currentValue;

  if (startDate && clickedDate.isBefore(startDate, "day")) {
    return [clickedDate, clickedDate];
  }
  return [startDate, clickedDate];
};
