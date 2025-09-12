import { useMemo, type ComponentProps } from "react";
import { defaultFormatMonth, type FormatRequiredDateFn } from "../format.js";
import { useCalendarLocale, useViewState } from "../hooks.js";

export type MonthTitleProps = ComponentProps<"div"> & {
  formatFn?: FormatRequiredDateFn;
};

export function MonthTitle(props: MonthTitleProps) {
  const { formatFn = defaultFormatMonth, ...rest } = props;

  const [view] = useViewState();
  const locale = useCalendarLocale();

  const monthTitle = useMemo(() => {
    return formatFn(view, locale);
  }, [view, formatFn, locale]);

  return <div {...rest}>{monthTitle}</div>;
}
