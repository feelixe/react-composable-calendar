import { Typography, type TypographyProps } from "@/components/ui/typography";
import type { PropsWithChildren } from "react";

export const markdownComponent = {
  h1: (props: TypographyProps) => (
    <Typography variant="h1" className="mb-0" {...props} />
  ),
  p: (props: TypographyProps) => (
    <Typography variant="p" className="mb-3" {...props} />
  ),
  code: (props: PropsWithChildren) => <div>{props.children}</div>,
  pre: (props: PropsWithChildren) => (
    <pre className="rounded-lg bg-muted px-4 py-3 font-mono">
      {props.children}
    </pre>
  ),
};
