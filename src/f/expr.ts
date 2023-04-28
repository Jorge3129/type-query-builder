import { Attr } from "./wrapper";

export interface Expr<T> {
  value: T;
}

export function eq<T>(a: Expr<T>, b: Expr<T>): string {
  return `${a.value} = ${b.value}`;
}

export function eq1<T>(a: Attr<T>, b: Attr<T>): string {
  return `${a["@@name"]} = ${b["@@name"]}`;
}

export function expr<T>(value: T): Expr<T> {
  return { value };
}
