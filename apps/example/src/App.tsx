import dayjs from "dayjs";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { type ComponentProps, useState } from "react";
import * as Calendar from "react-composable-calendar";
import type { CalendarRangeValue } from "react-composable-calendar/types";
import "dayjs/locale/en-gb";

dayjs.locale("en-gb");

function Button(props: ComponentProps<"button">) {
  const { children, className, ...rest } = props;

  return (
    <button
      className="cursor-pointer rounded-lg border border-gray-300 p-2"
      {...rest}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [value, setValue] = useState<CalendarRangeValue>([null, null]);

  console.log(value[0]?.format("YYYY-MM-DD"), value[1]?.format("YYYY-MM-DD"));

  return (
    <div className="p-4">
      <Calendar.Root
        mode="range"
        value={value}
        onValueChange={setValue}
        className="max-w-xs rounded-md border border-gray-300 p-4 shadow"
      >
        <Calendar.FormInput name="date" />

        <div className="mb-4 flex items-center justify-between">
          <Calendar.OffsetViewButton asChild offset={-1}>
            <Button>
              <ChevronLeftIcon className="size-3" />
            </Button>
          </Calendar.OffsetViewButton>
          <Calendar.MonthTitle className="flex items-center justify-center" />
          <Calendar.OffsetViewButton asChild offset={1}>
            <Button>
              <ChevronRightIcon className="size-3" />
            </Button>
          </Calendar.OffsetViewButton>
        </div>

        <Calendar.Weekdays className="mb-2 grid grid-cols-7 gap-1 font-light">
          <Calendar.Weekday className="flex items-center justify-center text-gray-500" />
        </Calendar.Weekdays>

        <Calendar.Days className="mb-3 grid grid-cols-7 gap-y-1">
          <Calendar.Day className="group relative aspect-square w-full cursor-pointer">
            <Calendar.DayInRange className="absolute top-0 right-0 bottom-0 left-0 bg-black/10 data-end:rounded-r-lg data-start:rounded-l-lg" />
            <div className="absolute top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center rounded-lg group-data-[selected]:bg-black">
              <Calendar.DayLabel className="group-data-[neighbouring]:text-gray-400 group-data-[selected]:text-white" />
            </div>
          </Calendar.Day>
        </Calendar.Days>

        <div className="flex justify-end">
          <Calendar.ClearButton
            disabledWhenCleared
            className="cursor-pointer text-blue-600 disabled:text-gray-600"
          >
            Clear
          </Calendar.ClearButton>
        </div>
      </Calendar.Root>
    </div>
  );
}
