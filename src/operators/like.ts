import { BoolExprBuilder } from "../expression-builder/data-types/bool";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { binOp } from "../expression/binary-expression";
import { Expression as Ex } from "../expression/expression";
import { OperatorDictionary } from "./operator-dictionary";

export interface Like<T> {
  $like(other: T): BoolExprBuilder;
  $like(other: ExprBuilder<T>): BoolExprBuilder;
}

export const likeOpDict: OperatorDictionary<Like<any>> = {
  $like: (a: Ex, b: Ex) => binOp("LIKE", a, b),
};
