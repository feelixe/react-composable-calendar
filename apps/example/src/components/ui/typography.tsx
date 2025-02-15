import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { useMemo } from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-3xl font-medium tracking-tight",
      h2: "scroll-m-20 text-lg font-medium tracking-tight",
      h3: "scroll-m-20 text-base font-medium tracking-tight",
      p: "tracking-tight text-muted-foreground",
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
