import { CommonExprBuilder } from "../expression-builder/data-types/common";
import { Expression as Ex } from "../expression/expression";
import { boolOpDict } from "./bool";
import { eqOpDict } from "./eq";
import { isNullOpDict } from "./is-null";
import { Like, likeOpDict } from "./like";
import { ordOpDict } from "./ord";

export const defaultOperators: Record<
  keyof (Omit<CommonExprBuilder, "build"> & Like),
  (...args: any[]) => Ex
> = {
  ...eqOpDict,
  ...ordOpDict,
  ...boolOpDict,
  ...isNullOpDict,
  ...likeOpDict,
};
