import { QueryBit, paramBit } from "../query-stringifier/query-param";
import { Expression } from "./expression";

export class LiteralExpression<T = any> implements Expression {
  public readonly type = "literal";

  constructor(public readonly value: T) {}

  public toQueryBits(): QueryBit[] {
    return [paramBit(this.value)];
  }
}
