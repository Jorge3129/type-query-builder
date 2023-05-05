import { ExtendedQueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { expressionFragment } from "../query-stringifier/query-fragment/expression-query-fragment";

export class BetweenExpression<T> implements Expression {
  public readonly type = "betweenOperator";

  constructor(
    public readonly operand: Expression,
    public readonly start: Expression,
    public readonly end: Expression
  ) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    return [
      expressionFragment(this.operand),
      textFragment("BETWEEN"),
      expressionFragment(this.start),
      textFragment("AND"),
      expressionFragment(this.end),
    ];
  }
}
