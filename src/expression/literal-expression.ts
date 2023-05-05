import { ExtendedQueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { paramFragment } from "../query-stringifier/query-fragment/param-query-fragment";
import { Expression } from "./expression";

export class LiteralExpression<T = any> implements Expression {
  public readonly type = "literal";

  constructor(public readonly value: T) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    return [paramFragment(this.value)];
  }
}
