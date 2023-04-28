import { Expr } from "./expr";

export type Attribute<T> = {
  eq(other: T): Expr<boolean>;
};

export type Table<T> = { [K in keyof T]: Attribute<T[K]> };
