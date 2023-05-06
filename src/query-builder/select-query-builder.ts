import { createExprBuilder } from "../expression-builder/create-expression-buider";
import {
  ExprBuilder,
  SelectExpressionListBuilder,
} from "../expression-builder/expression-builder";
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
import JoinType, { JoinClause } from "../expression/clauses/join-clause";
import { tableExpression } from "../expression/utils/table-expression";
import { Table } from "../types/table";
import { AllColumns } from "../operators/all-columns";

export class SelectQueryBuilder<
  Context extends {} = {},
  ReturnContext extends {} = {}
> {
  private readonly queryTree = new SelectQueryTree();
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
    this.queryTree.fromClause.push(tableExpression(table.name, alias));

    return this as any;
  }

  public join<Model, Alias extends string>(
    joinType: JoinType,
    table: ClassConstructor<Model>,
    alias: Alias,
    onCondition: (
      context: {
        [K in keyof MergeContextWithTable<
          Context,
          Alias,
          Model
        >]: MergeContextWithTable<Context, Alias, Model>[K];
      },
      functions: typeof defaultFunctions
    ) => ExprBuilder<boolean>
  ): SelectQueryBuilder<{
    [K in keyof MergeContextWithTable<
      Context,
      Alias,
      Model
    >]: MergeContextWithTable<Context, Alias, Model>[K];
  }> {
    const onExpression = onCondition(
      createExprBuilder(
        new VariableExpression(),
        this.options.dialectOptions.operators
      ),
      defaultFunctions
    ).build();

    this.queryTree.joins.push(
      new JoinClause(joinType, tableExpression(table.name, alias), onExpression)
    );

    return this as any;
  }

  public where(
    condition: (
      context: Context,
      functions: typeof defaultFunctions
    ) => ExprBuilder<boolean>
  ): SelectQueryBuilder<Context, ReturnContext> {
    this.queryTree.whereClause = condition(
      createExprBuilder(
        new VariableExpression(),
        this.options.dialectOptions.operators
      ),
      defaultFunctions
    ).build();

    return this as any;
  }

  public select<A extends string, T>(
    expression: (
      context: {
        [TblName in keyof Context]: {
          [AttrName in keyof Context[TblName]]: Context[TblName][AttrName] extends ExprBuilder
            ? DeepAliasable<Context[TblName][AttrName]>
            : Context[TblName][AttrName];
        } & (Context[TblName] extends Table<infer Model>
          ? AllColumns<Model>
          : Context[TblName]);
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
      createExprBuilder(
        new VariableExpression(),
        this.options.dialectOptions.operators
      ),
      defaultFunctions
    ).build();

    this.queryTree.selectClause.push(expr);

    return this as any;
  }

  public select$<T>(
    expression: (
      context: {
        [TblName in keyof Context]: {
          [AttrName in keyof Context[TblName]]: Context[TblName][AttrName] extends ExprBuilder
            ? DeepAliasable<Context[TblName][AttrName]>
            : Context[TblName][AttrName];
        } & (Context[TblName] extends Table<infer Model>
          ? AllColumns<Model>
          : Context[TblName]);
      },
      functions: typeof defaultFunctions
    ) => SelectExpressionListBuilder<T>
  ): SelectQueryBuilder<
    Context,
    {
      [K in keyof (ReturnContext & T)]: (ReturnContext & T)[K];
    }
  > {
    const expr = expression(
      createExprBuilder(
        new VariableExpression(),
        this.options.dialectOptions.operators
      ),
      defaultFunctions
    ).build();

    this.queryTree.selectClause.push(expr);

    return this as any;
  }

  public getQueryAndParams(): QueryAndParams {
    return compileQueryFragments(
      this.getSelectStatement().toQueryFragments(),
      this.options.dialectOptions
    );
  }

  private getSelectStatement(): SelectStatement {
    return new SelectStatement(
      this.queryTree.selectClause,
      this.queryTree.fromClause,
      this.queryTree.joins,
      this.queryTree.whereClause
    );
  }

  public async getMany(): Promise<ReturnContext[]> {
    const { query, params } = this.getQueryAndParams();

    return (await this.options.driver.query<ReturnContext>(query, params)).rows;
  }

  public async getOne(): Promise<ReturnContext | null> {
    return this.getMany().then((rows) => rows.at(0) ?? null);
  }
}
