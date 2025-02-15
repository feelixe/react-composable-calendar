import type dayjs from "dayjs";
import type { CalendarInternalValue } from "./types.js";

export type SelectDayStrategyParams = {
  currentValue: CalendarInternalValue;
  clickedDate: dayjs.Dayjs;
  mode: "single" | "range";
};

function sortValue(value: CalendarInternalValue): CalendarInternalValue {
  if (!value[0] || !value[1]) {
    return value;
  }
  return value.sort((a, b) => a!.diff(b, "day"));
}

export type SelectDayStrategy = (
  args: SelectDayStrategyParams
) => CalendarInternalValue;

export const closestStrategy: SelectDayStrategy = (args) => {
  const { currentValue, clickedDate, mode } = args;

  if (mode === "single") {
    return [clickedDate, null];
  }
  let newValue: CalendarInternalValue;

  if (!currentValue[0]) {
    newValue = [clickedDate, null];
  } else if (!currentValue[1]) {
    newValue = [currentValue[0], clickedDate];
  } else if (currentValue[0].isSame(clickedDate, "day")) {
    newValue = [null, currentValue[1]];
  } else if (currentValue[1].isSame(clickedDate, "day")) {
    newValue = [currentValue[0], null];
  } else {
    const distanceToStart = clickedDate.diff(currentValue[0], "day");
    const distanceToEnd = clickedDate.diff(currentValue[1], "day");
    const isStartClosest = Math.abs(distanceToStart) < Math.abs(distanceToEnd);
    if (isStartClosest) {
      newValue = [clickedDate, currentValue[1]];
    } else {
      newValue = [currentValue[0], clickedDate];
    }
  }
  return sortValue(newValue);
};
