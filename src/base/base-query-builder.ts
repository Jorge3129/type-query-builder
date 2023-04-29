import { createBuilder } from "./query-proxy/builder-proxy";
import { Constr } from "./types/class-constructor";
import { ExprBuilder, Like } from "./types/expr-builder";
import { Expression } from "./types/expression";
import { MergeContext } from "./types/merge-context";
import { opDict } from "./types/operators";

class SelectQueryTree {
  selectClause: any[] = [];
  fromClause: { tableName: string; alias: string }[] = [];
  whereClause?: Expression;
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

    const expr = this.queryTree.whereClause.toStringOrParam({
      escapeChar: '"',
    });

    const res = expr.reduce(
      (acc, strOrParam) => {
        const { paramCount, resultStrings, resultParamValues } = acc;

        if (typeof strOrParam === "string") {
          return {
            paramCount,
            resultStrings: [...resultStrings, strOrParam],
            resultParamValues,
          };
        }

        return {
          paramCount: paramCount + 1,
          resultStrings: [...resultStrings, `$${paramCount + 1}`],
          resultParamValues: [...resultParamValues, strOrParam.value],
        };
      },
      {
        paramCount: 0,
        resultStrings: [] as string[],
        resultParamValues: [] as any[],
      }
    );

    console.log(res);

    return `WHERE ${res.resultStrings.join(" ")}`;
  }
}
