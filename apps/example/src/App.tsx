import * as Calendar from "react-composable-calendar";
import "dayjs/locale/sv";
import type { ComponentProps } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// import dayjs from "dayjs";
// dayjs.locale("sv")

function Button(props: ComponentProps<"button">) {
  const { children, className, ...rest } = props;

  return (
    <button
      className="border-slate-500 border p-2 rounded cursor-pointer"
      {...rest}
    >
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div className="p-4">
      <div className="max-w-sm">
        <Calendar.Root className="p-2 border border-slate-200 rounded">
          <div className="flex items-center justify-between mb-2">
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
          <Calendar.Weekdays className="grid grid-cols-7 gap-1">
            <Calendar.Weekday className="flex items-center justify-center font-medium text-slate-500" />
          </Calendar.Weekdays>
        </Calendar.Root>
      </div>
    </div>
  );
}
