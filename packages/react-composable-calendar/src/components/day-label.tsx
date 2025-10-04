import type { ComponentProps } from "react";
import { useDayContext } from "../contexts/day.js";

export type DayLabelProps = ComponentProps<"div">;

export function DayLabel(props: DayLabelProps) {
  const { ...rest } = props;

  const dayContext = useDayContext();

  return <div {...rest}>{dayContext.day.day}</div>;
}
