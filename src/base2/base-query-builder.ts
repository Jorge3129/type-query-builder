import { Constr } from "../types/class-constructor";
import { Cond } from "../types/cond";
import { MergeContext } from "../types/merge-context";

export class BaseQueryBuilder<Context extends {} = {}> {
  private query: string = "";

  private context: Context = {} as Context;

  from<T, A extends string>(
    table: Constr<T> & { getFieldNames: () => string[] },
    alias: A
  ): BaseQueryBuilder<{
    [K in keyof MergeContext<Context, A, T>]: MergeContext<Context, A, T>[K];
  }> {
    this.query += `FROM ${table.name} as ${alias} `;

    type NewContext = {
      [K in keyof MergeContext<Context, A, T>]: MergeContext<Context, A, T>[K];
    };

    const newContext = { ...this.context } as NewContext;

    newContext[alias] = {
      "@@name": alias,
      ...table.getFieldNames().reduce((acc, field) => {
        acc[field] = { "@@name": alias + "." + field };

        return acc;
      }, {} as any),
    } as any;

    this.context = newContext;

    return this as any as BaseQueryBuilder<{
      [K in keyof MergeContext<Context, A, T>]: MergeContext<Context, A, T>[K];
    }>;
  }

  where(condition: Cond<Context>): BaseQueryBuilder<Context> {
    this.query += `WHERE ${condition(this.context)} `;
    return this as BaseQueryBuilder<Context>;
  }

  build(): string {
    return this.query.trim();
  }
}
