import { QueryComponent } from "../query-stringifier/query-component/query-component";
import { QueryComponentSerializerConfig } from "../query-stringifier/query-component-serializer";
import { Expression } from "./expression";
import { textComponent } from "../query-stringifier/query-component/query-text-component";

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

  public toQueryComponents({
    escapeChar,
  }: QueryComponentSerializerConfig): QueryComponent[] {
    return [textComponent(this.stringify(escapeChar))];
  }
}

export const isVariableExpression = (val: unknown): val is VariableExpression =>
  !!val && (val as any).type === VAR_EXPR_TYPE;
