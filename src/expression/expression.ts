import { QueryComponentSerializer } from "../query-stringifier/query-component-serializer";

export type ExpressionType = string;

export interface Expression extends QueryComponentSerializer {
  type: ExpressionType;
}
