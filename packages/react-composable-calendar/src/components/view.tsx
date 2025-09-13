import type { PlainDate } from "../temporal.js";
import {
  type ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ViewContext,
  type IsDateSelectableFn,
  type ViewContextValue,
} from "../contexts/view.js";
import { getToday } from "../date-helpers.js";
import { useCalendarLocale } from "../hooks.js";

export type ViewProps = Omit<ComponentProps<"div">, "defaultValue"> & {
  value?: PlainDate;
  onValueChange?: (value: PlainDate) => unknown;
  isDateSelectableFn?: IsDateSelectableFn;
  defaultValue?: PlainDate;
};

export function View(props: ViewProps) {
  const {
    value,
    onValueChange,
    defaultValue,
    children,
    isDateSelectableFn,
    ...divProps
  } = props;

  const today = getToday();
  const locale = useCalendarLocale();

  const isStateUncontrolled = value === undefined;

  const [internalView, setInternalView] = useState<PlainDate>(() => {
    if (!isStateUncontrolled) {
      return value;
    }
    if (defaultValue) {
      return defaultValue;
    }
    return today;
  });

  // Sync external state
  const updateValue = useCallback(
    (newView: PlainDate) => {
      onValueChange?.(newView);
      if (isStateUncontrolled) {
        setInternalView(newView);
      }
    },
    [isStateUncontrolled, onValueChange]
  );

  // Sync internal state
  useEffect(() => {
    if (value === undefined) {
      return;
    }
    setInternalView(value);
  }, [value]);

  const contextValue = useMemo<ViewContextValue>(
    () => ({
      viewState: [internalView, updateValue],
      isDateSelectableFn,
    }),
    [internalView, updateValue, isDateSelectableFn]
  );

  return (
    <div {...divProps}>
      <ViewContext.Provider value={contextValue}>
        {children}
      </ViewContext.Provider>
    </div>
  );
}
