import { Temporal } from "temporal-polyfill";

// todo, duplicate
export function getDefaultWeekdayName(
  dayIndex: number,
  locale: string | null,
): string {
  const now = Temporal.Now.plainDateISO();
  const weekDay = now.dayOfWeek;
  const startOfWeek = now.subtract({ days: weekDay - 1 });
  const day = startOfWeek.add({ days: dayIndex });

  return day.toLocaleString(locale ?? undefined, { weekday: "narrow" });
}
