import { expressionFragment } from "../../query-stringifier/query-fragment/expression-query-fragment";
import { ExtendedQueryFragment } from "../../query-stringifier/query-fragment/query-fragment";
import { textFragment } from "../../query-stringifier/query-fragment/text-query-fragment";
import { Expression } from "../expression";
import { ListExpression } from "../list-expression";

export class GroupByClause implements Expression {
  public readonly type = "groupByClause";

  constructor(public readonly expressions: Expression[]) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    if (!this.expressions.length) {
      return [];
    }

    return [
      textFragment("GROUP BY"),
      expressionFragment(new ListExpression(this.expressions)),
    ];
  }
}
