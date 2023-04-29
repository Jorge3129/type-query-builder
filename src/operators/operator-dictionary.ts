import { Expression } from "../expression/expression";

export type OperatorDictionary<CustomExprOperators> = Record<
  keyof CustomExprOperators,
  (...args: any[]) => Expression
>;
