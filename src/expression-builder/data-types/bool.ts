import { Bool, Eq, IsNull, Ord } from "../../operators";
import { ExprBuilder } from "../expression-builder";

export interface BoolExprBuilder<T = any>
  extends ExprBuilder<T>,
    Eq<T>,
    Ord<T>,
    IsNull,
    Bool {}
