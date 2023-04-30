import { QueryBits } from "../query-stringifier/query-param";
import { QueryStringifierConfig } from "../query-stringifier/query-stringifier";
import { Expression } from "./expression";

export class InExpression<T> implements Expression {
  public readonly type = "inOperator";
  public readonly args: Expression[];

  constructor(public readonly operand: Expression, ...args: Expression[]) {
    this.args = args;
  }

  public toQueryBits(config: QueryStringifierConfig): QueryBits {
    const argBits = this.args.flatMap((arg, index, { length }) => {
      const argBits = arg.toQueryBits(config);

      if (index === length - 1) {
        return argBits;
      }

      return [...argBits, ","];
    });

    return [...this.operand.toQueryBits(config), "IN", "(", ...argBits, ")"];
  }
}
