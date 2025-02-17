"use client";

import { cn } from "@/lib/utils.ts";
import dayjs from "dayjs";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as CalendarPrimitive from "react-composable-calendar";
import { changeAtIndexStrategy } from "react-composable-calendar/select-day-strategy";
import { Button } from "./button.tsx";

export function range(length: number) {
  return [...new Array(length)].map((_, i) => i);
}

export function CalendarStartEndSeparate(props: CalendarPrimitive.RootProps) {
  const { className, ...rest } = props;

  return (
    <CalendarPrimitive.Root className={cn("max-w-lg p-3", className)} {...rest}>
      <CalendarPrimitive.ValueLabel
        fallback="No date selected"
        className="mb-3 text-center text-muted-foreground text-sm"
      />

      <div className="grid grid-cols-2 gap-6">
        {range(2).map((index) => (
          <CalendarPrimitive.View
            defaultValue={dayjs().add(index, "month")}
            key={index}
          >
            <div className="mb-4 flex items-center justify-between">
              <CalendarPrimitive.OffsetViewButton asChild offset={-1}>
                <Button size="icon" variant="outline" className="size-8">
                  <ChevronLeftIcon className="size-3" />
                </Button>
              </CalendarPrimitive.OffsetViewButton>
              <CalendarPrimitive.MonthTitle className="flex items-center justify-center" />
              <CalendarPrimitive.OffsetViewButton asChild offset={1}>
                <Button size="icon" variant="outline" className="size-8">
                  <ChevronRightIcon className="size-3" />
                </Button>
              </CalendarPrimitive.OffsetViewButton>
            </div>
            <CalendarPrimitive.Weekdays className="mb-2 grid grid-cols-7 font-light text-muted-foreground text-xs">
              <CalendarPrimitive.WeekdayLabel className="flex items-center justify-center" />
            </CalendarPrimitive.Weekdays>

            <CalendarPrimitive.Days className="mb-1 grid grid-cols-7 gap-y-1">
              <CalendarPrimitive.Day
                selectDayStrategy={changeAtIndexStrategy(index)}
                className="group relative aspect-square w-full cursor-pointer data-[neighboring]:invisible"
              >
                <CalendarPrimitive.DayInRange className="absolute top-0 right-0 bottom-0 left-0 bg-foreground/10 data-end:rounded-r-lg data-start:rounded-l-lg" />
                <div className="absolute top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center rounded-lg group-data-[is-today]:bg-muted group-data-[selected]:bg-foreground">
                  <CalendarPrimitive.DayLabel className="group-data-[neighboring]:text-muted-foreground group-data-[selected]:text-background" />
                </div>
              </CalendarPrimitive.Day>
            </CalendarPrimitive.Days>
          </CalendarPrimitive.View>
        ))}
      </div>
      <CalendarPrimitive.FormInput />
    </CalendarPrimitive.Root>
  );
}
