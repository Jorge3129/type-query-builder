import { Constr } from "./types/class-constructor";
import { Cond } from "./types/cond";
import { MergeContext } from "./types/merge-context";

class SelectQueryTree {
  selectClause: any[] = [];
  fromClause: { tableName: string; alias: string }[] = [];
  whereClause: any[] = [];
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

  where(condition: Cond<Context>): BaseQueryBuilder<Context> {
    return this as BaseQueryBuilder<Context>;
  }

  getTree() {
    return this.queryTree;
  }

  build() {
    return this.queryTree;
  }
}
