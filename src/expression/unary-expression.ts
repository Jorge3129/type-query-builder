import { ExtendedQueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { expressionFragment } from "../query-stringifier/query-fragment/expression-query-fragment";

export type OperatorType = "postfix" | "prefix";

export class UnaryOperatorExpression implements Expression {
  public readonly type = "unaryOperator";

  constructor(
    public readonly operator: string,
    public readonly operand: Expression,
    public readonly operatorType: OperatorType = "prefix"
  ) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    if (this.operatorType === "prefix") {
      return [textFragment(this.operator), expressionFragment(this.operand)];
    }

    return [expressionFragment(this.operand), textFragment(this.operator)];
  }
}

export const unOp = (
  operator: string,
  operand: Expression,
  operatorType: OperatorType = "prefix"
) => new UnaryOperatorExpression(operator, operand, operatorType);
