import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { ToQueryFragmentsConfig } from "../query-stringifier/query-fragment/to-query-fragments";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";

export const identifier = (name: string, escapeChar = "") =>
  `${escapeChar}${name}${escapeChar}`;

const VAR_EXPR_TYPE = "attribute";

export class VariableExpression implements Expression {
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

  public toQueryFragments({
    escapeChar,
  }: ToQueryFragmentsConfig): QueryFragment[] {
    return [textFragment(this.stringify(escapeChar))];
  }
}

export const isVariableExpression = (val: unknown): val is VariableExpression =>
  !!val && (val as any).type === VAR_EXPR_TYPE;
