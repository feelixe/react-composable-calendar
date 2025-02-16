import * as CalendarPrimitive from "react-composable-calendar";

export function ComponentSingle() {
  return (
    <CalendarPrimitive.Root mode="single" name="date">
      <CalendarPrimitive.FormInput />
      {/* ... */}
    </CalendarPrimitive.Root>
  );
}

export function ComponentRange() {
  return (
    <CalendarPrimitive.Root mode="range" name={["dateFrom", "dateTo"]}>
      <CalendarPrimitive.FormInput />
      {/* ... */}
    </CalendarPrimitive.Root>
  );
}
