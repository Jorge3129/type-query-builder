import { LiteralExpression } from "../expression/literal-expression";
import { defaultOperators } from "../operators/default-operators";
import { Attribute } from "../types/attribute";
import { createExprBuilder } from "./create-expression-buider";

export const litExp = <T>(val: T) =>
  createExprBuilder<Attribute<T>>(defaultOperators, new LiteralExpression(val));
