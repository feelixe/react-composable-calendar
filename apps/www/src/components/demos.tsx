import { BasicCalendar } from "./ui/calendar.tsx";
import "dayjs/locale/en-gb.js";
import { CalendarDisabledDates } from "./ui/calendar-disable-dates.tsx";
import { MultiViewCalendar } from "./ui/calendar-multi-view.tsx";
import { CalendarStartEndSeparate } from "./ui/calendar-start-end-separate.tsx";
import { CalendarWithYearSelect } from "./ui/calendar-with-year-select.tsx";
import { DatePicker } from "./ui/date-picker.tsx";

export function DemoCalendar() {
  return (
    <BasicCalendar
      mode="single"
      locale="en-gb"
      className="grow rounded-md border border-border"
    />
  );
}

export function DemoDatePicker() {
  return <DatePicker mode="single" locale="en-gb" />;
}

export function DemoMultiView() {
  return (
    <MultiViewCalendar
      locale="en-gb"
      mode="range"
      className="grow rounded-md border border-border"
    />
  );
}

export function DemoSeparateViews() {
  return (
    <CalendarStartEndSeparate
      locale="en-gb"
      mode="range"
      className="grow rounded-md border border-border"
    />
  );
}

export function DemoWithYearSelect() {
  return (
    <CalendarWithYearSelect
      locale="en-gb"
      mode="range"
      className="grow rounded-md border border-border"
    />
  );
}

export function DemoDisabledDates() {
  return (
    <CalendarDisabledDates
      locale="en-gb"
      mode="single"
      className="grow rounded-md border border-border"
    />
  );
}
