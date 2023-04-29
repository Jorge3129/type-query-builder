import { QueryStringifier } from "../query-stringifier/query-stringifier";

export type ExpressionType = string;

export interface Expression extends QueryStringifier {
  type: ExpressionType;
}
