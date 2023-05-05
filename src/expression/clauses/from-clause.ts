import { expressionFragment } from "../../query-stringifier/query-fragment/expression-query-fragment";
import { ExtendedQueryFragment } from "../../query-stringifier/query-fragment/query-fragment";
import { textFragment } from "../../query-stringifier/query-fragment/text-query-fragment";
import { Expression } from "../expression";
import { ListExpression } from "../list-expression";
import { JoinClause } from "./join-clause";

export class FromClause implements Expression {
  public readonly type = "fromClause";

  constructor(
    public readonly fromExpressions: Expression[],
    public readonly joinClauses: JoinClause[]
  ) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    if (!this.fromExpressions.length) {
      return [];
    }

    const fromFragments = [
      textFragment("FROM"),
      expressionFragment(new ListExpression(this.fromExpressions)),
    ];

    const joinFragments = this.joinClauses.flatMap((joinClause) =>
      expressionFragment(joinClause)
    );

    return [...fromFragments, ...joinFragments];
  }
}
