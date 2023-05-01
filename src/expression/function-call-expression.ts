import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { ToQueryFragmentsConfig } from "../query-stringifier/query-fragment/to-query-fragments";
import { commaSepExpressions } from "./comma-separated";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";

export class FunctionCallExpression implements Expression {
  public readonly type = "functionCall";
  public readonly args: Expression[];

  constructor(public readonly functionName: string, ...args: Expression[]) {
    this.args = args;
  }

  public toQueryFragments(config: ToQueryFragmentsConfig): QueryFragment[] {
    const argBits = commaSepExpressions(this.args, config);

    return [
      textFragment(this.functionName, false),
      textFragment("(", false),
      ...argBits,
      textFragment(")"),
    ];
  }
}
