import { expressionFragment } from "../../query-stringifier/query-fragment/expression-query-fragment";
import { ExtendedQueryFragment } from "../../query-stringifier/query-fragment/query-fragment";
import { textFragment } from "../../query-stringifier/query-fragment/text-query-fragment";
import { Expression } from "../expression";

enum JoinType {
  INNER_JOIN = "INNER JOIN",
  LEFT_JOIN = "LEFT JOIN",
  LEFT_OUTER_JOIN = "LEFT OUTER JOIN",
  RIGHT_JOIN = "RIGHT JOIN",
  RIGHT_OUTER_JOIN = "RIGHT OUTER JOIN",
  FULL_JOIN = "FULL JOIN",
  FULL_OUTER_JOIN = "FULL OUTER JOIN",
  CROSS_JOIN = "CROSS JOIN",
  NATURAL_JOIN = "NATURAL JOIN",
}

export default JoinType;

export class JoinClause implements Expression {
  public readonly type = "joinClause";

  constructor(
    public readonly joinType: JoinType,
    public readonly tableExpression: Expression,
    public readonly onCondition: Expression
  ) {}

  public toQueryFragments(): ExtendedQueryFragment[] {
    return [
      textFragment(this.joinType),
      expressionFragment(this.tableExpression),
      textFragment("ON"),
      expressionFragment(this.onCondition),
    ];
  }
}
