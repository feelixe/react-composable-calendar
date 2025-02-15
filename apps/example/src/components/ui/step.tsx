import type { ComponentProps } from "react";
import { cn } from "../../lib/utils.ts";

export type StepProps = ComponentProps<"div"> & {
  stepNumber: number;
};

export function Step(props: StepProps) {
  const { stepNumber, className, children, ...divProps } = props;

  return (
    <div className={cn("flex gap-2 items-center", className)} {...divProps}>
      <div className="flex size-5.5 items-center justify-center rounded-full border border-muted-foreground text-muted-foreground text-xs">
        {stepNumber}
      </div>

      <div className="grow">{children}</div>
    </div>
  );
}

export type StepsProps = ComponentProps<"div">;

export function Steps(props: StepsProps) {
  const { className, children, ...divProps } = props;

  return (
    <div className={cn("grid gap-6", className)} {...divProps}>
      {children}
    </div>
  );
}
