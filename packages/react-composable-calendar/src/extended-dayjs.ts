import unextendedDayjs from "dayjs";
import type { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

unextendedDayjs.extend(timezone);
unextendedDayjs.extend(utc);

export const dayjs = unextendedDayjs;
export type { Dayjs };
