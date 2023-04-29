import { StringOrParam, param } from "./param";

type ExpressionType = string;

export interface ExpressionBase extends ToStringOrParam {
  type: ExpressionType;
}

interface ToStringOrParamConfig {
  escapeChar: string;
}

interface ToStringOrParam {
  toStringOrParam(config: ToStringOrParamConfig): StringOrParam[];
}

export class LiteralExpression<T = any> implements ExpressionBase {
  public readonly type = "literal";

  constructor(public readonly value: T) {}

  public toStringOrParam(): StringOrParam[] {
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

  public toStringOrParam({
    escapeChar,
  }: ToStringOrParamConfig): StringOrParam[] {
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

  public toStringOrParam(config: ToStringOrParamConfig): StringOrParam[] {
    return [
      ...this.left.toStringOrParam(config),
      this.operator,
      ...this.right.toStringOrParam(config),
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

  public toStringOrParam(config: ToStringOrParamConfig): StringOrParam[] {
    if (this.orderType === "prefix") {
      return [this.operator, ...this.operand.toStringOrParam(config)];
    }

    return [...this.operand.toStringOrParam(config), this.operator];
  }
}

export type Expression =
  | LiteralExpression
  | VariableExpression
  | BinaryOperator
  | UnaryOperator;
