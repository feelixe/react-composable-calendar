import { Root } from "@radix-ui/react-slot";
import { useIsToday } from "../hooks.js";
import type { ComponentProps } from "react";

export type DayIsTodayProps = ComponentProps<"div"> & {
  asChild?: boolean;
};

export function DayIsToday(props: DayIsTodayProps) {
  const { asChild, ...rest } = props;

  const isToday = useIsToday();
  if (!isToday) {
    return null;
  }

  const Comp = asChild ? Root : "div";

  return <Comp {...rest} />;
}
