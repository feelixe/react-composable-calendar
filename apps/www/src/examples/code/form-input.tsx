import * as Calendar from "react-composable-calendar";

export function ComponentSingle() {
  return (
    <Calendar.Root mode="single" name="date">
      <Calendar.FormInput />
      {/* ... */}
    </Calendar.Root>
  );
}

export function ComponentRange() {
  return (
    <Calendar.Root mode="range" name={["dateFrom", "dateTo"]}>
      <Calendar.FormInput />
      {/* ... */}
    </Calendar.Root>
  );
}
