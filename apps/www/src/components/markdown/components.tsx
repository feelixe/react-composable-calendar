import { Typography, type TypographyProps } from "@/components/ui/typography";
import { DotIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import { cn } from "../../lib/utils.ts";

export const markdownComponents = {
  h1: (props: TypographyProps) => (
    <Typography variant="h1" className="mb-3" {...props} />
  ),
  h2: (props: TypographyProps) => (
    <Typography variant="h2" className="mb-3" {...props} />
  ),
  h3: (props: TypographyProps) => (
    <Typography variant="h3" className="mb-3" {...props} />
  ),
  p: (props: TypographyProps) => (
    <Typography variant="p" className="mb-2" {...props} />
  ),
  pre: (props: PropsWithChildren) => (
    <pre className="rounded-lg bg-gray-900 px-5 py-4 font-mono">
      {props.children}
    </pre>
  ),
  code: (props: PropsWithChildren) => (
    <code className="rounded bg-muted px-1.5 py-0.5">{props.children}</code>
  ),
  li: (props: TypographyProps) => {
    const { className, children, ...rest } = props;
    return (
      <Typography
        variant="p"
        element="div"
        className={cn("mb-2 flex", className)}
        {...rest}
      >
        <DotIcon className="shrink-0" />
        <div>{children}</div>
      </Typography>
    );
  },
};
