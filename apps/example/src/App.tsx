import { BasicCalendar } from "./basic.tsx";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState<Temporal.PlainDate | null>(null);

  return (
    <div>
      {value?.toString()}
      <BasicCalendar
        value={value}
        onValueChange={setValue}
        mode="single"
        locale="sv-SE"
      />
    </div>
  );
}
