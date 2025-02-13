// Extend Day.js with the ISO Week plugin
import dayjs from "dayjs";

export type GetWeekdayNameFn = (dayNumber: number) => string;

export function getDefaultWeekdayName(dayNumber: number): string {
  const referenceDate = dayjs().startOf("week").add(dayNumber, "day");
  return referenceDate.format("dd");
}
