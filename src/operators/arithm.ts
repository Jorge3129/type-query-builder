import { ExprBuilder } from "../expression-builder/expression-builder";
import { binOp } from "../expression/binary-expression";
import { Expression as Ex } from "../expression/expression";
import { Attribute } from "../types/attribute";
import { OperatorDictionary } from "./operator-dictionary";

export interface Arithm<T = any> {
  $plus(other: T | ExprBuilder<T>): Attribute<T>;
  $minus(other: T | ExprBuilder<T>): Attribute<T>;
  $times(other: T | ExprBuilder<T>): Attribute<T>;
  $div(other: T | ExprBuilder<T>): Attribute<T>;
  $mod(other: T | ExprBuilder<T>): Attribute<T>;
}

export const arithmOpDict: OperatorDictionary<Arithm<any>> = {
  $plus: (a: Ex, b: Ex) => binOp("+", a, b),
  $minus: (a: Ex, b: Ex) => binOp("-", a, b),
  $times: (a: Ex, b: Ex) => binOp("*", a, b),
  $div: (a: Ex, b: Ex) => binOp("/", a, b),
  $mod: (a: Ex, b: Ex) => binOp("%", a, b),
};
