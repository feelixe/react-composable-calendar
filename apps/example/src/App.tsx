import { BasicCalendar } from "./basic.tsx";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState<Temporal.PlainDate | null>(null);

  return (
    <BasicCalendar
      value={value}
      onValueChange={setValue}
      mode="single"
      locale="sv-SE"
    />
  );
}
