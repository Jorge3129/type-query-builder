import { count } from "./count";
import { sum } from "./sum";

export const defaultFunctions = {
  sum,
  count,
};

export type Functions = typeof defaultFunctions;
