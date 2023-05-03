import { VariableExpression } from "../../expression/variable-expression";
import { defaultOperators } from "../../operators/default-operators";
import { Attribute } from "../../types/attribute";
import { createExprBuilder } from "../create-expression-buider";

export const $varExp = <T>(path: string[]) =>
  createExprBuilder<Attribute<T>>(
    new VariableExpression(path),
    defaultOperators
  );
