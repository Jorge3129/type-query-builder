import { ExprBuilder } from "../expression-builder/expression-builder";
import { AliasExpression } from "../expression/alias-expression";
import { binOp } from "../expression/binary-expression";
import { Expression as Ex } from "../expression/expression";
import { LiteralExpression } from "../expression/literal-expression";
import { OperatorDictionary } from "./operator-dictionary";

export interface Aliasable {
  $as(alias: string): ExprBuilder<void>;
  $as(alias: string): ExprBuilder<void>;
}

export const aliasOpDict: OperatorDictionary<Aliasable> = {
  $as: (expr: Ex, alias: LiteralExpression) => new AliasExpression(expr, alias),
};
