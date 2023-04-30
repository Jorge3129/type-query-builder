import { ExprBuilder } from "../expression-builder/expression-builder";
import { binOp } from "../expression/binary-expression";
import { Expression as Ex } from "../expression/expression";
import { Attribute } from "../types/table";
import { OperatorDictionary } from "./operator-dictionary";

export interface Arithm<T = any> {
  $plus(other: T): Attribute<T>;
  $plus(other: ExprBuilder<T>): Attribute<T>;

  $minus(other: T): Attribute<T>;
  $minus(other: ExprBuilder<T>): Attribute<T>;

  $times(other: T): Attribute<T>;
  $times(other: ExprBuilder<T>): Attribute<T>;

  $div(other: T): Attribute<T>;
  $div(other: ExprBuilder<T>): Attribute<T>;

  $mod(other: T): Attribute<T>;
  $mod(other: ExprBuilder<T>): Attribute<T>;
}

export const arithmOpDict: OperatorDictionary<Arithm<any>> = {
  $plus: (a: Ex, b: Ex) => binOp("+", a, b),
  $minus: (a: Ex, b: Ex) => binOp("-", a, b),
  $times: (a: Ex, b: Ex) => binOp("*", a, b),
  $div: (a: Ex, b: Ex) => binOp("/", a, b),
  $mod: (a: Ex, b: Ex) => binOp("%", a, b),
};
