import { dayjs } from "./extended-dayjs.js";

export function getToday(timezone: string | null) {
  if (timezone?.toLowerCase() === "utc") {
    return dayjs().utc();
  }
  if (timezone) {
    return dayjs().tz(timezone);
  }
  return dayjs();
}
