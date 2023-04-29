import { ExprBuilder, Like } from "../expression-builder/expression-builder";
import { binOp } from "../expression/binary-expression";
import { Expression as Ex } from "../expression/expression";
import { unOp } from "../expression/unary-expression";

export const defaultOperators: Record<
  keyof (Omit<ExprBuilder, "build"> & Like),
  (...args: any[]) => Ex
> = {
  $eq: (a: Ex, b: Ex) => binOp("=", a, b),
  $neq: (a: Ex, b: Ex) => binOp("!=", a, b),
  $gt: (a: Ex, b: Ex) => binOp(">", a, b),
  $gte: (a: Ex, b: Ex) => binOp(">=", a, b),
  $lt: (a: Ex, b: Ex) => binOp("<", a, b),
  $lte: (a: Ex, b: Ex) => binOp("<=", a, b),
  $like: (a: Ex, b: Ex) => binOp("LIKE", a, b),
  $and: (a: Ex, b: Ex) => binOp("AND", a, b),
  $or: (a: Ex, b: Ex) => binOp("OR", a, b),
  $isNull: (a: Ex) => unOp("IS NULL", a, "postfix"),
  $isNotNull: (a: Ex) => unOp("IS NOT NULL", a, "postfix"),
};
