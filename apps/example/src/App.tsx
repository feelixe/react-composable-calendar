import * as Calendar from "react-composable-calendar";
import type { ComponentProps } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import dayjs from "dayjs";
import { cn } from "./utils.ts";

import "dayjs/locale/sv";
dayjs.locale("sv");

function Button(props: ComponentProps<"button">) {
  const { children, className, ...rest } = props;

  return (
    <button
      className="border-gray-300 border p-2 rounded-lg cursor-pointer"
      {...rest}
    >
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div className="p-4">
      <div className="max-w-xs">
        <Calendar.Root className="p-4 border border-gray-300 rounded-md shadow">
          <div className="flex items-center justify-between mb-4">
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
          <Calendar.Weekdays className="grid grid-cols-7 gap-1 mb-2 font-light">
            <Calendar.Weekday className="flex items-center justify-center text-gray-500" />
          </Calendar.Weekdays>
          <Calendar.Days className="grid grid-cols-7 gap-1">
            <Calendar.Day
              className={cn(
                "w-full aspect-square cursor-pointer rounded-lg data-neighbouring:opacity-50 data-is-today:bg-gray-200 data-selected:bg-black data-selected:text-white"
              )}
            />
          </Calendar.Days>
        </Calendar.Root>
      </div>
    </div>
  );
}
