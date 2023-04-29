import { BoolExprBuilder } from "../expression-builder/data-types/bool";
import { NumExprBuilder } from "../expression-builder/data-types/numeric";
import { StringExprBuilder } from "../expression-builder/data-types/string";
import { ExprBuilder } from "../expression-builder/expression-builder";

export type Attribute<T> = T extends string
  ? StringExprBuilder
  : T extends number
  ? NumExprBuilder
  : T extends boolean
  ? BoolExprBuilder
  : ExprBuilder<T>;

export type Table<T> = { [K in keyof T]: Attribute<T[K]> };
