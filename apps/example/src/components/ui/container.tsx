import type { ComponentProps } from "react";
import { cn } from "../../lib/utils.ts";

type ContainerProps = ComponentProps<"div">;

export function Container(props: ContainerProps) {
  const { className, children, ...divProps } = props;

  return (
    <div className={cn("mx-auto max-w-5xl px-4", className)} {...divProps}>
      {children}
    </div>
  );
}
