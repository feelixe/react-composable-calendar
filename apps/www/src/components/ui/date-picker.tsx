"use client";

import { Button } from "@/components/ui/button";
import { CalendarBody } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import type { ComponentProps } from "react";
import * as Calendar from "react-composable-calendar";
import { useHasValue } from "react-composable-calendar/hooks";

export type DatePickerTriggerProps = ComponentProps<typeof Button>;

export function DatePickerTrigger(props: DatePickerTriggerProps) {
  const { className, ...rest } = props;

  const hasValue = useHasValue();

  return (
    <Button
      variant="outline"
      className={cn(
        "w-[280px] justify-start text-left font-normal",
        !hasValue && "text-muted-foreground",
        className,
      )}
      {...rest}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      <Calendar.ValueLabel fallback="Select a date" />
    </Button>
  );
}

export type DatePickerProps = Calendar.RootProps;

export function DatePicker(props: DatePickerProps) {
  const { children, ...rest } = props;
  return (
    <Calendar.Root {...rest}>
      <Popover>
        <PopoverTrigger asChild>
          <DatePickerTrigger />
        </PopoverTrigger>
        <PopoverContent className="w-auto min-w-72 p-3">
          <CalendarBody />
        </PopoverContent>
      </Popover>
    </Calendar.Root>
  );
}
