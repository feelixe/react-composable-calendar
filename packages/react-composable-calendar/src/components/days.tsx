import {
  Children,
  cloneElement,
  forwardRef,
  type ComponentProps,
  type ReactElement,
} from "react";
import { useViewState } from "../hooks.js";
import { useCalendarContext } from "../contexts/calendar.js";
import {
  getDaysBetween,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
} from "../date-helpers.js";
import { range } from "../helpers/range.js";
import { DayContext } from "../contexts/day.js";

export type DaysProps = ComponentProps<"div">;

export function Days(props: DaysProps) {
  const { children, ...rest } = props;

  const child = Children.only(children) as ReactElement<any>;

  const [view] = useViewState();
  const { weekOffset } = useCalendarContext();

  const startOfMonth = getStartOfMonth(view);
  const endOfMonth = getEndOfMonth(view);

  const viewStart = getStartOfWeek(startOfMonth).add({ days: weekOffset });
  const viewEnd = getEndOfWeek(endOfMonth).add({ days: weekOffset });

  const totalDays = Math.abs(getDaysBetween(viewStart, viewEnd)) + 1;

  const days = range(totalDays).map((index) => viewStart.add({ days: index }));

  return (
    <div {...rest}>
      {days.map((date) => {
        return (
          <DayContext.Provider key={date.toString()} value={{ day: date }}>
            {cloneElement(child)}
          </DayContext.Provider>
        );
      })}
    </div>
  );
}
