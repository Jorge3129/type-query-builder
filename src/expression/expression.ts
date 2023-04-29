import { QueryBits, param } from "../query-stringifier/query-param";
import {
  QueryStringifier,
  QueryStringifierConfig,
} from "../query-stringifier/query-stringifier";

export type ExpressionType = string;

export interface ExpressionBase extends QueryStringifier {
  type: ExpressionType;
}

export class LiteralExpression<T = any> implements ExpressionBase {
  public readonly type = "literal";

  constructor(public readonly value: T) {}

  public toQueryBits(): QueryBits {
    return [param(this.value)];
  }
}

export const identifier = (name: string, escapeChar = "") =>
  `${escapeChar}${name}${escapeChar}`;

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

export class BinaryOperator implements ExpressionBase {
  public readonly type = "binaryOperator";

  constructor(
    public readonly operator: string,
    public readonly left: Expression,
    public readonly right: Expression
  ) {}

  public toQueryBits(config: QueryStringifierConfig): QueryBits {
    return [
      ...this.left.toQueryBits(config),
      this.operator,
      ...this.right.toQueryBits(config),
    ];
  }
}

export class UnaryOperator implements ExpressionBase {
  public readonly type = "unaryOperator";

  constructor(
    public readonly operator: string,
    public readonly operand: Expression,
    public readonly orderType: "postfix" | "prefix" = "prefix"
  ) {}

  public toQueryBits(config: QueryStringifierConfig): QueryBits {
    if (this.orderType === "prefix") {
      return [this.operator, ...this.operand.toQueryBits(config)];
    }

    return [...this.operand.toQueryBits(config), this.operator];
  }
}

export type Expression =
  | LiteralExpression
  | VariableExpression
  | BinaryOperator
  | UnaryOperator;
