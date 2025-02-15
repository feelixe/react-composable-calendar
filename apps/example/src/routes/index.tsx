import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Calendar } from "@/components/ui/calendar.tsx";
import "dayjs/locale/en-gb";
import CalendarCombo from "@/components/ui/calendar-combo.tsx";
import { DatePicker, DatePickerTrigger } from "@/components/ui/date-picker.tsx";

dayjs.locale("en-gb");

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid gap-6 p-4">
      <DatePicker mode="single">
        <DatePickerTrigger />
      </DatePicker>
      <Calendar
        className="rounded-lg border border-border shadow"
        mode="single"
      />
      <CalendarCombo />
    </div>
  );
}
