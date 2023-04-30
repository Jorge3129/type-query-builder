import { QueryBit, stringBit } from "../query-stringifier/query-param";
import { QueryStringifierConfig } from "../query-stringifier/query-stringifier";
import { Expression } from "./expression";

export class BinaryOperatorExpression implements Expression {
  public readonly type = "binaryOperator";

  constructor(
    public readonly operator: string,
    public readonly left: Expression,
    public readonly right: Expression
  ) {}

  public toQueryBits(config: QueryStringifierConfig): QueryBit[] {
    return [
      ...this.left.toQueryBits(config),
      stringBit(this.operator),
      ...this.right.toQueryBits(config),
    ];
  }
}

export const binOp = (operator: string, left: Expression, right: Expression) =>
  new BinaryOperatorExpression(operator, left, right);
