import type { ComponentProps } from "react";
import { useIsEndOfRange, useIsInRange, useIsStartOfRange } from "../hooks.js";
import { useCalendarMode } from "../hooks.js";
import { Root } from "@radix-ui/react-slot";

export type DayInRangeProps = ComponentProps<"div"> & {
  asChild?: boolean;
};

export function DayInRange(props: DayInRangeProps) {
  const { asChild, ...rest } = props;
  const mode = useCalendarMode();
  const isInRange = useIsInRange();
  const isStartOfRange = useIsStartOfRange();
  const isEndOfRange = useIsEndOfRange();
  const isEdge = isStartOfRange || isEndOfRange;

  if (mode === "single" || !isInRange) {
    return null;
  }

  const Comp = asChild ? Root : "div";

  return (
    <Comp
      data-start={isStartOfRange ? true : undefined}
      data-end={isEndOfRange ? true : undefined}
      data-edge={isEdge ? true : undefined}
      {...rest}
    />
  );
}
