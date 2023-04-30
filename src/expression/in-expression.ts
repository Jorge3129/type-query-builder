import { QueryBits } from "../query-stringifier/query-param";
import { QueryStringifierConfig } from "../query-stringifier/query-stringifier";
import { Expression } from "./expression";
import { sepBy } from "./sep-by";

export class InExpression<T> implements Expression {
  public readonly type = "inOperator";
  public readonly args: Expression[];

  constructor(public readonly operand: Expression, ...args: Expression[]) {
    this.args = args;
  }

  public toQueryBits(config: QueryStringifierConfig): QueryBits {
    const argQueryBits = this.args.map((a) => a.toQueryBits(config));

    const argBits = sepBy(argQueryBits, ",");

    return [...this.operand.toQueryBits(config), "IN", "(", ...argBits, ")"];
  }
}