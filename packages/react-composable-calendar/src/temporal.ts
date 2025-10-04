import type { Temporal as TemporalPolyfill } from "temporal-spec";

const global = globalThis as typeof globalThis & {
  Temporal: typeof TemporalPolyfill;
};

export const Temporal = global.Temporal;

export type PlainDate = TemporalPolyfill.PlainDate;
