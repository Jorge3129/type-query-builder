import { Like } from "../../operators";
import { CommonExprBuilder } from "./common";

export interface StringExprBuilder
  extends CommonExprBuilder<string>,
    Like<string> {}
