import {
  Children,
  cloneElement,
  type ComponentProps,
  type ReactElement,
} from "react";
import { range } from "../helpers/range.js";
import { WeekdayContext } from "../contexts/weekday.js";

const DAYS_IN_WEEK = 7;

export type WeekdaysProps = ComponentProps<"div">;

export function Weekdays(props: WeekdaysProps) {
  const { children, ...rest } = props;

  const child = Children.only(children) as ReactElement<any>;

  return (
    <div {...rest}>
      {range(DAYS_IN_WEEK).map((index) => (
        <WeekdayContext.Provider key={index} value={{ weekdayIndex: index }}>
          {cloneElement(child)}
        </WeekdayContext.Provider>
      ))}
    </div>
  );
}
