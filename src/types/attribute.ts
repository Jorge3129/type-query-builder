import { BoolExprBuilder } from "../expression-builder/data-types/bool";
import { NumExprBuilder } from "../expression-builder/data-types/numeric";
import { StringExprBuilder } from "../expression-builder/data-types/string";
import { ExprBuilder } from "../expression-builder/expression-builder";

export type Attribute<T, K extends string = string> = T extends string
  ? StringExprBuilder<K>
  : T extends number
  ? NumExprBuilder<K>
  : T extends boolean
  ? BoolExprBuilder
  : ExprBuilder<T, K>;
