import {
  Children,
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ForwardedRef,
  type MouseEventHandler,
  type ReactElement,
  type RefAttributes,
} from "react";
import { getDefaultWeekdayName } from "./week-name.js";
import dayjs from "dayjs";
import { Slot } from "./slot.js";
import { range } from "./range.js";
import {
  CalendarContext,
  CalendarDayContext,
  useCalendarDayContext,
  type CalendarContextValue,
} from "./context.js";
import type {
  CalendarInternalValue,
  CalendarRangeValue,
  FormatDateFn,
  GetWeekdayNameFn,
  Mode,
} from "./types.js";
import type { CalendarSingleValue } from "./types.js";
import { normalizeValue } from "./value.js";
import { useCalendarMode, useCalendarValue, useCalendarView } from "./hooks.js";

const DAYS_IN_WEEK = 7;

type ComponentPropsWithoutRefAndChildren<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "children"
>;

export type RootProps<TMode extends Mode> = Omit<
  ComponentPropsWithoutRef<"div">,
  "defaultValue"
> &
  (
    | {
        mode: "single";
        value?: CalendarSingleValue;
        onValueChange?: (value: CalendarSingleValue) => unknown;
        defaultValue?: CalendarSingleValue;
      }
    | {
        mode: "range";
        value?: CalendarRangeValue;
        onValueChange?: (value: CalendarRangeValue) => unknown;
        defaultValue?: CalendarRangeValue;
      }
  );

export const Root = forwardRef<HTMLDivElement, RootProps<Mode>>(function Root<
  TMode extends Mode,
>(props: RootProps<TMode>, ref: ForwardedRef<HTMLDivElement>) {
  const { children, value, onValueChange, defaultValue, mode, ...rest } = props;

  const isStateUncontrolled = value === undefined;

  const [view, setView] = useState(dayjs());
  const [internalValue, setInternalValue] = useState<CalendarInternalValue>(
    () => {
      if (defaultValue !== undefined) {
        return normalizeValue(defaultValue);
      }
      return [null, null];
    }
  );

  // Sync internal state
  useEffect(() => {
    if (value === undefined) {
      return;
    }
    setInternalValue(normalizeValue(value));
  }, [value]);

  // Sync external state
  const updateValue = useCallback(
    (newValue: CalendarInternalValue) => {
      if (mode === "single") {
        onValueChange?.(newValue[0]);
      } else {
        onValueChange?.(newValue);
      }
      if (isStateUncontrolled) {
        setInternalValue(newValue);
      }
    },
    [onValueChange, isStateUncontrolled, mode]
  );

  const contextValue = useMemo<CalendarContextValue>(
    () => ({
      viewState: [view, setView],
      valueState: [internalValue, updateValue],
      mode,
    }),
    [view, internalValue, mode, updateValue]
  );

  return (
    <div ref={ref} {...rest}>
      <CalendarContext.Provider value={contextValue}>
        {children}
      </CalendarContext.Provider>
    </div>
  );
}) as <TMode extends Mode>(
  props: RootProps<TMode> & RefAttributes<HTMLDivElement>
) => ReactElement;

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
      onClick?.(e);
      if (e.isDefaultPrevented()) {
        return;
      }
      const newView = view.add(offset, "month");
      setView(newView);
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

  const startOfWeek = startOfMonth.startOf("week");
  const endOfWeek = endOfMonth.endOf("week");

  const totalDays = endOfWeek.diff(startOfWeek, "day") + 1;
  const days = range(totalDays).map((index) => startOfWeek.add(index, "day"));

  return (
    <div ref={ref} {...rest}>
      {days.map((date) => {
        return (
          <CalendarDayContext key={date.format("YYYY-MM-DD")} value={{ date }}>
            {cloneElement(child, {
              ...child.props,
              key: date.format("YYYY-MM-DD"),
            })}
          </CalendarDayContext>
        );
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
  className?: string | undefined | ((state: DayState) => string);
};
export const Day = forwardRef<HTMLButtonElement, DayProps>((props, ref) => {
  const { asChild, className, onClick, children, ...rest } = props;

  const date = useCalendarDayContext().date;

  const mode = useCalendarMode();
  const [value, setValue] = useCalendarValue();
  const [view] = useCalendarView();

  const isNeighbouringMonth = !date.isSame(view, "month");
  const isToday = date.isSame(dayjs(), "day");
  const isSelected = useMemo(() => {
    return value.some((d) => d?.isSame(date, "day") ?? false);
  }, [value, date]);
  const isInRange = useMemo(() => {
    if (mode === "single") {
      return false;
    }
    return date.isAfter(value[0], "day") && date.isBefore(value[1], "day");
  }, [mode, value, date]);

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      onClick?.(e);
      if (e.isDefaultPrevented()) {
        return;
      }
      if (mode === "single") {
        setValue([date, null]);
      } else {
        let newValue: CalendarInternalValue;

        if (!value[0]) {
          newValue = [date, null];
        } else if (!value[1]) {
          newValue = [value[0], date];
        } else if (value[0].isSame(date, "day")) {
          newValue = [null, value[1]];
        } else if (value[1].isSame(date, "day")) {
          newValue = [value[0], null];
        } else {
          const distanceToStart = date.diff(value[0], "day");
          const distanceToEnd = date.diff(value[1], "day");
          const isStartClosest =
            Math.abs(distanceToStart) < Math.abs(distanceToEnd);
          if (isStartClosest) {
            newValue = [date, value[1]];
          } else {
            newValue = [value[0], date];
          }
        }
        if (newValue[0] && newValue[1]) {
          newValue = newValue.sort((a, b) => a!.diff(b, "day"));
        }
        setValue(newValue);
      }
    },
    [onClick, setValue, date, mode, value]
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
      data-in-range={isInRange ? true : undefined}
      data-is-today={isToday ? true : undefined}
      onClick={clickHandler}
      className={computedClassName}
      ref={ref}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export type DayLabelProps = ComponentPropsWithoutRefAndChildren<"div">;
export const DayLabel = forwardRef<HTMLDivElement, DayLabelProps>(
  (props, ref) => {
    const { ...rest } = props;

    const dayContext = useCalendarDayContext();

    return (
      <div ref={ref} {...rest}>
        {dayContext.date.date()}
      </div>
    );
  }
);

export type FormInputProps = ComponentPropsWithoutRefAndChildren<"input"> & {
  formatFn?: FormatDateFn;
};
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    const { formatFn, ...rest } = props;
    const [value] = useCalendarValue();

    const defaultFormatFn = useCallback<FormatDateFn>((val) => {
      if (!val) {
        return "";
      }
      return val.format("YYYY-MM-DD");
    }, []);

    const inputValue = useMemo(() => {
      if (formatFn) {
        return formatFn(value[0]);
      }
      return defaultFormatFn(value[0]);
    }, [formatFn, value, defaultFormatFn]);

    return <input ref={ref} type="hidden" value={inputValue} {...rest} />;
  }
);

export type FormInputRangeProps = ComponentPropsWithoutRefAndChildren<"div"> & {
  formatFn?: FormatDateFn;
  nameFrom: string;
  nameTo: string;
};
export const FormInputRange = forwardRef<HTMLDivElement, FormInputRangeProps>(
  (props, ref) => {
    const { formatFn, nameFrom, nameTo, ...rest } = props;
    const [value] = useCalendarValue();

    const computedFormatFn = useCallback<FormatDateFn>(
      (val) => {
        if (formatFn) {
          return formatFn(val);
        }
        return val ? val.format("YYYY-MM-DD") : "";
      },
      [formatFn]
    );

    const inputValues = useMemo(() => {
      return [computedFormatFn(value[0]), computedFormatFn(value[1])] as const;
    }, [value, computedFormatFn]);

    return (
      <div ref={ref} {...rest}>
        <input type="hidden" value={inputValues[0]} />
        <input type="hidden" value={inputValues[1]} />
      </div>
    );
  }
);

export type ClearButtonProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  disabledWhenCleared?: boolean;
};
export const ClearButton = forwardRef<HTMLButtonElement, ClearButtonProps>(
  (props, ref) => {
    const {
      onClick,
      children,
      asChild,
      disabled,
      disabledWhenCleared = false,
      ...rest
    } = props;

    const [value, setValue] = useCalendarValue();

    const clearHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
      (e) => {
        onClick?.(e);
        if (e.isDefaultPrevented()) {
          return;
        }
        setValue([null, null]);
      },
      [onClick, setValue]
    );

    const isDisabled = useMemo(() => {
      if (disabled !== undefined) {
        return disabled;
      }
      if (disabledWhenCleared) {
        const isCleared = value[0] === null && value[1] === null;
        return isCleared;
      }
      return undefined;
    }, [disabled, value, disabledWhenCleared]);

    const Comp = asChild ? Slot : "button";

    return (
      <Comp ref={ref} onClick={clearHandler} disabled={isDisabled} {...rest}>
        {children}
      </Comp>
    );
  }
);

export type InRangeProps = ComponentPropsWithoutRef<"div"> & {
  asChild?: boolean;
};

export const InRange = forwardRef<HTMLDivElement, InRangeProps>(
  (props, ref) => {
    const { asChild, ...rest } = props;

    const Comp = asChild ? Slot : "div";

    return <Comp ref={ref} {...rest} />;
  }
);
