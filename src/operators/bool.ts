import { BoolExprBuilder } from "../expression-builder/data-types/bool";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { binOp } from "../expression/binary-expression";
import { Expression as Ex } from "../expression/expression";
import { OperatorDictionary } from "./operator-dictionary";

export interface Bool {
  $and(other: boolean | ExprBuilder<boolean>): BoolExprBuilder;
  $or(other: boolean | ExprBuilder<boolean>): BoolExprBuilder;
}

export const boolOpDict: OperatorDictionary<Bool> = {
  $and: (a: Ex, b: Ex) => binOp("AND", a, b),
  $or: (a: Ex, b: Ex) => binOp("OR", a, b),
};
