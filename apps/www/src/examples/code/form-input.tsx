import * as CalendarPrimitive from "react-composable-calendar";

export function ComponentSingle() {
  return (
    <CalendarPrimitive.Root mode="single" name="date">
      <CalendarPrimitive.FormInput />
      {/* ... */}
    </CalendarPrimitive.Root>
  );
}

export function Component() {
  return (
    <CalendarPrimitive.Root mode="range" name={["dateFrom", "dateTo"]}>
      <CalendarPrimitive.FormInput />
      {/* ... */}
    </CalendarPrimitive.Root>
  );
}
