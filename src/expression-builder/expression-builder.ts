import { Expression } from "../expression/expression";

export interface ExprBuilder<T = any, K extends string = string> {
  build(): Expression<T>;
  key(): K;
}

export interface SelectExpressionListBuilder<ExprRecord> {
  build(): Expression<ExprRecord>;
}

export const isExprBuilder = <T = unknown>(
  val: unknown
): val is ExprBuilder<T> =>
  !!val && typeof (val as ExprBuilder<T>)["build"] === "function";
