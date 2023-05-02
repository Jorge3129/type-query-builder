import { BoolExprBuilder } from "../expression-builder/data-types/bool";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { binOp } from "../expression/binary-expression";
import { OperatorDictionary } from "./operator-dictionary";
import { Expression as Ex } from "../expression/expression";

export interface Eq<T, Extension = BoolExprBuilder> {
  $eq(other: T): BoolExprBuilder & Extension;
  $eq(other: ExprBuilder<T>): BoolExprBuilder & Extension;

  $neq(other: T): BoolExprBuilder & Extension;
  $neq(other: ExprBuilder<T>): BoolExprBuilder & Extension;
}

export const eqOpDict: OperatorDictionary<Eq<any>> = {
  $eq: (a: Ex, b: Ex) => binOp("=", a, b),
  $neq: (a: Ex, b: Ex) => binOp("!=", a, b),
};
