import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { ToQueryFragmentsConfig } from "../query-stringifier/query-fragment/to-query-fragments";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { identifier } from "./variable-expression";
import { LiteralExpression } from "./literal-expression";

export class AliasExpression implements Expression {
  public readonly type = "binaryOperator";

  constructor(
    public readonly expr: Expression,
    public readonly alias: LiteralExpression<string>
  ) {}

  public toQueryFragments(config: ToQueryFragmentsConfig): QueryFragment[] {
    return [
      ...this.expr.toQueryFragments(config),
      textFragment("AS"),
      textFragment(identifier(this.alias.value, config.escapeChar)),
    ];
  }
}
