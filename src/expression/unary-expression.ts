import { QueryComponent } from "../query-stringifier/query-component/query-component";
import { QueryComponentSerializerConfig } from "../query-stringifier/query-component-serializer";
import { Expression } from "./expression";
import { textComponent } from "../query-stringifier/query-component/query-text-component";

export type OperatorType = "postfix" | "prefix";

export class UnaryOperatorExpression implements Expression {
  public readonly type = "unaryOperator";

  constructor(
    public readonly operator: string,
    public readonly operand: Expression,
    public readonly operatorType: OperatorType = "prefix"
  ) {}

  public toQueryComponents(
    config: QueryComponentSerializerConfig
  ): QueryComponent[] {
    if (this.operatorType === "prefix") {
      return [
        textComponent(this.operator),
        ...this.operand.toQueryComponents(config),
      ];
    }

    return [
      ...this.operand.toQueryComponents(config),
      textComponent(this.operator),
    ];
  }
}

export const unOp = (
  operator: string,
  operand: Expression,
  operatorType: OperatorType = "prefix"
) => new UnaryOperatorExpression(operator, operand, operatorType);
