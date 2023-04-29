import { Like } from "../../operators";
import { CommonExprBuilder } from "./common";

export type StringExprBuilder = CommonExprBuilder<string> & Like<string>;
