import type { ComponentProps, FC } from "react";
import { useCalendarLocale, useViewState } from "../hooks.js";

export type MonthTitleRenderProps = {
  view: Temporal.PlainDate;
  locale: string | null;
};

export const defaultRenderFn = (props: MonthTitleRenderProps) => {
  return props.view.toLocaleString(props.locale ?? undefined, {
    year: "numeric",
    month: "long",
  });
};

export type MonthTitleProps = ComponentProps<"div"> & {
  render?: FC<{ view: Temporal.PlainDate; locale: string | null }>;
};

export function MonthTitle(props: MonthTitleProps) {
  const { render: Render = defaultRenderFn, ...rest } = props;

  const [view] = useViewState();
  const locale = useCalendarLocale();

  return (
    <div {...rest}>
      <Render view={view} locale={locale} />
    </div>
  );
}
