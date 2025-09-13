import {
  Children,
  cloneElement,
  forwardRef,
  type ComponentProps,
  type ReactElement,
} from "react";
import { useViewState } from "../hooks.js";
import { useCalendarContext } from "../contexts/calendar.js";
import { Utils } from "../date-helpers.js";
import { range } from "../helpers/range.js";
import { DayContext } from "../contexts/day.js";

export type DaysProps = ComponentProps<"div">;

export function Days(props: DaysProps) {
  const { children, ...rest } = props;

  const child = Children.only(children) as ReactElement<any>;

  const [view] = useViewState();
  const { weekOffset } = useCalendarContext();

  const monthView = Utils.getMonthView(view, weekOffset);

  const totalDays =
    Math.abs(Utils.getDaysBetween(monthView.start, monthView.end)) + 1;

  const days = range(totalDays).map((index) =>
    monthView.start.add({ days: index })
  );

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
