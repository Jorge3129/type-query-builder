import { BoolExprBuilder } from "../expression-builder/data-types/bool";
import { Expression as Ex } from "../expression/expression";
import { unOp } from "../expression/unary-expression";
import { OperatorDictionary } from "./operator-dictionary";

export interface IsNull {
  $isNull(): BoolExprBuilder;
  $isNotNull(): BoolExprBuilder;
}

export const isNullOpDict: OperatorDictionary<IsNull> = {
  $isNull: (a: Ex) => unOp("IS NULL", a, "postfix"),
  $isNotNull: (a: Ex) => unOp("IS NOT NULL", a, "postfix"),
};
