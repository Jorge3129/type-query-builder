import { Bool, Eq, IsNull, Ord } from "../../operators";
import { ExprBuilder } from "../expression-builder";

export interface BoolExprBuilder<K extends string = string>
  extends ExprBuilder<boolean, K>,
    Eq<boolean>,
    Ord<boolean>,
    IsNull,
    Bool {}
