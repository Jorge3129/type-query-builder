import { Bool, Eq, IsNull, Like, Ord } from "../../operators";
import { Between } from "../../operators/between";
import { In } from "../../operators/in";
import { ExprBuilder } from "../expression-builder";

export interface StringExprBuilder<K extends string = string>
  extends ExprBuilder<string, K>,
    Eq<string>,
    Ord<string>,
    IsNull,
    Bool,
    Between<string>,
    In<string>,
    Like<string> {}
