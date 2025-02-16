"use client";

import { cn } from "@/lib/utils.ts";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as CalendarPrimitive from "react-composable-calendar";
import { Button } from "./button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select.tsx";
import { useView } from "react-composable-calendar/hooks";
import dayjs from "dayjs";

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
        <CalendarPrimitive.MonthTitle className="mr-2 flex items-center justify-center text-sm" />
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

export function CalendarWithYearSelect(props: CalendarPrimitive.RootProps) {
  const { className, ...rest } = props;

  return (
    <CalendarPrimitive.Root className={cn("max-w-72 p-3", className)} {...rest}>
      <CalendarPrimitive.View>
        <div className="mb-4 flex items-center justify-between">
          <CalendarPrimitive.OffsetViewButton asChild offset={-1}>
            <Button size="icon" variant="outline" className="size-8">
              <ChevronLeftIcon className="size-3" />
            </Button>
          </CalendarPrimitive.OffsetViewButton>
          <YearSelect />
          <CalendarPrimitive.OffsetViewButton asChild offset={1}>
            <Button size="icon" variant="outline" className="size-8">
              <ChevronRightIcon className="size-3" />
            </Button>
          </CalendarPrimitive.OffsetViewButton>
        </div>
        <CalendarPrimitive.Weekdays className="mb-3 grid grid-cols-7 font-light text-muted-foreground text-xs">
          <CalendarPrimitive.WeekdayLabel className="flex items-center justify-center" />
        </CalendarPrimitive.Weekdays>
        <CalendarPrimitive.Days className="mb-1 grid grid-cols-7 gap-y-1">
          <CalendarPrimitive.Day className="group relative aspect-square w-full cursor-pointer">
            <CalendarPrimitive.DayInRange className="absolute top-0 right-0 bottom-0 left-0 bg-foreground/10 data-end:rounded-r-lg data-start:rounded-l-lg" />
            <div className="absolute top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center rounded-lg group-data-[selected]:bg-foreground">
              <CalendarPrimitive.DayLabel className="group-data-[neighboring]:text-muted-foreground group-data-[selected]:text-background" />
            </div>
          </CalendarPrimitive.Day>
        </CalendarPrimitive.Days>
        <CalendarPrimitive.FormInput />
      </CalendarPrimitive.View>
    </CalendarPrimitive.Root>
  );
}
