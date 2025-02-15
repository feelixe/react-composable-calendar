import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import CalendarCombo from "@/components/ui/calendar-combo.tsx";
import { BasicCalendarExample } from "../examples/basic-calendar-example.tsx";
import { DatePickerExample } from "../examples/date-picker.tsx";

dayjs.locale("en-gb");

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid gap-6 p-4">
      <BasicCalendarExample />
      <DatePickerExample />
      <CalendarCombo />
    </div>
  );
}
