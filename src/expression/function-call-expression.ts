import { QueryBit, stringBit } from "../query-stringifier/query-param";
import { QueryStringifierConfig } from "../query-stringifier/query-stringifier";
import { commaSepExpressions } from "./comma-separated";
import { Expression } from "./expression";

export class FunctionCallExpression implements Expression {
  public readonly type = "functionCall";
  public readonly args: Expression[];

  constructor(public readonly functionName: string, ...args: Expression[]) {
    this.args = args;
  }

  public toQueryBits(config: QueryStringifierConfig): QueryBit[] {
    const argBits = commaSepExpressions(this.args, config);

    return [
      stringBit(this.functionName, false),
      stringBit("(", false),
      ...argBits,
      stringBit(")"),
    ];
  }
}
