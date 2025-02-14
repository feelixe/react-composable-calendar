import dayjs from "dayjs";

export function getDefaultWeekdayName(dayNumber: number): string {
  const referenceDate = dayjs().startOf("week").add(dayNumber, "day");
  return referenceDate.format("dd");
}
