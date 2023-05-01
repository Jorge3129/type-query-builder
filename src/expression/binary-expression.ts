import { QueryComponent } from "../query-stringifier/query-component/query-component";
import { QueryComponentSerializerConfig } from "../query-stringifier/query-component-serializer";
import { Expression } from "./expression";
import { textComponent } from "../query-stringifier/query-component/query-text-component";

export class BinaryOperatorExpression implements Expression {
  public readonly type = "binaryOperator";

  constructor(
    public readonly operator: string,
    public readonly left: Expression,
    public readonly right: Expression
  ) {}

  public toQueryComponents(
    config: QueryComponentSerializerConfig
  ): QueryComponent[] {
    return [
      ...this.left.toQueryComponents(config),
      textComponent(this.operator),
      ...this.right.toQueryComponents(config),
    ];
  }
}

export const binOp = (operator: string, left: Expression, right: Expression) =>
  new BinaryOperatorExpression(operator, left, right);
