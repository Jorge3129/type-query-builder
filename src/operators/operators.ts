import { ExprBuilder, Like } from "../expression-builder/expression-builder";
import { BinaryOperator, UnaryOperator } from "../expression/expression";
import { QueryStringOrParam } from "../query-stringifier/query-param";
import { Expression as Ex } from "../expression/expression";

export const param = (a: QueryStringOrParam[]): QueryStringOrParam[] => [...a];

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
  $and: (a: Ex, b: Ex) => new BinaryOperator("AND", a, b),
  $or: (a: Ex, b: Ex) => new BinaryOperator("OR", a, b),
  $isNull: (a: Ex) => new UnaryOperator("IS NULL", a, "postfix"),
  $isNotNull: (a: Ex) => new UnaryOperator("IS NOT NULL", a, "postfix"),
};

export type OpDict = typeof opDict;

export type OpVal = OpDict[keyof OpDict];
