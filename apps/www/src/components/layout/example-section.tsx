import type { ComponentProps, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs.tsx";

export type ExampleSectionProps = ComponentProps<typeof Card> & {
  title: string;
  description?: string;
  code: ReactNode;
};

export function ExampleSection(props: ExampleSectionProps) {
  const { className, title, description, code, children, ...rest } = props;

  return (
    <Card {...rest}>
      <Tabs defaultValue="preview" className="mb-4">
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
          <TabsContent className="flex justify-center" value="preview">
            {children}
          </TabsContent>
          <TabsContent className="flex justify-center" value="code">
            <div className="max-w-xl grow">{code}</div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
