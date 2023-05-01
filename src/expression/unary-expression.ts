import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { ToQueryFragmentsConfig } from "../query-stringifier/query-fragment/to-query-fragments";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";

export type OperatorType = "postfix" | "prefix";

export class UnaryOperatorExpression implements Expression {
  public readonly type = "unaryOperator";

  constructor(
    public readonly operator: string,
    public readonly operand: Expression,
    public readonly operatorType: OperatorType = "prefix"
  ) {}

  public toQueryFragments(config: ToQueryFragmentsConfig): QueryFragment[] {
    if (this.operatorType === "prefix") {
      return [
        textFragment(this.operator),
        ...this.operand.toQueryFragments(config),
      ];
    }

    return [
      ...this.operand.toQueryFragments(config),
      textFragment(this.operator),
    ];
  }
}

export const unOp = (
  operator: string,
  operand: Expression,
  operatorType: OperatorType = "prefix"
) => new UnaryOperatorExpression(operator, operand, operatorType);
