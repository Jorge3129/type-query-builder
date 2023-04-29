import { ExprBuilder, Like } from "./expr-builder";
import { BinaryOperator, Expression as Ex, UnaryOperator } from "./expression";
import { Param, StringOrParam } from "./param";

export const param = (a: StringOrParam[]): StringOrParam[] => [...a];

export const opDict: Record<
  keyof (Omit<ExprBuilder, "build"> & Like),
  (...args: any[]) => Ex
> = {
  $eq: (a: Ex, b: Ex) => new BinaryOperator("=", a, b),
  $neq: (a: Ex, b: Ex) => new BinaryOperator("!=", a, b),
  $gt: (a: Ex, b: Ex) => new BinaryOperator(">", a, b),
  $gte: (a: Ex, b: Ex) => new BinaryOperator(">=", a, b),
  $lt: (a: Ex, b: Ex) => new BinaryOperator("<", a, b),
  $lte: (a: Ex, b: Ex) => new BinaryOperator("<=", a, b),
  $like: (a: Ex, b: Ex) => new BinaryOperator("LIKE", a, b),
  $isNull: (a: Ex) => new UnaryOperator("IS NULL", a, "postfix"),
  $isNotNull: (a: Ex) => new UnaryOperator("IS NOT NULL", a, "postfix"),
  $and: (a: Ex, b: Ex) => new BinaryOperator("AND", a, b),
  $or: (a: Ex, b: Ex) => new BinaryOperator("OR", a, b),
};

export type OpDict = typeof opDict;

export type OpVal = OpDict[keyof OpDict];
