import { ExtendedQueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { LiteralExpression } from "./literal-expression";
import { expressionFragment } from "../query-stringifier/query-fragment/expression-query-fragment";
import { identifierFragment } from "../query-stringifier/query-fragment/identifier-query-fragment";

export class AliasExpression implements Expression {
  public readonly type = "binaryOperator";

  constructor(
    public readonly expr: Expression,
    public readonly alias: LiteralExpression<string>
  ) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    return [
      expressionFragment(this.expr),
      textFragment("AS"),
      identifierFragment([this.alias.value]),
    ];
  }
}
