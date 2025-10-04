import {
  useCallback,
  type ComponentProps,
  type MouseEventHandler,
} from "react";
import { useViewState } from "../hooks.js";
import { Root } from "@radix-ui/react-slot";

export type SetYearButtonProps = ComponentProps<"button"> & {
  asChild?: boolean;
  year: number;
};

export function SetYearButton(props: SetYearButtonProps) {
  const { year, asChild, children, onClick, ...rest } = props;

  const [view, setView] = useViewState();

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      onClick?.(e);
      if (e.isDefaultPrevented()) {
        return;
      }
      setView(view.with({ year }));
    },
    [onClick, setView, view, year]
  );

  const Comp = asChild ? Root : "button";

  return (
    <Comp onClick={clickHandler} {...rest}>
      {children}
    </Comp>
  );
}
