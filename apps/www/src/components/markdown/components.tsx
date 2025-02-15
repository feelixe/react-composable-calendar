import { Typography, type TypographyProps } from "@/components/ui/typography";
import { CopyIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import { Button } from "../ui/button.tsx";

export const markdownComponent = {
  h1: (props: TypographyProps) => (
    <Typography variant="h1" className="mb-0" {...props} />
  ),
  p: (props: TypographyProps) => (
    <Typography variant="p" className="mb-3" {...props} />
  ),
  code: (props: { children: string }) => (
    <div className="flex">
      <div className="grow overflow-scroll">{props.children}</div>
      <Button
        variant="ghost"
        type="button"
        onClick={() => {
          console.log(props.children);
        }}
      >
        <CopyIcon />
      </Button>
    </div>
  ),
  pre: (props: PropsWithChildren) => (
    <pre className="rounded-lg bg-gray-900 px-5 py-4 font-mono">
      {props.children}
    </pre>
  ),
};
