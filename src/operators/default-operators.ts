import { Expression as Ex } from "../expression/expression";
import { Aliasable, aliasOpDict } from "./alias";
import { AllColumns, allColumnsDict } from "./all-columns";
import { Arithm, arithmOpDict } from "./arithm";
import { Between, betweenOpDict } from "./between";
import { Bool, boolOpDict } from "./bool";
import { Eq, eqOpDict } from "./eq";
import { In, inOpDict } from "./in";
import { IsNull, isNullOpDict } from "./is-null";
import { Like, likeOpDict } from "./like";
import { Ord, ordOpDict } from "./ord";

export const defaultOperators: Record<
  keyof (Eq<any> &
    Ord<any> &
    IsNull &
    Bool &
    Between<any> &
    In<any> &
    Like<any> &
    Arithm<any> &
    Aliasable &
    AllColumns<any>),
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
  ...allColumnsDict,
};
