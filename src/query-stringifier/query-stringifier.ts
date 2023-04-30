import { QueryBit } from "./query-param";

export interface QueryStringifierConfig {
  escapeChar: string;
}

export interface QueryStringifier {
  toQueryBits(config: QueryStringifierConfig): QueryBit[];
}
