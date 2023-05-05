import { ExtendedQueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { Expression } from "./expression";
import { expressionFragment } from "../query-stringifier/query-fragment/expression-query-fragment";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";

export class ListExpression implements Expression {
  public readonly type = "list";

  constructor(public readonly expressions: Expression[]) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    return this.expressions.flatMap((expression, index, { length }) => {
      if (index !== length - 1) {
        return [expressionFragment(expression, false), textFragment(",")];
      }

      return [expressionFragment(expression)];
    });
  }
}
