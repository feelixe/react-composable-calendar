import { CodeBlock } from "@/components/ui/codeblock.tsx";
import { Step, Steps } from "@/components/ui/step.tsx";
import { Typography } from "@/components/ui/typography.tsx";

export function InstallationStep() {
  return (
    <Steps>
      <Typography className="mb-2">Installation</Typography>
      <div>
        <Step stepNumber={1} className="mb-3">
          <Typography variant="p">Install dependencies</Typography>
        </Step>
        <CodeBlock language="bash">
          npm install react-composable-calendar dayjs
        </CodeBlock>
      </div>

      <Step stepNumber={2}>
        <Typography variant="p">
          Copy paste the example calendars that you want and start modifying!
        </Typography>
      </Step>
    </Steps>
  );
}
