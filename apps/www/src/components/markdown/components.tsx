import { Typography, type TypographyProps } from "@/components/ui/typography";
import type { PropsWithChildren } from "react";

export const markdownComponents = {
  h1: (props: TypographyProps) => (
    <Typography variant="h1" className="mb-3" {...props} />
  ),
  p: (props: TypographyProps) => (
    <Typography variant="p" className="mb-2" {...props} />
  ),
  pre: (props: PropsWithChildren) => (
    <pre className="rounded-lg bg-gray-900 px-5 py-4 font-mono">
      {props.children}
    </pre>
  ),
};
