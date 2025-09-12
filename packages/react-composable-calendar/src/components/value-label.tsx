import { useMemo, type ComponentProps, type ReactNode } from "react";
import { defaultFormatValue, type FormatDateFn } from "../format.js";
import { useMode } from "../hooks.js";
import { useCalendarValue } from "../hooks.js";

export type ValueLabelProps = ComponentProps<"div"> & {
  formatFn?: FormatDateFn;
  fallback?: ReactNode;
};

export function ValueLabel(props: ValueLabelProps) {
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

  return <div {...rest}>{formattedValue}</div>;
}
