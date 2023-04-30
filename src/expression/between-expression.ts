import { QueryBits } from "../query-stringifier/query-param";
import { QueryStringifierConfig } from "../query-stringifier/query-stringifier";
import { Expression } from "./expression";

export class BetweenExpression<T> implements Expression {
  public readonly type = "betweenOperator";

  constructor(
    public readonly operand: Expression,
    public readonly start: Expression,
    public readonly end: Expression
  ) {}

  public toQueryBits(config: QueryStringifierConfig): QueryBits {
    return [
      ...this.operand.toQueryBits(config),
      "BETWEEN",
      ...this.start.toQueryBits(config),
      "AND",
      ...this.end.toQueryBits(config),
    ];
  }
}
