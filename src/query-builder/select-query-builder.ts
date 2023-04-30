import { createExprBuilder } from "../expression-builder/create-expression-buider";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { commaSep } from "../expression/comma-separated";
import { defaultFunctions } from "../functions/default-functions";
import { QueryAndParams } from "../query-stringifier/query";
import { QueryBit, stringBit } from "../query-stringifier/query-param";
import { stringifyQuery } from "../query-stringifier/stringify-query";
import { ClassConstructor } from "../types/class-constructor";
import { MergeContext } from "../types/merge-context";
import {
  QueryBuilderOptions,
  getDefaultQueryBuilderOptions,
} from "./query-builder-options";
import { SelectQueryTree } from "./select-query-tree";

export class SelectQueryBuilder<Context extends {} = {}> {
  private queryTree = new SelectQueryTree();
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
    condition: (
      context: Context,
      functions: typeof defaultFunctions
    ) => ExprBuilder<boolean>
  ): SelectQueryBuilder<Context> {
    this.queryTree.whereClause = condition(
      createExprBuilder(this.options.operators),
      defaultFunctions
    ).build();

    return this as SelectQueryBuilder<Context>;
  }

  public getTree() {
    return this.queryTree;
  }

  public build(): string {
    return this.buildQueryAndParams().queryString;
  }

  public buildQueryAndParams(): QueryAndParams {
    return stringifyQuery(this.getAllQueryBits(), (index) => `$${index + 1}`);
  }

  private getAllQueryBits(): QueryBit[] {
    const select = this.getSelectQueryBits();
    const from = this.getFromQueryBits();
    const where = this.getWhereQueryBits();

    return [...select, ...from, ...where].filter((c) => !!c);
  }

  private getSelectQueryBits(): QueryBit[] {
    return [stringBit(`SELECT 1`)];
  }

  private getFromQueryBits(): QueryBit[] {
    if (!this.queryTree.fromClause.length) {
      return [];
    }

    return [
      stringBit("FROM"),
      ...commaSep(
        this.queryTree.fromClause.map((table) => [
          stringBit(`${table.tableName} AS ${table.alias}`),
        ])
      ),
    ];
  }

  private getWhereQueryBits(): QueryBit[] {
    if (!this.queryTree.whereClause) {
      return [];
    }

    const expr = this.queryTree.whereClause.toQueryBits(this.options);

    return [stringBit("WHERE"), ...expr];
  }
}
