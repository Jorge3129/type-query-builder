import { Expression } from "../expression/expression";

export interface ExprBuilder<T = any> {
  build(): Expression<T>;
}

export const isExprBuilder = <T = unknown>(
  val: unknown
): val is ExprBuilder<T> =>
  !!val && typeof (val as ExprBuilder<T>)["build"] === "function";
