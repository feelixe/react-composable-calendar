import {
  type ComponentProps,
  memo,
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
import { Utils } from "../date-utils.js";

export type ViewProps = Omit<ComponentProps<"div">, "defaultValue"> & {
  value?: Temporal.PlainDate;
  onValueChange?: (value: Temporal.PlainDate) => unknown;
  isDateSelectableFn?: IsDateSelectableFn;
  defaultValue?: Temporal.PlainDate;
};

export const View = memo((props: ViewProps) => {
  const {
    value,
    onValueChange,
    defaultValue,
    children,
    isDateSelectableFn,
    ...divProps
  } = props;

  const today = Utils.getToday();

  const isStateUncontrolled = value === undefined;

  const [internalView, setInternalView] = useState<Temporal.PlainDate>(() => {
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
    (newView: Temporal.PlainDate) => {
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
});
