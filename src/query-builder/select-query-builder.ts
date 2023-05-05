import { createExprBuilder } from "../expression-builder/create-expression-buider";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { VariableExpression } from "../expression/variable-expression";
import { defaultFunctions } from "../functions/default-functions";
import { QueryAndParams } from "../query-stringifier/query-and-params";
import { compileQueryFragments } from "../query-stringifier/compile-query-fragments";
import { ClassConstructor } from "../types/class-constructor";
import { DeepAliasable } from "../types/deep-aliasable";
import { MergeContextWithTable, MergeContext } from "../types/merge-context";
import {
  QueryBuilderOptions,
  getDefaultQueryBuilderOptions,
} from "./query-builder-options";
import { SelectQueryTree } from "./select-query-tree";
import { SelectStatement } from "../expression/clauses/select-statement";

export class SelectQueryBuilder<
  Context extends {} = {},
  ReturnContext extends {} = {}
> {
  private queryTree = new SelectQueryTree();
  private readonly options: Required<QueryBuilderOptions>;

  constructor(options: QueryBuilderOptions) {
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
      createExprBuilder(new VariableExpression(), this.options.operators),
      defaultFunctions
    ).build();

    return this as SelectQueryBuilder<Context>;
  }

  public select<A extends string, T, I>(
    expression: (
      context: {
        [TblName in keyof Context]: {
          [AttrName in keyof Context[TblName]]: Context[TblName][AttrName] extends ExprBuilder
            ? DeepAliasable<Context[TblName][AttrName]>
            : Context[TblName][AttrName];
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
      createExprBuilder(new VariableExpression(), this.options.operators),
      defaultFunctions
    ).build();

    this.queryTree.selectClause.push(expr);

    return this as any;
  }

  public getTree() {
    return this.queryTree;
  }

  public build(): string {
    return this.buildQueryAndParams().query;
  }

  public buildQueryAndParams(): QueryAndParams {
    const placeholderGenerator = (index: number) => `$${index + 1}`;

    return compileQueryFragments(
      this.getSelectStatement().toQueryFragments(),
      this.options,
      placeholderGenerator
    );
  }

  private getSelectStatement(): SelectStatement {
    return new SelectStatement(
      this.queryTree.selectClause,
      this.queryTree.fromClause,
      this.queryTree.whereClause
    );
  }

  public async getMany(): Promise<ReturnContext[]> {
    return [];
  }

  public async getOne(): Promise<ReturnContext> {
    return {} as any;
  }
}
