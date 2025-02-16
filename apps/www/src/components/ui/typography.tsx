import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { useMemo } from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      display1:
        "text-3xl font-semibold tracking-tighter border-b border-border",
      display2:
        "text-2xl pb-2 font-semibold tracking-tighter border-b border-border",
      display3: "text-xl font-medium tracking-tighter",
      h1: "scroll-m-20 text-lg font-semibold tracking-tighter",
      h2: "scroll-m-20 text-base font-semibold tracking-tight",
      h3: "scroll-m-20 text-base font-medium tracking-tight",
      p: "tracking-tight text-muted-foreground mb-1.5",
      caption: "text-sm text-muted-foreground tracking-tight",
      leading: "text-muted-foreground font-normal tracking-tighter text-xl",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

export type TypographyProps = React.ComponentProps<"h1"> &
  VariantProps<typeof typographyVariants> & {
    element?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  };

export function Typography(props: TypographyProps) {
  const { className, children, variant, element, ...rest } = props;

  const Element = useMemo(() => {
    if (element) {
      return element;
    }
    if (variant === "display1") {
      return "h1";
    }
    if (variant === "display2") {
      return "h2";
    }
    if (variant === "display3") {
      return "h3";
    }
    if (variant) {
      if (variant === "caption" || variant === "leading") {
        return "span";
      }
      return variant;
    }
    return "h1";
  }, [element, variant]);

  return (
    <Element
      className={cn(typographyVariants({ variant }), className)}
      {...rest}
    >
      {children}
    </Element>
  );
}

export type TruncatedTextProps = {
  children: string | string[] | null | undefined;
  maxLength: number;
};

export function TruncatedText(props: TruncatedTextProps) {
  const { children, maxLength } = props;

  const truncatedString = useMemo(() => {
    if (!children) {
      return children;
    }
    const joinedString = Array.isArray(children) ? children.join("") : children;
    if (joinedString.length > maxLength) {
      return `${joinedString.slice(0, maxLength)}...`;
    }
    return children;
  }, [children, maxLength]);

  return <>{truncatedString}</>;
}
