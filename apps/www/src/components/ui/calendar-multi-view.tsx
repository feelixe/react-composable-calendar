"use client";

import { cn } from "@/lib/utils.ts";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as CalendarPrimitive from "react-composable-calendar";
import { Button } from "./button.tsx";

import dayjs from "dayjs";
import "dayjs/locale/en-gb";

dayjs.locale("en-gb");

export type CalendarProps = CalendarPrimitive.RootProps;

export function range(length: number) {
  return [...new Array(length)].map((_, i) => i);
}

export function MultiViewCalendar(props: CalendarProps) {
  const { className, ...rest } = props;

  return (
    <CalendarPrimitive.Root className={cn("max-w-lg p-3", className)} {...rest}>
      <div className="mb-2 flex items-center justify-end gap-2">
        <CalendarPrimitive.OffsetViewButton asChild offset={-1}>
          <Button size="icon" variant="outline" className="size-8">
            <ChevronLeftIcon className="size-3" />
          </Button>
        </CalendarPrimitive.OffsetViewButton>
        <CalendarPrimitive.OffsetViewButton asChild offset={1}>
          <Button size="icon" variant="outline" className="size-8">
            <ChevronRightIcon className="size-3" />
          </Button>
        </CalendarPrimitive.OffsetViewButton>
        <div className="grow" />
        <CalendarPrimitive.ValueLabel className="text-muted-foreground text-sm " />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {range(2).map((viewIndex) => (
          <CalendarPrimitive.View key={viewIndex} viewOffset={viewIndex}>
            <CalendarPrimitive.MonthTitle className="mb-4 flex items-center justify-center" />
            <CalendarPrimitive.Weekdays className="mb-2 grid grid-cols-7 font-light text-muted-foreground text-xs">
              <CalendarPrimitive.WeekdayLabel className="flex items-center justify-center" />
            </CalendarPrimitive.Weekdays>

            <CalendarPrimitive.Days className="mb-1 grid grid-cols-7 gap-y-1">
              <CalendarPrimitive.Day className="group relative aspect-square w-full cursor-pointer data-[neighboring]:invisible">
                <CalendarPrimitive.DayInRange className="absolute top-0 right-0 bottom-0 left-0 bg-foreground/10 data-end:rounded-r-lg data-start:rounded-l-lg" />
                <div className="absolute top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center rounded-lg group-data-[selected]:bg-foreground">
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
