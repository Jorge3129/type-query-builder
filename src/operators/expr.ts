import { Expr } from "../types/expr";

export function expr<T>(value: T): Expr<T> {
  return { value };
}
