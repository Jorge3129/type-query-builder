import { BoolExprBuilder } from "../expression-builder/data-types/bool";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { OperatorDictionary } from "./operator-dictionary";
import { Expression as Ex } from "../expression/expression";
import { BetweenExpression } from "../expression/between-expression";

export interface Between<T> {
  $between(start: T | ExprBuilder<T>, end: T | ExprBuilder<T>): BoolExprBuilder;
}

export const betweenOpDict: OperatorDictionary<Between<any>> = {
  $between: (arg: Ex, start: Ex, end: Ex) =>
    new BetweenExpression(arg, start, end),
};
