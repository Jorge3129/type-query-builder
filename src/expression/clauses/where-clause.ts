import { expressionFragment } from "../../query-stringifier/query-fragment/expression-query-fragment";
import { ExtendedQueryFragment } from "../../query-stringifier/query-fragment/query-fragment";
import { textFragment } from "../../query-stringifier/query-fragment/text-query-fragment";
import { Expression } from "../expression";

export class WhereClause implements Expression {
  public readonly type = "whereClause";

  constructor(public readonly expression?: Expression) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    if (!this.expression) {
      return [];
    }

    return [textFragment("WHERE"), expressionFragment(this.expression)];
  }
}
