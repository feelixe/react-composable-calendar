import * as Calendar from "react-composable-calendar";
import "dayjs/locale/sv";
import type { ComponentProps } from "react";
import dayjs from "dayjs";
import { MinusIcon, PlusIcon } from "lucide-react";

// dayjs.locale("sv")

function Button(props: ComponentProps<"button">) {
  const { children, className, ...rest } = props;

  return (
    <button className="border-slate-200 p-2 rounded" {...rest}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div className="p-4">
      <div className="max-w-sm">
        <Calendar.Root>
          <Calendar.OffsetViewButton asChild offset={-1}>
            <Button>
              <MinusIcon />
            </Button>
          </Calendar.OffsetViewButton>
          <Calendar.MonthTitle className="flex items-center justify-center" />
          <Calendar.OffsetViewButton asChild offset={1}>
            <Button>
              <PlusIcon />
            </Button>
          </Calendar.OffsetViewButton>
          <Calendar.Weekdays className="grid grid-cols-7 gap-1">
            <Calendar.Weekday className="flex items-center justify-center font-medium" />
          </Calendar.Weekdays>
        </Calendar.Root>
      </div>
    </div>
  );
}
