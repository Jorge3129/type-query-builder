import { BoolExprBuilder } from "../expression-builder/data-types/bool";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { binOp } from "../expression/binary-expression";
import { Expression as Ex } from "../expression/expression";
import { OperatorDictionary } from "./operator-dictionary";

export interface Ord<T> {
  $gt(other: T | ExprBuilder<T>): BoolExprBuilder;
  $gte(other: T | ExprBuilder<T>): BoolExprBuilder;

  $lt(other: T | ExprBuilder<T>): BoolExprBuilder;
  $lte(other: T | ExprBuilder<T>): BoolExprBuilder;
}

export const ordOpDict: OperatorDictionary<Ord<any>> = {
  $gt: (a: Ex, b: Ex) => binOp(">", a, b),
  $gte: (a: Ex, b: Ex) => binOp(">=", a, b),
  $lt: (a: Ex, b: Ex) => binOp("<", a, b),
  $lte: (a: Ex, b: Ex) => binOp("<=", a, b),
};
