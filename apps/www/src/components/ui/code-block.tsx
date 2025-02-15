import { CopyIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";
import { cn } from "../../lib/utils.ts";
import { Button } from "./button.tsx";

export type CodeBlockProps = Omit<ComponentProps<"div">, "children"> & {
  code: string;
  language?: string;
};

export function CodeBlock(props: CodeBlockProps) {
  const { language = "tsx", className, code, ...rest } = props;

  return (
    <div
      className={cn(
        "relative mb-4 flex rounded-md bg-[#1e1e1e] px-4 py-3 text-sm",
        className,
      )}
      {...rest}
    >
      <Button
        type="button"
        variant="ghost"
        className="absolute top-2 right-2 size-7 shrink-0"
        onClick={() => {
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
      <SyntaxHighlighter
        language={language}
        style={{
          ...vscDarkPlus,
          'pre[class*="language-"]': {
            ...vscDarkPlus['pre[class*="language-"]'],
            background: "transparent",
            padding: 0,
            margin: 0,
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
