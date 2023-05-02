import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { ToQueryFragmentsConfig } from "../query-stringifier/query-fragment/to-query-fragments";
import {
  commaSepExpressions,
  setLastFragmentSpaceAfter,
} from "./comma-separated";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";

export class FunctionCallExpression implements Expression {
  public readonly type = "functionCall";
  public readonly args: Expression[];

  constructor(public readonly functionName: string, ...args: Expression[]) {
    this.args = args;
  }

  public toQueryFragments(config: ToQueryFragmentsConfig): QueryFragment[] {
    const commaFragments = commaSepExpressions(this.args, config),
      spacedFragments = setLastFragmentSpaceAfter(commaFragments, false);

    return [
      textFragment(this.functionName, false),
      textFragment("(", false),
      ...spacedFragments,
      textFragment(")"),
    ];
  }
}
