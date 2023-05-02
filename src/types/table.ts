import { BoolExprBuilder } from "../expression-builder/data-types/bool";
import { NumExprBuilder } from "../expression-builder/data-types/numeric";
import { StringExprBuilder } from "../expression-builder/data-types/string";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { Aliasable } from "../operators/alias";

export type Attribute<T, K extends string = string> = T extends string
  ? StringExprBuilder<K>
  : T extends number
  ? NumExprBuilder<K>
  : T extends boolean
  ? BoolExprBuilder
  : ExprBuilder<T, K>;

export type Table<T> = {
  [K in keyof T]: Attribute<T[K], K extends string ? K : string>;
};

export type AliasableTable<T> = {
  [K in keyof T]: T[K] & Aliasable;
};
