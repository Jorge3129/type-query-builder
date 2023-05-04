import { LiteralExpression } from "../../expression/literal-expression";
import { Attribute } from "../../types/attribute";
import {
  MethodDictionary,
  createExprBuilder,
} from "../create-expression-buider";

export const createLiteralExpressionBuilder =
  (operators: MethodDictionary) =>
  <T>(val: T) =>
    createExprBuilder<Attribute<T>>(new LiteralExpression(val), operators);
