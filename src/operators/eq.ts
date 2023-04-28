import { Expr } from "../types/expr";
import { Attr } from "../types/wrapper";

export function eq<T>(a: Expr<T>, b: Expr<T>): string {
  return `${a.value} = ${b.value}`;
}

export function eq1<T>(a: Attr<T>, b: Attr<T>): string {
  return `${a["@@name"]} = ${b["@@name"]}`;
}
