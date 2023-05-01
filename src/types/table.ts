import { BoolExprBuilder } from "../expression-builder/data-types/bool";
import { NumExprBuilder } from "../expression-builder/data-types/numeric";
import { StringExprBuilder } from "../expression-builder/data-types/string";
import { ExprBuilder } from "../expression-builder/expression-builder";
import { Aliasable } from "../operators/alias";

// export type Attribute<Name, Type> = RawAttribute<Type>;

export type Attribute<T> = T extends string
  ? StringExprBuilder
  : T extends number
  ? NumExprBuilder
  : T extends boolean
  ? BoolExprBuilder
  : ExprBuilder<T>;

export type ReverseAttribute<T> = T extends StringExprBuilder
  ? string
  : T extends NumExprBuilder
  ? number
  : T extends BoolExprBuilder
  ? boolean
  : unknown;

export type Table<T> = {
  [K in keyof T]: Attribute<T[K]>;
};

export type AliasableTable<T> = {
  [K in keyof T]: T[K] & Aliasable;
};
