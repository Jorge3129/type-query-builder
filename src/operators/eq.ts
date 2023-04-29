import { BoolExprBuilder } from "../expression-builder/data-types/bool";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { binOp } from "../expression/binary-expression";
import { OperatorDictionary } from "./operator-dictionary";
import { Expression as Ex } from "../expression/expression";

export interface Eq<T> {
  $eq(other: T): BoolExprBuilder;
  $eq(other: ExprBuilder<T>): BoolExprBuilder;

  $neq(other: T): BoolExprBuilder;
  $neq(other: ExprBuilder<T>): BoolExprBuilder;
}

export const eqOpDict: OperatorDictionary<Eq<any>> = {
  $eq: (a: Ex, b: Ex) => binOp("=", a, b),
  $neq: (a: Ex, b: Ex) => binOp("!=", a, b),
};
