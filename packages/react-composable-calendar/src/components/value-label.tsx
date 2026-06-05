import type { ComponentProps, FC, ReactNode } from "react";
import { useCalendarLocale, useCalendarMode } from "../hooks.js";
import { useCalendarValue } from "../hooks.js";
import type { CalendarInternalValue, Mode } from "../types.js";

export type ValueRenderProps = {
  value: CalendarInternalValue;
  locale: string | null;
  mode: Mode;
};

function DefaultRenderFn(props: ValueRenderProps) {
  if (props.mode === "single") {
    return props.value[0]?.toString();
  }
  const stringified = props.value.map((el) => el?.toString());
  return stringified.join(" - ");
}

export type ValueLabelProps = ComponentProps<"div"> & {
  render?: FC<ValueRenderProps>;
  fallback?: ReactNode;
};

export function ValueLabel(props: ValueLabelProps) {
  const { render: Render = DefaultRenderFn, fallback, ...rest } = props;

  const [value] = useCalendarValue();
  const mode = useCalendarMode();
  const locale = useCalendarLocale();

  return (
    <div {...rest}>
      <Render value={value} locale={locale} mode={mode} />
    </div>
  );
}
