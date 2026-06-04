export namespace Utils {
  export function getToday() {
    return Temporal.Now.plainDateISO();
  }

  export function isSameDay(a: Temporal.PlainDate, b: Temporal.PlainDate) {
    return Temporal.PlainDate.compare(a, b) === 0;
  }

  export function isAfter(a: Temporal.PlainDate, b: Temporal.PlainDate) {
    return Temporal.PlainDate.compare(a, b) > 0;
  }

  export function isBefore(a: Temporal.PlainDate, b: Temporal.PlainDate) {
    return Temporal.PlainDate.compare(a, b) < 0;
  }

  export function isOtherMonth(a: Temporal.PlainDate, b: Temporal.PlainDate) {
    return a.month !== b.month || a.year !== b.year;
  }

  export function getStartOfMonth(date: Temporal.PlainDate) {
    return Temporal.PlainDate.from({
      year: date.year,
      month: date.month,
      day: 1,
    });
  }

  export function getEndOfMonth(date: Temporal.PlainDate) {
    return Temporal.PlainDate.from({
      year: date.year,
      month: date.month,
      day: 1,
    })
      .add({ months: 1 })
      .subtract({ days: 1 });
  }

  export function getStartOfWeek(date: Temporal.PlainDate) {
    return date.subtract({
      days: date.dayOfWeek - 1,
    });
  }

  export function getEndOfWeek(date: Temporal.PlainDate) {
    return getStartOfWeek(date).add({ days: 6 });
  }

  export function getDaysBetween(a: Temporal.PlainDate, b: Temporal.PlainDate) {
    const duration = b.until(a);
    return duration.total({ unit: "days" });
  }

  export function getWeekdayNameFromIndex(
    dayIndex: number,
    locale: string | null
  ): string {
    const now = Temporal.Now.plainDateISO();
    const weekDay = now.dayOfWeek;
    const startOfWeek = now.subtract({ days: weekDay - 1 });
    const day = startOfWeek.add({ days: dayIndex });

    return day.toLocaleString(locale ?? undefined, { weekday: "short" });
  }

  export function getMonthView(month: Temporal.PlainDate, weekOffset: number) {
    const startOfMonth = getStartOfMonth(month);
    const endOfMonth = getEndOfMonth(month);

    const start = getStartOfWeek(startOfMonth).add({
      days: weekOffset,
    });
    const end = getEndOfWeek(endOfMonth).add({
      days: weekOffset,
    });

    return {
      start,
      end,
    };
  }
}
