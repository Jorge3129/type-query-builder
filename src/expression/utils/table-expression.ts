import { AliasExpression } from "../alias-expression";
import { LiteralExpression } from "../literal-expression";
import { VariableExpression } from "../variable-expression";

export const tableExpression = (tableName: string, alias: string) => {
  return new AliasExpression(
    new VariableExpression([tableName]),
    new LiteralExpression(alias)
  );
};
