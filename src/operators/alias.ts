import { ExprBuilder } from "../expression-builder/expression-builder";
import { AliasExpression } from "../expression/alias-expression";
import { Expression as Ex } from "../expression/expression";
import { LiteralExpression } from "../expression/literal-expression";
import { OperatorDictionary } from "./operator-dictionary";

export interface Aliasable<T = never> {
  $as<Alias extends string>(alias: Alias): ExprBuilder<T, Alias>;
}

export const aliasOpDict: OperatorDictionary<Aliasable> = {
  $as: (expr: Ex, alias: LiteralExpression) => new AliasExpression(expr, alias),
};
