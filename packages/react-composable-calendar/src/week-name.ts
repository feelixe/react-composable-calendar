import { dayjs } from "./extended-dayjs.js";

export function getDefaultWeekdayName(
  dayNumber: number,
  locale: string | null,
): string {
  const baseDate = locale ? dayjs().locale(locale) : dayjs();
  const referenceDate = baseDate.startOf("week").add(dayNumber, "day");
  return referenceDate.format("dd");
}
