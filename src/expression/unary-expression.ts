import { QueryBit, stringBit } from "../query-stringifier/query-param";
import { QueryStringifierConfig } from "../query-stringifier/query-stringifier";
import { Expression } from "./expression";

export type OperatorType = "postfix" | "prefix";

export class UnaryOperatorExpression implements Expression {
  public readonly type = "unaryOperator";

  constructor(
    public readonly operator: string,
    public readonly operand: Expression,
    public readonly operatorType: OperatorType = "prefix"
  ) {}

  public toQueryBits(config: QueryStringifierConfig): QueryBit[] {
    if (this.operatorType === "prefix") {
      return [stringBit(this.operator), ...this.operand.toQueryBits(config)];
    }

    return [...this.operand.toQueryBits(config), stringBit(this.operator)];
  }
}

export const unOp = (
  operator: string,
  operand: Expression,
  operatorType: OperatorType = "prefix"
) => new UnaryOperatorExpression(operator, operand, operatorType);
