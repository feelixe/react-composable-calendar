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
import { CodeBlock } from "../ui/code-block.tsx";
import { Container } from "../ui/container.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs.tsx";

export type ExampleSectionProps = ComponentProps<typeof Container> & {
  title: string;
  description?: string;
  id: string;
};

export function ExampleSection(props: ExampleSectionProps) {
  const { className, title, id, description, children, ...rest } = props;

  const [tab, setTab] = useState("preview");

  return (
    <Container {...rest}>
      <Card className="w-full">
        <Tabs value={tab} onValueChange={setTab} className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle id={id}>{title}</CardTitle>
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
              tab === "preview" ? "[&_.code]:hidden" : "[&_.preview]:hidden",
            )}
          >
            {children}
          </CardContent>
        </Tabs>
      </Card>
    </Container>
  );
}

export type ExampleSectionPreviewProps = ComponentProps<"div">;

export function ExampleSectionPreview(props: ExampleSectionPreviewProps) {
  const { className, ...rest } = props;
  return (
    <div className={cn("preview flex justify-center", className)} {...rest} />
  );
}

export type ExampleSectionCodeProps = ComponentProps<"div">;

export function ExampleSectionCode(props: ExampleSectionCodeProps) {
  const { className, ...rest } = props;
  return <div className={cn("code", className)} {...rest} />;
}
