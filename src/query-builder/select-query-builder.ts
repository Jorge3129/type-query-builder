import { createExprBuilder } from "../expression-builder/create-expression-buider";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { AliasExpression } from "../expression/alias-expression";
import { commaSep, commaSepExpressions } from "../expression/comma-separated";
import { LiteralExpression } from "../expression/literal-expression";
import { VariableExpression } from "../expression/variable-expression";
import { defaultFunctions } from "../functions/default-functions";
import { Aliasable } from "../operators/alias";
import { QueryAndParams } from "../query-stringifier/query-and-params";
import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { stringifyQuery } from "../query-stringifier/stringify-query";
import { ClassConstructor } from "../types/class-constructor";
import { MergeContextWithTable, MergeContext } from "../types/merge-context";
import {
  QueryBuilderOptions,
  getDefaultQueryBuilderOptions,
} from "./query-builder-options";
import { SelectQueryTree } from "./select-query-tree";

export class SelectQueryBuilder<
  Context extends {} = {},
  ReturnContext extends {} = {}
> {
  private queryTree = new SelectQueryTree();
  private readonly options: QueryBuilderOptions;

  constructor(options?: Partial<QueryBuilderOptions>) {
    this.options = getDefaultQueryBuilderOptions(options);
  }

  public from<Model, Alias extends string>(
    table: ClassConstructor<Model>,
    alias: Alias
  ): SelectQueryBuilder<{
    [K in keyof MergeContextWithTable<
      Context,
      Alias,
      Model
    >]: MergeContextWithTable<Context, Alias, Model>[K];
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

  public select<A extends string, T, I>(
    expression: (
      context: {
        [TblName in keyof Context]: {
          [AttrName in keyof Context[TblName]]: Context[TblName][AttrName] &
            (Context[TblName][AttrName] extends ExprBuilder<infer I>
              ? Aliasable<I>
              : Aliasable);
        };
      },
      functions: typeof defaultFunctions
    ) => ExprBuilder<T, A>
  ): SelectQueryBuilder<
    Context,
    {
      [K in keyof MergeContext<ReturnContext, A, T>]: MergeContext<
        ReturnContext,
        A,
        T
      >[K];
    }
  > {
    const expr = expression(
      createExprBuilder(this.options.operators),
      defaultFunctions
    ).build();

    this.queryTree.selectClause.push(expr);

    return this as any;
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

  public getMany(): ReturnContext[] {
    return [];
  }

  public getOne(): ReturnContext {
    return {} as any;
  }

  private getAllQueryBits(): QueryFragment[] {
    const select = this.getSelectQueryBits();
    const from = this.getFromQueryBits();
    const where = this.getWhereQueryBits();

    return [...select, ...from, ...where].filter((c) => !!c);
  }

  private getSelectQueryBits(): QueryFragment[] {
    return [
      textFragment(`SELECT`),
      ...commaSepExpressions(this.queryTree.selectClause, this.options),
    ];
  }

  private getFromQueryBits(): QueryFragment[] {
    if (!this.queryTree.fromClause.length) {
      return [];
    }

    return [
      textFragment("FROM"),
      ...commaSep(
        this.queryTree.fromClause.map((table) => [
          ...new AliasExpression(
            new VariableExpression([table.tableName]),
            new LiteralExpression(table.alias)
          ).toQueryFragments(this.options),
        ])
      ),
    ];
  }

  private getWhereQueryBits(): QueryFragment[] {
    if (!this.queryTree.whereClause) {
      return [];
    }

    const expr = this.queryTree.whereClause.toQueryFragments(this.options);

    return [textFragment("WHERE"), ...expr];
  }
}
