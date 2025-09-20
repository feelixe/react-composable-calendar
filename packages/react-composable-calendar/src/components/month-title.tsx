import type { ComponentProps, FC } from "react";
import { useCalendarLocale, useViewState } from "../hooks.js";
import type { PlainDate } from "../temporal.js";

export type MonthTitleRenderProps = {
  view: PlainDate;
  locale: string | null;
};

export const defaultRenderFn = (props: MonthTitleRenderProps) => {
  return props.view.toLocaleString(props.locale ?? undefined, {
    year: "numeric",
    month: "long",
  });
};

export type MonthTitleProps = ComponentProps<"div"> & {
  render?: FC<{ view: PlainDate; locale: string | null }>;
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
