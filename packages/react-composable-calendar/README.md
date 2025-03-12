<img src="https://i.imgur.com/WFBtiZr.png" alt="header">

<p align="center">
React Composable Calendar is a collection of headless, highly customizable, and modular React calendar components. Designed with flexibility in mind, it aligns with the principles of shadcn/ui and Radix UI.
</p>

<p align="center">
<a href="https://www.npmjs.com/package/react-composable-calendar"><img src="https://badge.fury.io/js/react-composable-calendar.svg?icon=si%3Anpm" alt="npm version" height="18"></a>
<a href="/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue" height="18" /></a>
</p>

<p align="center">
  <a href="https://react-composable-calendar.vercel.app/">Documentation</a>
  •
  <a href="https://www.npmjs.com/package/react-composable-calendar">npm</a>
  •
  <a href="https://github.com/feelixe/react-composable-calendar">GitHub</a>
</p>

## Key Features

* 📆 **Single Date or Range:** Select a single date or a range.
* 🤯 **Headless:** Bring your own styles using any styling method.
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
This package was created as an alternative the calendar component used by shadcn/ui, `react-day-picker`, which lacks composability. React Composable Calendar was designed to offer a seamless and enjoyable developer experience, making it easy to build and customize calendars exactly the way you want.

## Components

### Basic Calendar
1. Copy paste to `src/components/ui/calendar.tsx`
```tsx
"use client";

import { cn } from "@/lib/utils.ts";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as Calendar from "react-composable-calendar";
import { Button } from "./button.tsx";

export function CalendarBody() {
  return (
    <Calendar.View>
      <div className="mb-4 flex items-center justify-between">
        <Calendar.OffsetViewButton asChild offset={-1}>
          <Button size="icon" variant="outline" className="size-8">
            <ChevronLeftIcon className="size-3" />
          </Button>
        </Calendar.OffsetViewButton>
        <Calendar.MonthTitle className="flex items-center justify-center text-sm" />
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
          <Calendar.DayInRange className="absolute top-0 right-0 bottom-0 left-0 size-full bg-foreground/10 data-[end]:rounded-r-lg data-[start]:rounded-l-lg" />
          <div className="relative z-10 flex size-full items-center justify-center rounded-lg group-data-[is-today]:bg-muted group-data-[selected]:bg-foreground">
            <Calendar.DayLabel className="group-data-[neighboring]:text-muted-foreground group-data-[selected]:text-background" />
          </div>
        </Calendar.Day>
      </Calendar.Days>
      <Calendar.FormInput />
    </Calendar.View>
  );
}

export function BasicCalendar(props: Calendar.RootProps) {
  const { className, ...rest } = props;

  return (
    <Calendar.Root className={cn("max-w-72 p-3", className)} {...rest}>
      <CalendarBody />
    </Calendar.Root>
  );
}
```

### More components
Visit the [documentation site](https://react-composable-calendar.vercel.app/) for advanced usage and more examples.
