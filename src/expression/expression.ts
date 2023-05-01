import { ToQueryFragments } from "../query-stringifier/query-fragment/to-query-fragments";

export type ExpressionType = string;

export interface Expression extends ToQueryFragments {
  type: ExpressionType;
}
