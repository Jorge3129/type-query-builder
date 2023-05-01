import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { ToQueryFragmentsConfig } from "../query-stringifier/query-fragment/to-query-fragments";
import { commaSepExpressions } from "./comma-separated";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";

export class InExpression<T> implements Expression {
  public readonly type = "inOperator";
  public readonly args: Expression[];

  constructor(public readonly operand: Expression, ...args: Expression[]) {
    this.args = args;
  }

  public toQueryFragments(config: ToQueryFragmentsConfig): QueryFragment[] {
    const argBits = commaSepExpressions(this.args, config);

    return [
      ...this.operand.toQueryFragments(config),
      textFragment("IN"),
      textFragment("(", false),
      ...argBits,
      textFragment(")"),
    ];
  }
}
