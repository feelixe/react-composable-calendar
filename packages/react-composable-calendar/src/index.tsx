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
import { range } from "./range.js";
import {
  CalendarContext,
  DEFAULT_MODE,
  useCalendarValue,
  useCalendarView,
  type CalendarContextValue,
  type Mode,
} from "./context.js";

const DAYS_IN_WEEK = 7;

type ComponentPropsWithoutRefAndChildren<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "children"
>;

type RootProps = ComponentPropsWithoutRef<"div"> & {
  mode?: Mode;
};
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const { children, mode = DEFAULT_MODE, ...rest } = props;

  const [view, setView] = useState(dayjs());
  const [value, setValue] = useState(dayjs());

  const contextValue = useMemo<CalendarContextValue>(
    () => ({
      viewState: [view, setView],
      valueState: [value, setValue],
      mode,
    }),
    [view, value, mode]
  );

  return (
    <div ref={ref} {...rest}>
      <CalendarContext.Provider value={contextValue}>
        {children}
      </CalendarContext.Provider>
    </div>
  );
});

export type WeekdaysProps = ComponentPropsWithoutRef<"div">;
export const Weekdays = forwardRef<HTMLDivElement, WeekdaysProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    const child = Children.only(children) as ReactElement<WeekdayProps>;

    return (
      <div ref={ref} {...rest}>
        {range(DAYS_IN_WEEK).map((index) => {
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

export type MonthTitleProps = ComponentPropsWithoutRefAndChildren<"div"> & {
  getMonthTitle?: (date: dayjs.Dayjs) => string;
};

export const MonthTitle = forwardRef<HTMLDivElement, MonthTitleProps>(
  (props, ref) => {
    const { getMonthTitle, ...rest } = props;

    const [view] = useCalendarView();
    const monthTitle = useMemo(() => {
      if (getMonthTitle) {
        return getMonthTitle(view);
      }
      return view.format("MMMM YYYY");
    }, [view, getMonthTitle]);

    return (
      <div ref={ref} {...rest}>
        {monthTitle}
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

  const Comp = asChild ? Slot : "button";

  return (
    <Comp onClick={clickHandler} ref={ref} {...rest}>
      {children}
    </Comp>
  );
});

export type DaysProps = ComponentPropsWithoutRef<"div">;
export const Days = forwardRef<HTMLDivElement, DaysProps>((props, ref) => {
  const { children, ...rest } = props;

  const child = Children.only(children) as ReactElement<DayProps>;

  const [view] = useCalendarView();

  const startOfMonth = view.startOf("month");
  const endOfMonth = view.endOf("month");

  // Get the start/end of the weeks surrounding the month
  const startOfWeek = startOfMonth.startOf("week");
  const endOfWeek = endOfMonth.endOf("week");

  const totalDays = endOfWeek.diff(startOfWeek, "day") + 1;
  const days = range(totalDays).map((index) => startOfWeek.add(index, "day"));

  return (
    <div ref={ref} {...rest}>
      {days.map((date) => {
        return cloneElement(child, {
          ...child.props,
          key: date.format("YYYY-MM-DD"),
          children: date.date(),
          date,
        });
      })}
    </div>
  );
});

export type DayState = {
  isToday: boolean;
  isSelected: boolean;
  isNeighbouringMonth: boolean;
};

export type DayProps = Omit<ComponentPropsWithoutRef<"button">, "className"> & {
  asChild?: boolean;
  date?: dayjs.Dayjs;
  className?: string | undefined | ((state: DayState) => string);
};
export const Day = forwardRef<HTMLButtonElement, DayProps>((props, ref) => {
  const { asChild, className, date, onClick, ...rest } = props;

  if (!date) {
    throw new Error("'Day' must be used within a 'Days' component");
  }

  const [value, setValue] = useCalendarValue();
  const [view] = useCalendarView();

  const isSelected = value.isSame(date, "day");
  const isNeighbouringMonth = !date.isSame(view, "month");
  const isToday = date.isSame(dayjs(), "day");

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      setValue(date);
      onClick?.(e);
    },
    [onClick, setValue, date]
  );

  const computedClassName = useMemo(() => {
    if (className === undefined || typeof className === "string") {
      return className;
    }
    return className({ isToday, isSelected, isNeighbouringMonth });
  }, [className, isToday, isSelected, isNeighbouringMonth]);

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      aria-selected={isSelected ? true : undefined}
      data-selected={isSelected ? true : undefined}
      data-neighbouring={isNeighbouringMonth ? true : undefined}
      data-is-today={isToday ? true : undefined}
      onClick={clickHandler}
      className={computedClassName}
      ref={ref}
      {...rest}
    />
  );
});
