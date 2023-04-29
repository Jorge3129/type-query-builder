import { MethodDictionary, createBuilder } from "./query-proxy/builder-proxy";
import { ClassConstructor } from "./types/class-constructor";
import { ExprBuilder, Like } from "./types/expr-builder";
import { Expression } from "./types/expression";
import { MergeContext } from "./types/merge-context";
import { opDict } from "./types/operators";

class SelectQueryTree {
  selectClause: any[] = [];
  fromClause: { tableName: string; alias: string }[] = [];
  whereClause?: Expression;
}

export type QueryBuilderOptions = {
  operators: MethodDictionary;
};

const getDefaultQueryBuilderOptions = (
  options?: Partial<QueryBuilderOptions>
): QueryBuilderOptions => {
  return {
    operators: options?.operators ?? opDict,
  };
};

export class SelectQueryBuilder<Context extends {} = {}> {
  private queryTree: SelectQueryTree = new SelectQueryTree();
  private readonly options: QueryBuilderOptions;

  constructor(options?: Partial<QueryBuilderOptions>) {
    this.options = getDefaultQueryBuilderOptions(options);
  }

  public from<Model, Alias extends string>(
    table: ClassConstructor<Model>,
    alias: Alias
  ): SelectQueryBuilder<{
    [K in keyof MergeContext<Context, Alias, Model>]: MergeContext<
      Context,
      Alias,
      Model
    >[K];
  }> {
    this.queryTree.fromClause.push({
      tableName: table.name,
      alias,
    });

    return this as any;
  }

  public where(
    condition: (context: Context) => ExprBuilder<boolean>
  ): SelectQueryBuilder<Context> {
    const res = condition(createBuilder(opDict)).build();

    this.queryTree.whereClause = res;

    return this as SelectQueryBuilder<Context>;
  }

  public getTree() {
    return this.queryTree;
  }

  public build(): string {
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

    return `WHERE ${res.resultStrings.join(" ")}`;
  }
}
