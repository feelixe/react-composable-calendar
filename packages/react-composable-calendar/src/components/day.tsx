import {
  useCallback,
  useMemo,
  type ComponentProps,
  type FC,
  type MouseEventHandler,
} from "react";
import {
  closestStrategy,
  type SelectDayStrategy,
} from "../select-day-strategy.js";
import { useDayContext } from "../contexts/day.js";
import {
  useIsInRange,
  useCalendarValue,
  useCalendarView,
  useIsNeighboringMonth,
  useIsSelected,
  useIsToday,
  useCalendarMode,
} from "../hooks.js";
import { sortValue } from "../value.js";
import { Root } from "@radix-ui/react-slot";

export type DayRenderProps = {
  day: Temporal.PlainDate;
  isToday: boolean;
  isSelected: boolean;
  isNeighboringMonth: boolean;
};

export type DayState = {
  isToday: boolean;
  isSelected: boolean;
  isNeighboringMonth: boolean;
};

export type DayProps = Omit<ComponentProps<"button">, "className"> & {
  asChild?: boolean;
  className?: string | undefined;
  selectDayStrategy?: SelectDayStrategy;
  render?: FC<DayRenderProps>;
};
export function Day(props: DayProps) {
  const {
    asChild,
    onClick,
    selectDayStrategy = closestStrategy,
    render: Render,
    children,
    ...rest
  } = props;

  const { day } = useDayContext();
  const [value, setValue] = useCalendarValue();
  const view = useCalendarView();
  const mode = useCalendarMode();
  const isNeighboringMonth = useIsNeighboringMonth();
  const isToday = useIsToday();
  const isSelected = useIsSelected();
  const isInRange = useIsInRange();

  const isDisabled = useMemo(() => {
    if (!view.isDateSelectableFn) {
      return false;
    }
    return !view.isDateSelectableFn(day);
  }, [view.isDateSelectableFn, day]);

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
    [onClick, setValue, selectDayStrategy, day, mode, value]
  );

  const Comp = asChild ? Root : "button";

  return (
    <Comp
      aria-selected={isSelected ? true : undefined}
      data-selected={isSelected ? true : undefined}
      data-neighboring={isNeighboringMonth ? true : undefined}
      data-in-range={isInRange ? true : undefined}
      data-is-today={isToday ? true : undefined}
      disabled={isDisabled}
      onClick={clickHandler}
      {...rest}
    >
      {Render ? (
        <Render
          day={day}
          isToday={isToday}
          isSelected={isSelected}
          isNeighboringMonth={isNeighboringMonth}
        />
      ) : (
        children
      )}
    </Comp>
  );
}
