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

  const [internalValue, setInternalValue] = useState<CalendarInternalValue>(
    () => {
      if (defaultValue !== undefined) {
        return normalizeValue(defaultValue);
      }
      return [null, null];
    }
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
    [onValueChange, isStateUncontrolled, mode]
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

  const valueAtomRef = useRef<Atom<CalendarRangeValue>>(
    atom(
      defaultValue !== undefined ? normalizeValue(defaultValue) : [null, null]
    )
  );

  const contextValue = useMemo<CalendarContextValue>(
    () => ({
      valueState: [internalValue, updateValue],
      valueAtom: valueAtomRef.current,
      mode,
      inputName: normalizedName,
      locale,
      weekOffset,
    }),
    [internalValue, mode, updateValue, normalizedName, locale, weekOffset]
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
}
