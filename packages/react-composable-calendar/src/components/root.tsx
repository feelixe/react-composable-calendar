import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import type {
  CalendarInputName,
  CalendarInternalValue,
  CalendarRangeValue,
  CalendarSingleValue,
  Mode,
} from "../types.js";
import { normalizeValue } from "../value.js";
import {
  CalendarContext,
  type CalendarContextValue,
} from "../contexts/calendar.js";
import { type Atom, atom } from "../atom.js";
import { ValueAtomContext } from "../contexts/calendar.js";

export type RootBaseProps = Omit<ComponentProps<"div">, "defaultValue"> & {
  locale?: string | null;
  weekOffset?: number;
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

export function Root(props: RootProps) {
  const {
    children,
    value,
    onValueChange,
    defaultValue,
    mode,
    name,
    locale = null,
    weekOffset = 0,
    ref,
    ...rest
  } = props;

  const isStateUncontrolled = value === undefined;

  const valueAtomRef = useRef<Atom<CalendarRangeValue>>(
    atom(
      defaultValue !== undefined ? normalizeValue(defaultValue) : [null, null]
    )
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
        valueAtomRef.current.set(newValue);
      }
    },
    [onValueChange, isStateUncontrolled, mode]
  );

  // Sync internal state
  useEffect(() => {
    if (value === undefined) {
      return;
    }
    valueAtomRef.current.set(normalizeValue(value));
  }, [value]);

  const normalizedName = useMemo<CalendarInputName>(() => {
    if (mode === "range") {
      return name ?? [null, null];
    }
    return [name ?? null, null];
  }, [name, mode]);

  const contextValue = useMemo<CalendarContextValue>(
    () => ({
      mode,
      inputName: normalizedName,
      locale,
      weekOffset,
    }),
    [mode, normalizedName, locale, weekOffset]
  );

  const previousMode = useRef<Mode>(mode);
  useEffect(() => {
    const value = valueAtomRef.current.get();
    if (mode !== previousMode.current) {
      if (mode === "single") {
        updateValue([value[0], null]);
      } else {
        updateValue([value[0], value[1]]);
      }
    }
    previousMode.current = mode;
  }, [mode, updateValue]);

  useEffect(() => {
    const listener = () => {
      updateValue(valueAtomRef.current.get());
    };

    valueAtomRef.current.subscribe(listener);

    return () => {
      valueAtomRef.current.unsubscribe(listener);
    };
  }, [updateValue]);

  return (
    <div ref={ref} {...rest}>
      <CalendarContext.Provider value={contextValue}>
        <ValueAtomContext.Provider value={valueAtomRef.current}>
          {children}
        </ValueAtomContext.Provider>
      </CalendarContext.Provider>
    </div>
  );
}
