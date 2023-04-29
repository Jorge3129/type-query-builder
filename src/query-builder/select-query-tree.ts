import { Expression } from "../expression/expression";

export class SelectQueryTree {
  selectClause: any[] = [];
  fromClause: { tableName: string; alias: string }[] = [];
  whereClause?: Expression;
}
