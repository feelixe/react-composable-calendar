import type { ComponentProps, ReactNode } from "react";
import { useDayContext } from "../contexts/day.js";

import type { PlainDate } from "../temporal.js";

export type DayRendererProps = ComponentProps<"div"> & {
  render: (props: { day: PlainDate }) => ReactNode;
};

export function DayRenderer(props: DayRendererProps) {
  const { render, ...rest } = props;

  const dayContext = useDayContext();
  const day = dayContext.day;
  return <div {...rest}>{render({ day })}</div>;
}
