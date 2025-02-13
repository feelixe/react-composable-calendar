import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from "react";
import { getDefaultWeekdayName, type GetWeekdayNameFn } from "./week-name.js";

const DAYS_IN_WEEK = 7;

const CalendarContext = createContext(null);

type RootProps = ComponentPropsWithoutRef<"div">;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
});

export type WeekdaysProps = ComponentPropsWithoutRef<"div">;
export const Weekdays = forwardRef<HTMLDivElement, WeekdaysProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    const child = Children.only(children) as ReactElement<WeekdayProps>;
    const weekRange = [...new Array(DAYS_IN_WEEK)].map((_, i) => i);

    return (
      <div ref={ref} {...rest}>
        {weekRange.map((index) => {
          return cloneElement(child, {
            ...child.props,
            key: index,
            weekdayIndex: index,
          });
        })}
      </div>
    );
  }
);

export type WeekdayProps = ComponentPropsWithoutRef<"div"> & {
  weekdayIndex?: number;
  getWeekdayName?: GetWeekdayNameFn;
};
export const Weekday = forwardRef<HTMLDivElement, WeekdayProps>(
  (props, ref) => {
    const {
      children,
      weekdayIndex,
      getWeekdayName = getDefaultWeekdayName,
      ...rest
    } = props;

    if (weekdayIndex === undefined) {
      throw new Error("'Weekday' must be used within a 'Weekdays' component");
    }

    const weekdayName = getWeekdayName(weekdayIndex);

    return (
      <div ref={ref} {...rest}>
        {weekdayName}
      </div>
    );
  }
);
