import { Eq, Bool, IsNull, Like, Ord } from "../../operators";
import { ExprBuilder } from "../expression-builder";

export interface CommonExprBuilder<T = any>
  extends ExprBuilder<T>,
    Eq<T>,
    Ord<T>,
    IsNull,
    Bool {}
