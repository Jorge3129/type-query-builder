import { Expression } from "../expression/expression";

export class SelectQueryTree {
  selectClause: Expression[] = [];
  fromClause: Expression[] = [];
  whereClause?: Expression;
}
