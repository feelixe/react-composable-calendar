import type { Temporal } from "temporal-polyfill";
import { BasicCalendar } from "./basic.tsx";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState<Temporal.PlainDate | null>(null);

  console.log(value?.toString());

  return (
    <BasicCalendar
      value={value}
      onValueChange={setValue}
      mode="single"
      weekOffset={1}
    />
  );
}
