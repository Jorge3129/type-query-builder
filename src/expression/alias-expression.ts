import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { ToQueryFragmentsConfig } from "../query-stringifier/query-fragment/to-query-fragments";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { LiteralExpression } from "./literal-expression";
import { escapeIdentifier } from "../utils/escape-identifier";

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
      textFragment(
        escapeIdentifier(this.alias.value, config.identifierEscapeChararacter)
      ),
    ];
  }
}
