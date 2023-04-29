import {
  MethodDictionary,
  createBuilder,
} from "../expression-builder/create-expression-buider";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { opDict } from "../operators/operators";
import { QueryAndParams } from "../query-stringifier/query";
import { QueryBits } from "../query-stringifier/query-param";
import { stringifyQuery } from "../query-stringifier/stringify-query";
import { ClassConstructor } from "../types/class-constructor";
import { MergeContext } from "../types/merge-context";
import { SelectQueryTree } from "./select-query-tree";

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
    const res = condition(createBuilder(this.options.operators)).build();

    this.queryTree.whereClause = res;

    return this as SelectQueryBuilder<Context>;
  }

  public getTree() {
    return this.queryTree;
  }

  public build(): string {
    return this.buildQueryAndParams().queryString;
  }

  public buildQueryAndParams(): QueryAndParams {
    const select = [`SELECT 1`];
    const from = [
      "FROM " +
        this.queryTree.fromClause
          .map((x) => `${x.tableName} AS ${x.alias}`)
          .join(", "),
    ];
    const where = this.getWhereQueryBits();
    const totalQueryBits = [...select, ...from, ...where].filter((c) => !!c);

    return stringifyQuery(totalQueryBits, (index) => `$${index + 1}`);
  }

  private getWhereQueryBits(): QueryBits {
    if (!this.queryTree.whereClause) {
      return [];
    }

    const expr = this.queryTree.whereClause.toQueryBits({
      escapeChar: '"',
    });

    return ["WHERE", ...expr];
  }
}
