"use client";

import { cn } from "@/lib/utils.ts";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as CalendarPrimitive from "react-composable-calendar";
import { Button } from "./button.tsx";
import { useState } from "react";
import dayjs from "dayjs";

import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);

export function CalendarBody() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <CalendarPrimitive.OffsetViewButton asChild offset={-1}>
          <Button size="icon" variant="outline" className="size-8">
            <ChevronLeftIcon className="size-3" />
          </Button>
        </CalendarPrimitive.OffsetViewButton>
        <CalendarPrimitive.MonthTitle className="flex items-center justify-center text-sm" />
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
    </>
  );
}

export type CalendarProps = CalendarPrimitive.RootProps;

export function Calendar(props: CalendarProps) {
  const { className, ...rest } = props;

  const [val, setVal] = useState<dayjs.Dayjs | null>(null);

  console.warn("val", val?.format("YYYY-MM-DDTHH:mm:ss.SSSZZ"));

  return (
    <CalendarPrimitive.Root
      mode="single"
      value={val}
      onValueChange={setVal}
      className={cn("max-w-72 p-3", className)}
      timezone="Australia/Sydney"
      // {...rest}
    >
      <CalendarBody />
    </CalendarPrimitive.Root>
  );
}
