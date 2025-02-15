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
  code: string;
};

export function ExampleSection(props: ExampleSectionProps) {
  const { className, title, description, children, code, ...rest } = props;

  const [tab, setTab] = useState("preview");

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
          <CardContent>
            <TabsContent value="preview" className="flex justify-center">
              {children}
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={code} />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </Container>
  );
}
