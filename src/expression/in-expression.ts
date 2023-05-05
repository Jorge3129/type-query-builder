import { ExtendedQueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { expressionFragment } from "../query-stringifier/query-fragment/expression-query-fragment";
import { ListExpression } from "./list-expression";
import { ParenthesesExpression } from "./parentheses-expression";

export class InExpression<T> implements Expression {
  public readonly type = "inOperator";
  public readonly args: Expression[];

  constructor(public readonly operand: Expression, ...args: Expression[]) {
    this.args = args;
  }

  public toQueryFragments(): ExtendedQueryFragment[] {
    return [
      expressionFragment(this.operand),
      textFragment("IN"),
      expressionFragment(
        new ParenthesesExpression(new ListExpression(this.args))
      ),
    ];
  }
}
