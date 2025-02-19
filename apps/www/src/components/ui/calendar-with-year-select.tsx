"use client";

import { cn } from "@/lib/utils.ts";
import dayjs from "dayjs";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as Calendar from "react-composable-calendar";
import { useView } from "react-composable-calendar/hooks";
import { Button } from "./button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select.tsx";

export function range(start: number, end: number) {
  const length = end - start + 1;
  return [...new Array(length)].map((_, i) => i + start);
}

const yearRange = range(
  dayjs().add(-30, "years").get("year"),
  dayjs().add(30, "years").get("year"),
);

function YearSelect() {
  const [view, setView] = useView();

  return (
    <Select
      value={view.get("year").toString()}
      onValueChange={(year) => setView(view.set("year", Number(year)))}
    >
      <SelectTrigger className="w-auto">
        <Calendar.MonthTitle className="mr-2 flex items-center justify-center text-sm" />
      </SelectTrigger>
      <SelectContent>
        {yearRange.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function CalendarWithYearSelect(props: Calendar.RootProps) {
  const { className, ...rest } = props;

  return (
    <Calendar.Root className={cn("max-w-72 p-3", className)} {...rest}>
      <Calendar.View>
        <div className="mb-4 flex items-center justify-between">
          <Calendar.OffsetViewButton asChild offset={-1}>
            <Button size="icon" variant="outline" className="size-8">
              <ChevronLeftIcon className="size-3" />
            </Button>
          </Calendar.OffsetViewButton>
          <YearSelect />
          <Calendar.OffsetViewButton asChild offset={1}>
            <Button size="icon" variant="outline" className="size-8">
              <ChevronRightIcon className="size-3" />
            </Button>
          </Calendar.OffsetViewButton>
        </div>
        <Calendar.Weekdays className="mb-3 grid grid-cols-7 font-light text-muted-foreground text-xs">
          <Calendar.WeekdayLabel className="flex items-center justify-center" />
        </Calendar.Weekdays>
        <Calendar.Days className="mb-1 grid grid-cols-7 gap-y-1">
          <Calendar.Day className="group relative aspect-square w-full cursor-pointer">
            <Calendar.DayInRange className="absolute top-0 right-0 bottom-0 left-0 bg-foreground/10 data-end:rounded-r-lg data-start:rounded-l-lg" />
            <div className="absolute top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center rounded-lg group-data-[is-today]:bg-muted group-data-[selected]:bg-foreground">
              <Calendar.DayLabel className="group-data-[neighboring]:text-muted-foreground group-data-[selected]:text-background" />
            </div>
          </Calendar.Day>
        </Calendar.Days>
        <Calendar.FormInput />
      </Calendar.View>
    </Calendar.Root>
  );
}
