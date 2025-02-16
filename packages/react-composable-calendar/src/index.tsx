import {
  Children,
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ForwardedRef,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
} from "react";
import { getDefaultWeekdayName } from "./week-name.js";
import { Slot } from "./slot.js";
import { range } from "./array-range.js";
import {
  CalendarContext,
  type CalendarContextValue,
} from "./contexts/calendar.js";
import { DayContext, useDayContext } from "./contexts/day.js";
import type {
  CalendarInputName,
  CalendarInternalValue,
  CalendarRangeValue,
  Mode,
} from "./types.js";
import type { CalendarSingleValue } from "./types.js";
import { normalizeValue, sortValue } from "./value.js";
import {
  useMode,
  useCalendarValue,
  useView,
  useIsEndOfRange,
  useIsInRange,
  useIsNeighboringMonth,
  useIsSelected,
  useIsStartOfRange,
  useIsToday,
  useInputName,
} from "./hooks.js";
import { useWeekdayContext, WeekdayContext } from "./contexts/weekday.js";
import {
  closestStrategy,
  type SelectDayStrategy,
} from "./select-day-strategy.js";
import { ViewContext, type ViewContextValue } from "./contexts/view.js";
import type {
  FormatDateFn,
  FormatRequiredDateFn,
  GetWeekdayNameFn,
} from "./format.js";
import { defaultFormatMonth, defaultFormatValue } from "./format.js";
import { dayjs } from "./extended-dayjs.js";

const DAYS_IN_WEEK = 7;

type ComponentPropsWithoutRefAndChildren<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "children"
>;

export type RootBaseProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "defaultValue"
> & {
  /**
   * Timezone that will be passed to dayjs, see https://day.js.org/docs/en/timezone/timezone.
   */
  timezone?: string;
};

export type RootSingleProps = RootBaseProps & {
  mode: "single";
  value?: CalendarSingleValue;
  onValueChange?: (value: CalendarSingleValue) => unknown;
  defaultValue?: CalendarSingleValue;
  name?: string;
};
export type RootRangeProps = RootBaseProps & {
  mode: "range";
  value?: CalendarRangeValue;
  onValueChange?: (value: CalendarRangeValue) => unknown;
  defaultValue?: CalendarRangeValue;
  name?: [string, string];
};

export type RootProps = RootSingleProps | RootRangeProps;

export const Root = forwardRef<HTMLDivElement, RootProps>(
  (props: RootProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      children,
      value,
      onValueChange,
      defaultValue,
      mode,
      name,
      timezone,
      ...rest
    } = props;

    const isStateUncontrolled = value === undefined;

    const [view, setView] = useState(() => {
      if (timezone?.toLowerCase() === "utc") {
        return dayjs().utc().startOf("month");
      }
      if (timezone) {
        return dayjs().tz(timezone).startOf("month");
      }
      return dayjs().startOf("month");
    });

    const [internalValue, setInternalValue] = useState<CalendarInternalValue>(
      () => {
        if (defaultValue !== undefined) {
          return normalizeValue(defaultValue);
        }
        return [null, null];
      },
    );

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
      [onValueChange, isStateUncontrolled, mode],
    );

    // Sync internal state
    useEffect(() => {
      if (value === undefined) {
        return;
      }
      setInternalValue(normalizeValue(value));
    }, [value]);

    const normalizedName = useMemo<CalendarInputName>(() => {
      if (mode === "range") {
        return name ?? [null, null];
      }
      return [name ?? null, null];
    }, [name, mode]);

    const contextValue = useMemo<CalendarContextValue>(
      () => ({
        viewState: [view, setView],
        valueState: [internalValue, updateValue],
        mode,
        inputName: normalizedName,
        timezone: timezone ?? null,
      }),
      [view, internalValue, mode, updateValue, normalizedName, timezone],
    );

    const previousMode = useRef<Mode>(mode);
    useEffect(() => {
      if (mode !== previousMode.current) {
        if (mode === "single") {
          updateValue([internalValue[0], null]);
        } else {
          updateValue([internalValue[0], internalValue[1]]);
        }
      }
      previousMode.current = mode;
    }, [mode, updateValue, internalValue]);

    return (
      <div ref={ref} {...rest}>
        <CalendarContext.Provider value={contextValue}>
          {children}
        </CalendarContext.Provider>
      </div>
    );
  },
);

export type WeekdaysProps = ComponentPropsWithoutRef<"div">;
export const Weekdays = forwardRef<HTMLDivElement, WeekdaysProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    const child = Children.only(children) as ReactElement<WeekdayLabelProps>;

    return (
      <div ref={ref} {...rest}>
        {range(DAYS_IN_WEEK).map((index) => (
          <WeekdayContext.Provider key={index} value={{ weekdayIndex: index }}>
            {cloneElement(child)}
          </WeekdayContext.Provider>
        ))}
      </div>
    );
  },
);

export type WeekdayLabelProps = ComponentPropsWithoutRefAndChildren<"div"> & {
  getWeekdayName?: GetWeekdayNameFn;
};
export const WeekdayLabel = forwardRef<HTMLDivElement, WeekdayLabelProps>(
  (props, ref) => {
    const { getWeekdayName = getDefaultWeekdayName, ...rest } = props;

    const { weekdayIndex } = useWeekdayContext();
    const weekdayName = getWeekdayName(weekdayIndex);

    return (
      <div ref={ref} {...rest}>
        {weekdayName}
      </div>
    );
  },
);

export type MonthTitleProps = ComponentPropsWithoutRefAndChildren<"div"> & {
  formatFn?: FormatRequiredDateFn;
};

export const MonthTitle = forwardRef<HTMLDivElement, MonthTitleProps>(
  (props, ref) => {
    const { formatFn = defaultFormatMonth, ...rest } = props;

    const [view] = useView();
    const monthTitle = useMemo(() => {
      return formatFn(view);
    }, [view, formatFn]);

    return (
      <div ref={ref} {...rest}>
        {monthTitle}
      </div>
    );
  },
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

  const [view, setView] = useView();

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      onClick?.(e);
      if (e.isDefaultPrevented()) {
        return;
      }
      const newView = view.add(offset, "month");
      setView(newView);
    },
    [offset, view, setView, onClick],
  );

  const Comp = asChild ? Slot : "button";

  return (
    <Comp onClick={clickHandler} ref={ref} {...rest}>
      {children}
    </Comp>
  );
});

export type ViewProps = ComponentPropsWithoutRef<"div"> &
  Partial<ViewContextValue>;
export const View = forwardRef<HTMLDivElement, ViewProps>((props, ref) => {
  const { children, viewOffset, ...divProps } = props;

  const contextValue = useMemo<ViewContextValue>(
    () => ({
      viewOffset: viewOffset ?? 0,
    }),
    [viewOffset],
  );

  return (
    <div ref={ref} {...divProps}>
      <ViewContext.Provider value={contextValue}>
        {children}
      </ViewContext.Provider>
    </div>
  );
});

export type DaysProps = ComponentPropsWithoutRef<"div">;
export const Days = forwardRef<HTMLDivElement, DaysProps>((props, ref) => {
  const { children, ...rest } = props;

  const child = Children.only(children) as ReactElement<DayProps>;

  const [view] = useView();

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
          <DayContext.Provider
            key={date.format("YYYY-MM-DD")}
            value={{ day: date }}
          >
            {cloneElement(child)}
          </DayContext.Provider>
        );
      })}
    </div>
  );
});

export type DayState = {
  isToday: boolean;
  isSelected: boolean;
  isNeighboringMonth: boolean;
};

export type DayProps = Omit<ComponentPropsWithoutRef<"button">, "className"> & {
  asChild?: boolean;
  className?: string | undefined | ((state: DayState) => string);
  selectDayStrategy?: SelectDayStrategy;
};
export const Day = forwardRef<HTMLButtonElement, DayProps>((props, ref) => {
  const {
    asChild,
    className,
    onClick,
    selectDayStrategy = closestStrategy,
    children,
    ...rest
  } = props;

  const { day } = useDayContext();
  const mode = useMode();
  const [value, setValue] = useCalendarValue();
  const isNeighboringMonth = useIsNeighboringMonth();
  const isToday = useIsToday();
  const isSelected = useIsSelected();
  const isInRange = useIsInRange();

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      onClick?.(e);
      if (e.isDefaultPrevented()) {
        return;
      }
      const newValue = selectDayStrategy({
        clickedDate: day,
        currentValue: value,
        mode,
      });
      const sortedValue = sortValue(newValue);
      setValue(sortedValue);
    },
    [onClick, setValue, selectDayStrategy, day, mode, value],
  );

  const computedClassName = useMemo(() => {
    if (className === undefined || typeof className === "string") {
      return className;
    }
    return className({
      isToday,
      isSelected,
      isNeighboringMonth: isNeighboringMonth,
    });
  }, [className, isToday, isSelected, isNeighboringMonth]);

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      aria-selected={isSelected ? true : undefined}
      data-selected={isSelected ? true : undefined}
      data-neighboring={isNeighboringMonth ? true : undefined}
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

    const dayContext = useDayContext();

    return (
      <div ref={ref} {...rest}>
        {dayContext.day.date()}
      </div>
    );
  },
);

export type FormInputProps = ComponentPropsWithoutRefAndChildren<"div"> & {
  formatFn?: FormatDateFn;
};
export const FormInput = forwardRef<HTMLDivElement, FormInputProps>(
  (props, ref) => {
    const { formatFn = defaultFormatValue, ...rest } = props;

    const mode = useMode();
    const [value] = useCalendarValue();
    const inputName = useInputName();

    const inputValues = useMemo(() => {
      return [formatFn(value[0]) ?? "", formatFn(value[1]) ?? ""] as const;
    }, [value, formatFn]);

    return (
      <div ref={ref} {...rest}>
        <input
          type="hidden"
          name={inputName[0] ?? undefined}
          value={inputValues[0]}
        />
        {mode === "range" && (
          <input
            type="hidden"
            name={inputName[1] ?? undefined}
            value={inputValues[1]}
          />
        )}
      </div>
    );
  },
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
      [onClick, setValue],
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
  },
);

export type DayInRangeProps = ComponentPropsWithoutRef<"div"> & {
  asChild?: boolean;
};

export const DayInRange = forwardRef<HTMLDivElement, DayInRangeProps>(
  (props, ref) => {
    const { asChild, ...rest } = props;
    const mode = useMode();
    const isInRange = useIsInRange();
    const isStartOfRange = useIsStartOfRange();
    const isEndOfRange = useIsEndOfRange();
    const isEdge = isStartOfRange || isEndOfRange;

    if (mode === "single" || !isInRange) {
      return null;
    }

    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        data-start={isStartOfRange ? true : undefined}
        data-end={isEndOfRange ? true : undefined}
        data-edge={isEdge ? true : undefined}
        ref={ref}
        {...rest}
      />
    );
  },
);

export type DayInSelectedProps = ComponentPropsWithoutRef<"div"> & {
  asChild?: boolean;
};

export const DayIsSelected = forwardRef<HTMLDivElement, DayInSelectedProps>(
  (props, ref) => {
    const { asChild, ...rest } = props;

    const isSelected = useIsSelected();
    if (!isSelected) {
      return null;
    }

    const Comp = asChild ? Slot : "div";

    return <Comp ref={ref} {...rest} />;
  },
);

export type ValueLabelProps = ComponentPropsWithoutRef<"div"> & {
  formatFn?: FormatDateFn;
  fallback?: ReactNode;
};
export const ValueLabel = forwardRef<HTMLDivElement, ValueLabelProps>(
  (props, ref) => {
    const { formatFn = defaultFormatValue, fallback, ...rest } = props;

    const [value] = useCalendarValue();
    const [startValue, endValue] = value;
    const mode = useMode();

    const formattedValue = useMemo(() => {
      if (mode === "single") {
        return formatFn(startValue) ?? fallback;
      }
      if (!startValue || !endValue) {
        return fallback;
      }
      return `${formatFn(startValue)} - ${formatFn(endValue)}`;
    }, [formatFn, startValue, endValue, mode, fallback]);

    return (
      <div ref={ref} {...rest}>
        {formattedValue}
      </div>
    );
  },
);
