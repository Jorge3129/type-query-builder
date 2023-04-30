import { Bool, Eq, IsNull, Ord } from "../../operators";
import { ExprBuilder } from "../expression-builder";

export interface BoolExprBuilder
  extends ExprBuilder<boolean>,
    Eq<boolean>,
    Ord<boolean>,
    IsNull,
    Bool {}
