import { Arithm } from "../../operators/arithm";
import { CommonExprBuilder } from "./common";

export type NumExprBuilder = CommonExprBuilder<number> & Arithm<number>;
