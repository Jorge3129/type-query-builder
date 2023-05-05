import { ExtendedQueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { Expression } from "./expression";
import { commaSepExpressions } from "./comma-separated";

export class ListExpression implements Expression {
  public readonly type = "list";

  constructor(public readonly expressions: Expression[]) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    return commaSepExpressions(this.expressions);
  }
}
