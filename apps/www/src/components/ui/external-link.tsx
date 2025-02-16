import { ExternalLinkIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/utils.ts";

export type ExternalLinkProps = ComponentProps<"a">;

export function ExternalLink(props: ExternalLinkProps) {
  const { className, children, ...rest } = props;

  return (
    <a
      className={cn(" cursor-pointer text-blue-500 hover:underline", className)}
      {...rest}
    >
      <ExternalLinkIcon
        target="_blank"
        href={"https://ui.shadcn.com/docs/installation"}
        className="relative bottom-0.5 left-px inline size-3"
      />
      {children}
    </a>
  );
}
