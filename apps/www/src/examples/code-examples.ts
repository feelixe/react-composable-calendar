import * as fs from "node:fs/promises";
import * as path from "node:path";

export const basicCalendar = await fs.readFile(
  path.join("./src/components/ui/calendar.tsx"),
  "utf-8",
);

export const datePicker = await fs.readFile(
  path.join("./src/components/ui/date-picker.tsx"),
  "utf-8",
);

export const multipleViews = await fs.readFile(
  path.join("./src/components/ui/calendar-multi-view.tsx"),
  "utf-8",
);

export const separateViews = await fs.readFile(
  path.join("./src/components/ui/calendar-start-end-separate.tsx"),
  "utf-8",
);

export const timezone = await fs.readFile(
  path.join("./src/examples/code/timezone.tsx"),
  "utf-8",
);

export const formInput = await fs.readFile(
  path.join("./src/examples/code/form-input.tsx"),
  "utf-8",
);

export const locale = await fs.readFile(
  path.join("./src/examples/code/locale.tsx"),
  "utf-8",
);

export const localeGlobal = await fs.readFile(
  path.join("./src/examples/code/locale-global.tsx"),
  "utf-8",
);
