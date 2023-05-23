import { Expression } from "../expression/expression";

export type OperatorDictionary<CustomExprOperators> = Record<
  keyof CustomExprOperators,
  (...args: any[]) => Expression
>;

export type ListOperatorDictionary<CustomExprOperators> = Record<
  keyof CustomExprOperators,
  (...args: any[]) => Expression[]
>;
