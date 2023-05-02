import { Eq, Ord, IsNull, Bool } from "../../operators";
import { Arithm } from "../../operators/arithm";
import { Between } from "../../operators/between";
import { In } from "../../operators/in";
import { ExprBuilder } from "../expression-builder";

export interface NumExprBuilder<K extends string = string>
  extends ExprBuilder<number, K>,
    Eq<number>,
    Ord<number>,
    IsNull,
    Bool,
    Between<number>,
    In<number>,
    Arithm<number> {}
