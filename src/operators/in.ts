import { BoolExprBuilder } from "../expression-builder/data-types/bool";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { OperatorDictionary } from "./operator-dictionary";
import { Expression as Ex } from "../expression/expression";
import { InExpression } from "../expression/in-expression";

export interface In<T> {
  $in(
    requiredFirstArg: T | ExprBuilder<T>,
    ...restArgs: (T | ExprBuilder<T>)[]
  ): BoolExprBuilder;
}

export const inOpDict: OperatorDictionary<In<any>> = {
  $in: (operand: Ex, ...args: Ex[]) => new InExpression(operand, ...args),
};
