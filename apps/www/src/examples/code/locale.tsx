import * as Calendar from "react-composable-calendar";
import "dayjs/locale/en-gb.js";

export function Component() {
  return (
    <Calendar.Root mode="single" locale="en-gb">
      {/* ... */}
    </Calendar.Root>
  );
}
