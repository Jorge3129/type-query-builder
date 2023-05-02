import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { ToQueryFragmentsConfig } from "../query-stringifier/query-fragment/to-query-fragments";
import {
  commaSepExpressions,
  setLastFragmentSpaceAfter,
} from "./comma-separated";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";

export class InExpression<T> implements Expression {
  public readonly type = "inOperator";
  public readonly args: Expression[];

  constructor(public readonly operand: Expression, ...args: Expression[]) {
    this.args = args;
  }

  public toQueryFragments(config: ToQueryFragmentsConfig): QueryFragment[] {
    const commaFragments = commaSepExpressions(this.args, config),
      spacedFragments = setLastFragmentSpaceAfter(commaFragments, false);

    return [
      ...this.operand.toQueryFragments(config),
      textFragment("IN"),
      textFragment("(", false),
      ...spacedFragments,
      textFragment(")"),
    ];
  }
}
