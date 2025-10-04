import type { ComponentProps, FC } from "react";
import { useCalendarLocale, useCalendarValue, useInputName } from "../hooks.js";
import { useCalendarMode } from "../hooks.js";
import type {
  CalendarInputName,
  CalendarInternalValue,
  Mode,
} from "../types.js";

export type FormInputRenderProps = {
  names: CalendarInputName;
  value: CalendarInternalValue;
  locale: string | null;
  mode: Mode;
};

function DefaultRenderFn(props: FormInputRenderProps) {
  const inputName = useInputName();

  return (
    <>
      <input
        type="hidden"
        name={props.names[0] ?? undefined}
        value={props.value[0]?.toString()}
      />
      {props.mode === "range" && (
        <input
          type="hidden"
          name={props.names[1] ?? undefined}
          value={props.value[1]?.toString()}
        />
      )}
    </>
  );
}

export type FormInputProps = ComponentProps<"div"> & {
  render?: FC<FormInputRenderProps>;
};

export function FormInput(props: FormInputProps) {
  const { render: Render = DefaultRenderFn, ...rest } = props;

  const mode = useCalendarMode();
  const locale = useCalendarLocale();
  const [value] = useCalendarValue();
  const inputName = useInputName();

  return (
    <div {...rest}>
      <Render names={inputName} value={value} locale={locale} mode={mode} />
    </div>
  );
}
