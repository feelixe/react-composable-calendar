import { ExampleSection } from "@/components/layout/example-section.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { CodeBlock } from "../components/ui/codeblock.tsx";

export function BasicCalendarExample() {
  return (
    <ExampleSection
      title="Basic Calendar"
      description="A simple calendar that accepts a single date input."
      code={
        <div>
          <CodeBlock>
            {`export function BasicCalendar() {
  return <div>123</div>
}`}
          </CodeBlock>
        </div>
      }
    >
      <Calendar
        className="grow rounded-lg border border-border shadow"
        mode="single"
      />
    </ExampleSection>
  );
}
