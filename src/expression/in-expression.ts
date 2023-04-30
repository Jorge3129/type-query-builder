import { QueryBit, stringBit } from "../query-stringifier/query-param";
import { QueryStringifierConfig } from "../query-stringifier/query-stringifier";
import { commaSepExpressions } from "./comma-separated";
import { Expression } from "./expression";

export class InExpression<T> implements Expression {
  public readonly type = "inOperator";
  public readonly args: Expression[];

  constructor(public readonly operand: Expression, ...args: Expression[]) {
    this.args = args;
  }

  public toQueryBits(config: QueryStringifierConfig): QueryBit[] {
    const argBits = commaSepExpressions(this.args, config);

    return [
      ...this.operand.toQueryBits(config),
      stringBit("IN"),
      stringBit("(", false),
      ...argBits,
      stringBit(")"),
    ];
  }
}
