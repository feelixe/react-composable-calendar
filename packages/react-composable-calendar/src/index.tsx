import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import { getDefaultWeekdayName, type GetWeekdayNameFn } from "./week-name.js";
import dayjs from "dayjs";
import { Slot } from "./slot.js";

const DAYS_IN_WEEK = 7;

type ComponentPropsWithoutRefAndChildren<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "children"
>;

type CalendarContextValue = {
  viewState: [view: dayjs.Dayjs, setView: (day: dayjs.Dayjs) => void];
};

const CalendarContext = createContext<CalendarContextValue | null>(null);

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (context === null) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider"
    );
  }
  return context;
}

export function useCalendarView() {
  const context = useCalendarContext();
  return context.viewState;
}

type RootProps = ComponentPropsWithoutRef<"div">;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const { children, ...rest } = props;

  const [view, setView] = useState(dayjs());

  const contextValue = useMemo<CalendarContextValue>(
    () => ({
      viewState: [view, setView],
    }),
    [view]
  );

  return (
    <div ref={ref} {...rest}>
      <CalendarContext value={contextValue}>{children}</CalendarContext>
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

export type WeekdayProps = ComponentPropsWithoutRefAndChildren<"div"> & {
  weekdayIndex?: number;
  getWeekdayName?: GetWeekdayNameFn;
};
export const Weekday = forwardRef<HTMLDivElement, WeekdayProps>(
  (props, ref) => {
    const {
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

export type MonthTitleProps = ComponentPropsWithoutRefAndChildren<"div">;
export const MonthTitle = forwardRef<HTMLDivElement, MonthTitleProps>(
  (props, ref) => {
    const { ...rest } = props;

    const [view] = useCalendarView();
    const monthName = view.format("MMMM");

    return (
      <div ref={ref} {...rest}>
        {monthName}
      </div>
    );
  }
);

export type OffsetViewButtonProps = ComponentPropsWithoutRef<"button"> & {
  offset: number;
  asChild?: boolean;
};
export const OffsetViewButton = forwardRef<
  HTMLButtonElement,
  OffsetViewButtonProps
>((props, ref) => {
  const { children, onClick, offset, asChild, ...rest } = props;

  const [view, setView] = useCalendarView();

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      const newView = view.add(offset, "month");
      setView(newView);
      onClick?.(e);
    },
    [offset, view, setView, onClick]
  );

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp onClick={clickHandler} ref={ref} {...rest}>
      {children}
    </Comp>
  );
});
