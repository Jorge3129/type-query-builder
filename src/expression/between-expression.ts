import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { ToQueryFragmentsConfig } from "../query-stringifier/query-fragment/to-query-fragments";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";

export class BetweenExpression<T> implements Expression {
  public readonly type = "betweenOperator";

  constructor(
    public readonly operand: Expression,
    public readonly start: Expression,
    public readonly end: Expression
  ) {}

  public toQueryFragments(config: ToQueryFragmentsConfig): QueryFragment[] {
    return [
      ...this.operand.toQueryFragments(config),
      textFragment("BETWEEN"),
      ...this.start.toQueryFragments(config),
      textFragment("AND"),
      ...this.end.toQueryFragments(config),
    ];
  }
}
