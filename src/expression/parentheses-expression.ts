import { ExtendedQueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { expressionFragment } from "../query-stringifier/query-fragment/expression-query-fragment";

export class ParenthesesExpression implements Expression {
  public readonly type = "parentheses";

  constructor(public readonly expression: Expression) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    return [
      textFragment("(", false),
      expressionFragment(this.expression, false),
      textFragment(")"),
    ];
  }
}
