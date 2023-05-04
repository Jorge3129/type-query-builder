import { createExprBuilder } from "../expression-builder/create-expression-buider";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { AliasExpression } from "../expression/alias-expression";
import { commaSep, commaSepExpressions } from "../expression/comma-separated";
import { LiteralExpression } from "../expression/literal-expression";
import { VariableExpression } from "../expression/variable-expression";
import { defaultFunctions } from "../functions/default-functions";
import { QueryAndParams } from "../query-stringifier/query-and-params";
import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { compileQueryFragments } from "../query-stringifier/compile-query-fragments";
import { ClassConstructor } from "../types/class-constructor";
import { DeepAliasable } from "../types/deep-aliasable";
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
    return this.buildQueryAndParams().queryString;
  }

  public buildQueryAndParams(): QueryAndParams {
    const placeholderGenerator = (index: number) => `$${index + 1}`;

    return compileQueryFragments(
      this.getAllQueryFragments(),
      placeholderGenerator
    );
  }

  public getMany(): ReturnContext[] {
    return [];
  }

  public getOne(): ReturnContext {
    return {} as any;
  }

  private getAllQueryFragments(): QueryFragment[] {
    const select = this.getSelectQueryFragments();
    const from = this.getFromQueryFragments();
    const where = this.getWhereQueryFragments();

    return [...select, ...from, ...where].filter((c) => !!c);
  }

  private getSelectQueryFragments(): QueryFragment[] {
    return [
      textFragment(`SELECT`),
      ...commaSepExpressions(this.queryTree.selectClause, this.options),
    ];
  }

  private getFromQueryFragments(): QueryFragment[] {
    if (!this.queryTree.fromClause.length) {
      return [];
    }

    return [
      textFragment("FROM"),
      ...commaSep(
        this.queryTree.fromClause.map((table) =>
          new AliasExpression(
            new VariableExpression([table.tableName]),
            new LiteralExpression(table.alias)
          ).toQueryFragments(this.options)
        )
      ),
    ];
  }

  private getWhereQueryFragments(): QueryFragment[] {
    if (!this.queryTree.whereClause) {
      return [];
    }

    const expr = this.queryTree.whereClause.toQueryFragments(this.options);

    return [textFragment("WHERE"), ...expr];
  }
}
