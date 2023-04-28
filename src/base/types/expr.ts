export interface Expr<T> {
  value: T;
}

export function eq<T>(a: Expr<T>, b: Expr<T>): string {
  return `${a.value} = ${b.value}`;
}

export function expr<T>(value: T): Expr<T> {
  return { value };
}
