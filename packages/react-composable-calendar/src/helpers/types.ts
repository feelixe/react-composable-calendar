import type { ComponentPropsWithoutRef, ElementType } from "react";

export type ComponentPropsWithoutRefAndChildren<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "children"
>;
