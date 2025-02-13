import * as Calendar from "react-composable-calendar";
import "dayjs/locale/sv";
import dayjs from "dayjs";

// dayjs.locale("sv")

export default function App() {
  return (
    <div className="p-4">
      <div className="max-w-sm">
        <Calendar.Root>
          <Calendar.Weekdays className="grid grid-cols-7 gap-1">
            <Calendar.Weekday className="flex items-center justify-center font-medium" />
          </Calendar.Weekdays>
        </Calendar.Root>
      </div>
    </div>
  );
}
