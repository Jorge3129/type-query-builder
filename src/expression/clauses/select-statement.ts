import { expressionFragment } from "../../query-stringifier/query-fragment/expression-query-fragment";
import { ExtendedQueryFragment } from "../../query-stringifier/query-fragment/query-fragment";
import { Expression } from "../expression";
import { FromClause } from "./from-clause";
import { JoinClause } from "./join-clause";
import { SelectClause } from "./select-clause";
import { WhereClause } from "./where-clause";

export class SelectStatement implements Expression {
  public readonly type = "selectStatement";

  constructor(
    public readonly selectExpressions: Expression[],
    public readonly fromExpressions: Expression[],
    public readonly joinClauses: JoinClause[],
    public readonly whereExpression?: Expression
  ) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    return [
      expressionFragment(new SelectClause(this.selectExpressions)),
      expressionFragment(
        new FromClause(this.fromExpressions, this.joinClauses)
      ),
      expressionFragment(new WhereClause(this.whereExpression)),
    ];
  }
}
