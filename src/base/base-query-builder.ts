import { Constr } from "../types/class-constructor";
import { Cond } from "../types/cond";
import { MergeContext } from "../types/merge-context";

export class BaseQueryBuilder<Context extends {} = {}> {
  private query: string = "";

  private context: Context = {} as Context;

  from<T, A extends string>(
    table: Constr<T>,
    alias: A
  ): BaseQueryBuilder<{
    [K in keyof MergeContext<Context, A, T>]: MergeContext<Context, A, T>[K];
  }> {
    return this as any as BaseQueryBuilder<{
      [K in keyof MergeContext<Context, A, T>]: MergeContext<Context, A, T>[K];
    }>;
  }

  where(condition: Cond<Context>): BaseQueryBuilder<Context> {
    return this as BaseQueryBuilder<Context>;
  }

  build(): string {
    return this.query.trim();
  }
}
