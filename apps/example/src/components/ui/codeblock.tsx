import { CopyIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";
import { cn } from "../../lib/utils.ts";
import { Button } from "./button.tsx";

export type CodeBlockProps = Omit<ComponentProps<"div">, "children"> & {
  children: string | string[];
};

export function CodeBlock(props: CodeBlockProps) {
  const { className, children, ...rest } = props;

  return (
    <div
      className={cn("relative text-sm [&>pre]:rounded-md", className)}
      {...rest}
    >
      <Button
        type="button"
        variant="ghost"
        className="absolute top-2 right-2"
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
      <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
