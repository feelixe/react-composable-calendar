import {
  useCallback,
  type ComponentProps,
  type MouseEventHandler,
} from "react";
import { useViewState } from "../hooks.js";
import { Root } from "@radix-ui/react-slot";

export type OffsetViewButtonProps = ComponentProps<"button"> & {
  offset: number;
  asChild?: boolean;
};

export function OffsetViewButton(props: OffsetViewButtonProps) {
  const { children, onClick, offset, asChild, ...rest } = props;

  const [view, setView] = useViewState();

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      onClick?.(e);
      if (e.isDefaultPrevented()) {
        return;
      }
      const newView = view.add({ months: offset });
      setView(newView);
    },
    [offset, view, setView, onClick]
  );

  const Comp = asChild ? Root : "button";

  return (
    <Comp onClick={clickHandler} {...rest}>
      {children}
    </Comp>
  );
}
