import { expressionFragment } from "../../query-stringifier/query-fragment/expression-query-fragment";
import { ExtendedQueryFragment } from "../../query-stringifier/query-fragment/query-fragment";
import { textFragment } from "../../query-stringifier/query-fragment/text-query-fragment";
import { Expression } from "../expression";
import { ListExpression } from "../list-expression";

export class SelectClause implements Expression {
  public readonly type = "selectClause";

  constructor(public readonly expressions: Expression[]) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    return [
      textFragment("SELECT"),
      expressionFragment(new ListExpression(this.expressions)),
    ];
  }
}
