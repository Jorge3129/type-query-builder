import { QueryComponent } from "../query-stringifier/query-component/query-component";
import { QueryComponentSerializerConfig } from "../query-stringifier/query-component-serializer";
import { Expression } from "./expression";
import { textComponent } from "../query-stringifier/query-component/query-text-component";

export class BetweenExpression<T> implements Expression {
  public readonly type = "betweenOperator";

  constructor(
    public readonly operand: Expression,
    public readonly start: Expression,
    public readonly end: Expression
  ) {}

  public toQueryComponents(
    config: QueryComponentSerializerConfig
  ): QueryComponent[] {
    return [
      ...this.operand.toQueryComponents(config),
      textComponent("BETWEEN"),
      ...this.start.toQueryComponents(config),
      textComponent("AND"),
      ...this.end.toQueryComponents(config),
    ];
  }
}
