import { QueryStringifier } from "../query-stringifier/query-stringifier";

export type ExpressionType = string;

export interface ExpressionBase extends QueryStringifier {
  type: ExpressionType;
}

export type Expression = ExpressionBase;
