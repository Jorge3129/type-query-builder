import { ExtendedQueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { expressionFragment } from "../query-stringifier/query-fragment/expression-query-fragment";

export class BinaryOperatorExpression implements Expression {
  public readonly type = "binaryOperator";

  constructor(
    public readonly operator: string,
    public readonly left: Expression,
    public readonly right: Expression
  ) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    return [
      expressionFragment(this.left),
      textFragment(this.operator),
      expressionFragment(this.right),
    ];
  }
}

export const binOp = (operator: string, left: Expression, right: Expression) =>
  new BinaryOperatorExpression(operator, left, right);
