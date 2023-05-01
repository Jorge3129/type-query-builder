import { QueryComponent } from "../query-stringifier/query-component/query-component";
import { QueryComponentSerializerConfig } from "../query-stringifier/query-component-serializer";
import { commaSepExpressions } from "./comma-separated";
import { Expression } from "./expression";
import { textComponent } from "../query-stringifier/query-component/query-text-component";

export class FunctionCallExpression implements Expression {
  public readonly type = "functionCall";
  public readonly args: Expression[];

  constructor(public readonly functionName: string, ...args: Expression[]) {
    this.args = args;
  }

  public toQueryComponents(
    config: QueryComponentSerializerConfig
  ): QueryComponent[] {
    const argBits = commaSepExpressions(this.args, config);

    return [
      textComponent(this.functionName, false),
      textComponent("(", false),
      ...argBits,
      textComponent(")"),
    ];
  }
}
