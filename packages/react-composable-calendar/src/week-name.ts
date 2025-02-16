import { dayjs } from "./extended-dayjs.js";

export function getDefaultWeekdayName(dayNumber: number): string {
  const referenceDate = dayjs().startOf("week").add(dayNumber, "day");
  return referenceDate.format("dd");
}
