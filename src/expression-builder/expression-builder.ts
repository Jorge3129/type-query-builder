import { Expression } from "../expression/expression";

export interface ExprBuilder<T = unknown> {
  build(): Expression;
}

export const isExprBuilder = <T = unknown>(
  val: unknown
): val is ExprBuilder<T> =>
  !!val && typeof (val as ExprBuilder<T>)["build"] === "function";
