import { Expression } from "../expression/expression";

export type FromConfig = {
  tableName: string;
  alias: string;
};

export class SelectQueryTree {
  selectClause: Expression[] = [];
  fromClause: FromConfig[] = [];
  whereClause?: Expression;
}
