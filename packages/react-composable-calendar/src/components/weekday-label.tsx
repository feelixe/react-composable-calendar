import type { ComponentProps } from "react";
import type { GetWeekdayNameFn } from "../format.js";
import { Utils } from "../date-helpers.js";
import { useCalendarContext } from "../contexts/calendar.js";
import { useWeekdayContext } from "../contexts/weekday.js";
import { useCalendarLocale } from "../hooks.js";

export type WeekdayLabelProps = ComponentProps<"div"> & {
  getWeekdayName?: GetWeekdayNameFn;
};
export function WeekdayLabel(props: WeekdayLabelProps) {
  const { getWeekdayName = Utils.getWeekdayNameFromIndex, ...rest } = props;

  const { weekOffset } = useCalendarContext();
  const { weekdayIndex } = useWeekdayContext();
  const locale = useCalendarLocale();
  const weekdayName = getWeekdayName(weekdayIndex + weekOffset, locale);

  return <div {...rest}>{weekdayName}</div>;
}
