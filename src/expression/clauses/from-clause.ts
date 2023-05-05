import { FromConfig } from "../../query-builder/select-query-tree";
import { expressionFragment } from "../../query-stringifier/query-fragment/expression-query-fragment";
import { ExtendedQueryFragment } from "../../query-stringifier/query-fragment/query-fragment";
import { textFragment } from "../../query-stringifier/query-fragment/text-query-fragment";
import { AliasExpression } from "../alias-expression";
import { Expression } from "../expression";
import { ListExpression } from "../list-expression";
import { LiteralExpression } from "../literal-expression";
import { VariableExpression } from "../variable-expression";

export class FromClause implements Expression {
  public readonly type = "fromClause";

  constructor(public readonly froms: FromConfig[]) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    return [
      textFragment("FROM"),
      expressionFragment(
        new ListExpression(
          this.froms.map(
            (table) =>
              new AliasExpression(
                new VariableExpression([table.tableName]),
                new LiteralExpression(table.alias)
              )
          )
        )
      ),
    ];
  }
}
