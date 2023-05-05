import { expressionFragment } from "../../query-stringifier/query-fragment/expression-query-fragment";
import { ExtendedQueryFragment } from "../../query-stringifier/query-fragment/query-fragment";
import { textFragment } from "../../query-stringifier/query-fragment/text-query-fragment";
import { Expression } from "../expression";
import { ListExpression } from "../list-expression";

export class FromClause implements Expression {
  public readonly type = "fromClause";

  constructor(public readonly fromExpressions: Expression[]) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    if (!this.fromExpressions.length) {
      return [];
    }

    return [
      textFragment("FROM"),
      expressionFragment(new ListExpression(this.fromExpressions)),
    ];
  }
}
