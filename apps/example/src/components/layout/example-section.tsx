import type { ComponentProps } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.tsx";

export type ExampleSectionProps = ComponentProps<typeof Card> & {
  title: string;
  description?: string;
};

export function ExampleSection(props: ExampleSectionProps) {
  const { className, title, description, children, ...rest } = props;

  return (
    <Card {...rest}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
