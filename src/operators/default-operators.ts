import { CommonExprBuilder } from "../expression-builder/data-types/common";
import { Expression as Ex } from "../expression/expression";
import { Aliasable, aliasOpDict } from "./alias";
import { Arithm, arithmOpDict } from "./arithm";
import { betweenOpDict } from "./between";
import { boolOpDict } from "./bool";
import { eqOpDict } from "./eq";
import { inOpDict } from "./in";
import { isNullOpDict } from "./is-null";
import { Like, likeOpDict } from "./like";
import { ordOpDict } from "./ord";

export const defaultOperators: Record<
  keyof (Omit<CommonExprBuilder, "build"> &
    Like<any> &
    Arithm<any> &
    Aliasable),
  (...args: any[]) => Ex
> = {
  ...eqOpDict,
  ...ordOpDict,
  ...boolOpDict,
  ...isNullOpDict,
  ...likeOpDict,
  ...arithmOpDict,
  ...betweenOpDict,
  ...inOpDict,
  ...aliasOpDict,
};
