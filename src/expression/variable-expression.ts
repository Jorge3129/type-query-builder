import { QueryBits } from "../query-stringifier/query-param";
import { QueryStringifierConfig } from "../query-stringifier/query-stringifier";
import { ExpressionBase } from "./expression";

export const identifier = (name: string, escapeChar = "") =>
  `${escapeChar}${name}${escapeChar}`;

const VAR_EXPR_TYPE = "attribute";

export class VariableExpression implements ExpressionBase {
  public readonly type = "attribute";

  constructor(public readonly path: string[] = []) {}

  public stringify(escapeChar = '"'): string {
    return this.path
      .map((pathBit) => identifier(pathBit, escapeChar))
      .join(".");
  }

  public addPathItem(name: string): VariableExpression {
    return new VariableExpression([...this.path, name]);
  }

  public toQueryBits({ escapeChar }: QueryStringifierConfig): QueryBits {
    return [this.stringify(escapeChar)];
  }
}

export const isVariableExpression = (val: unknown): val is VariableExpression =>
  !!val && (val as any).type === VAR_EXPR_TYPE;
