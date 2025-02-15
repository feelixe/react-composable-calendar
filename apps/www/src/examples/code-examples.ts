import * as fs from "node:fs/promises";
import * as path from "node:path";

export const basicCalendar = await fs.readFile(
  path.join("./src/components/ui/calendar.tsx"),
  "utf-8",
);
