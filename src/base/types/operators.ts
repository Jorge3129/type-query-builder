import { ExprBuilder, Like } from "./expr";

export type Param<T = any> = {
  type: "param";
  value: T;
};

export const param = <T>(value: T): Param<T> => ({ type: "param", value });

export const opDict: Record<
  keyof (Omit<ExprBuilder, "build"> & Like),
  (...args: any[]) => (string | Param)[]
> = {
  $eq: <T>(a: T, b: T) => [param(a), "=", param(b)],
  $neq: <T>(a: T, b: T) => [param(a), "!=", param(b)],
  $gt: <T>(a: T, b: T) => [param(a), ">", param(b)],
  $gte: <T>(a: T, b: T) => [param(a), ">=", param(b)],
  $lt: <T>(a: T, b: T) => [param(a), "<", param(b)],
  $lte: <T>(a: T, b: T) => [param(a), "<=", param(b)],
  $like: <T>(a: T, b: T) => [param(a), "LIKE", param(b)],
  $isNull: <T>(a: T) => [param(a), "IS NULL"],
  $isNotNull: <T>(a: T) => [param(a), "IS NOT NULL"],
  $and: <T>(a: T, b: T) => [param(a), "AND", param(b)],
  $or: <T>(a: T, b: T) => [param(a), "OR", param(b)],
};

export type OpDict = typeof opDict;

export type OpVal = OpDict[keyof OpDict];
