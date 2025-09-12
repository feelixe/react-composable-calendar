import { useMemo, type ComponentProps } from "react";
import { defaultFormatValue, type FormatDateFn } from "../format.js";
import { useCalendarValue, useInputName } from "../hooks.js";
import { useMode } from "../hooks.js";

export type FormInputProps = ComponentProps<"div"> & {
  formatFn?: FormatDateFn;
};

export function FormInput(props: FormInputProps) {
  const { formatFn = defaultFormatValue, ...rest } = props;

  const mode = useMode();
  const [value] = useCalendarValue();
  const inputName = useInputName();

  const inputValues = useMemo(() => {
    return [formatFn(value[0]) ?? "", formatFn(value[1]) ?? ""] as const;
  }, [value, formatFn]);

  return (
    <div {...rest}>
      <input
        type="hidden"
        name={inputName[0] ?? undefined}
        value={inputValues[0]}
      />
      {mode === "range" && (
        <input
          type="hidden"
          name={inputName[1] ?? undefined}
          value={inputValues[1]}
        />
      )}
    </div>
  );
}
