import { ExtendedQueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { expressionFragment } from "../query-stringifier/query-fragment/expression-query-fragment";
import { ParenthesesExpression } from "./parentheses-expression";
import { ListExpression } from "./list-expression";

export class FunctionCallExpression implements Expression {
  public readonly type = "functionCall";
  public readonly args: Expression[];

  constructor(public readonly functionName: string, ...args: Expression[]) {
    this.args = args;
  }

  public toQueryFragments(): ExtendedQueryFragment[] {
    return [
      textFragment(this.functionName, false),
      expressionFragment(
        new ParenthesesExpression(new ListExpression(this.args))
      ),
    ];
  }
}
