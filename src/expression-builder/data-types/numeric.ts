import { Arithm } from "../../operators/arithm";
import { CommonExprBuilder } from "./common";

export interface NumExprBuilder
  extends CommonExprBuilder<number>,
    Arithm<number> {}
