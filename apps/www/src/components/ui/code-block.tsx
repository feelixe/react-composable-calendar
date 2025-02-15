import { CopyIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ghcolors } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";
import { cn } from "../../lib/utils.ts";
import { Button } from "./button.tsx";

export type CodeBlockProps = Omit<ComponentProps<"div">, "children"> & {
  children: string | string[];
  language?: string;
};

export function CodeBlock(props: CodeBlockProps) {
  const { language = "tsx", className, children, ...rest } = props;

  return (
    <div
      className={cn(
        "relative flex rounded-md bg-[#1e1e1e] px-4 py-3 text-sm",
        className,
      )}
      {...rest}
    >
      <div className="grow self-center">
        <SyntaxHighlighter
          language={language}
          style={{
            ...ghcolors,
            'pre[class*="language-"]': {
              ...ghcolors['pre[class*="language-"]'],
              background: "transparent",
              padding: 0,
              margin: 0,
            },
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
      <Button
        type="button"
        variant="ghost"
        className="shrink-0"
        onClick={() => {
          const code = Array.isArray(children) ? children.join("") : children;
          navigator.clipboard.writeText(code);
          toast(
            <div className="flex items-center gap-2">
              <CopyIcon className="size-4" />
              <div>Copied to clipboard</div>
            </div>,
            { position: "top-center" },
          );
        }}
      >
        <CopyIcon />
      </Button>
    </div>
  );
}
