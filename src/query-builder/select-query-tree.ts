import { JoinClause } from "../expression/clauses/join-clause";
import { Expression } from "../expression/expression";

export class SelectQueryTree {
  selectClause: Expression[] = [];
  fromClause: Expression[] = [];
  joins: JoinClause[] = [];
  whereClause?: Expression;
  groupByClause: Expression[] = [];
}
