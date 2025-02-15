<img src="/static//header.png" alt="Usage demo">

React Composable Calendar is a collection of **headless**, **highly customizable**, and **modular** React calendar components. Designed with flexibility in mind, it aligns with the principles of [shadcn/ui](https://github.com/shadcn-ui/ui) and [Radix UI](https://github.com/radix-ui/primitives). If you're familiar with these libraries, you'll feel right at home.

## Key Features

* 📆 **Single Date or Range:** Select a single date or a range.
* 🤯 **Headless:** bring your own styles with any styling method.
* 🏗️ **Composable:** Build your own calendar with small building blocks.
* 💾 **State:** Supports uncontrolled and controlled state.
* 🗿 **shadcn/ui:** Embraces the principles of shadcn/ui. 

## Installation
1. Install dependencies
```
npm i react-composable-calendar dayjs
```
2. This package is designed for you to build your own calendar. To get started, copy and paste one of the examples below into your project, such as `/components/ui/calendar.tsx`, and customize it to fit your needs.

## Background
This package was created to address a limitation in the calendar component used by shadcn/ui, `react-day-picker`, which lacks composability. React Composable Calendar was designed to offer a seamless and enjoyable developer experience, making it easy to build and customize calendars exactly the way you want.

## Examples

### Basic Calendar
1. Copy paste to `/components/ui/calendar.tsx`
```tsx
"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as CalendarPrimitive from "react-composable-calendar";
import { Button } from "./button.tsx";
import { cn } from "@/lib/utils.ts";

export type CalendarProps = CalendarPrimitive.RootProps;

export function Calendar(props: CalendarProps) {
  const { className, ...rest } = props;

  return (
    <CalendarPrimitive.Root
      className={cn("max-w-72 rounded-md border border-border p-3 shadow")}
      {...rest}
    >
      <CalendarPrimitive.FormInput name="date" />

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
        <CalendarPrimitive.Day className="group relative aspect-square w-full cursor-pointer">
          <CalendarPrimitive.DayInRange className="absolute top-0 right-0 bottom-0 left-0 bg-foreground/10 data-end:rounded-r-lg data-start:rounded-l-lg" />
          <div className="absolute top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center rounded-lg group-data-[selected]:bg-foreground">
            <CalendarPrimitive.DayLabel className="group-data-[neighboring]:text-muted-foreground group-data-[selected]:text-background" />
          </div>
        </CalendarPrimitive.Day>
      </CalendarPrimitive.Days>
    </CalendarPrimitive.Root>
  );
}
```

### Date Picker Field
1. Add **Basic Calendar Component** from above.
2. Requires [Popover](https://ui.shadcn.com/docs/components/popover) and [Button](https://ui.shadcn.com/docs/components/button) from shadcn.

```tsx

```

### More examples
Visit the documentation site for advanced usage and more examples.