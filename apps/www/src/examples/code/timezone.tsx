import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
import * as CalendarPrimitive from "react-composable-calendar";
import type { CalendarSingleValue } from "react-composable-calendar/types";

dayjs.extend(timezone);
dayjs.extend(utc);

const [value, setValue] = useState<CalendarSingleValue>(
  dayjs().tz("Europe/Stockholm"),
);

export function Component() {
  return (
    <CalendarPrimitive.Root
      mode="single"
      value={value}
      onValueChange={setValue}
      timezone="Europe/Stockholm"
    >
      {/* ... */}
    </CalendarPrimitive.Root>
  );
}
