import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { ToQueryFragmentsConfig } from "../query-stringifier/query-fragment/to-query-fragments";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";

export class BinaryOperatorExpression implements Expression {
  public readonly type = "binaryOperator";

  constructor(
    public readonly operator: string,
    public readonly left: Expression,
    public readonly right: Expression
  ) {}

  public toQueryFragments(config: ToQueryFragmentsConfig): QueryFragment[] {
    return [
      ...this.left.toQueryFragments(config),
      textFragment(this.operator),
      ...this.right.toQueryFragments(config),
    ];
  }
}

export const binOp = (operator: string, left: Expression, right: Expression) =>
  new BinaryOperatorExpression(operator, left, right);
