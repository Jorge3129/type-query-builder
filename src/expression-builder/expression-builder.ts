import { Expression } from "../expression/expression";

export interface Eq<T> {
  $eq(other: T): ExprBuilder<boolean>;
  $eq(other: ExprBuilder<T>): ExprBuilder<boolean>;

  $neq(other: T): ExprBuilder<boolean>;
  $neq(other: ExprBuilder<T>): ExprBuilder<boolean>;
}

export interface Ord<T> {
  $gt(other: T): ExprBuilder<boolean>;
  $gt(other: ExprBuilder<T>): ExprBuilder<boolean>;

  $gte(other: T): ExprBuilder<boolean>;
  $gte(other: ExprBuilder<T>): ExprBuilder<boolean>;

  $lt(other: T): ExprBuilder<boolean>;
  $lt(other: ExprBuilder<T>): ExprBuilder<boolean>;

  $lte(other: T): ExprBuilder<boolean>;
  $lte(other: ExprBuilder<T>): ExprBuilder<boolean>;
}

export interface IsNullable {
  $isNull(): ExprBuilder<boolean>;
  $isNotNull(): ExprBuilder<boolean>;
}

export interface Like<T = any> {
  $like(other: T): ExprBuilder<boolean>;
  $like(other: ExprBuilder<T>): ExprBuilder<boolean>;
}

export interface Bool {
  $and(other: ExprBuilder<boolean>): ExprBuilder<boolean>;
  $and(other: boolean): ExprBuilder<boolean>;
  $or(other: ExprBuilder<boolean>): ExprBuilder<boolean>;
  $or(other: boolean): ExprBuilder<boolean>;
}

export interface ExprBuilder<T = unknown>
  extends Eq<T>,
    Ord<T>,
    IsNullable,
    Bool {
  build(): Expression;
}

export type StringExpr = ExprBuilder<string> & Like<string>;
export type NumExpr = ExprBuilder<number>;

export const isExprBuilder = <T = unknown>(
  val: unknown
): val is ExprBuilder<T> =>
  !!val && typeof (val as ExprBuilder<T>)["build"] === "function";
