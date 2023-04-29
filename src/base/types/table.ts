import { ExprBuilder, NumExpr, StringExpr } from "./expr-builder";

export type Attribute<T> = T extends string
  ? StringExpr
  : T extends number
  ? NumExpr
  : ExprBuilder<T>;

export type Table<T> = { [K in keyof T]: Attribute<T[K]> };
