import { createBuilder } from "./query-proxy/builder-proxy";
import { PathItem, buildPathItem } from "./query-proxy/path-item";
import { Constr } from "./types/class-constructor";
import { ExprBuilder, Like } from "./types/expr";
import { MergeContext } from "./types/merge-context";
import { opDict } from "./types/operators";

class SelectQueryTree {
  selectClause: any[] = [];
  fromClause: { tableName: string; alias: string }[] = [];
  whereClause?: PathItem;
}

export class BaseQueryBuilder<Context extends {} = {}> {
  constructor(private queryTree: SelectQueryTree = new SelectQueryTree()) {}

  from<T, A extends string>(
    table: Constr<T>,
    alias: A
  ): BaseQueryBuilder<{
    [K in keyof MergeContext<Context, A, T>]: MergeContext<Context, A, T>[K];
  }> {
    this.queryTree.fromClause.push({
      tableName: table.name,
      alias,
    });

    return this as any as BaseQueryBuilder<{
      [K in keyof MergeContext<Context, A, T>]: MergeContext<Context, A, T>[K];
    }>;
  }

  where(
    condition: (context: Context) => ExprBuilder<boolean>
  ): BaseQueryBuilder<Context> {
    const res = condition(createBuilder(opDict)).build();

    this.queryTree.whereClause = res;

    return this as BaseQueryBuilder<Context>;
  }

  getTree() {
    return this.queryTree;
  }

  build(): string {
    const select = `SELECT 1`;
    const from =
      "FROM " +
      this.queryTree.fromClause
        .map((x) => `${x.tableName} AS ${x.alias}`)
        .join(", ");

    const where = this.getWhere();

    return [select, from, where].filter((c) => !!c).join(" ");
  }

  private getWhere(): string {
    if (!this.queryTree.whereClause) {
      return "";
    }

    const expr = buildPathItem(this.queryTree.whereClause);

    // console.log(expr);

    return `WHERE ${expr}`;
  }
}
