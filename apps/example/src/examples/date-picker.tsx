import { ExampleSection } from "@/components/layout/example-section.tsx";
import { CodeBlock } from "../components/ui/codeblock.tsx";
import {
  DatePicker,
  DatePickerTrigger,
} from "../components/ui/date-picker.tsx";

export function DatePickerExample() {
  return (
    <ExampleSection
      title="Date Picker"
      description="A Date Picker component that utilizes the shadcn Button and Popover."
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
      <DatePicker mode="single">
        <DatePickerTrigger />
      </DatePicker>
    </ExampleSection>
  );
}
