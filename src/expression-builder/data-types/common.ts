import { Eq, Bool, IsNull, Like, Ord } from "../../operators";
import { Between } from "../../operators/between";
import { In } from "../../operators/in";
import { ExprBuilder } from "../expression-builder";

export interface CommonExprBuilder<T = any>
  extends ExprBuilder<T>,
    Eq<T>,
    Ord<T>,
    IsNull,
    Bool,
    Between<T>,
    In<T> {}
