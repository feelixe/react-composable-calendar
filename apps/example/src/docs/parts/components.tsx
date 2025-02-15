import { CodeBlock } from "@/components/ui/codeblock.tsx";
import { Typography } from "@/components/ui/typography.tsx";

export function ComponentsStep() {
  return (
    <div>
      <Typography className="mb-2">Components</Typography>
      <Typography variant="h2" className="mb-2">
        Installation
      </Typography>

      <CodeBlock language="bash">
        npm install react-composable-calendar dayjs
      </CodeBlock>
    </div>
  );
}
