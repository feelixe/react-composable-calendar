import {
  useCallback,
  useMemo,
  type ComponentProps,
  type MouseEventHandler,
} from "react";
import { useCalendarValue } from "../hooks.js";
import { Root } from "@radix-ui/react-slot";

export type ClearButtonProps = ComponentProps<"button"> & {
  asChild?: boolean;
  disabledWhenCleared?: boolean;
};

export function ClearButton(props: ClearButtonProps) {
  const {
    onClick,
    children,
    asChild,
    disabled,
    disabledWhenCleared = false,
    ...rest
  } = props;

  const [value, setValue] = useCalendarValue();

  const clearHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      onClick?.(e);
      if (e.isDefaultPrevented()) {
        return;
      }
      setValue([null, null]);
    },
    [onClick, setValue]
  );

  const isDisabled = useMemo(() => {
    if (disabled !== undefined) {
      return disabled;
    }
    if (disabledWhenCleared) {
      const isCleared = value[0] === null && value[1] === null;
      return isCleared;
    }
    return undefined;
  }, [disabled, value, disabledWhenCleared]);

  const Comp = asChild ? Root : "button";

  return (
    <Comp onClick={clearHandler} disabled={isDisabled} {...rest}>
      {children}
    </Comp>
  );
}
