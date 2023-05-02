import { ExprBuilder } from "../expression-builder/expression-builder";
import { Aliasable } from "../operators/alias";

export type DeepAliasable<T extends ExprBuilder<any>> = {
  [K in keyof T]: T[K] extends (...args: infer Params) => infer R
    ? R extends ExprBuilder<any>
      ? (...args: Params) => DeepAliasable<R>
      : (...args: Params) => R
    : T[K];
} & (T extends ExprBuilder<infer I> ? Aliasable<I> : Aliasable);
