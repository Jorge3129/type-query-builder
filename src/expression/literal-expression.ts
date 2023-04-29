import { QueryBits, param } from "../query-stringifier/query-param";
import { ExpressionBase } from "./expression";

export class LiteralExpression<T = any> implements ExpressionBase {
  public readonly type = "literal";

  constructor(public readonly value: T) {}

  public toQueryBits(): QueryBits {
    return [param(this.value)];
  }
}
