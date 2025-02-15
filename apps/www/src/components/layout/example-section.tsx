import {
  type ComponentProps,
  type PropsWithChildren,
  type ReactNode,
  useState,
} from "react";
import { cn } from "../../lib/utils.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.tsx";
import { Container } from "../ui/container.tsx";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs.tsx";

export type ExampleSectionProps = ComponentProps<typeof Container> & {
  title: string;
  description?: string;
};

export function ExampleSection(props: ExampleSectionProps) {
  const { className, title, description, children, ...rest } = props;

  const [tab, setTab] = useState("code");

  return (
    <Container {...rest}>
      <Card className="w-full">
        <Tabs value={tab} onValueChange={setTab} className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>

              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>
          <CardContent
            className={cn(
              "w-full",
              tab === "code" ? "[&_.preview]:hidden" : "[&_.code]:hidden",
            )}
          >
            {children}
          </CardContent>
        </Tabs>
      </Card>
    </Container>
  );
}

export type ExampleSectionCodeProps = ComponentProps<"div">;
export function ExampleSectionCode(props: ExampleSectionCodeProps) {
  const { className, children, ...rest } = props;

  return (
    <div className={cn("code max-w-full overflow-hidden", className)} {...rest}>
      {children}
    </div>
  );
}

export type ExampleSectionPreviewProps = ComponentProps<"div">;
export function ExampleSectionPreview(props: ExampleSectionPreviewProps) {
  const { className, children, ...rest } = props;

  return (
    <div className={cn("preview flex justify-center", className)} {...rest}>
      {children}
    </div>
  );
}
