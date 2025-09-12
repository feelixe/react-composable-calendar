import { Root } from "@radix-ui/react-slot";
import { useIsSelected } from "../hooks.js";
import type { ComponentProps } from "react";

export type DayIsSelectedProps = ComponentProps<"div"> & {
  asChild?: boolean;
};

export function DayIsSelected(props: DayIsSelectedProps) {
  const { asChild, ...rest } = props;

  const isSelected = useIsSelected();
  if (!isSelected) {
    return null;
  }

  const Comp = asChild ? Root : "div";

  return <Comp {...rest} />;
}
