import { QueryComponent } from "../query-stringifier/query-component/query-component";
import { QueryComponentSerializerConfig } from "../query-stringifier/query-component-serializer";
import { commaSepExpressions } from "./comma-separated";
import { Expression } from "./expression";
import { textComponent } from "../query-stringifier/query-component/query-text-component";

export class InExpression<T> implements Expression {
  public readonly type = "inOperator";
  public readonly args: Expression[];

  constructor(public readonly operand: Expression, ...args: Expression[]) {
    this.args = args;
  }

  public toQueryComponents(
    config: QueryComponentSerializerConfig
  ): QueryComponent[] {
    const argBits = commaSepExpressions(this.args, config);

    return [
      ...this.operand.toQueryComponents(config),
      textComponent("IN"),
      textComponent("(", false),
      ...argBits,
      textComponent(")"),
    ];
  }
}
