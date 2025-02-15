import { ExampleSection } from "@/components/layout/example-section.tsx";
import {
  DatePicker,
  DatePickerTrigger,
} from "../components/ui/date-picker.tsx";

export function DatePickerExample() {
  return (
    <ExampleSection
      title="Date Picker"
      description="A Date Picker component that utilizes the shadcn Button and Popover."
    >
      <DatePicker mode="single">
        <DatePickerTrigger />
      </DatePicker>
    </ExampleSection>
  );
}
